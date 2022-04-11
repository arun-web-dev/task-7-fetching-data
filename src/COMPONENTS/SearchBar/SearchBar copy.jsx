import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";

export default class SearchBar extends Component {
  state = {
    searchKey: "",
  };
  searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.searchKey);
  };
  render() {
    return (
      <div className="w-100">
        <form onSubmit={this.searchSubmitHandler} className="flex">
          <div>
            <button>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="f3 search-icon"
              />
            </button>
          </div>
          <div className="w-100">
            <input
              className="input input-rest w-100 pa2"
              type="text"
              onChange={(e) => {
                this.setState({
                  searchKey: e.target.value,
                });
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}
