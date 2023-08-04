import { useSelector } from 'react-redux';
type todoType = { //root type object of array
  update: (val: number) => void
  edit: (val: number) => void
  deleteItem: (val: number) => void
}
// type todoTypeObj = { //sub type object 
//   id: number;
//   task: string;
//   status: boolean;
// }

const ShowList = ({ update, edit, deleteItem }: todoType) => {
  const select = useSelector((state: any) => state.todoItems.todoData);
  return (
    <div style={{marginTop: '50px'}}>
      {select.map((value: any) => {
        return (
          <div key={value.id}>
            <span className={`task-title ${value.status ? "strike" : "" } `}>
              {value.task}
            </span>
            <input
              type="checkbox"
              className="task-check"
              name={value.task + value.id}
              checked={value.status}
              onChange={() => update(value.id)}
            />
            <button className="edit"
              onClick={() => edit(value.id)}
            >
              edit
            </button>
            <button className="delete"
              onClick={() => deleteItem(value.id)}
            >
              delete
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ShowList