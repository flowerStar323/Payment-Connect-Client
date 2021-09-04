import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Header from "../layout/Header";
import CheckoutForm from './CheckoutForm';

import "./style.css";

const stripePromise = loadStripe("pk_test_51JNpgZDBj7KAGNwd9GBwFtUuvsRrIlQUyBxIySJ5eXwM95pNPSx5iRKeICBTjIbJ0c6SlnM6CqcY7U5P1Gif71mK00YVd4a2eI");

export default function Payment() {
  return (
    <div className="index-root">
      <Header />
      <div className="payment-container">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
        <Link to={{ pathname: "https://www.embracedinternational.org/donate" }} target="_blank">I would like to donate a different amount</Link>
      </div>
    </div>
  );
}
