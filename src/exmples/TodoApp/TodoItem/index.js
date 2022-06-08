import { memo } from "react";

function TodoItem({ id, title, complete, removeTodo, toggleTodo }) {
  return (
    <div className="collection">
      <div className="collection-item">
        <div style={{ textDecoration: complete ? "line-through" : "" }}>
          {title}
          <div className="secondary-content">
            <a href="#!">
              <i className="material-icons right" onClick={() => removeTodo(id)}>
                delete
              </i>
            </a>
            <a href="#!">
              <i className="material-icons right" onClick={() => toggleTodo(id)}>
                {complete ? "clear" : "check"}
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TodoItem);
