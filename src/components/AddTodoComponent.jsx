import React, { Component } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import TodoService from "../model/todo.js";
import HeaderComponent from "./HeaderComponent";

class AddTodoComponent extends Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      description: "",
      target: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.moveToHome = this.moveToHome.bind(this);
    this.submit = this.submit.bind(this);
    this.loadState = this.loadState.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id === -1) {
      return;
    }
    this.loadState(id);
  }

  loadState(id) {
    this.setState(TodoService.featchById(id));
  }

  moveToHome() {
    this.props.history.push("/");
  }

  validate(value) {
    let error = {};
    //console.log(value)
    if (!value.description) {
      error.description = "Write some description";
    }
    if (!moment(value.target).isValid()) {
      error.target = "Provide Target Date";
    }

    return error;
  }

  submit(value) {
    //console.log(typeof value.target);
    if (this.state.id === -1) {
      const todo = new TodoService(null, value.description, value.target);
      todo
        .addTodo()
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
      this.props.history.push("/");
    } else {
      let todo = new TodoService(
        this.state.id,
        value.description,
        value.target
      );
      todo.updateTodo();
      this.props.history.push("/");
    }
  }

  render() {
    let target = this.state.target;
    let description = this.state.description;
    console.log(target);
    return (
      <>
        <HeaderComponent title="Home" Clicked={this.moveToHome} />
        <div className="container cont">
          <Formik
            initialValues={{ description: description, target: target }}
            validate={this.validate}
            onSubmit={this.submit}
            enableReinitialize={true}
          >
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="target"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="target">Target Date</label>
                <Field
                  type="date"
                  className="form-control"
                  name="target"
                ></Field>
              </fieldset>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

export default AddTodoComponent;
