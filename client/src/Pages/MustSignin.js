import { Button, Paper, Typography, Box } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom"

function MustSignin() {
    return (
        <Box sx={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"3rem"}} className="backcon">
        <Typography variant='h4' sx={{color:"white",zIndex:"5"}}>Welcome to epic Game Store</Typography>
            
                 
                <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button variant='contained' sx={{ width: { xs: "60vw", md: "40vw" }, margin: "auto" }}>Create an account</Button>
                </Link>
                <Link to="/signin" style={{ textDecoration: "none" }} >
                    <Button variant='outlined' sx={{ width: { xs: "60vw", md: "40vw" }, margin: "auto",color:"white" }}>Sign In</Button>
                </Link>
                <Link to="/" style={{ textDecoration: "none",zIndex:"10"}} >
                    <Typography sx={{ color: "white",textDecoration:"underline",}}>Sign In Later</Typography>
                </Link>
       
            </Box>
    )
}

export default MustSignin