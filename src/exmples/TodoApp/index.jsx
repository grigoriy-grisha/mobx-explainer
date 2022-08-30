import { useMemo } from "react";

import { observer } from "../../package/simple-mobx-react";
import { observableObject, observableValue } from "../../package/simple-mobx";

import { TodoAppModel } from "./model/todoAppMode";
import TodoItem from "./TodoItem";

function TodoApp() {
  const todoAppModel = useMemo(() => observableObject(new TodoAppModel()), []);
  const value = useMemo(() => observableValue(""), []);

  return (
    <div style={{ padding: 20 }}>
      <input type="text" value={value.get()} onChange={(e) => value.set(e.target.value)} />
      <button
        className="btn waves-effect waves-light"
        name="action"
        onClick={() => {
          todoAppModel.addTodo(value.get());
          value.set("");
        }}
      >
        Submit
        <i className="material-icons right">send</i>
      </button>

      <div>
        {todoAppModel.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            complete={todo.complete}
            title={todo.title}
            removeTodo={() => todoAppModel.removeTodo(todo.id)}
            toggleTodo={() => todoAppModel.toggleTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default observer(TodoApp);
