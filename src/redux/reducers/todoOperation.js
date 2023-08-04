const initialState = {
    todoData: [],
};

export default function todoItems(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        todoData: action.data,
      }
    default:
      return state;
  }
}
