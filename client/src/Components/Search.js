import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Box, FormControl, DialogActions, TextField, Typography, Avatar } from "@mui/material";
import { Card } from "./Context"
import { Link } from "react-router-dom"

function Search() {
  
  const [data, setdata] = useState([])

  const { name, setname } = useContext(Card)
  useEffect(() => {
    
      Search()
    

  }, [name]);
 
  const { togglesearch, settogglesearch } = useContext(Card)
  const handleClose = (event, reason) => {
    settogglesearch(false);
    setname("")
  };
  const handlechange = (e) => {
    setname(e.target.value.toLowerCase())
  }

  console.log(`name${name}`)
  const URL = `api/v1/search?name[$regex]=${name}`
  const Search = async () => {
    try {
      let response = await fetch(URL);
      let data = await response.json();
      // setisloading(false)
      setdata(data);

    } catch (error) {
      console.log(error)
    }
  }
  const list = name ? ((data.length) ? data.map((item) => {
    return (
      <Link to={`/game/${item._id}`} style={{ textDecoration: 'none' }}>
        <Box key={item._id} sx={{ display: "flex", alignItems: "center", fontSize: "2rem", columnGap: "1rem",padding:"1rem 2rem" ,oveflow:"hidden"}} onClick={handleClose}>
          <Avatar src={item.img} variant="square" sx={{borderRadius:"0.5rem",width:"5rem",height:"7rem"}}>
          </Avatar>
          <Typography sx={{ color: "white",fontSize:"1.6rem",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",overflow:"hidden" }}>{item.name}</Typography>
        </Box>
      </Link>
    )

  }) :<Box sx={{margin: "1rem 2rem"}}>No Results</Box>) : []

  return (
    <div>
      <Dialog disableEscapeKeyDown open={togglesearch} onClose={handleClose} sx={{ backdropFilter: "blur(0.5rem)", widh: "100%" }}>
        <DialogTitle sx={{ fontSize: "2.4rem" }}>Search</DialogTitle>
        <DialogContent >
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, width: "40rem" }}>
              <TextField id="outlined-basic" label="Search" variant="outlined" autoComplete="off" sx={{ width: "100%" }} value={name} onChange={handlechange} onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                }
              }} />
            </FormControl>
          </Box>

        </DialogContent>
        <Box sx={{ overflowY: "scroll", maxHeight: "40vh",with:"100%",paddng:"0 1rem"}}>

          {list}
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Search