/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import react, { useState } from "react";
import { Button, Container, Form, Nav, Tab } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoList.css";

import { useTranslation } from "react-i18next";
import Languages from "./Languages";
import "./i18n.js";

const formatDate = () => {
  const date = new Date();
  const day = date.getDate() + 3;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Todolist = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [activeKey, setActiveKey] = useState("all");
  const [listTodo, setListTodo] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [sortBy, setSortBy] = useState("0");

  const sortTodos = (todosToSort) => {
    switch (sortBy) {
      case "1":
        return todosSort.sort((a, b) => a.text.localeCompare(b.text));
      case "2":
        return todosSort.sort((a, b) => b.text.localeCompare(a.text));

      default:
        return todosToSort;
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedTodos = sortTodos([...listTodo]);

  const handleTabSelect = (key) => {
    setActiveKey(key);
  };

  const centerTabsStyle = {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  };

  const rightTabPaneStyle = {
    maxWidth: "600px",
  };

  const marginInput = {
    margin: "20px 0",
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const listItemStyle = {
    margin: "10px 0",
  };

  const checkboxStyle = {
    margin: "0 5px 0 0",
  };

  const deleteButtonStyle = {
    margin: "10px 0 0 5px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const handleAddTask = () => {
    if (taskText) {
      const newTask = {
        text: taskText,
        status: activeKey === "complete" ? "complete" : "active",
        date: formatDate(),
      };
      setListTodo([...listTodo, newTask]);
      setTaskText("");
      localStorage.setItem("listTodo", JSON.stringify([...listTodo, newTask]));
      Swal.fire("Success", "Task added successfully!", "success");
    }
  };

  const toggleTaskStatus = (index) => {
    const updatedList = [...listTodo];
    updatedList[index].status =
      updatedList[index].status === "complete" ? "active" : "complete";
    setListTodo(updatedList);
  };

  const handleDeleteTask = (index) => {
    // Show a SweetAlert confirmation modal
    Swal.fire({
      title: "Delete Task",
      text: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = [...listTodo];
        updatedList.splice(index, 1);
        setListTodo(updatedList);
        localStorage.setItem("listTodo", JSON.stringify(updatedList));
      }
    });
  };

  return (
    <div style={centerTabsStyle}>
      <Container style={rightTabPaneStyle}>
        <Languages changeLanguage={changeLanguage} />

        <h1 className="text-center">{t("name")}</h1>

        <div className="sort">
          <label htmlFor="sort">{t("sort")}:</label>
          <select
            onChange={handleSortChange}
            name="sort"
            value={sortBy}
            id="sort"
            className="box"
          >
            <option value="0">{t("default")}</option>
            <option value="1">{t("increase")}</option>
            <option value="2">{t("decrease")}</option>
          </select>
        </div>

        <Tab.Container
          id="todo-tabs"
          activeKey={activeKey}
          onSelect={handleTabSelect}
        >
          <Nav variant="tabs" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="all">{t("all")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="active">{t("active")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="complete">{t("complete")}</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="all" style={rightTabPaneStyle}>
              <Form>
                <Form.Group className="d-flex" style={marginInput}>
                  <Form.Control
                    type="text"
                    placeholder={t("placehoder")}
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddTask}
                  >
                    {t("add")}
                  </Button>
                </Form.Group>
              </Form>
              <ul style={listStyle}>
                {listTodo.map((task, index) => (
                  <li key={index} style={listItemStyle}>
                    <input
                      type="checkbox"
                      checked={task.status === "complete"}
                      onChange={() => toggleTaskStatus(index)}
                      style={checkboxStyle}
                    />
                    {task.text} ({task.status})
                    <span className="text-date">{task.date}</span>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDeleteTask(index)}
                    >
                      {t("delete")}
                    </button>
                  </li>
                ))}
              </ul>
            </Tab.Pane>
            <Tab.Pane eventKey="active" style={rightTabPaneStyle}>
              <Form>
                <Form.Group className="d-flex" style={marginInput}>
                  <Form.Control
                    type="text"
                    placeholder={t("placehoder")}
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddTask}
                  >
                    {t("add")}
                  </Button>
                </Form.Group>
              </Form>
              <ul style={listStyle}>
                {listTodo
                  .filter((task) => task.status === "active")
                  .map((task, index) => (
                    <li key={index} style={listItemStyle}>
                      <input
                        type="checkbox"
                        checked={task.status === "complete"}
                        onChange={() => toggleTaskStatus(index)}
                        style={checkboxStyle}
                      />
                      {task.text} ({task.status})
                      <span className="text-date">{task.date}</span>
                      <button
                        style={deleteButtonStyle}
                        onClick={() => handleDeleteTask(index)}
                      >
                        {t("delete")}
                      </button>
                    </li>
                  ))}
              </ul>
            </Tab.Pane>
            <Tab.Pane eventKey="complete" style={rightTabPaneStyle}>
              <Form>
                <Form.Group className="d-flex" style={marginInput}>
                  <Form.Control
                    type="text"
                    placeholder={t("placehoder")}
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddTask}
                  >
                    {t("add")}
                  </Button>
                </Form.Group>
              </Form>
              <ul style={listStyle}>
                {listTodo
                  .filter((task) => task.status === "complete")
                  .map((task, index) => (
                    <li key={index} style={listItemStyle}>
                      <input
                        type="checkbox"
                        checked={task.status === "complete"}
                        onChange={() => toggleTaskStatus(index)}
                        style={checkboxStyle}
                      />
                      {task.text} ({task.status})
                      <span className="text-date">{task.date}</span>
                      <button
                        style={deleteButtonStyle}
                        onClick={() => handleDeleteTask(index)}
                      >
                        {t("delete")}
                      </button>
                    </li>
                  ))}
              </ul>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Todolist;
