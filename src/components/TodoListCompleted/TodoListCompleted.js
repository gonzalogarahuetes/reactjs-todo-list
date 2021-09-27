import React, { Component } from "react";

import Todo from "../Todo/Todo";
import { Droppable } from "react-beautiful-dnd";
import { TransitionMotion } from "react-motion";

export default class TodoListComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      // tasks,
      removeTask,
      completeTask,
      changeTitle,
      editTask,
      defaultStyles,
      styles,
      willEnter,
      willLeave,
    } = this.props;
    const filteredArr = styles.filter((item) => item.isFinished === true);
    return (
      <TransitionMotion
        defaultStyles={defaultStyles}
        styles={styles}
        willEnter={willEnter}
        willLeave={willLeave}
      >
        <Droppable droppableId="active">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="item__list"
            >
              {filteredArr.map((item, index) => {
                return (
                  <Todo
                    index={index}
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    isFinished={item.isFinished}
                    isEditing={item.isEditing}
                    removeTask={removeTask}
                    completeTask={completeTask}
                    changeTitle={changeTitle}
                    editTask={editTask}
                  />
                );
              })}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </TransitionMotion>
    );
  }
}
