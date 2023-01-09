import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51MLh0rSBlgwzAysxqCBsBj8HI1ITTbYUOrozyH4G6bMloYPM06vcWmDwtKrqCPOsuwae7B9FLSqhg7mBimyc505L00CHZa4tGu"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}