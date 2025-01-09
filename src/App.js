import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from 'react';
import { Routes ,Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { useAuth } from './context/GlobalState';
import { auth } from './firebase';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import Orders from './components/Orders/Orders';

const App = () => {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51Qeht8D89dEBPSrngkj9D8QZ8bIKiOcAUyrVUZDB6Dcmpjwm1XWTAmYRFfYGusRJOztzZLCE47lAgnte7SzaH91400D1n8rppi"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<><Header /> <Home/></>}></Route>
        <Route path="/checkout"element={<><Header /><Checkout /></>}></Route>
        <Route path="/orders"element={<><Header /><Orders /></>}></Route>
        <Route path="/payment"element={<>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<h1>page Not found </h1>}></Route>
      </Routes>
    </div>
  )
}

export default App