import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  type todoType = {
    id: number;
    task: string | null;
    status: boolean;
  }
  const [text, setText] = useState<any>('');
  const [todoData, setTodoData] = useState<todoType[]>([]);
  const [edit, setEdit] = useState<{ currentId: todoType | null, status: boolean }>();
  const addItem = () => {
    setTodoData([...todoData, { id: Date.now(), task: text, status: false }]);
    setText('');
  }
  const markDone = (value: todoType) => {
    const newTodo = todoData.map((obj) => {
      if (obj.id === value.id) {
        return { ...obj, status: !value.status }
      }
      else return obj;
    });
    setTodoData(newTodo);
  }
  const editItem = (e: todoType) => {
    todoData.map((obj: todoType) => {
      if (obj.id === e.id) {
        setText(obj.task);
        setEdit({ currentId: e, status: true });
      }
    });
  }
  const deleteItem = (value: todoType) => {
    setTodoData(todoData.filter((obj: todoType) => obj.id !== value.id));
  }
  const updateItem = () => {
    const newTodo = todoData.map((obj: todoType) => {
      if (obj.id === edit?.currentId?.id) {
        return { ...obj, task: text, status: false }
      }
      else return obj;
    });
    setTodoData(newTodo);
    setEdit({ currentId: null, status: false });
    setText('');
  }
  const myState = useSelector((state: any) => state.todoData);
  return (
    <div className="App" style={{ marginTop: '30px', textAlign: 'center' }}>
      <input type='text' onChange={(e) => setText(e.target.value)} value={text} />
      {edit?.status ? <button onClick={updateItem}>Update</button> : <button onClick={addItem}>Add</button>}
      <div className='dataWrapper' style={{ maxWidth: '500px', margin: '40px auto 0' }}>
        <h2>Todo List</h2>
        {myState.map((value:any) => {
          return (
            <div className={`todo-task ${value.status ? 'strike' : ''}`} style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }} key={value.id}>
              <input type='checkbox' onChange={() => markDone(value)} /><span>{value.task}</span>
              <button onClick={() => editItem(value)}>Edit</button>
              <button onClick={() => deleteItem(value)}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
