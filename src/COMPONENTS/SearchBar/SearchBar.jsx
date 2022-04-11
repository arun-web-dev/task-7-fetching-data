import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";

export default class SearchBar extends Component {
  state = {
    value: "",
  };
  searchFilterHandler = this.props.searchFilterHandler;

  searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.value);
  };

  onSearchHandler = (e) => {
    this.searchFilterHandler(e.target.value);
  };
  render() {
    return (
      <div className="w-100">
        <form onSubmit={this.searchSubmitHandler} className="flex search-form">
          <div className="w-100">
            <input
              className="input input-rest w-100 pv2 ph4 search-input code shadow-1"
              type="text"
              placeholder="Search for products..."
              onChange={this.onSearchHandler}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="f3 search-icon"
            />
          </div>
        </form>
      </div>
    );
  }
}
