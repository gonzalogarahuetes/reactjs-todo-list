import React, { Component } from "react";

import "./NewTodo.scss";

export default class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeHolder: "Add New Todo...",
      title: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { saveNewTasks } = this.props;
    const { title } = this.state;

    let retrieve = JSON.parse(localStorage.getItem(`list`));

    // if there is no data then make it an empty array, to be able to push data in array afterwards

    if (retrieve === null) {
      retrieve = [];
    }

    const todoTask = {
      title: title,
      isFinished: false,
      id: Math.floor(Math.random() * 1000000),
      isEditing: false,
    };

    e.target.reset();
    retrieve.push(todoTask);
    localStorage.setItem(`list`, JSON.stringify(retrieve));

    const filteredRetrieve = retrieve.filter((el) => el.isFinished === false);

    saveNewTasks(retrieve, filteredRetrieve);
  }

  render() {
    const { placeHolder } = this.state;
    const { isDark } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={"new__task" + (isDark ? " dark-mode" : "")}>
          <span className="new__task--circle" />
          <input
            type="text"
            placeholder={placeHolder}
            onChange={this.handleChange}
            required
            className={"new__task--input" + (isDark ? " dark-mode" : "")}
          />
          <button type="submit" className="new__task--btn">
            ↵
          </button>
        </div>
      </form>
    );
  }
}
