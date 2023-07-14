import React from "react";
import { auth } from "../config/Firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginOtp = ({ onLogin }) => {
  const [Mobile, setMobile] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  // sending otp to user using react firebase API
  const sendOtp = async () => {
    try {
      let recaptchaVerifier = new RecaptchaVerifier(auth, "container", {});// captcha verification 
      const mobileFormate = `+91${Mobile}`;// mobile formate like indian +91 
      // sending otp and captcha verification 
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        mobileFormate,
        recaptchaVerifier
      );
      // console.log(confirmationResult);
      setUser(confirmationResult);
    } catch (err) {
      console.log(err);
    }
  };

  // verify the otp here 
  const onOTPVerify = async () => {
    try {
      await user.confirm(otp);
      console.log("OTP verified successfully");
      // console.log(Mobile, userPassword);
  
      try {
        const response = await fetch('http://localhost:1337/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Mobile: `+91${Mobile}`, userPassword: userPassword }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          const matchedData = data.find(matched => matched.match === 'Password Matched');
          if (matchedData) {
            const userDetails = matchedData.credentials;
            // console.log(userDetails);
  
            try {
              const responseLogin = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
              });
  
              if (responseLogin.ok) {
                const responseData = await responseLogin.json();
                const token = responseData.jwt;
                // console.log(token);
                localStorage.setItem('token', token);
                navigate('/');
                onLogin(true);
                return token;
              } else {
                console.error('Login failed:', responseLogin);
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            console.error('Password and Mobile Details are Not Matched.');
          }
        } else {
          console.error('Token request failed:', response);
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <p className="h4">Login By OTP And Password</p>
      </div>
      <div className="card-body bg-light">
      <p className="h4">Send OTP Here</p>
        <div className='form-group mt-3'>
          <label>
            EnterMobile:
            <input
            type="number"
            value={Mobile}
            name="mobile"
            placeholder="Mobile Number"
            required
            onChange={(e) => setMobile(e.target.value)}
          />
          </label>
        </div>
        <button onClick={sendOtp} className='btn btn-success btn-sm m-3'>Send OTP</button>
        <div id="container"></div>
        <p className="h4">Verify OTP Here</p>
        <div className='form-group mt-3'>
          <label>
            EnterOTP:
            <input
            value={otp}
            type="number"
            name="otp"
            placeholder="otp Number"
            required
            onChange={(e) => setOtp(e.target.value)}
          />
          </label>
          <div className='form-group mt-3'>
            <label>
              Password:
              <input
              type="password"
              value={userPassword}
              name="password"
              placeholder="User Password"
              required
              onChange={(e) => setUserPassword(e.target.value)}
            />
            </label>
        </div>
          <button onClick={onOTPVerify} className='btn btn-success btn-sm m-3'>Submit Otp And Password</button>
        </div>
        
      </div>
    </div>
  );
};

export default LoginOtp;
