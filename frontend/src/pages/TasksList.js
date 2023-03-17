import React, { useState, useEffect } from 'react'
import { Box,Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';
import { getInitials,formatDate } from '../common/functions';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TasksList = () => {
  const token=localStorage.getItem('token')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [openNewTask, setOpenNewTask] = React.useState(false);
  const handleOpenNewTask = () => setOpenNewTask(true);
  const handleCloseNewTask = () => setOpenNewTask(false);

  const [allTasks, setAllTasks] = useState([]);
  const [header,setHeader] = useState("All")
  const [tasksData, setTasksData] = useState([]);
  const [title, setTitle] = useState();
  const [completed, setCompleted] = useState();
  const [idToUpdate, setIdToUpdate] = useState();

  const fetchTasks = async () => {
    const bodyObject = { username:"student@gmail.com" }
    const response = await fetch('http://localhost:4000/getTasks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(bodyObject)
    });
    const res = await response.json();
    setTasksData(res.data);
    setAllTasks(res.data);
  }

  const handleFilterCompleted=()=>{
    const completedTasks=tasksData.filter((task)=>{return task.completed})
    setAllTasks(completedTasks);
    setHeader("Completed")
  }

  const handleFilterAll=()=>{
    setAllTasks(tasksData);
    setHeader("All");

  }

  const handleFilterIncomplete=()=>{
    const incompleteTasks=tasksData.filter((task)=>{return !task.completed})
    setAllTasks(incompleteTasks);
    setHeader("Incomplete")

  }

  const markCompletedTask=async (id)=>{
    const response = await fetch('http://localhost:4000/markTaskCompleted', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({id})
    });
    const res=await response.json();
    alert(res.message)
    fetchTasks();
    setHeader("All");
  }

  const deleteTask = async (id) => {
    const idObject = { id }
    const response = await fetch('http://localhost:4000/deleteTask', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(idObject)
    });
    const res=await response.json();
    alert(res.message)
    fetchTasks();
    setHeader("All");
  }

  const editTask = (value) => {
    setIdToUpdate(value)
    handleOpen();
  }

  const updateTaskButtonClicked = async () => {
    const bodyObject = { id: idToUpdate, title,completed }
    const response = await fetch('http://localhost:4000/updateTask', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(bodyObject)
    });
    const res=await response.json();
    alert(res.message)
    fetchTasks();
    setHeader("All");
  }

  const addTaskButtonClicked = async () => {
    handleOpenNewTask();
    setHeader("All");
  }

  const handleAddTask = async () => {
    const bodyObject = { title,completed }
    const response = await fetch('http://localhost:4000/addTask', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(bodyObject)
    });
    const res=await response.json();
    alert(res.message)
    handleCloseNewTask();
    fetchTasks();
    setHeader("All");
  }
  useEffect(() => {
    token && fetchTasks();
  }, [token])
  return (
    <>
    <Grid container pl={8} pr={8} spacing={2}>
    { token!==null ? 
    <>
    <Grid container pl={2} pt={3} spacing={2}>
        <Grid item pb={2}>
          <span><bold>Filters: </bold></span>
        </Grid>
        <Grid item >
          <Button onClick={handleFilterAll} variant="contained">All</Button>
        </Grid>
        <Grid item >
          <Button onClick={handleFilterCompleted} variant="contained">Completed</Button>
        </Grid>
        <Grid item>
          <Button  onClick={handleFilterIncomplete} variant="contained">Incomplete</Button>
        </Grid>
        <Grid item>
      <ControlPointIcon
      cursor='pointer'
      style={{"font-size":"35px"}}
      onClick={addTaskButtonClicked}/>
    </Grid>
    <Grid item xs={12}>
        <h3>Showing Data for {header} Tasks</h3>
    </Grid>
      </Grid>
    {allTasks.map((task)=>{
      return(
        <Grid item xs={4} >
      <Card >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {getInitials(task.username)}
          </Avatar>
        }
        title={`Created By: ${task.username}`}
        subheader={`Created At: ${formatDate(task.createdAt)}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Task: {task.title}<br></br>
          {task.completed ?
            <div>Status: Completed</div>:<>Status:Incomplete</>
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Tooltip title="Edit">

        <IconButton aria-label="Edit">
          <EditIcon onClick={()=>{editTask(task._id)}}/>
        </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
        <IconButton aria-label="Delete">
          <DeleteIcon onClick={()=>{deleteTask(task._id)}} />
        </IconButton>
        </Tooltip>
        { task.isCompleted ? 
        <></>:<><Tooltip title="Mark Completed">
          <IconButton aria-label="Delete">
            <CheckCircleIcon onClick={()=>{markCompletedTask(task._id)}} />
          </IconButton>
          </Tooltip>
          </>
        }
      </CardActions>
    </Card>
    </Grid>
      )
    })
  }
    </>:
    <>
    <Grid item>User NOT LOGGED IN !</Grid>
    </>
    }
    
    </Grid>
    
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          style={{borderRadius:"13px!importent"}}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Enter Task Data 
              </Typography>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                <label style={{marginRight:"28px"}}>Enter Task Title</label>
                <input onChange={(e) => { setTitle(e.target.value) }} placeholder='Title' /><br/>
                <label>Is Task Completed</label>
                <input onChange={(e) => { setCompleted(e.target.value) }} placeholder='Completed? true/false' />
                <Button size="small" variant="contained" onClick={updateTaskButtonClicked} >Update</Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openNewTask}
          onClose={handleCloseNewTask}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          style={{borderRadius:"13px!importent"}}
        >
          <Fade in={openNewTask}>
            <Box sx={style}>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Enter New Task Data 
              </Typography>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                <label style={{marginRight:"28px"}}>Enter Task Title</label>
                <input onChange={(e) => { setTitle(e.target.value) }} placeholder='Title' /><br/>
                <label>Is Task Completed</label>
                <input onChange={(e) => { setCompleted(e.target.value) }} placeholder='Completed? true/false' />
                <Button size="small" variant="contained"  onClick={handleAddTask} >Add</Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  )
}

export default TasksList