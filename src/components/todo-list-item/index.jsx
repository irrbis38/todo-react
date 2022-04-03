import React from "react";

import "./todo-list-item.css";

class TodoListItem extends React.Component {
  render() {
    const { label, onDeleted, onToggleImportant, onToggleDone, isDone, important } = this.props;

    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal",
    };

    let itemClass = "todo-list-item";
    if(isDone){itemClass += " done"}
    if(important){itemClass += " important"}

    return (
      <span className={itemClass}>
        <span className="todo-list-item-label" style={style} onClick={onToggleDone}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

export default TodoListItem;
