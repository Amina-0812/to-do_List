import React from 'react';
import TaskItem from './TaskItem';



//wee are here representing the component responsible of the list of tasks in the to do list
//the taskList here receive the tasks, deleteTask and updatedTask as props
const TaskList = ({ tasks, deleteTask, updateTask }) => {
  return (
    //inside the ul element we have the map that it goes through the tasks array and render a TaskItem component for each task
    <ul className="task-list">
      {tasks.map(task => (
  //each TaskItem is passed the task object, along with the deleteTask and updateTask functions to handle task deletion and updates      
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
    </ul>
  );
};

export default TaskList;