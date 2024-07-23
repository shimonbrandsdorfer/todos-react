import TaskBtns from "./TaskBtns";

export default function Task(props) {
  return (
    <div className="task">
      <p>
        {props.title} {props.done}
      </p>
      <TaskBtns {...props}/>
    </div>
  );
}
