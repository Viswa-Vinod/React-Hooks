import React, { useState, useEffect, useReducer } from 'react'
import uuid from 'uuid/v4';


const initialTaskState = {
  tasks: [],
  completedTasks: []
}

const TYPES = {
  ADD_TASK: 'ADD_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  DELETE_TASK: 'DELETE_TASK'
};

const tasksReducer = ( state, action ) => {  
  switch ( action.type ) {
    case TYPES.ADD_TASK:
    return { ...state, tasks: [...state.tasks, action.task]};
    case TYPES.COMPLETE_TASK:
    const { completedTask } = action;
    return { 
            ...state, 
            completedTasks: [...state.completedTasks, completedTask  ],
            tasks: state.tasks.filter(task => task.id !== completedTask.id)
          }
    case TYPES.DELETE_TASK:
    const { taskToDelete } = action;
    return { 
              ...state,               
              completedTasks: state.completedTasks.filter(task => task.id !== taskToDelete.id)
            }
    default: return state;
  }
  
}
const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = (taskMap) => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskMap));
}

const readStoredTasks = () => {
    const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    return tasksMap ? tasksMap : initialTaskState
}

export default function Task() {

    const [ task, setTask ] = useState('');

    const storedTasks = readStoredTasks();
    
    const [ state, dispatch ] = useReducer(tasksReducer, storedTasks);
    // console.log({state});
    const { tasks, completedTasks } = state;

    useEffect(() => {
        storeTasks({tasks, completedTasks})
    })
  
    const updateTask = (event) => setTask(event.target.value);
    const addTask = () => {
      dispatch({ type: TYPES.ADD_TASK, task: { taskText: task, id: uuid() }});      
    } 
    const completeTask = completedTask => () => {        
        dispatch({ type: TYPES.COMPLETE_TASK, completedTask})
        setTask('');
    }

    const deleteTask = taskToDelete => () => {
        dispatch({ type: TYPES.DELETE_TASK, taskToDelete});        
    }
    
    // console.log({tasks});
    // console.log({completedTasks});
  return (
    <div>
      <h3>Tasks</h3>
      <div className='form'>
        <input value={task} onChange={updateTask}/>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='task-list'>
        {tasks.map(task => 
         <div key={task.id} onClick={completeTask(task)}>{task.taskText}</div>   
        )}
      </div>
      <div className='completed-list'>
      {
          completedTasks.map(task => {
              const { id, taskText } = task;
              return (
                  <div key={task.id}>
                  {task.taskText}{" "}
                  <span className='delete-task' onClick={deleteTask(task)}>X</span>
                  
                  </div>
              )
          })
      }
      </div>
    </div>
  )
}
