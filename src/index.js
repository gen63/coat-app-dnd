import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `No${k + 1 + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 4,
  width: 50,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 4,
  margin: 4,
  width: 80,
  height: 190
});

let j = 0;

function QuoteApp() {
  // getItems = (count, offset = 0)
  // const [stateItem, setStateItem] = useState([getItems(4), getItems(4, 4), getItems(4, 8), getItems(4, 12), getItems(9, 16), getItems(0, 25)]);
  const [stateItem, setStateItem] = useState([getItems(4)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(stateItem[sInd], source.index, destination.index);
      const newState = [...stateItem];
      newState[sInd] = items;
      setStateItem(newState);
    } else {
      const result = move(stateItem[sInd], stateItem[dInd], source, destination);
      const newState = [...stateItem];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setStateItem(newState.filter(group => group.length));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable key={0} droppableId={0}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            <div>第1コート</div>
            {stateItem[0].map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      {item.content}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button type="button" onClick="" style={{ margin: "3px", width: "45px" }}>終了</button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<QuoteApp />, rootElement);
