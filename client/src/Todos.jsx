import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import NewTask from "./NewTask";
import Title from "./Title";
import AuthContext from "./auth";

export default function Todos({ userId }) {
  const [tasks, setTasks] = useState([]);
 useEffect(() => {
   const maybeTasks = localStorage.getItem('tasks')
  if (maybeTasks) {
    setTasks(JSON.parse(maybeTasks))
  }
 }
, [])
  const user = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function updateTasks(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  async function loadTasks() {
    let response = await fetch("http://localhost:3000/tasks", {
      credentials: "include"
    });
    const result = await response.json();
    setTasks(result);
  }

  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <>
      <div className="todo-container">
        <Title title={"Todos App"} />
        <NewTask updateTasks={loadTasks} />
        <section className="task-list" id="todo-list">
          <h2 className="task-header">Active tasks</h2>
          {tasks
            .filter((task) => !task.done)
            .map((task) => (
              <Task task={task} key={task.id} />
            ))}
        </section>
        <section className="task-list completed" id="done-list">
          <h2 className="task-header">Completed Tasks</h2>
          {tasks
            .filter((task) => task.done)
            .map((task) => (
              <Task done={task.done} title={task.title} key={task.id} />
            ))}
        </section>
      </div>
    </>
  );
}
