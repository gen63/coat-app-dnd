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
  padding: 3,
  width: 50,
  margin: "0 auto",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 4,
  margin: "4",
  width: 80,
});

function QuoteApp() {
  // getItems = (count, offset = 0)
  const [stateItem, setStateItem] = useState([getItems(4), getItems(4, 4), getItems(4, 8), getItems(7, 12), getItems(6, 19)]);
  // const [stateItem, setStateItem] = useState([getItems(4)]);

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

  function gameEnd1() {
    const coatNo = 0;
    // コートの人数が4人以下の時は試合終了させない
    if (stateItem[coatNo].length < 4) {
      return;
    }

    // 試合が終わった4人を退避
    const gameFinishMember = stateItem[coatNo].slice(0, 4);
    // 待機の末尾2人をコピー
    const waitLast2Member = stateItem[3].slice(stateItem[3].length - 2, stateItem[3].length);

    const newState = [...stateItem];
    // 待機の末尾2人を削除
    [...Array(2)].map(() => newState[3].pop());
    newState[3] = [...newState[3], ...gameFinishMember.slice(0, 2)];
    newState[3] = [...newState[3], ...waitLast2Member];
    newState[3] = [...newState[3], ...gameFinishMember.slice(2, 4)];

    const nextGameMember = newState[3].slice(0, 4);
    newState[coatNo] = nextGameMember;
    [...Array(4)].map(() => newState[3].shift());

    setStateItem(newState.filter(group => group.length));
  }
  function gameEnd2() {
    const coatNo = 1;
    // コートの人数が4人以下の時は試合終了させない
    if (stateItem[coatNo].length < 4) {
      return;
    }

    // 試合が終わった4人を退避
    const gameFinishMember = stateItem[coatNo].slice(0, 4);
    // 待機の末尾2人をコピー
    const waitLast2Member = stateItem[3].slice(stateItem[3].length - 2, stateItem[3].length);

    const newState = [...stateItem];
    // 待機の末尾2人を削除
    [...Array(2)].map(() => newState[3].pop());
    newState[3] = [...newState[3], ...gameFinishMember.slice(0, 2)];
    newState[3] = [...newState[3], ...waitLast2Member];
    newState[3] = [...newState[3], ...gameFinishMember.slice(2, 4)];

    const nextGameMember = newState[3].slice(0, 4);
    newState[coatNo] = nextGameMember;
    [...Array(4)].map(() => newState[3].shift());

    setStateItem(newState.filter(group => group.length));
  }
  function gameEnd3() {
    const coatNo = 2;
    // コートの人数が4人以下の時は試合終了させない
    if (stateItem[coatNo].length < 4) {
      return;
    }

    // 試合が終わった4人を退避
    const gameFinishMember = stateItem[coatNo].slice(0, 4);
    // 待機の末尾2人をコピー
    const waitLast2Member = stateItem[3].slice(stateItem[3].length - 2, stateItem[3].length);

    const newState = [...stateItem];
    // 待機の末尾2人を削除
    [...Array(2)].map(() => newState[3].pop());
    newState[3] = [...newState[3], ...gameFinishMember.slice(0, 2)];
    newState[3] = [...newState[3], ...waitLast2Member];
    newState[3] = [...newState[3], ...gameFinishMember.slice(2, 4)];

    const nextGameMember = newState[3].slice(0, 4);
    newState[coatNo] = nextGameMember;
    [...Array(4)].map(() => newState[3].shift());

    setStateItem(newState.filter(group => group.length));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        <Droppable key={0} droppableId={`${0}`}>
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
              <button type="button" onClick={gameEnd1} style={{ margin: "3px", width: "60px" }}>終了</button>
            </div>
          )}
        </Droppable>
        <Droppable key={1} droppableId={`${1}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              <div>第2コート</div>
              {stateItem[1].map((item, index) => (
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
              <button type="button" onClick={gameEnd2} style={{ margin: "3px", width: "60px" }}>終了</button>
            </div>
          )}
        </Droppable>
        <Droppable key={2} droppableId={`${2}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              <div>第3コート</div>
              {stateItem[2].map((item, index) => (
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
              <button type="button" onClick={gameEnd3} style={{ margin: "3px", width: "60px" }}>終了</button>
            </div>
          )}
        </Droppable>
      </div>
      <div style={{ display: "flex" }}>
        <Droppable key={3} droppableId={`${3}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              <div>順番待ち</div>
              {stateItem[3].map((item, index) => (
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
            </div>
          )}
        </Droppable>
        <Droppable key={4} droppableId={`${4}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              <div>休み</div>
              {stateItem[4].map((item, index) => (
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
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext >
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<QuoteApp />, rootElement);
