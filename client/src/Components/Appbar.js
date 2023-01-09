import React, { useContext,} from 'react'
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Icon, Box, Stack, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Drawer, FormControl, Select, MenuItem, Tooltip, Typography } from '@mui/material'
import { PropTypes } from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StoreIcon from '@mui/icons-material/Store';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Sortfinal from './Sortfinal';
import { Card } from "./Context"
import { Outlet,useNavigate } from 'react-router-dom';
import Search from './Search';
import {Link} from "react-router-dom"

const icons = [<StoreIcon />, <DashboardIcon />, <ShoppingCartIcon />, <BookmarkIcon />]

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function Appbar({ iswidth }) {
    const navigate = useNavigate();
    function togglesort() {
        settogglesort(true);
    }
    function togglesearch(){
        settogglesearch(true)
    }

    
    const { settogglesort,showsearch,filter,twonav,settwonav,settogglesearch,filtshow,setfiltshow,userdetails } = useContext(Card)
 
    const [state, setState] = React.useState({
        left: false,
    });

    const drawerWidth = iswidth ? 0 : 240;
    function handleclick(event,newvalue){
        
            settwonav(event.target.value);
            const nav=event.target.value==="discover"?"/":"/browse"
            navigate(nav)
          
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : {xs:200,md:350}, backgroundColor: "#1e1e1e", height: "100%", display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center" }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List sx={{ width: "100%", mt: "2rem" }} disablePadding >
                {['store', "library", "cart", "wishlist"].map((text, index) => (
                    <Link to={`/${text==="store"?"":text}`} style={{textDecoration:"none"}} key={text} onClick={()=>toggleDrawer(anchor,true)}>
                    <ListItem  >
                        
                        <ListItemButton sx={{margin:"auto"}}>
                            <ListItemIcon>
                                {icons[index]}
                            </ListItemIcon>
                            <ListItemText sx={{color:"white"}}>{text}</ListItemText>
                        </ListItemButton>
                        
                    </ListItem>
                    </Link>
                ))}
            </List>
            {
                userdetails.username?<List sx={{ width: "100%", mb: "2rem" }} disablePadding>
                <Link to={`/account`} style={{textDecoration:"none"}}>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleIcon></AccountCircleIcon>
                            </ListItemIcon>
                            <ListItemText sx={{color:"white"}}>{userdetails.username}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    </Link>
                </List>:<List sx={{ width: "100%", mb: "2rem" }} disablePadding>
            <Link to={`/signup`} style={{textDecoration:"none"}}>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon></AccountCircleIcon>
                        </ListItemIcon>
                        <ListItemText sx={{color:"white"}}>Subscribe</ListItemText>
                    </ListItemButton>
                </ListItem>
                </Link>
            </List>
            }
            
        </Box>
    );
    return (
        <>
            <CssBaseline />
            <ElevationScroll>
                <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}>
                    <Toolbar>
                        {
                            iswidth ? <div>
                                {[<DragHandleIcon />].map((anchor) => (
                                    <React.Fragment key={"left"}>
                                        <IconButton onClick={toggleDrawer("left", true)} sx={{ mr: "2rem" }}>{anchor}</IconButton>
                                        <Drawer
                                            anchor={"left"}
                                            open={state["left"]}
                                            onClose={toggleDrawer("left", false)}
                                        >
                                            {list(anchor)}
                                        </Drawer>
                                    </React.Fragment>
                                ))}
                            </div> : ""
                        }
                        <Link to="/">
                        <IconButton sx={{ width: "3.235rem", height: "3.755rem", display: "flex", justifyContent: "center", alignItems: "center", m: "0.5rem 0" }}>
                            <img width="100%" alt="Epic Games logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/512px-Epic_Games_logo.svg.png"></img>
                        </IconButton>
                        </Link>
                            <FormControl varint="filled" sx={{ ml: "auto", backgrounColor: "red", hight: "3rem" }} >

                                <Select

                                    id="demo-simple-select"
                                    value={twonav}

                                    onChange={handleclick} sx={{ height: "100%" }}
                                >
                                    
                                    <MenuItem value="discover" sx={{color:"white"}}>Discover</MenuItem>
                                    
                                    
                                    <MenuItem value="browse"sx={{color:"white"}} >Browse</MenuItem>
                                    

                                </Select>
                            </FormControl>
                        
                        <Stack direction="row-reverse" spacing="0.rem" sx={{ ml: "auto" }}>
                            {!iswidth ? <>
                                <Tooltip title="Cart" arrow enterDelay={500}>
                                    <IconButton>
                                        <ShoppingCartIcon></ShoppingCartIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Wishlist" arrow enterDelay={500}>
                                    <IconButton>
                                        <BookmarkIcon></BookmarkIcon>
                                    </IconButton></Tooltip></> : ""}
                            <Tooltip title="Search" arrow enterDelay={500}>
                                <IconButton onClick={togglesearch} sx={{visibility:showsearch?"visible":"hidden"}}>
                                    <SearchIcon></SearchIcon>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Filter" arrow enterDelay={500}>
                                <IconButton onClick={togglesort} sx={{visibility:filter?"visible":"hidden"}}>
                                    <FilterAltOutlinedIcon title="sort"></FilterAltOutlinedIcon>
                                </IconButton>
                            </Tooltip>
                            
                        </Stack>
                    </Toolbar>
                </AppBar>

            </ElevationScroll>
            <Toolbar />
            <Search></Search>
            <Sortfinal></Sortfinal>
            
            <Outlet></Outlet>
        </>
    )
}
