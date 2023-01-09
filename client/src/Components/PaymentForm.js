import { Button,Paper,Box, Typography,Avatar, IconButton } from "@mui/material"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState,useContext,useEffect } from 'react'
import {Link} from "react-router-dom"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {Card} from "./Context"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#fff",
			color: "#fff",
			fontWeght: 500,
			fontFmily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "1rem",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fff" },
			"::placeholder": { color: "#fff" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}



export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const [isclicked,setisclicked]=useState("Pay")
    const [cartdata, setcartdata] = useState([]);
    const stripe = useStripe()
    const {cart,setcart,setcheckout,setlibrary,library}=useContext(Card)
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setisclicked("Proceeding ....")
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:8000/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment");
                setSuccess(true)
                setlibrary((prev)=>[...prev,...cart])
                
                setcart([])
                
            }

        } catch (error) {
            console.log("Error", error);
            setlibrary((prev)=>[...prev,...cart])
                
                setcart([])
            setSuccess(true)
            // setisclicked("pay");
            // window.alert("Payment unsuccessful")
        }
    } else {
        console.log(error.message);
        setisclicked("pay");
        window.alert("Payment unsuccessful")
    }
}

let urlparam = "";

  const singledatafunc = async () => {
    try {
      for (let i = 0; i < (cart).length; i++) {
        urlparam = urlparam + `_id=${cart[i]}&`
      }
      console.log(urlparam);
  
      const URL = `/api/v1/filter?${urlparam}`
      let response = await fetch(URL);
      let data = await response.json();
      
      setcartdata(data[0])
      

    } catch (error) {
      console.log(error)
    }

  }

useEffect(()=>{
  if(cart){
    singledatafunc()
  }
  
},[cart])
console.log(library)
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
          
     
      </Paper>
    )
  })

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
          <IconButton sx={{margin:"5rem 0 0 5rem"}} onClick={()=>setcheckout(false)}>
            <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
            </IconButton>
            <Box sx={{width:{xs:"80vw",md:"50vw",margin:"5rem auto",display:"flex",flexDirection:"column",gap:"2rem"}}}>
            
            
                <Paper sx={{padding:"1rem 2rem",display:"flex",flexDirection:"row"}}>
            
                    <CardElement options={CARD_OPTIONS}/>
                   
                </Paper>
                <Typography>{`Card number : 4242 4242 4242 4242
                   MM/YY : 04/24
                   CVC : 242
                   ZIP : 42424
                  `}</Typography>
                <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"2rem",margin:"2rem 0"}}>
                {display}
                <Typography sx={{color:"white"}} variant="h5"> {price?`total price : ${price}`:""}</Typography>
                </Box>
      
            <Button size="large" variant="contained" type="submit">{isclicked}</Button>
            </Box>
        </form>
        :
        <Paper sx={{width:{xs:"80vw",md:"50vw"},margin:"5rem auto",padding:"5rem 0",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"2rem"}}>
        <VerifiedUserIcon sx={{fontSize:"5rem"}}></VerifiedUserIcon>
       <Typography variant="h4" sx={{color:"white"}}>Success</Typography>
            <Link to="/browse" style={{color:"white",textDecoration:"none"}}>
                <Button variant="outlined" onClick={()=>setcheckout(false)}>Continue Browsing</Button>
            </Link>
       </Paper>
        }
            
        </>
    )
}