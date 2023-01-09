import './App.css';
import './style.css';
// import CardTemplate from './Components/CardTemplate';
import MostPop from './Pages/MostPop';
import Appbar from './Components/Appbar';
import DrawerMenu from './Components/DrawerMenu';
import React,{ useContext, useEffect, useState } from 'react';
import Browse from './Pages/Browse';
import { Route, Routes,useNavigate } from 'react-router-dom';
import Error from './Pages/Error';
import Discover from './Pages/Discover';
import Cart from "./Pages/Cart"
import Whishlist from "./Pages/Whishlist"
import Singlepage from "./Pages/Singlepage"
import Signup from './Pages/Signup';
import Signin from "./Pages/Signin"
import MustSignin from './Pages/MustSignin';
import Account from "./Pages/Account"
import Library from './Pages/Library';
import Comment from './Pages/Comment';
import { Card } from './Components/Context';

function App() {
  const {userdetails,setuserdetails,setfilter,filter}=useContext(Card)
  const navigate=useNavigate();
  const ready=async()=>{
    try {
      const res=await fetch("/validate",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const data= await res.json();
      setuserdetails(data);
      // setcart(data.cart);
      // setwishlist(data.wishlist)
      if(!res.status===200){
        throw new Error("invalid")
      }
    } catch (error) {
      console.log(error);
      navigate("/auth")
    }
  }
  // const [screensize, setscreensize] = useState()
  // useEffect(() => {
  //   const screenWidth = window.innerWidth;
  //   setscreensize(screenWidth)
  // }, [])
  useEffect(()=>{
    ready();
    
  },[])
  useEffect(()=>{
    ready();
    
  },[userdetails.username,userdetails.length])


  




  return (
   
    <>
    <Routes>
      {/* <Route path='/' element={screensize > "1000" ? <DrawerMenu iswidth="true"></DrawerMenu> : <Appbar iswidth="false"></Appbar>}> */}
      <Route path='/' element={<Appbar iswidth="false"></Appbar>}>
      {/* <Route path="/" element={<Discover iswidth={screensize>"1000"?"false":"true"}></Discover>}> </Route> */}
      <Route path="/" element={<Discover iswidth="true"></Discover>}> </Route>
      {/* <Route path="/browse" element={<Browse iswidth={screensize>"1000"?"false":"true"}></Browse>}> </Route> */}
      <Route path="/browse" element={<Browse iswidth="true"></Browse>}> </Route>
      <Route path="/cart" element={<Cart></Cart>}> </Route>
      <Route path="/wishlist" element={<Whishlist></Whishlist>}> </Route>
      <Route path="/game/:id" element={<Singlepage></Singlepage>}> </Route>
      <Route path='/library' element={<Library></Library>}></Route>
      <Route path='/account' element={<Account></Account>}></Route>
      <Route path='/comment' element={<Comment></Comment>}></Route>
      </Route>
      
      <Route path="/signin" element={<Signin></Signin>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path='/auth' element={<MustSignin></MustSignin>}></Route>
      <Route path='*' element={<Error></Error>}></Route>
      
    </Routes>
    </>


  );
}

export default App;
