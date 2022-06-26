import { Link, Route, Routes } from "react-router-dom";

import "./App.css";

import Counter from "./exmples/Counter";
import TodoApp from "./exmples/TodoApp";

function App() {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/counter">Counter example</Link>
            </li>
            <li>
              <Link to="/todo">Todo example</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
