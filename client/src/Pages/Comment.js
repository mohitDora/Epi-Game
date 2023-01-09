import React from 'react'
import {Box,Typography,Paper, IconButton} from "@mui/material"
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Comment() {
    const navigate=useNavigate()
    const [data,setdata]=useState([])
const comdata=async()=>{
    let response = await fetch(`/comment`);
         let data1 = await response.json();
         
         
         setdata(data1);
}

useEffect(()=>{
    comdata()
},[])

const display=data.map((item,index)=>{
    return(
        <Paper sx={{padding:"1rem 2rem",display:"flex",gap:"1rem",flexDirection:"column"}} key={index}>
            <Typography>From : {item.name}</Typography>
            <Typography>Comment : {item.msg}</Typography>
        </Paper>
    )
  })
  return (
    <>
    <IconButton onClick={()=>navigate("/")} sx={{margin:"2rem 0 0 2rem"}}>
        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
    </IconButton>
    <Box sx={{width:{xs:"80vw",md:"50vw"},display:"flex",flexDirection:"column",margin:"2rem auto",gap:"2rem",}}>
            <Box sx={{display:"flex",alignItems:"center",gap:"2rem"}}>
        <Typography variant='h4'>Comments ( {display.length} )</Typography>
        
        </Box>
        <Box sx={{display:"flex",flexDirection:"column",gap:"2rem",}}>
            {display}
            </Box>
        </Box>
        </>
  )
}

export default Comment