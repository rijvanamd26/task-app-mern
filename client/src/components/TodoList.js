import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";

axios.defaults.baseURL = "http://localhost:5000/";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/tasks", { text: newTask });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`);
      const updatedTasks = tasks.map((task) =>
        task._id === response.data._id ? response.data : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 align="center" style={{ marginTop: "2rem" }}>
        Todo List
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          marginTop: "2rem",
        }}
      >
        <Card
          style={{ width: "25rem", marginBottom: "1rem", borderRadius: "0" }}
        >
          <Card.Body
            style={{ display: "flex", alignItems: "center", padding: "7px" }}
          >
            <Form
              onSubmit={handleSubmit}
              style={{ display: "flex", flex: "1" }}
            >
              <Form.Control
                type="text"
                placeholder="Enter a task"
                style={{ flex: "1", marginRight: "1rem", borderRadius: "0", borderColor: "rgb(222, 229, 236)", boxShadow: 'none' }}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                
                required
              />
              <Button
                style={{ borderRadius: "0" }}
                variant="dark"
                type="submit"
              >
                Add Task
              </Button>
            </Form>
          </Card.Body>
        </Card>


        {tasks.map((task) => (
          <Card
            style={{ width: "25rem", marginBottom: "1rem", borderRadius: "0" }}
          >
            <Card.Body
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "7px 17px 0px 17px",
              }}
            >
              <p style={{ marginRight: "auto" }}>{task.text}</p>
              <p
                key={task._id}
                onClick={() => handleToggleComplete(task._id)}
                style={{
                  cursor: "pointer",
                  color: task.completed ? "green" : "red",
                }}
              >
                {" "}
                {task.completed ? (
                  <FiCheckCircle />
                ) : (
                  <AiOutlineClockCircle />
                )}{" "}
                {task.completed ? "Completed" : "Pending"}
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>


    </div>
  );
};

export default TodoList;
