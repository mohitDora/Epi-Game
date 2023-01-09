import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Box, FormControl, InputLabel, Select, MenuItem, DialogActions, Typography, Slider,RadioGroup,FormControlLabel,Radio } from '@mui/material'
import { Card } from "./Context"

const genres = ["All", 'Adventure', 'Action', 'Open World', 'Shooter', 'Racing', 'Metroidvania', 'Sports', 'Horror', 'casual']

function Sortfinal() {
    const {  setisloading } = useContext(Card);
    useEffect(() => {
        datafunc();
        setisloading(true)
    }, [])
    const { togglesort,setcount, settogglesort, setbrowsedata, page, setpage,settotalpage  } = useContext(Card);

    const [sortstate, setsortstate] = useState({
        genres: "All", operator: "gte",radio:""
    })

    const handleChange = (event) => {
        setsortstate((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    

    const [value1, setValue] = useState([0, 6500]);

    const handleChange2 = (event, newValue) => {
        setValue(newValue);
    };
    const [value2, setValue2] = useState(3);

    const handleChange3 = (event, newValue) => {
        setValue2(newValue);
    };
    const handleClose = (event, reason) => {
        settogglesort(false);
    };

    const genrelist = genres.map((item, index) => {
        return <MenuItem key={index} value={item}>{item}</MenuItem>
    })
    let mostpopURL ;
    
    if((sortstate.genres === "All")){
        if(sortstate.radio){
            mostpopURL=mostpopURL=`/api/v1/filter?${sortstate.radio}=true`
        }
        else{
            mostpopURL=`/api/v1/filter?price[gte]=${value1[0]}&price[lte]=${value1[1]}&rating[${sortstate.operator}]=${value2}&page=${page}&limit=12`
            
        }       
    }
    else{
        if(sortstate.radio){
            mostpopURL=`/api/v1/filter?genres=${sortstate.genres}&price[gte]=${value1[0]}&price[lte]=${value1[1]}&rating[${sortstate.operator}]=${value2}&page=${page}&limit=12&${sortstate.radio}=true`
        }
        else{
            mostpopURL=`/api/v1/filter?genres=${sortstate.genres}&price[gte]=${value1[0]}&price[lte]=${value1[1]}&rating[${sortstate.operator}]=${value2}&page=${page}&limit=12`
        }
        
    }
  
    
    const datafunc = async () => {
        try {
            let response = await fetch(mostpopURL);
            let data = await response.json();
            setisloading(false)
            setbrowsedata(data[0]);
            settotalpage(data[1])
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    function applyfilter() {
        datafunc();
        // datafunc2()
        setpage(1)
    }
    useEffect(() => {
        datafunc();
        // datafunc2()
        setisloading(true)
    }, [page])
    return (
        <Box >
            <Dialog disableEscapeKeyDown open={togglesort} onClose={handleClose} sx={{ backdropFilter: "blur(0.5rem)", width: "100%" }}>
                <DialogTitle sx={{ fontSize: "2.4rem" }}>Filters</DialogTitle>
                <DialogContent sx={{ with: "40rem", hight: "40rem" }}>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', width: "100%", rowGap: "3rem", heght: "100%", alignItems: "space-around" }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="demo-dialog-native">Genres</InputLabel>
                            <Select
                                id="demo-simple-select"
                                value={sortstate.genres}
                                label="Genres"
                                onChange={handleChange} name="genres" >
                                {genrelist}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }}>
                            <Typography gutterBottom sx={{ color: "white" }}>Price</Typography>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={value1}
                                min={0}
                                step={10}
                                max={6500}
                                onChange={handleChange2}
                                valueLabelDisplay="auto"
                                sx={{ width: "100%" }}
                            />
                        </FormControl>
                        <FormControl sx={{ display: "flex", width: "100%", flexDirection: "row", gap: "2rem", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography gutterBottom sx={{ color: "white" }}>Rating</Typography>

                            <Select

                                id="demo-simple-select"
                                value={sortstate.operator}
                                name="operator"
                                onChange={handleChange}
                                sx={{ widh: "2rem" }}
                            >
                                <MenuItem value="eq">=</MenuItem>
                                <MenuItem value="lt">&lt;</MenuItem>
                                <MenuItem value="gte">&gt;</MenuItem>
                            </Select>
                            <Slider
                                aria-label="Temperature"
                                defaultValue={30}
                                value={value2}
                                onChange={handleChange3} valueLabelDisplay="auto"
                                step={0.5}
                                marks
                                min={0}
                                max={5}
                            />
                        </FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"                           
                            value={sortstate.radio}
                            name="radio"
                            onChange={handleChange} 
                        >
                             <FormControlLabel value="" control={<Radio />} label="All" />
                            <FormControlLabel value="isfree" control={<Radio />} label="Free" />
                           
                            <FormControlLabel value="ispopular" control={<Radio />} label="Most Popular" />
                            <FormControlLabel value="isnew" control={<Radio />} label="New" />
                        </RadioGroup>
                    </Box>

                </DialogContent>
                <DialogActions sx={{ margin: "1rem 0" }}>
                    <Button variant='contained' disableElevation onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' disableElevation onClick={() => { handleClose(); applyfilter() }} type="submit">Apply</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Sortfinal