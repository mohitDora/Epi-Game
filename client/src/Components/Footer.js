import { IconButton, Paper, Typography,Box } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import {Link,useNavigate} from "react-router-dom"

function Footer() {
    
  return (
    <Box sx={{marginTop:"2rem",padding:"0.5rem 0rem",display:"flex",gap:"2rem",justifyContent:"center",alignItems:"center"}}>
    <Typography >&copy; Epic game store. All rights reserved</Typography>
    
    
    
    <a href='https://www.instagram.com/mohitdora21/' target="_blank" rel="noreferrer"><InstagramIcon sx={{color:"white"}}></InstagramIcon></a>
    
    <a href='https://github.com/mohitDora' target="_blank" rel="noreferrer"><GitHubIcon sx={{color:"white"}}></GitHubIcon></a>
   
    </Box>
    
  )
}

export default Footer