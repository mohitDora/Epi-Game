import React from 'react'
import { Typography,Paper,Avatar,Box, IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {Link} from "react-router-dom"
import { useContext } from 'react';
import { Card } from '../Components/Context';
// import StripeContainer from '../Components/StripeContainer';
import getStripe from './getStripe';

function Cart() {
  // const { setuserdetails, userdetails } = useContext(Card);
  const [cartdata, setcartdata] = useState([]);
  
  // const [onlycart, setonlycart] = useState([]);
  // const [updatedArr,setupdatedArr]=useState([]);
  const {cart,setcart,setshowsearch,setfilter,showcheckout,setcheckout}=useContext(Card)




  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
    setfilter(false)
    setcheckout(false)
    setshowsearch(false)
  }, []);


  const navigate = useNavigate()
  const callCart = async () => {
    try {
      const res = await fetch("/validate", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      // setonlycart(data)

     
      if (!res.status === 200) {
        throw new Error("invalid")
      }
    } catch (error) {
      console.log(error);
      navigate("/signin")
    }
  }
  useEffect(() => {
    callCart();

  }, [])


  let urlparam = "";

  const singledatafunc = async () => {
    try {
      for (let i = 0; i < (cart).length; i++) {
        urlparam = urlparam + `_id=${cart[i]}&`
      }
      
      
      const URL = `/api/v1/filter?${urlparam}`
      let response = await fetch(URL);
      let data = await response.json();
      cart.length?
      setcartdata(data[0]):setcartdata([])
      

    } catch (error) {
      console.log(error)
    }

  }

useEffect(()=>{
 
    singledatafunc()
  
  
},[cart])


function deleteID(id){
  console.log(`id:${id}`)
  const newArr=cart.filter((item)=>{
    return item!==id
  })
  setcart(newArr)
}







async function handleSubmit(){
  console.log("eee")
  const stripe=await getStripe();
  const res=await fetch("create-checkout-session",{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(cartdata)
  })

  if(res.statusCode===500) return ;
  const data=await res.json();
  stripe.redirectToCheckout({sessionId:data.id})
}








let price=0;
  const display=cartdata.map((item,index)=>{
    price=price+item.price;
    return(
      <Paper key={index} sx={{display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem 3rem",width:{xs:"80vw",md:"50vw"},gap:"2rem"}}>
    
        <Avatar src={item.img} variant="square" sx={{borderRadius:"0.5rem",width:"5rem",height:"7rem"}}>
          </Avatar>
          <Box sx={{width:"50vw", gap:"0.5rem",display:"flex",flexDirection:"column",backgoundColor:"Red",overflow:"hidden"}}>
          <Typography variant='h5' sx={{ color: "white",fontSize:"1.6rem",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",overflow:"hidden" }}>{item.name}</Typography>
          <Typography variant='h6' sx={{ color: "white",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",overflow:"hidden" }}>{item.price===0?"Free":`RS ${item.price}`}</Typography>
        
          </Box>
          <IconButton onClick={()=>deleteID(item._id)}>
              <CloseIcon></CloseIcon>
          </IconButton>
     
      </Paper>
    )
  })

  
  const redirectToCheckout = async event => {

    event.preventDefault()

    const stripe = await getStripe()

    const { error } = await stripe.redirectToCheckout({

      mode: "subscription",

      lineItems: [{ price: "price_1Gva5YAeKYVunD5viRkFzoR7", quantity: 1 }],

      successUrl: `http://localhost:8000/thanks/`,

      cancelUrl: `http://localhost:8000/404`,

    });

    if (error) {

      alert("Error:", error)

    }

  };


  return (
    <>
     
   
   cart.length?
   <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"2rem",margin:"2rem 0"}}>
      <Typography sx={{color:"white"}} variant="h3">Cart</Typography>
      {display}
      <Typography sx={{color:"white"}} variant="h5"> {price?`total price : ${price}`:""}</Typography>
      
    
      <Button variant='contained' size='large' onClick={redirectToCheckout}>Checkout</Button>
    </Box>:
    <>
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"2rem",margin:"2rem 0"}}>
      <Typography sx={{color:"white"}} variant="h3">Cart</Typography>
    <Typography>Your cart is empty</Typography>
    <Link to="/browse" style={{textDecoration:"none"}}>
    <Button variant='outlined'>Continue Browsing</Button></Link>
    </Box>
    </>
    
    
    
    </>
  )
}

export default Cart