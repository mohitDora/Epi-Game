import React, { useContext, useEffect } from 'react'
import MostPop from './MostPop'
import { Box } from '@mui/system'
import ImgSlider from '../Components/ImgSlider';
import { Card } from '../Components/Context';
// import Video from "../Components/Video"
import Footer from '../Components/Footer';
import Comment from '../Components/Comment';

function Discover({iswidth}) {
    const {setfilter,setshowsearch}=useContext(Card)
    const drawerWidth = iswidth==="true" ? 0 : 240;
    useEffect(()=>{
        setfilter(false);
        setshowsearch(true)
    },[])    
 
    return (
        <Box sx={{ width: `calc(100vw )`, ml: `${drawerWidth}px`,display:"flex",flexDirection:"column",justifyCotent: "space-evenly",overflowX:"auto",boxSizing:"border-box"}}>
            <ImgSlider></ImgSlider>
            <MostPop condition="isnew" tag="New releases"></MostPop>
            <MostPop condition="ispopular" tag="popular games"></MostPop>
            <MostPop condition="isfree" tag="Free games"></MostPop>
           <Comment></Comment>
            {/* <Video></Video> */}
            <Footer></Footer>
            </Box>
    )
}

export default Discover