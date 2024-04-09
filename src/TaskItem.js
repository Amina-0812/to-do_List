import React, { useState } from 'react';
import TaskForm from './TaskForm';
//here we are importing icons for delete, edit, and mark complete functionalities from the react-icons/ai library
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai';


//in this function we are representing each task in the to-do list
//the functions inside are represented as props
//unsing the useState hook to manage whether the task is being edited or not
const TaskItem = ({ task, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false); //we are here initializing the 'isEditing' state variable with the initial value of 'false'

  const handleDelete = () => {
    //this fonction handle a confirmation dialog before deleting the task
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      deleteTask(task.id); //once the user confirms the deletion by clicking OK it's removed from the list
    }
  };

  //setting the isEditing state to true, meaning that the task is being edited
  const handleEdit = () => {
    setIsEditing(true);
  };

  //setting the isEditing state to false, which means canceling the editing process for the task
  const handleCancelEdit = () => {
    setIsEditing(false);
  };


  //this function toggles the finalization status of the task
  //we can see that it updates the task object by toggling the value of the 'completed' property
  const handleToggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  //this part of the code represents the return of an individual task item
  return (
          /*the condition render either the task info or an editing form all based on the 'isediting' state*/
    <li className={`task-item ${task.completed ? 'completed' : ''}`}> 
    {/*if it's true it rendres the taskForm component for editing the task otherwise it renders the task information along with action icons for editing, deleting, and marking completion */}
      {isEditing ? (
        <TaskForm task={task} updateTask={updateTask} handleCancelEdit={handleCancelEdit} />
      ) : (
        <>
          <div className="task-info">
            <h3 className="task-name">{task.name}</h3>
            <p className="task-description">{task.description}</p>
          </div>
          <div className="task-actions">
            {/*each action icon is represented by a AiOutline*/}
            {/*every icon is clickable and activated thanks to the functions once they are clicked: the handleEdit, handleDelete, and handleToggleComplete*/}
            <AiOutlineEdit className="action-icon edit-icon" onClick={handleEdit} />
            <AiOutlineDelete className="action-icon delete-icon" onClick={handleDelete} />
            <AiOutlineCheckCircle className="action-icon complete-icon" onClick={handleToggleComplete} />
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
