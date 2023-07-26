import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoListState } from "../recoil_state";
const TodoList = () => {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState({ status: false, currentId: null });
  const todo = useRecoilValue(todoListState);
  const setTodo = useSetRecoilState(todoListState);
  const setTodoData = (e) => {
    setText(e.target.value);
  };
  const addItem = () => {
    setTodo([...todo, { task: text, id: Date.now(), status: false }]);
    setText("");
  };
  const editItem = (currentId) => {
    todo.map((obj) => {
      if (obj.id === currentId) {
        setText(obj.task);
        setEdit({ status: true, currentId: currentId });
      }
    });
  };
  console.log("currentid state value", edit.currentId);
  const checkedChange = (currentId) => {
    const newTodo = todo.map((obj) => {
      if (obj.id === currentId) {
        return { ...obj, status: !obj.status };
      }
      return obj;
    });
    setTodo(newTodo);
  };
  const updateItem = () => {
    const newTodo = todo.map((obj) => {
      if (obj.id === edit.currentId) {
        return { ...obj, task: text, status: false };
      } else return obj;
    });
    setTodo(newTodo);

    setText("");
    setEdit(false, { currentId: null });
  };
  const deleteItem = (e) => {
    setTodo(todo.filter((value) => value.id !== e));
  };
  return (
    <div>
      <input
        className=""
        type="text"
        value={text}
        onChange={(e) => setTodoData(e)}
      />
      {edit.status ? (
        <button onClick={() => updateItem()}>Update</button>
      ) : (
        <button onClick={addItem}>Add</button>
      )}
      <div className="mt-10">
        {todo.map((value) => {
          return (
            <div key={value.id}>
              <span className={` task-title ${value.status && "strike"} `}>
                {value.task}
              </span>
              <input
                type="checkbox"
                className="task-check"
                name={value.task + value.id}
                checked={value.status}
                onChange={() => checkedChange(value.id)}
              />
              <button className="edit" onClick={() => editItem(value.id)}>
                edit
              </button>
              <button className="delete" onClick={() => deleteItem(value.id)}>
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
