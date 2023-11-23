import { Show } from "solid-js";
import { TodoItem } from "../../types/TodoItem";

function Counter(props: {todos: TodoItem[]}) {
    return (
        <Show when={props.todos.length > 0}>
            <p class="counter">
                Hey, you have completed {props.todos.filter((todo: TodoItem) => todo.completed === true).length} of {props.todos.length} tasks!
            </p>
        </Show>
    )
  }
  
  export default Counter;
  