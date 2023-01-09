import { Button, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, {useContext } from 'react'
import { useEffect } from 'react';
import CardTemplate from '../Components/CardTemplate';
import { Card } from "../Components/Context"
import Footer from '../Components/Footer';

function Browse({iswidth}) {

    const { browsedata, setpage,setfilter,setshowsearch,totalpage} = useContext(Card);

    useEffect(()=>{
        setfilter(true);
        setshowsearch(true);
    },[])

    const { isloading } = useContext(Card);
    let mostpopdata;
    // console.log(isloading)
    if (browsedata) {
        mostpopdata = browsedata.map((card) => {
            return ( isloading ? <Skeleton animation="wave" variant="rectangular" sx={{ width: "12rem", height: "18rem", bgcolor: 'grey.900' }}></Skeleton> :
    
                 <CardTemplate key={card._id} img={card.img} name={card.name} price={card.price} id={card._id}></CardTemplate>

            )
        })
    }
    else {
        mostpopdata = "No results"
    }

    function prev() {
        setpage((prev) => {
            if (prev === 1) {
                return 1
            }
            else {
                return prev - 1
            }
        });

    }
   
    function next() {
        setpage((prev)=>{
            if(prev===totalpage){
                return totalpage
            }
            else{
                return prev+1
            }
        })
  
    }
  
    const drawerWidth = iswidth==="true" ? 0 : 240;
    return (
        <Box sx={{ width: "95vw",margin:"auto"}}>
            <Typography variant='h3' sx={{margin:"1rem 0 0 0"}}>Browse</Typography>
            <Box sx={{ display: "flex", width: "100%",minHeight:"80%", flexWrap: "wrap", justifyContent: "space-evenly", padding: "2rem 0", rowGap: "2.5rem", columnGap: "1.5rem" }}>{mostpopdata}</Box>
            <Button onClick={prev} variant="outlined">Previous</Button>
            <Button onClick={next} variant="outlined" sx={{marginLeft:"2rem"}}>Next</Button>
            <Footer></Footer>
            </Box>
    )
}

export default Browse