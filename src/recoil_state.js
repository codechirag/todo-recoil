import { atom, selector } from 'recoil';

const todoListState = atom({
    key: "todoListState",
    default: []
});

export { todoListState };