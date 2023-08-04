import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './redux/actions';
import ShowList from './showList/showList'


function App() {
  type todoType = {
    id: number;
    task: string;
    status: boolean;
  }
  const [inputText, setInputText] = useState<string>('');
  // const [text, setText] = useState<todoType[]>([]);
  const [edit, setEdit] = useState({ status: false, currentId: null });
  const dispatch = useDispatch();
  const select = useSelector((state: any) => state.todoItems.todoData);
  const submitData = () => {
    // setText([...select, { id: Number(Date.now()), task: inputText, status: false }]);
    dispatch(addItem([...select, { id: Number(Date.now()), task: inputText, status: false }]));
    setInputText('');
  }
  const checkedChange = (currentId: any) => {
    const newTodo = select.map((obj: todoType) => { 
      if (obj.id === currentId) {
        return { ...obj, status: !obj.status }
      }
      else return obj;
    });
    // setText(newTodo);
    dispatch(addItem(newTodo));
  };
  const editItem = (currentId: any) => {
    select.map((obj: todoType) => {
      if (obj.id === currentId) {
        setInputText(obj.task);
      }
    });
    setEdit({status: true, currentId: currentId});
  }
  const deleteItem = (currentId: any) => {
    // setText(text.filter((obj: any) => currentId !== obj.id ));
    dispatch(addItem(select.filter((obj: any) => currentId !== obj.id)));
  }
  const updateItem = () => { 
    const newTodo = select.map((obj: todoType) => {
      if (obj.id === edit.currentId) {
        return { ...obj, task: inputText, status: false }
      }
      else return obj;
    });
    // setText(newTodo);
    setInputText('');
    setEdit({ status: false, currentId: null });
    dispatch(addItem(newTodo));
  }
  return (
    <div className="App" style={{ marginTop: '30px', textAlign: 'center' }}>
      <input type='text'
        value={inputText}
        onChange={(e)=>setInputText(e.target.value)}
      />
      {edit.status ? <button onClick={updateItem} >Update</button> : <button onClick={submitData} >Add</button>}
      {<ShowList update={checkedChange} edit={editItem} deleteItem={deleteItem} /> }
    </div>
    
  );
}

export default App;
