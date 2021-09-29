import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import DarkMode from "./components/DarkMode";
import "./main.scss";
import NewTodo from "./components/NewTodo";
import Footer from "./components/Footer/Footer";
import bgLightImg from "./img/header-light-mode-background-image.jpeg";
import bgDarkImg from "./img/header-dark-mode-background-image.jpeg";
import Completed from "./components/Completed/Completed";
import Home from "./components/Home/Home";
import Active from "./components/Active/Active";
import darkImg from "./img/DarkMode.svg";

import lightImg from "./img/lightMode.svg";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: localStorage.getItem(`list`)
        ? JSON.parse(localStorage.getItem(`list`))
        : [],
      activeTasks: localStorage.getItem(`list`)
        ? JSON.parse(localStorage.getItem(`list`)).filter(
            (el) => el.isFinished === false,
          )
        : [],

      isDark: false,
    };
    this.saveNewTasks = this.saveNewTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.handleDarkMode = this.handleDarkMode.bind(this);
  }

  handleDarkMode() {
    const { isDark } = this.state;

    this.setState({
      isDark: !isDark,
    });
  }
  saveNewTasks(tasks, activeTasks) {
    this.setState({
      tasks: tasks,
      activeTasks: activeTasks,
    });
  }

  editTask(id) {
    const { tasks } = this.state;
    tasks.map((el) =>
      el.id == parseInt(id) ? (el.isEditing = !el.isEditing) : null,
    );
    localStorage.setItem(`list`, JSON.stringify(tasks)),
      this.setState({
        tasks: tasks,
        activeTasks: tasks.filter((el) => el.isFinished === false),
      });
  }

  changeTitle(task) {
    const { tasks } = this.state;
    tasks.map((el) => {
      if (el.id === parseInt(task.id)) el.title = task.value;
    });
    this.setState({
      tasks: tasks,
      activeTasks: tasks.filter((el) => el.isFinished === false),
    });
  }

  clearCompletedTasks() {
    const { tasks } = this.state;
    const retrieve = tasks.filter((el) => el.isFinished === false);
    localStorage.setItem(`list`, JSON.stringify(retrieve));
    this.setState({
      tasks: retrieve,
    });
  }

  completeTask(id) {
    const { tasks } = this.state;
    tasks.map((el) => {
      if (el.id === parseInt(id)) {
        el.isFinished = !el.isFinished;
      }
    });
    localStorage.setItem(`list`, JSON.stringify(tasks)),
      this.setState({
        tasks: tasks,
        activeTasks: tasks.filter((el) => el.isFinished === false),
      });
  }

  removeTask(id) {
    const { tasks } = this.state;
    const retrieve = tasks.filter((el) => el.id !== parseInt(id));
    localStorage.setItem(`list`, JSON.stringify(retrieve));
    this.setState({
      tasks: retrieve,
    });
  }

  render() {
    const { isDark, handleDarkMode } = this.state;
    const { tasks, activeTasks } = this.state;

    return (
      <Router>
        <div className="background">
          <div className="background--top">
            <img
              id="bg-top"
              src={isDark ? bgDarkImg : bgLightImg}
              alt="bg-img"
            />
          </div>
          <div
            className={"background--bottom" + (isDark ? " dark-mode" : "")}
          />
        </div>
        <main className="main">
          <header className="main--header">
            <h1>TODOS</h1>
            <button type="button" onClick={this.handleDarkMode}>
              <img src={isDark ? lightImg : darkImg} alt="" />
            </button>
          </header>
          <section className="main__window">
            <div>
              <NewTodo saveNewTasks={this.saveNewTasks} isDark={isDark} />
            </div>
            <div className={"todo__body" + (isDark ? " dark-mode" : "")}>
              <DragDropContext
                onDragEnd={(result) => {
                  const { source, destination } = result;
                  if (!destination) return;

                  if (
                    source.index === destination.index &&
                    source.droppableId === destination.droppableId
                  )
                    return;
                  this.setState({
                    tasks: reorder(tasks, source.index, destination.index),
                  });
                }}
              >
                <div id="todo-list">
                  <Switch>
                    <Route path="/completed">
                      <Completed
                        tasks={tasks}
                        completeTask={this.completeTask}
                        removeTask={this.removeTask}
                        editTask={this.editTask}
                        changeTitle={this.changeTitle}
                      />
                    </Route>
                    <Route path="/active">
                      <Active
                        tasks={tasks}
                        completeTask={this.completeTask}
                        removeTask={this.removeTask}
                        editTask={this.editTask}
                        changeTitle={this.changeTitle}
                      />
                    </Route>
                    <Route path="/">
                      <Home
                        tasks={tasks}
                        completeTask={this.completeTask}
                        removeTask={this.removeTask}
                        editTask={this.editTask}
                        changeTitle={this.changeTitle}
                      />
                    </Route>
                  </Switch>
                </div>
              </DragDropContext>
              <Footer
                activeTasks={activeTasks}
                clearCompletedTasks={this.clearCompletedTasks}
              />
            </div>
          </section>
        </main>
      </Router>
    );
  }
}

export default App;
