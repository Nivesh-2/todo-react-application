import React, { Component } from "react";
import TodoService from "../model/todo.js";
import HeaderComponent from "./HeaderComponent";
import moment from "moment";

class ShowTodos extends Component {
  constructor() {
    super();
    this.state = {
      completed: [
        { id: "1231", description: "Dance", target: "2021-01-16" },
        { id: "1t64", description: "Sleep", target: "2021-01-16" },
        { id: "564", description: "Wake Up", target: "2021-01-16" },
        { id: "756", description: "Sleep again", target: "2021-01-16" },
      ],
      today: [
        { id: "08", description: "Swim", target: "2021-01-16" },
        {
          id: "af213",
          description:
            "Assignment of BioCHemicaalksdjfan kjdafnklasfllkhjakljf",
          target: "2021-01-16",
        },
        { id: "34k", description: "Resume", target: "2021-01-16" },
      ],
      upcoming: [
        { id: "2342kj", description: "Run", target: "2021-01-16" },
        { id: "231j", description: "Dance", target: "2021-01-16" },
        { id: "756j", description: "Code", target: "2021-01-16" },
      ],
    };
    this.moveToHome = this.moveToHome.bind(this);
  }

  componentDidMount() {
    let date = moment(new Date()).format("YYYY-MM-DD");
    // console.log(date);
    let cls = TodoService.classifyTodos(date);
    this.setState({
      today: cls.due,
      upcoming: cls.upcoming,
      completed: cls.completed,
    });
  }

  moveToHome() {
    this.props.history.push("/");
  }

  render() {
    let prev = this.state.completed.map((todo) => {
      return (
        <tr key={todo.id}>
          <td>{todo.description}</td>
          <td>{todo.target}</td>
        </tr>
      );
    });

    let today = this.state.today.map((todo) => {
      return (
        <tr key={todo.id}>
          <td>{todo.description}</td>
          <td>{todo.target}</td>
        </tr>
      );
    });

    let upcoming = this.state.upcoming.map((todo) => {
      return (
        <tr key={todo.id}>
          <td>{todo.description}</td>
          <td>{todo.target}</td>
        </tr>
      );
    });

    return (
      <>
        <HeaderComponent title="Home" Clicked={this.moveToHome} />
        <div className="Todo-list-main-div">
          <div className="Person">
            <h1>Due Today</h1>
            {this.state.today.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Target Date</th>
                  </tr>
                </thead>
                <tbody>{today}</tbody>
              </table>
            )}
            {this.state.today.length <= 0 && <p>Add Todos...</p>}
          </div>
          <div className="Person">
            <h1>Upcoming</h1>
            {this.state.upcoming.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Target Date</th>
                  </tr>
                </thead>
                <tbody>{upcoming}</tbody>
              </table>
            )}
            {this.state.upcoming.length <= 0 && <p>Add Todos...</p>}
          </div>
          <div className="Person">
            <h1>Completed</h1>
            {this.state.completed.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Target Date</th>
                  </tr>
                </thead>
                <tbody>{prev}</tbody>
              </table>
            )}
            {this.state.completed.length <= 0 && <p>Add Todos...</p>}
          </div>
        </div>
      </>
    );
  }
}

export default ShowTodos;
