import React, { Component } from "react";

import TodoListCompleted from "../TodoListCompleted/TodoListCompleted";
import NoTodo from "../NoTodo/NoTodo";

export default class Completed extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      tasks,
      removeTask,
      completeTask,
      editTask,
      changeTitle,
      defaultStyles,
      getStyles,
      willLeave,
      willEnter,
    } = this.props;
    const finished = (el) => el.isFinished === true;
    return (
      <>
        {tasks.some(finished) ? (
          <TodoListCompleted
            defaultStyles={defaultStyles}
            styles={getStyles}
            willEnter={willEnter}
            willLeave={willLeave}
            tasks={tasks}
            removeTask={removeTask}
            completeTask={completeTask}
            editTask={editTask}
            changeTitle={changeTitle}
          />
        ) : (
          <NoTodo />
        )}
      </>
    );
  }
}
