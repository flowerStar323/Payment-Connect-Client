import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function CheckoutForm() {
  const [amount, setAmount] = useState();
  const [isSelected, setSelected] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const auth = useSelector(store => store.auth)

  const onSelectChange = e => {
    setAmount(e.target.value);
    setSelected(true);
  };

  useEffect(() => {
    setAmount(amount);
  }, [amount]);

  function stripeTokenHandler(token) {
    const paymentData = {
      id: auth.user.id,
      token: token.id,
      amount,
      description: 'Donate with 3 entries'
    };
  
    return axios.post('/charge', paymentData).then(e => {
      if (e) {
        console.log(e.data)
        localStorage.setItem("token", e.data.token);
        window.location.replace('/matchup')
      }
    }).catch(err => notification.warning({ message: "Warning!", description: err.response.data }))

  
    /*
    const response = fetch('/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData),
    })
    .then(res => {
      
      if (res.ok) {
        console.log(res.countANDpay)
        // localStorage.setItem("token", e.data.token);
        // window.location.replace('/matchup')
      }
    });
    */
    
    // Return and display the result of the charge.
    // return response.json();
    return;
  }
  
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  };

  return (
    <form className="stripe-form" onSubmit={handleSubmit}>
      <select
        className='amount-select'
        value={amount}
        style={{ color: isSelected ? '#32325d' : '#D0D0D0' }}
        onChange={onSelectChange}
      >
        <option value="" readOnly hidden>
          Please choose the donation amount.
        </option>
        <option value='1000'>$10: One entry</option>
        <option value='2500'>$25: Three entries</option>
        <option value='5000'>$50: Seven entries</option>
      </select>

      <label>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
      <button type="submit" disabled={!stripe || !amount}>Confirm order</button>
    </form>
  );
}