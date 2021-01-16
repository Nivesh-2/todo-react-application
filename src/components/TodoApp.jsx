import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TodoComponent from "./TodoComponent";
import AddTodoComponent from "./AddTodoComponent";
import ShowTodos from "./ShowTodos";

class TodoApp extends Component {
  render() {
    return (
      <div>
        <Router>
          <>
            <Switch>
              <Route exact path="/" component={TodoComponent} />
              <Route path="/addTodo/:id" component={AddTodoComponent} />
              <Route path="/show" component={ShowTodos} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default TodoApp;
