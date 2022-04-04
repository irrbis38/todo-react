import React from "react";

import "./search-panel.css";

class SearchPanel extends React.Component {
  state = {
    searchText: "",
  };

  onSearch = (e) => {
    this.setState({ searchText: e.target.value });
    this.props.onSearch(e.target.value);
  };

  render() {
    return (
      <input
        placeholder="search"
        className="form-control search-input"
        onChange={this.onSearch}
        value={this.state.searchText}
      />
    );
  }
}

export default SearchPanel;
