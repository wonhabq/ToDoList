import { Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/active" element={<TodoList />} />
      <Route path="/completed" element={<TodoList />} />
    </Routes>
  );
}

export default App;
