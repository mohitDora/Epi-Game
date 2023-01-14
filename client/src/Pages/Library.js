import React from 'react'
import { Paper,CardActionArea,CardMedia,CardContent,Typography,Box, IconButton,Button } from '@mui/material'
import { Link,useNavigate } from 'react-router-dom'
import { useContext,useEffect } from 'react'
import { Card } from '../Components/Context'
import { useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

function Library() {

    const {library,setlibrary,setshowsearch} =useContext(Card);
    const [libdata,setdata]=useState([]);
    const navigate=useNavigate()
    let urlparam = "";

  const singledatafunc = async () => {
    try {
      for (let i = 0; i < (library).length; i++) {
        urlparam = urlparam + `_id=${library[i]}&`
      }
      
      
      const URL = `/api/v1/filter?${urlparam}`
      let response = await fetch(URL);
      let data = await response.json();
      library.length?
      setdata(data[0]):setdata([])
      

    } catch (error) {
      console.log(error)
    }

  }
console.log(libdata)
  useEffect(() => {
    singledatafunc();
  
    
  }, [library])

useEffect(()=>{
  setshowsearch(true)
},[])
  function deleteID(id){
    console.log(`id:${id}`)
    const newArr=library.filter((item)=>{
      return item!==id
    })
    setlibrary(newArr)
  }
console.log(libdata.length)
  const dis=libdata.map((item)=>{
    return(
        <Paper key={item._id} sx={{minWidth: {xs:"12rem",sm:"12rem"},maxWidth: {xs:"12rem",sm:"12rem"}, boxShadow: "none",backgroundColor: "none", position: "relative"}} >
      
      <Link to={`/game/${item._id}`} style={{ textDecoration:"none"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{height:{xs:"15rem",md:"15rem" }}}
          image={item.img}
        alt=""
        />
        <CardContent sx={{ ml: "0.0rem", p: "1rem",color:"white",textTransform:"capitalize"}}>
          <Typography variant="h5" component="div" sx={{ fontSize: "1rem" ,textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",overflow:"hidden"}} gutterBottom>
            {item.name}
          </Typography>
          
        </CardContent>
        </CardActionArea>
        </Link>
      
<IconButton>
    <DownloadIcon></DownloadIcon>
</IconButton>
<IconButton onClick={()=>deleteID(item._id)}>
    <DeleteIcon></DeleteIcon>
</IconButton>
      
    </Paper>
    )
  })
  
  return (
    <>
    <Typography sx={{color:"white"}} variant="h3">wishlist</Typography>
    library?.length?<Box sx={{display:"flex",width:"90vw",margin:"auto",gap:"2rem",marginTop:"2rem",flexWrap:"wrap",justifyContent:"space-around"}}>
    {dis}
    </Box>:<Box sx={{display:"flex",flexDirection:"column",width:"50vw",justifyContent:"center",alignItems:"center",gap:"2rem",margin:"auto",marginTop:"2rem"}}><Typography sx={{color:"white"}}>No item is library</Typography>
    <Button variant='outlined' onClick={()=>navigate("/browse")}>Continue Browsing</Button>
    </Box>
    </>
  )
}

export default Library