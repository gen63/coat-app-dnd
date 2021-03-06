import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as serviceWorker from './serviceWorker';
import EdiText from 'react-editext'
import './index.css'

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `${k + 1 + offset}`
  }));

var stateItemList = [];

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

  padding: 5,
  margin: 5,
  justifyContent: "center",
  border: "1px solid",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  fontWeight: "bold",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 2,
  margin: 2,
  width: "31%",
});

const alignItemsStyle = {
  margin: 2,
  display: "flex",
  justifyContent: "center"
};

const buttonStyle = {
  marginRight: 12,
  marginLeft: 12,
};

function QuoteApp() {
  // getItems = (count, offset = 0)
  const [stateItem, setStateItem] = useState([getItems(4), getItems(4, 4), getItems(4, 8), getItems(6, 12), getItems(7, 18)]);

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

  function undoGameFinish() {
    if (stateItemList.length < 1) {
      return;
    }

    const newState = stateItemList[stateItemList.length - 1].slice();
    stateItemList.pop();
    setStateItem(newState);
  }

  const onSaveName = (val, itemId) => {
    const newState = [...stateItem];
    newState.forEach(state => {
      var findResult = state.find((item) => item.id === itemId);
      if (findResult) {
        findResult.content = val;
      }
    })
    setStateItem(newState);
  }

  const gameFinish = (onClickCoatNo) => {
    // コートの人数が4人以外の時は試合終了させない
    if (stateItem[onClickCoatNo].length !== 4) {
      return;
    }

    // ゲーム終了時にオートセーブ
    storageSave()

    // シャローコピー回避のためstateItemListの中身を一つずつ退避
    const a = [];
    stateItem.map((item) => a.push([].concat(item)));
    stateItemList.push(a);

    // 試合が終わった4人を退避
    const gameFinishMember = stateItem[onClickCoatNo].slice(0, 4);
    // 待機の末尾にいるメンバーを退避 1 or 2
    const j = stateItemList.length % 2;
    const waitLastMember = stateItem[3].slice(stateItem[3].length - (j + 1), stateItem[3].length);

    const newState = [...stateItem];
    // 待機の末尾2人を削除
    [...Array(j + 1)].map(() => newState[3].pop());
    newState[3] = [...newState[3], ...gameFinishMember.slice(0, 1)];
    newState[3] = [...newState[3], ...gameFinishMember.slice(2, 3)];
    newState[3] = [...newState[3], ...waitLastMember];
    newState[3] = [...newState[3], ...gameFinishMember.slice(1, 2)];
    newState[3] = [...newState[3], ...gameFinishMember.slice(3, 4)];

    const nextGameMember = newState[3].slice(0, 4);
    newState[onClickCoatNo] = nextGameMember;
    [...Array(4)].map(() => newState[3].shift());

    setStateItem(newState.filter(group => group.length));
  }

  function storageSave() {
    localStorage.setItem("stateItem", JSON.stringify(stateItem));
    localStorage.setItem("stateItemList", JSON.stringify(stateItemList));
  }

  function storageLoad() {
    const stateItem = JSON.parse(localStorage.getItem("stateItem"));
    const localStateItemList = JSON.parse(localStorage.getItem("stateItemList"));
    if (!stateItem || !localStateItemList) {
      return;
    }

    setStateItem(stateItem.filter(group => group.length));
    stateItemList = localStateItemList;
  }

  function editableText(item) {
    return <EdiText
      type='text'
      onSave={value => onSaveName(value, item.id)}
      value={item.content}
      editOnViewClick={true}
      hideIcons={true}
      submitOnUnfocus
      submitOnEnter
      viewProps={{
        style: {
          width: "4em",
          height: "1em",
        }
      }}
      inputProps={{
        style: {
          fontSize: 16
        }
      }}
      editButtonClassName="custom-edit-button-hidden"
      saveButtonClassName="custom-edit-button-hidden"
      cancelButtonClassName="custom-edit-button-hidden"
      viewContainerClassName='view-container'
      validation={val => (val.length > 0 && val.length < 6)}
      validationMessage="1-5文字を許容"
    />;
  }

  var droppableCoatList = [];
  [...Array(3)].map((_, i) =>
    droppableCoatList.push(
      <Droppable key={i} droppableId={`${i}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            第{i + 1}コート
            {stateItem[i].map((item, index) => (
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
                      {editableText(item)}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button type="button" style={{ height: 40, width: "100%" }} onClick={() => gameFinish(i)}>終了</button>
          </div>
        )}
      </Droppable>
    )
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div style={alignItemsStyle}>
          {droppableCoatList}
        </div>
        <div style={alignItemsStyle}>
          <Droppable key={3} droppableId={`${3}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                順番待ち
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
                          {editableText(item)}
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
                休み
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
                          {editableText(item)}
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
        <div style={alignItemsStyle}>
          {stateItemList.length}ゲーム終了
          <button type="button" onClick={undoGameFinish} style={buttonStyle}>Ctrl+Z</button>
          <button type="button" onClick={storageSave} style={buttonStyle}>Save</button>
          <button type="button" onClick={storageLoad} style={buttonStyle}>Load</button>
        </div>
      </div>
    </DragDropContext >
  );
}

ReactDOM.render(<QuoteApp />, document.getElementById("root"));
serviceWorker.register();
