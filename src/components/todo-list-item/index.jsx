import React from "react";

import "./todo-list-item.css";

class TodoListItem extends React.Component {
  state = {
    isDone: false,
    important: false
  };
  onClickHandler = () => {
    this.setState(({isDone}) => ( {isDone: !isDone} ));
  };
  onMarkImportant = () => {
    this.setState(({important}) => ( {important: !important} ));
  };
  render() {
    const { label, onDeleted } = this.props;
    const {isDone, important} = this.state;

    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal",
    };

    let itemClass = "todo-list-item";
    if(isDone){itemClass += " done"}
    if(important){itemClass += " important"}

    return (
      <span className={itemClass}>
        <span className="todo-list-item-label" style={style} onClick={this.onClickHandler}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={this.onMarkImportant}
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
