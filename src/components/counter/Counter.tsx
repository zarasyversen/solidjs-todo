import { Show } from "solid-js";
import { TodoItem } from "../../types/TodoItem";

function Counter(props: {todos: TodoItem[]}) {
    const completedTodos = (() => props.todos.filter((todo: TodoItem) => todo.completed === true).length);
    return (
        <Show when={props.todos.length > 0}>
            <p class="counter">
                Hey, you have completed {completedTodos()} of {props.todos.length} tasks!
            </p>
        </Show>
    )
  }
  
  export default Counter;
  