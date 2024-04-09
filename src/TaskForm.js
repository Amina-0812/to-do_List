import React, { useState } from 'react';


//here we have the component that represent the form for adding or updating tasks
const TaskForm = ({ task, addTask, updateTask, handleCancelEdit }) => {
  //we're using the useState hook to manage the state of the task name and description inputs

  //the 'name' state is initialized with the task name if a task object is provided, otherwise, it's initialized as an empty string
  const [name, setName] = useState(task ? task.name : '');
  //the 'description' state is also initialized with the task description if available, otherwise, it's initialized as an empty string
  const [description, setDescription] = useState(task ? task.description : '');

  //the next function hadles the sumbission's form when adding ir updating a task 
  const handleSubmit = (e) => {
    //preventing the default form submission behavior
    e.preventDefault();
    //if one the name or description s task is empty, an alert show up
    if (!name.trim() || !description.trim()) {
      alert("Please fill in both fields."); //displaying an alert if either field is empty
      return;
    }
    //if a task object is provided, it updates the task with the new name and description, then cancels the edit mode
    if (task) {
      updateTask({ ...task, name, description });
      handleCancelEdit();
    //else it adds a new task with a unique ID and clears the name and description fields
    } else {
      addTask({ id: Date.now(), name, description });
      setName('');
      setDescription('');
    }
  };

  return (
    //we are defining a form to add or update our task
    <form className="task-form" onSubmit={handleSubmit}>
      {/*the input field for the task's name*/}
      <input
        type="text"
        placeholder="What's Today's Task?" //the placholder text
        value={name} //putting the 'name' state as an input value
        onChange={(e) => setName(e.target.value)} //here we are handling the changes in the input value
      />
      {/*the textarea for the task descriptions*/}
      <textarea
        placeholder="Add a Description" //the placeholder text for task description
        value={description} //we have 'description' state as a text area value
        onChange={(e) => setDescription(e.target.value)} //handling changes in the textarea value
      ></textarea>
        {/*last but not least the button for submitting the form, it displays 'Add Task' for new task and 'Update Task' for editing task*/}
      <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
        {/*and here's the cancel button displayed only when editing a task*/}
      {task && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
