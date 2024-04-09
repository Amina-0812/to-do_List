import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css'; 


const App = () => {
  //first step is to initialize tasks state using useState hook
  const [tasks, setTasks] = useState([]);

//we use useEffect to set up a special action that happens when our component first appears on the screen, notez bien that this action runs only once, right when the component is first shown
  useEffect(() => {
//here we are getting data from the localstorage 
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
//the next part involes checking if there are tasks stored in the localstorage and stting the tasks state to those stored if they exist    
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  //here we have the useEffect hook to run whenever the task's state change, to update the tasks data stored in the local storage to reflect changes made by users
  useEffect(() => {
//converting the tasks array to a json string format and saving it to the (tasks) in the local storage
//this is ensuring that the tasks data persists across browser sessions
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


 //the addTask function is the one responsible for adding new tasks to our list of taksk
 //the (newTask) object is taking by the function as a parametre that updates the tasks states by adding new tasks to the array
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]); //we are here using the setTasks function provided by useState to update the state of the tasks
    //the (...) is to spread the existing tasks array to create a new array with the tasks that exist already 
  };


//this delete function is used to remove a task from the list of tasks based on its unique ID (taskID)
  const deleteTask = (taskId) => {
//using the setTasks function by the useState to update the tasks state
//using the Filter to create a new array that includes all tasks except the one with the taskID     
    setTasks(tasks.filter(task => task.id !== taskId));
  };


  //here's the function that is responsible of updating the existing task of the list with new infos
  //our function takes an updatedTask object as a parameter and updates the tasks by mapping over the tasks array
  //for each task in the array, it checks if the id of the task match the id of the updatedTask
  //if they are matching it replaces the existing one with the updatedTask, sinon it leaves the task unchanged
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Your To-Do List</h1>
      <div className="todo-wrapper">
        <TaskForm addTask={addTask} /> {/*this line renders the TaskForm component, here where we can add new tasks to you to-do list once we submit the form*/}
        <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} /> {/*this line renders the TaskList component so here, we'll see all our tasks listed. we can delete or update any of them from here*/}

      </div> 
    </div>
  );
};

export default App;
