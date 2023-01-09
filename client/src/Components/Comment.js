import React from 'react'
import { TextField,Box, Typography, Button, Paper, IconButton } from '@mui/material'
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Link} from "react-router-dom"

function Comment() {

    const [comment,setcomment]=useState({
        name1:"",msg:""
    })
    const [commentdata,setcommentda]=useState([]);
    const [down,setdown]=useState(true)
    function handleclick(e){
        setcomment((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    async function discomment(){    
         let response = await fetch(`/api/comment?limit=5`);
         let data1 = await response.json();
         console.log(data1.length);
         console.log(commentdata.length)
         console.log(commentdata.length==data1.length || commentdata.length===0)
         
          setcommentda(data1);        
     }    
     useEffect(()=>{
      discomment()
    },[])
    const sendData = async (e) => {
      e.preventDefault();
        const { name1,msg } = comment;
        const res = await fetch("/commentpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name:name1,msg:msg
          })
        })
        
        const data = await res.json();
       
        
        if (res.status === 422 || !data) {
          toast.error('Error', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log("invalid");
        
    
        }
        else {
    
          toast.success('Comment Sent Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

         
            
          setcomment((prev)=>{
            return{
              name1:"",msg:""
            }
          }
            
        )
          let response = await fetch(`/comment?limit=5`);
         let data1 = await response.json();
         console.log(data1.length);
         console.log(commentdata.length)
         console.log(commentdata.length==data1.length || commentdata.length===0)
         
          setcommentda(data1);
          
          console.log("success");
          
        }
      }

      // const revarray=commentdata.reverse()
      const display=commentdata.map((item,index)=>{
        return(
            <Paper sx={{padding:"1rem 2rem",display:"flex",gap:"1rem",flexDirection:"column"}} key={index}>
                <Typography>From : {item.name}</Typography>
                <Typography>Comment : {item.msg}</Typography>
            </Paper>
        )
      })
  return (
    <>
    <Box component="form" sx={{width:{xs:"80vw",md:"50vw"},display:"flex",flexDirection:"column",margin:"2rem auto",gap:"2rem"}} onSubmit={sendData} method="POST">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    <TextField id="outlined-basic" label="Name" variant="outlined" autoComplete='off' name='name1' onChange={handleclick} value={comment.name1} required/>
    <TextField
          id="outlined-textarea"
          label="Type Your comment"
          placeholder="Type Your comment"
          multiline name='msg' onChange={handleclick} value={comment.msg} required
        />
        <Button type='submit'>Post comment</Button>
        </Box>
        
        {commentdata.length?<>
          <Box sx={{width:{xs:"80vw",md:"50vw"},display:"flex",flexDirection:"column",margin:"2rem auto",gap:"2rem",}}>
            <Box sx={{display:"flex",alignItems:"center",gap:"2rem"}}>
        <Typography variant='h4'>Comments </Typography>
        <IconButton onClick={()=>setdown((prev)=>!prev)}>
        {!down?<KeyboardArrowDownIcon sx={{fontSize:"2rem"}}></KeyboardArrowDownIcon>:
        <KeyboardArrowUpIcon sx={{fontSize:"2rem"}}></KeyboardArrowUpIcon>}
        </IconButton>
        </Box><Box sx={{display:"flex",flexDirection:"column",gap:"2rem",height:down?"":"0px",overflow:"hidden"}}>
            {display}
            </Box>
             <Link to="/comment" style={{textDecoration:"none",margin:"auto"}}>
        <Button>More Comments</Button>
        </Link></Box></>:""}
        
        
        
       
        </>
  )
}

export default Comment