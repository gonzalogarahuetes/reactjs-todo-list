import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

// import img from "./img/header-light-mode-background-image.jpeg";
import DarkMode from "./components/DarkMode";
import "./main.scss";
import NewTodo from "./components/NewTodo";
import Footer from "./components/Footer/Footer";
import bgLightImg from "./img/header-light-mode-background-image.jpeg";
import Completed from "./components/Completed/Completed";
import Home from "./components/Home/Home";
import Active from "./components/Active/Active";

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

      lightmode: true,
      value: "",
    };
    this.saveNewTasks = this.saveNewTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.handleDarkMode = this.handleDarkMode.bind(this);
    this.willEnter = this.willEnter.bind(this);
    this.willLeave = this.willLeave.bind(this);
  }
  handleDarkMode() {
    const { lightmode } = this.state;

    if (lightmode) {
      this.setState({ lightmode: false });
      document.getElementById("bg-top").src = bgDarkImg;
      document.querySelector(".new__task").classList.toggle("dark-mode");
      document.querySelector(".new__task--input").classList.toggle("dark-mode");
      document.querySelector(".todo__body").classList.toggle("dark-mode");
      document
        .querySelector(".background--bottom")
        .classList.toggle("dark-mode");
      document.querySelectorAll(".todo__remove").forEach((element) => {
        element.classList.toggle("dark-mode");
      });
      document.querySelectorAll(".todo__check").forEach((element) => {
        element.classList.toggle("dark-mode");
      });
    } else {
      this.setState({ lightmode: true });
      document.getElementById("bg-top").src = bgLightImg;
      document.querySelector(".new__task").classList.toggle("dark-mode");
      document.querySelector(".new__task--input").classList.toggle("dark-mode");
      document.querySelector(".todo__body").classList.toggle("dark-mode");
      document
        .querySelector(".background--bottom")
        .classList.toggle("dark-mode");
      document.querySelectorAll(".todo__remove").forEach((element) => {
        element.classList.toggle("dark-mode");
      });
      document.querySelectorAll(".todo__check").forEach((element) => {
        element.classList.toggle("dark-mode");
      });
    }
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

  // Animation methods

  getDefaultStyles = () => {
    return this.state.tasks.map((task) => ({
      ...task,
      style: { height: 0, opacity: 1 },
    }));
  };

  getStyles = () => {
    const { tasks, value } = this.state;
    return tasks
      .filter(({ text }) => {
        return text.toUpperCase().indexOf(value.toUpperCase()) >= 0;
      })
      .map((todo) => {
        return {
          ...todo,
          style: {
            height: spring(60, presets.gentle),
            opacity: spring(1, presets.gentle),
          },
        };
      });
  };

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    };
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    };
  }

  render() {
    const { lightmode } = this.props;
    const { tasks, activeTasks } = this.state;

    return (
      <Router>
        <div className="background">
          <div className="background--top">
            <img
              id="bg-top"
              src={lightmode ? bgDarkImg : bgLightImg}
              alt="bg-img"
            />
          </div>
          <div className="background--bottom" />
        </div>
        <main className="main">
          <header className="main--header">
            <h1>TODOS</h1> <DarkMode />
          </header>
          <section className="main__window">
            <div>
              <NewTodo
                saveNewTasks={this.saveNewTasks}
                getStyles={this.getStyles}
              />
            </div>
            <div className="todo__body">
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
                        defaultStyles={this.getDefaultStyles()}
                        styles={this.getStyles()}
                        willLeave={this.willLeave}
                        willEnter={this.willEnter}
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
