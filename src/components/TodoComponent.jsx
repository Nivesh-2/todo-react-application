import React, { Component } from "react";
import TodoService from "../model/todo.js";
import HeaderComponent from "./HeaderComponent";

class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };

    this.moveToAddTodo = this.moveToAddTodo.bind(this);
    this.loadState = this.loadState.bind(this);
  }

  componentDidMount() {
    this.loadState();
  }

  loadState() {
    this.setState({ todos: TodoService.featchAll() });
  }

  moveToAddTodo() {
    this.props.history.push("/addTodo/-1");
  }

  onDelete(id) {
    TodoService.deleteById(id);
    this.loadState();
  }

  onUpdate(id) {
    this.props.history.push(`/addTodo/${id}`);
  }

  render() {
    const todos = this.state.todos.map((todo) => {
      return (
        <tr key={todo.id}>
          <td>{todo.description}</td>
          <td>{todo.target}</td>
          <td>
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.onDelete(todo.id)}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              className="btn btn-outline-info"
              onClick={() => this.onUpdate(todo.id)}
            >
              Update
            </button>
          </td>
        </tr>
      );
    });

    return (
      <>
        <HeaderComponent title="Add Todo" Clicked={this.moveToAddTodo} />
        <div className="container cont">
          {this.state.todos.length > 0 && <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Target Date</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>{todos}</tbody>
          </table>}
          {this.state.todos.length <= 0 && <h3>Add Todos ... </h3>}
        </div>
      </>
    );
  }
}

export default TodoComponent;