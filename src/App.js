import { RecoilRoot } from 'recoil';
import TodoList from './TodoList/TodoList';

function App() {

  return (
    <div className="text-center">
      <h1>Todo list</h1>
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

export default App;
