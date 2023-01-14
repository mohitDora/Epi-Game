import { loadStripe } from "@stripe/stripe-js";
let stripepromise;
const getStripe=()=>{
if(!stripepromise){
    stripepromise=loadStripe("pk_test_51MLh0rSBlgwzAysxqCBsBj8HI1ITTbYUOrozyH4G6bMloYPM06vcWmDwtKrqCPOsuwae7B9FLSqhg7mBimyc505L00CHZa4tGu");

}
return stripepromise
}
export default getStripe;