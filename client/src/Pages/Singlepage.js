import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Typography, Rating, TableContainer, Table, TableCell, TableBody, Paper, TableRow, Button, IconButton } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { Card } from "../Components/Context"
import Footer from '../Components/Footer';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Singlepage() {
  const [singledata, setsingledata] = useState([])
  
  const { settwonav,cart, setcart,wishlist,setshowsearch, setwishlist,setfilter } = useContext(Card)
  useEffect(() => {
    singledatafunc();
  
    setfilter(false);
    setshowsearch(false)
  }, [])
  const navigate=useNavigate()
 
    console.log(cart, wishlist)
    function addtocart() {
      toast.success('Added to Cart', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setcart((prev)=>{
        const newarr=[...prev]
        if(!(newarr.includes(singledata._id))){
          return(
            [...prev,singledata._id]
          )
        }
        else{
          return(
            [...prev]
          )
        }
        
      });

    } 
    function addtowishlist() {
      toast.success('Added to wishlist', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setwishlist((prev)=>{
        const newarr=[...prev]
        if(!(newarr.includes(singledata._id))){
          return(
            [...prev,singledata._id]
          )
        }
        else{
          return(
            [...prev]
          )
        }
        
      });
  
    }
    function buynow(id) {
      navigate("/cart")
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
      
    }

  const { id } = useParams();
  console.log(id)
  const mostpopURL = `/api/v1/${id}`
  const singledatafunc = async () => {
    try {
      let response = await fetch(mostpopURL);
      let data = await response.json();
      setsingledata(data);
    } catch (error) {
      console.log(error)
    }

  }
  const rows = [
    "developer", "publisher", "genres", "platform"
  ];

  return (
<>
<IconButton sx={{margin:"2rem 0 0 2rem"}} onClick={()=>navigate(-1)}>
          <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </IconButton>
    <Box sx={{ width: "90vw", backgroundolor: "pink", margin: "4rem auto", display: "flex", gap: "2rem", flexDirection: { xs: "column", md: "row-reverse" } }}>
    
      <Box sx={{ backgrounColor: "red", width: "100%", gap: "0.5rem", display: "flex", flexDirection: "column" }}>
      <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <Typography variant='h4' sx={{ fontWeight: "600" }}>{singledata.name}</Typography>
        <Typography variant='h5'>{singledata.price ? `Rs ${singledata.price}` : "free"}</Typography>
<Box sx={{display:"flex",alignItems:"center",gap:"1rem"}}>
        <Rating name="read-only" value={Number(singledata.rating)} readOnly precision={0.1} size="large" />
        <Typography>( {singledata.rating} )</Typography>
        </Box>
        <Box sx={{ width: "100%", display: { xs: "none", md: "flex" }, flexDirection: "column", gap: "1rem", magin: "auto" }}>
          <Button variant='contained' sx={{ marginTop: "1rem" }} onClick={()=>buynow(singledata._id)}>Buy Now</Button>
          {/* <ButtonGroup fullWidth> */}
            <Button variant='outlined' onClick={addtocart}>Add to cart</Button>
            <Button variant='outlined' onClick={addtowishlist}>Add to wishlist</Button>
          {/* </ButtonGroup> */}
          <Typography variant='body1' sx={{ color: "white", margin: "1rem 0", fontSize: { xs: "1.6rem", md: "1.2rem" } }}>{singledata.bodytext}</Typography>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table sx={{ width: "100%", fontSize: "1.6rem" }} aria-label="simple table">

              <TableBody>
                {rows.map((item,index) => {
                  return (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}
                    >
                      <TableCell component="th" scope="row">
                        {item}
                      </TableCell>
                      <TableCell align="right">{Array.isArray(singledata[item]) ? singledata[item].join(", ") : singledata[item]}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <div className='ovrcon' >
        <div className="ovelay2"></div>
        <Box component="img" src={singledata.imgv} alt={singledata.name} sx={{ width: { xs: "100%", md: "50vw" }, borderRadius: "0.5rem", xs: "" }} />
      </div>

      <Box sx={{ width: "100%", display: { xs: "flex", md: "none" }, flexDirection: "column", gap: "1rem", margin: "auto" }}>
        <Button variant='contained' onClick={()=>buynow(singledata._id)}>Buy Now</Button>
        {/* <ButtonGroup fullWidth> */}
          <Button variant='outlined' onClick={addtocart}>Add to cart</Button>
          <Button variant='outlined'onClick={addtowishlist}>Add to wishlist</Button>
        {/* </ButtonGroup> */}
        <Typography variant='body1' sx={{ color: "white", margin: "4rem 0", fontSize: { xs: "1.6rem", md: "1.2rem" } }}>{singledata.bodytext}</Typography>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table sx={{ width: "100%", fontSize: "1.6rem" }} aria-label="simple table">

            <TableBody>
              {rows.map((item,index) => {
                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}
                  >
                    <TableCell component="th" scope="row">
                      {item}
                    </TableCell>
                    <TableCell align="right">{Array.isArray(singledata[item]) ? singledata[item].join(", ") : singledata[item]}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
    </Box>
    <Footer></Footer>
    </>
  )
}

export default Singlepage