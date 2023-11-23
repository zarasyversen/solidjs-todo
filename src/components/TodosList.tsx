import { For, createSignal } from 'solid-js';
import { TodoItem } from '../types/TodoItem';
import { __dateTimeHelper } from '../helpers/DateTimeHelper';
import TodoListItem from './todoListItem/TodoListItem';


function TodosList(props: {
    todos: TodoItem[],
    addTodo: (newTitle: string) => void
    completeTodo: (id: number) => void
  }) {
  const [isSearching, setIsSearching] = createSignal(false);
  const toggleSearch = () => setIsSearching(!isSearching());
  const [noResults, toggleNoResults] = createSignal(false);

  const [newTitle, setTitle] = createSignal("");

  const addTodo = (e: SubmitEvent) => {
    e.preventDefault();
    if (newTitle() === "") {
      alert('Please write an item');
      return; 
    }
    props.addTodo(newTitle());
    setTitle("");
  };

  const completingTodo = (todoId: number) => {
    props.completeTodo(todoId);
  };
 
  return (
    <>
    <div class="topContainer">
      <h2>Tasks</h2>
      <button
        type="button"
        class="button icon-button"
        onClick={toggleSearch}
      >Find</button>
      {isSearching() &&
        <form class="todoSearch">
          <label for="todoSearch" class="sr-only" />
          <input
            type="text"
            class="input-text todoSearchInput"
            id="todoSearch"
            placeholder="Search for task..."
          />
          {noResults() &&
            <p>Sorry, no results. Maybe add a new item?</p>
          }
        </form>
      }
    </div>
      <div class="addTodo" >
        <form onSubmit={addTodo} class="addTodoForm">
          <label for="new-todo" class="addTodoForm__label">Add a new task</label>
          <input
            type="text"
            name="title"
            id="new-todo"
            placeholder="What do you need to do?"
            class="input-text"
            value={newTitle()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
          <button class="button addTodoForm__button"> Add </button>
        </form>
      </div>
      <For each={props.todos}>
        {(todo) => (
          <TodoListItem todo={todo} completeItem={completingTodo} />
        )}
      </For>

    </>
  )
}

export default TodosList;
