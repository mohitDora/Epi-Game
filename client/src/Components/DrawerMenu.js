import React from 'react'
import { Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, CssBaseline, Icon } from '@mui/material'
import StoreIcon from '@mui/icons-material/Store';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Appbar from './Appbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from 'react-router-dom';


export default function DrawerMenu({ iswidth }) {
  const drawerWidth = iswidth ? 240 : 0;
  return (
    <>
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />

      <Appbar iswidth={!iswidth}></Appbar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 1,
          border:"none",
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box', display: "flex", justifyContent: "space-around"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <Icon sx={{ width: "4.68rem", height: "5.436rem", m: "0 auto" }}>
          <img width="100%" alt="Epic Games logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/512px-Epic_Games_logo.svg.png"></img>
        </Icon>

        <List sx={{ mt: "0rem" }} disablePadding>
          {['Store', "Library"].map((text, index) => (
            <ListItem key={text} >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <StoreIcon /> : <DashboardIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>

          ))}
        </List>
        <List sx={{ width: "100%", m: "0 auto" }} disablePadding>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>

                <AccountCircleIcon></AccountCircleIcon>

              </ListItemIcon>
              <ListItemText>Account</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>

      </Drawer>
    </Box>
    
    </>
  )
}
