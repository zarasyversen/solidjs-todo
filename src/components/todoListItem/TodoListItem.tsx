import { TodoItem } from "../../types/TodoItem";
import './TodoListItem.css';

function TodoListItem(props: {todo: TodoItem, completeItem: (id: number) => void} ) {
  const todo = props.todo;
  const todoDetails = `${todo.updated ? 'Updated' : 'Created'} ${todo.time} ${todo.day}`;
  return (
    <li class="item">
      <div class="item__inner">
        <label class="checkboxLabel">
          <span class="sr-only">Task completed</span>
          {todo.completed && 
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check "><polyline points="20 6 9 17 4 12"></polyline></svg>
          }
          <input
            type="checkbox"
            id={`todo_${todo.id}`}
            class="checkbox"
            onInput={() => {
              props.completeItem(todo.id)
            }}
            checked={todo.completed}
          />
        </label>
        <div class={`details${todo.completed ? ' is-complete' : ''}`} >
          <p>{todo.title}</p>
          <small>
            {todoDetails}
          </small>
        </div>
      </div>
    </li>
  )
}
  
export default TodoListItem;
  