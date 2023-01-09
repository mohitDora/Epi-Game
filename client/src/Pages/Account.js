import React, { useContext } from 'react'
import { Card } from '../Components/Context'
import PersonIcon from '@mui/icons-material/Person';
import { Button, Typography,Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Footer from '../Components/Footer';

function Account() {
    const {userdetails,setuserdetails,setshowsearch}=useContext(Card)
    const navigate=useNavigate()
    const logout = async () => {
      try {
          let response = await fetch('/logout');
          let data = await response.json();
        console.log("hello")
          setuserdetails(data);
          window.location.reload(true);

      } catch (error) {
          console.log(error)
      }
  }
console.log(userdetails)
  useEffect(()=>{
    setshowsearch(false)
  },[])

  
  return (
    <Box sx={{width:"70vw",display:"flex",flexDirection:"column",gap:"2rem",justifyContent:"center",alignItems:"center",margin:"5rem auto"}}>
    <PersonIcon sx={{fontSize:"5rem"}}></PersonIcon>
    <Typography>Name : {userdetails.username}</Typography>
    <Typography>Email :{userdetails.email}</Typography>
    <Button variant='contained' sx={{'&:hover':{backgroundColor:"red"}}} onClick={logout}>logout</Button>
    {/* <Footer></Footer> */}
    </Box>
  )
}

export default Account