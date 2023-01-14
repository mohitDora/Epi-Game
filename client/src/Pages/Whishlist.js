import React from 'react'
import { Typography,Paper,Avatar,Box, IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {Link} from "react-router-dom"
import { useContext } from 'react';
import { Card } from '../Components/Context';

function Cart() {
  // const { setuserdetails, userdetails } = useContext(Card);
  const [cartdata, setcartdata] = useState([]);
  // const [onlycart, setonlycart] = useState([]);
  // const [updatedArr,setupdatedArr]=useState([]);
  const {wishlist,setwishlist,setcart,setfilter,setshowsearch}=useContext(Card)

  const navigate = useNavigate()
useEffect(()=>{
  setfilter(false)
  setshowsearch(true)
},[])


  let urlparam = "";

  const singledatafunc = async () => {
    try {
      for (let i = 0; i < (wishlist).length; i++) {
        urlparam = urlparam + `_id=${wishlist[i]}&`
      }
      console.log(urlparam);
  
      const URL = `/api/v1/filter?${urlparam}`
      let response = await fetch(URL);
      let data = await response.json();
      wishlist.length?
      setcartdata(data[0]):setcartdata([])
    
      

    } catch (error) {
      console.log(error)
    }

  }

useEffect(()=>{
  if(wishlist){
    singledatafunc()
  }
  
},[wishlist])


function deleteID(id){
  console.log(`id:${id}`)
  const newArr=wishlist.filter((item)=>{
    return item!==id
  })
  setwishlist(newArr)
}



function addtocart(id) {
  setcart((prev)=>{
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
  deleteID(id)
}
function buynow(id) {
  setcart((prev)=>{
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
  deleteID(id)
  navigate("/cart")
}

let price=0;
  const display=cartdata.map((item,index)=>{
    // price=price+item.price;
    return(
      <Paper key={index} sx={{display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem 3rem",width:"80vw",gap:"2rem"}}>
    
        <Avatar src={item.img} variant="square" sx={{borderRadius:"0.5rem",width:"5rem",height:"7rem"}}>
          </Avatar>
          <Box sx={{width:"50vw", gap:"0.5rem",display:"flex",flexDirection:"column",backgoundColor:"Red",overflow:"hidden"}}>
          <Typography variant='h5' sx={{ color: "white",fontSize:"1.6rem",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",overflow:"hidden" }}>{item.name}</Typography>
          <Typography variant='h6' sx={{ color: "white",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",overflow:"hidden" }}>{item.price===0?"Free":`RS ${item.price}`}</Typography>
          <Box >
          <Button varint='outlined' sx={{marginRight:"1rem"}} onClick={()=>addtocart(item._id)}>Add to cart</Button>
          <Button varant='outlined' onClick={()=>buynow(item._id)}>Buy now</Button>
          </Box>
          </Box>
          <IconButton onClick={()=>deleteID(item._id)}>
              <CloseIcon></CloseIcon>
          </IconButton>
     
      </Paper>
    )
  })

  
  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"2rem",margin:"2rem 0"}}>
      <Typography sx={{color:"white"}} variant="h3">wishlist</Typography>
      {wishlist.length? display:
      <>
      <Typography>Your wishlist is empty</Typography>
      <Link to="/browse" style={{textDecoration:"none"}}>
      <Button variant='outlined'>Continue browsing</Button>
      </Link>
      </>
      }
    </Box>
  )
}

export default Cart