import React from "react";
import AppHeader from "./components/app-header/app-header";
import SearchPanel from "./components/search-panel/search-panel";
import TodoList from "./components/todo-list/todo-list";
import ItemStatusFilter from "./components/item-status-filter/item-status-filter";
import ItemAddForm from "./components/item-add-form/item-add-form";

import "./App.css";

class App extends React.Component {
  nextId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Create react app"),
      this.createTodoItem("Kiss wife"),
    ],
    searchText: "",
    filterStatus: "all",
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      isDone: false,
      id: this.nextId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };

  addItem = (label) => {
    const newItem = this.createTodoItem(label);
    this.setState(({ todoData }) => ({ todoData: [...todoData, newItem] }));
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "isDone") };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "important") };
    });
  };

  onSearch = (searchInput) => {
    this.setState({ searchText: searchInput });
  };

  onFilterChange = (filterStatus) => {
    this.setState({ filterStatus: filterStatus });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((el) => {
      return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  filter(items, filterStatus) {
    switch (filterStatus) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.isDone);
      case "done":
        return items.filter((item) => item.isDone);
      default:
        return items;
    }
  }

  render() {
    const { todoData, searchText, filterStatus } = this.state;
    const visibleItems = this.filter(
      this.search(todoData, searchText),
      filterStatus
    );
    const doneCount = todoData.filter((el) => el.isDone).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch} searchText={searchText} />
          <ItemStatusFilter
            filter={filterStatus}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}

export default App;
