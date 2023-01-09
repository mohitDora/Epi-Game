import React from 'react'
import {Box,Typography,FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, FormHelperText,TextField} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Card } from '../Components/Context';

function Signin() {
  const {setuserdetails}=useContext(Card)
  const navigate = useNavigate();
  const SchemaFrontend = Yup.object({
    username: Yup.string().min(5).max(25).required("Please Enter the USername").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,25})/,
      "Atleast Contain 5 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    email: Yup.string().email().required("Please Enter the Email Address"),
    pwd: Yup.string().min(5).required("Please Enter the Password").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    cpwd: Yup.string().required().oneOf([Yup.ref("pwd"), null], "Password must match")
  })

  const [showPassword, setShowPassword] = React.useState(false);

  const initialValues = {
    username: "", pwd: ""
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    // validationSchema: SchemaFrontend,
    onSubmit: (values, action) => {

      sendData();
      action.resetForm()
    }
  })
  const sendData = async () => {
    const { username, pwd } = values;
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, pwd,
      })
    })

    const data = await res.json();
    setuserdetails(data)
    if (res.status === 422 || !data) {
      toast.error('Invalid Signin', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("invalid");
      window.alert("Invalid Credentials")

    }
    else {

      toast('Sign In Successful', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/")
      console.log("success");
      window.alert("Signin Successful")
    }
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "70vw", md: "30vw", sm: "40vw" }, height: "100%", justifyContent: "center", alinItems: "center", backgroudColor: "red", rowGap: "2rem", margin: "5rem 0" }} component="form" onSubmit={handleSubmit} method="POST">
        <Typography sx={{ color: "white", fontSize: "2rem", textAlign: "center" }}>Sign In</Typography>

        <TextField label="Username" variant="outlined" autoComplete='off' name='username' value={values.username} onChange={handleChange} onBlur={handleBlur} helperText={errors.username} error={errors.username && touched.username ? true : false} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
       

        <FormControl variant="outlined" error={errors.pwd && touched.pwd ? true : false}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password" name="pwd" value={values.pwd} onChange={handleChange} onBlur={handleBlur}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.pwd && touched.pwd ? <FormHelperText id="component-helper-text">
            {errors.pwd}
          </FormHelperText> : ""}

        </FormControl>
        
        <Button type='submit' variant='contained' >Submit</Button>
        <Typography sx={{ color: "white" }}>
          New to Epic?&nbsp;
          <Link to='/signup' style={{ ion: "underline", color: "#1e88e5" }}>Create an Account</Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Signin