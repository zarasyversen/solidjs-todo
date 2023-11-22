import './App.css';
import Header from './components/layout/Header';
import TodosList from './components/TodosList';

function App() {

  return (
    <div class="container">
      <div class="inner">
        <div class="inner-top">
          <Header />
          <TodosList />
        </div>
      </div>
    </div>
  )
}

export default App;
