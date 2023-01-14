import React, {  useEffect,useState,useContext } from 'react';
import CardTemplate from '../Components/CardTemplate';
import { Stack, Typography,Skeleton,Box, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Card } from "../Components/Context"
import { useNavigate } from 'react-router-dom';
import SideScroll from "../Components/SideScroll"

export default function MostPop({condition,tag}) {
    const { isloading,setisloading } = useContext(Card);
    const [mostpopdata,setmostpopdata]=useState([])
    useEffect(()=>{
        data();
        setisloading(true)
    },[])
   const navigate=useNavigate()
    const scrollRef = SideScroll();

    const mostpopURL=`/api/v1/filter?${condition}=true&limit=10`
    const data=async()=>{
        setisloading(true)
        let response = await fetch(mostpopURL);
        let data = await response.json();
        setmostpopdata(data[0]);
        setisloading(false)
    }
    const filterdata=mostpopdata.filter((card)=>card[condition]===true)

    const finaldata=condition?filterdata:mostpopdata;
    let mostpopcards;
    console.log(isloading)
    if(isloading){
        console.log("if")
        mostpopcards=finaldata.map((card)=>{
            return(
                <Skeleton animation="wave" variant="rectangular" sx={{ minWidth: "12rem", height: "18rem", bgcolor: 'grey.900' }}></Skeleton>
                // <Typography>Mohit</Typography>
                )
    })}
    else{
        console.log("else")
        mostpopcards=finaldata.map((card)=>{
            return(
                
                <CardTemplate key={card._id} img={card.img} name={card.name} price={card.price} id={card._id}></CardTemplate>
            )
        })
    }

    
  return (
    <Box sx={{pl:"2rem"}}>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography sx={{p:"2rem 0",fontSize:"2rem",textTransform:"capitalize",color:"white"}}>{tag}</Typography>
    {/* <IconButton  > */}
        <ChevronRightIcon sx={{fontSize:"2rem",marginRight:"2rem",cursor:"pointer"}} onClick={()=>navigate("/browse")}></ChevronRightIcon>
    {/* </IconButton> */}
    </Box>
    <Stack spacing={{xs:3,md:5}} direction="row" sx={{overlowX:"auto",pb:"2rem"}} className="mostpop"  >
        ref={scrollRef}
        
        {mostpopcards}
    </Stack>
    </Box>
  )
}
