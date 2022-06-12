import { useMemo } from "react";

import { makeObservable } from "../../package/simple-mobx/makeObservable";
import { observer } from "../../package/simple-mobx-react";

import { TodoAppModel } from "./model/todoAppMode";
import TodoItem from "./TodoItem";

function TodoApp() {
  const todoAppModel = useMemo(() => makeObservable(new TodoAppModel()), []);
  const value = useMemo(() => makeObservable(""), []);

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
