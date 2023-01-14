// import * as dotenv from 'dotenv'
const express=require("express");
const mongoose=require("mongoose")
const router=require("./APIRouter");
const userRouter=require("./UserRouter");
const commentRouter=require("./Commentrouter")
const stripe = require("stripe")("sk_test_51MLh0rSBlgwzAysxakqHBjcrKG0FBqB7j1EUY4nIZ8V0NHdhBuKzw8rRROvxI4VBY6oD24vuUpmyVqEP2I029kZu00II531Y99")
const cors = require("cors")
const path=require("path")
const dotenv=require("dotenv")

dotenv.config()

const app=express();

const db="mongodb+srv://Mohitdora:Mohitdora@cluster0.5aukl3h.mongodb.net/API?retryWrites=true&w=majority"

// async function run(){
// 	const a=await mongoose.connect(db)
// 	if(a){
// 		console.log("Database Connected")
// 	}
// 	else{
// 		console.log("error")
// 	}
// }	
// run();
mongoose.connect(db,{
	useNewUrlParser:true,
	useUnifiedTopology:true
}).then(() => {
    console.log("User Database Successfully Connected")
}).catch((err) => {
    console.log("Failed to connect to the database")
})

const port=process.env.PORT||8000;
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(userRouter);
app.use(router);

app.use(commentRouter)

// app.post("/payment", cors(), async (req, res) => {
// 	let { amount, id } = req.body
// 	try {
// 		const payment = await stripe.paymentIntents.create({
// 			amount,
// 			currency: "INR",
// 			description: "Epic Game Store",
// 			payment_method: id,
// 			confirm: true
// 		})
// 		console.log("Payment", payment)
// 		res.json({
// 			message: "Payment successful",
// 			success: true
// 		})
// 	} catch (error) {
// 		console.log("Error", error)
// 		res.json({
// 			message: "Payment failed",
// 			success: false
// 		})
// 	}
// })







// const YOUR_DOMAIN = 'http://localhost:8000';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '1800',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/`,
//     cancel_url: `${YOUR_DOMAIN}/error`,
//   });

//   res.redirect(303, session.url);
// });










// if(process.env.NODE_ENV=="production"){
// 	app.use(express.static("client/build"))
// }

app.use(express.static(path.join(__dirname,"./client/build")))

app.get('*', function (req, res) {
	
	res.sendFile(path.join(__dirname,"./client/build/index.html"))
	
	
  })

app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})