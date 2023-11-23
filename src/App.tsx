import { batch } from 'solid-js';
import './App.css';
import Counter from './components/counter/Counter';
import Header from './components/layout/Header';
import TodosList from './components/TodosList';
import { __dateTimeHelper } from './helpers/DateTimeHelper';
import { TodoItem } from './types/TodoItem';
import { completeTodo, createLocalStore } from './utils/utils';

function App() {
  const [todos, setTodos] = createLocalStore<TodoItem[]>("todos", []);
  
  const completingTodo = (todoId: number) => {
    batch(() => {
      setTodos(completeTodo(todos, todoId));
    });
  };

  const addNewTodo = (newTitle: string) => {
    batch(() => {
      setTodos(todos.length, {
        id: Date.now(),
        title: newTitle,
        completed: false,
        updated: false,
        day: __dateTimeHelper.getCurrentDay(),
        time: __dateTimeHelper.getCurrentTime()
      });

    });
  }

  return (
    <div class="container">
      <div class="inner">
        <div class="inner-top">
          <Header />
          {<Counter todos={todos} /> }
          <TodosList todos={todos} completeTodo={completingTodo} addTodo={addNewTodo}/>
        </div>
      </div>
    </div>
  )
}

export default App;
