import { For, createSignal } from 'solid-js';
import { TodoItem } from '../types/TodoItem';
import { __dateTimeHelper } from '../helpers/DateTimeHelper';
import TodoListItem from './todoListItem/TodoListItem';


function TodosList(props: {
    todos: TodoItem[],
    addTodo: (newTitle: string) => void
    completeTodo: (id: number) => void
  }) {
  
  const [filteredTodos, setFilteredTodos] = createSignal(props.todos);
  const [isSearching, setIsSearching] = createSignal(false);
  const [noResults, setNoResults] = createSignal(false);
  const toggleSearch = () => {
    setIsSearching(!isSearching());
    setFilteredTodos(props.todos);
    setNoResults(false);
  };

  const searchTodos = (searchString: string) => {
    const searchTerm = searchString;
    if (searchTerm !== '') {
      const matchedTodos = props.todos.filter((item) => {
        return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });

      if (matchedTodos.length > 0) {
        setFilteredTodos(matchedTodos);
        setNoResults(false);
      } else {
        setFilteredTodos([]);
        setNoResults(true);
      }
    } else {
      setFilteredTodos(props.todos);
      setNoResults(false);
    }
  };

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
              onInput={(e) => searchTodos(e.currentTarget.value)}
              placeholder="Search for task..."
            />
            {noResults() &&
              <p>Sorry, no results. Maybe add a new item?</p>
            }
          </form>
        }
      </div>
      <ul>
        <For each={filteredTodos()}>
          {(todo) => (
            <TodoListItem todo={todo} completeItem={completingTodo} />
          )}
        </For>
      </ul>
    </>
  )
}

export default TodosList;
