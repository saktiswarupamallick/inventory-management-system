import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


import FlexBetween from "../components/FlexBetween";
import { Box } from "@mui/material";
import './kanban.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', category: 'todo' },
    { id: 2, title: 'Task 2', category: 'in-progress' },
    { id: 3, title: 'Task 3', category: 'done' },
  ]);

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Load tasks from local storage
    const savedTasks = localStorage.getItem("kanbanTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever they change
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (event, category) => {
    const taskId = event.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map((task) => {
      if (task.id === parseInt(taskId)) {
        return { ...task, category };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEdit = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        category: 'todo',
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  return (
    <Box m="2.5rem 2.5rem">
      <FlexBetween>
        <Header title="Tasklist" subtitle="List of Tasks" />

        <Box>
          <input className='add-taskinput'
            style={{ color: "black" }}
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Enter task title"
          />
          <Button
            sx={{
              backgroundColor: "#ED7014",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "7px",
              border: "1px solid black",
              boxShadow: "rgb(0,0,0) 3px 3px",
              marginLeft: "10px"
            }}
            onClick={handleAddTask}
          >

            Add Task
          </Button>
        </Box>
      </FlexBetween>

      <div className="kanban-board">
        <div
          className="category"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 'todo')}
        >
          <h2 style={{ left: "40px" }}>Todo</h2>
          <div  >{tasks
            .filter((task) => task.category === 'todo')
            .map((task) => (
              <div 
                key={task.id}
                className="task"
                draggable
                onDragStart={(event) => handleDragStart(event, task.id)}
              >

                {task.title}
                <div><Button
                  sx={{
                    backgroundColor: "#ED7014",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "7px",
                    border: "1px solid black",
                    boxShadow: "rgb(0,0,0) 3px 3px",
                    marginLeft: "10px"
                  }} onClick={() => handleDelete(task.id)}>Delete</Button>
                <Button
                  sx={{
                    backgroundColor: "#ED7014",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "7px",
                    border: "1px solid black",
                    boxShadow: "rgb(0,0,0) 3px 3px",
                    marginLeft: "10px"
                  }} onClick={() => handleEdit(task.id, prompt('Enter new title'))}>Edit</Button></div>
                
              </div>
            ))}</div>

        </div>
        <div
          className="category"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 'in-progress')}
        >
          <h2>In Progress</h2>
          {tasks
            .filter((task) => task.category === 'in-progress')
            .map((task) => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={(event) => handleDragStart(event, task.id)}
              >
                {task.title}
                <div><Button
                  sx={{
                    backgroundColor: "#ED7014",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "7px",
                    border: "1px solid black",
                    boxShadow: "rgb(0,0,0) 3px 3px",
                    marginLeft: "10px"
                  }} onClick={() => handleDelete(task.id)}>Delete</Button>
                <Button
                  sx={{
                    backgroundColor: "#ED7014",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "7px",
                    border: "1px solid black",
                    boxShadow: "rgb(0,0,0) 5px 5px",
                    marginLeft: "10px"
                  }} onClick={() => handleEdit(task.id, prompt('Enter new title'))}>Edit</Button></div>
                
              </div>
            ))}
        </div>
        <div
          className="category"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 'done')}
        >
          <h2>Done</h2>
          {tasks
            .filter((task) => task.category === 'done')
            .map((task) => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={(event) => handleDragStart(event, task.id)}
              >
                {task.title}
                <div><Button
                  sx={{
                    backgroundColor: "#ED7014",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "7px",
                    border: "1px solid black",
                    boxShadow: "rgb(0,0,0) 3px 3px",
                    marginLeft: "10px"
                  }} onClick={() => handleDelete(task.id)}>Delete</Button>
                <Button
                  sx={{
                    backgroundColor: "#ED7014",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "7px",
                    border: "1px solid black",
                    boxShadow: "rgb(0,0,0) 3px 3px",
                    marginLeft: "10px"
                  }} onClick={() => handleEdit(task.id, prompt('Enter new title'))}>Edit</Button></div>
                
              </div>
            ))}
        </div>

      </div>
    </Box>
  );
};

export default KanbanBoard;
