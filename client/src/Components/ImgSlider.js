import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Card } from './Context';

function ImgSlider() {
  const {isloading,setisloading}=useContext(Card)
  const [sliderData, setSliderData] = useState([])
  useEffect(() => {
    imgfunc();
  }, [])

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,

  };
  const URL = `/api/v1/filter?limit=5`
  const imgfunc = async () => {
    try {
      setisloading(true)
      let response = await fetch(URL);
      let data = await response.json();
      setisloading(false)
      setSliderData(data[0]);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="imgslider">
      {isloading?<Skeleton animation="wave" variant="rectangular" sx={{ width: "90vw", height: "20rem", bgcolor: 'grey.900',margin:"auto" }}></Skeleton>:
      
      <Slider {...settings}>
        {sliderData.map((item, index) => {
          return (
            <Link to={`/game/${item._id}`} key={index} style={{ textDecoration: 'none' }}>
            <div className='allcon' key={index}>
              <Typography sx={{position:"absolute",zIndex:"1999",fontFamily:"Montserrat, sans-serif",fontWeight:"600",bottom:"20%",paddingLeft:"2rem",color:"white"}} variant="h4">{item.name==="shadow of the tomb raider: definitive edition"?"shadow of the tomb raider":`${item.name}`}</Typography>
              <Typography sx={{position:"absolute",zIndex:"1999",fontFamily:"Montserrat, sans-serif",fontWeight:"300",margin:"auto",bottom:"10%",paddingLeft:"2rem",color:"white"}} variant="h5">{item.price===0?"free":`RS ${item.price}`}</Typography>
            <div  className="overcon">
            <div className="overlay"></div>
              <img src={item.imgv} />
              
            </div>
            
            
            </div>
            </Link>
          )
        })}

      </Slider>}
    </div>
  )
}

export default ImgSlider