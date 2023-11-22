import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { TodoItem } from "../types/TodoItem";

export function createLocalStore<T extends object>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init
  );
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
  return [state, setState];
}

export function removeIndex<T>(array: readonly T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function completeTodo(todos: readonly TodoItem[], id: number): TodoItem[] {
  return todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed
      };
    }
    return todo;
  });
}
