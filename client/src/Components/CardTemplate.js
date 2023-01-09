import React, { useState,useContext } from 'react'
import {  CardActionArea, CardMedia, CardContent, Typography,Tooltip, IconButton,Box,Skeleton, Paper } from "@mui/material"
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import {Link} from "react-router-dom"
import { Card } from './Context';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CardTemplate(props) {

  const [state,setstate]=useState(false);
  const {setwishlist}=useContext(Card)

  function addtowishlist(id) {
    toast.success('Added to wishlist', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    setwishlist((prev)=>{
      const newarr=[...prev]
      if(!(newarr.includes(id))){
        return(
          [...prev,id]
        )
      }
      else{
        return(
          [...prev]
        )
      }
      
    });

  }

  return (
   
    
    <Paper sx={{minWidth: {xs:"12rem",sm:"12rem"},maxWidth: {xs:"12rem",sm:"12rem"}, boxShadow: "none",backgroundColor: "none", position: "relative"}} onMouseOver={()=>setstate(true)} onMouseOut={()=>setstate(false)}>
      {state?
      <Tooltip title="wishlist" arrow enterDelay={500} sx={{backgroundColor:"#121212"}}>
      <IconButton elevation={12} sx={{ position: "absolute",zIndex:"1999" , right: "1rem", backgroundColor: "#1e1e1e",top:"1rem" ,"&:hover":{
        backgroundColor:"#1e1e1e"
      }}} onClick={()=>addtowishlist(props.id)}>
        <ControlPointOutlinedIcon></ControlPointOutlinedIcon>
      </IconButton>
      </Tooltip>
      :""}
      <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <Link to={`/game/${props.id}`} style={{ textDecoration:"none"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{height:{xs:"15rem",md:"15rem" }}}
          image={props.img}
        alt=""
        />
        <CardContent sx={{ ml: "0.0rem", p: "1rem",color:"white",textTransform:"capitalize"}}>
          <Typography variant="h5" component="div" sx={{ fontSize: "1rem" ,textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",overflow:"hidden"}} gutterBottom>
            {props.name}
          </Typography>
          {props.price===0?<Box className='a'sx={{ fontSize: "0.8rem", fontWeight: 100 }} >FREE</Box>:<Typography gutterBottom variant="subtitle 1" component="div" sx={{ fontSize: "0.8rem", fontWeight: 100 }}>RS {props.price}</Typography>}
        </CardContent>
      </CardActionArea>
      </Link>
    </Paper>
  
  )
}
