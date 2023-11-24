import { createSignal } from "solid-js";

function AddTodo(props: { addTodo: (newTitle: string) => void }) {
  const [newTitle, setTitle] = createSignal("");
  const addTodo = (e: SubmitEvent) => {
    e.preventDefault();
    if (newTitle() === "") {
      alert("Please write an item");
      return;
    }
    props.addTodo(newTitle());
    setTitle("");
  };
  return (
    <div class="addTodo">
      <form onSubmit={addTodo} class="addTodoForm">
        <label for="new-todo" class="addTodoForm__label">
          Add a new task
        </label>
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
  );
}

export default AddTodo;
