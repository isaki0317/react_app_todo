import React, { useReducer, useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  //stateに定義して利便性を上げる
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //inputに入力された値をsetTodoTextにセット
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    //未完了TODOリストに入力された値を追加して変数に格納
    const newTodos = [...incompleteTodos, todoText];
    //set関数を実行して、画面をレンダリングして値を追加
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  //削除ボタンが押された時の実行処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //spliceで何番目の要素を、いくつ削除するか指定
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //完了ボタンが押された時の実行処理
  const onClickComplete = (index) => {
    //未完了リストから削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    //完成リストに値を追加して変数に格納
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    //それぞれをset関数を呼んで更新
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻すボタンが押された時の実行処理
  const onClickBack = (index) => {
    //完了リストから削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    //未完了リストに値を追加して変数に格納
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    //set関数を呼んで更新
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {/* stateに定義したアロー関数をmapで分割して取り出し、
          map等でレンダリングする際はkeyを定義する*/}
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                {/* 引数を定義する場合はアロー関数を宣言する */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
