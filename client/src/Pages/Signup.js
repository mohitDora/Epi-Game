import React, { useContext } from 'react'
import { TextField, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography, Button, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Card } from '../Components/Context';
// import nodemailer from "nodemailer"

toast.configure()
function Signup() {
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
    username: "", email: "", pwd: "", cpwd: ""
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: SchemaFrontend,
    onSubmit: (values, action) => {

      sendData();
      action.resetForm()
    }
  })
  const sendData = async () => {
    const { username, email, pwd, cpwd } = values;
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, email, pwd,cpwd
      })
    })

    const data = await res.json();
    setuserdetails(data)
    if (res.status === 422 || !data) {
      toast.error('Invalid Registration', {
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
    

    }
    else {

      toast.success('Registration Successful', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // transporter.sendMail(mailoptions,function(error,info){
      //   if(error){
      //     console.log(error)
      //   }
      //   else{
      //     console.log("Email Sent")
      //   }
      // })
      navigate("/")
      console.log("success");
      
    }
  }

  // var transporter=nodemailer.createTransport({
  //   service:"gmail",
  //   auth:{
  //     user:"densesignificance@gmail.com",
  //     pass:"whakufzyernbmeex"
  //   },
  //   port:465,
  //   host:"smtp.gmail.com"
  // });

  // var mailoptions={
  //   from:"densesignificance@gmail.com",
  //   to:values.email,
  //   subject:"Successfully Created Account in Epic Game Store",
  //   text:`Thank you ${values.username} for visiting my site`
  // }

 
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "70vw", md: "30vw", sm: "40vw" }, height: "100%", justifyContent: "center", alinItems: "center", backgroudColor: "red", rowGap: "2rem", margin: "5rem 0" }} component="form" onSubmit={handleSubmit} method="POST">
        <Typography sx={{ color: "white", fontSize: "2rem", textAlign: "center" }}>Sign Up</Typography>

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
        <TextField label="Email Address" variant="outlined" autoComplete='off' type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} helperText={errors.email && touched.email ? errors.email : ""} error={errors.email && touched.email ? true : false} />

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
          {errors.pwd  ? <FormHelperText id="component-helper-text">
            {errors.pwd}
          </FormHelperText> : ""}

        </FormControl>
        <FormControl variant="outlined" error={errors.cpwd && touched.cpwd ? true : false}>
          <InputLabel htmlFor="outlined-adornment-conpassword">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-conpassword" name="cpwd" value={values.cpwd} onChange={handleChange} onBlur={handleBlur}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end" required
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
          {errors.cpwd && touched.cpwd ? <FormHelperText id="component-helper-text">
            {errors.cpwd}
          </FormHelperText> : ""}
        </FormControl>
        <Button type='submit' variant='contained' >Submit</Button>
        <Typography sx={{ color: "white" }}>
          Already have an account?&nbsp;
          <Link to='/signin' style={{ ion: "underline", color: "#1e88e5" }}>Sign In</Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Signup