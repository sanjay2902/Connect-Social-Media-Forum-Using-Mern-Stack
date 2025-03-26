import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains } from "validator";
import emailjs from "emailjs-com"; // Import emailjs-com

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
  };

  const sendOtp = async () => {
    if (!isEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    try {
      // Generate OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
  
      // Send the OTP email using EmailJS
      const templateParams = {
        to_email: formData.email,
        otp: generatedOtp,
      };
  
      await emailjs.send("service_k22tmde", "template_uovn3j9", templateParams, "5zwiV9WDxH0UMYF39");
  
      setOtpSent(true);
      alert("OTP has been sent to your email.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending the OTP. Please try again later.");
    }
  };
  
  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      alert("OTP verified successfully. You can now sign up.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0 || !otpVerified) return;

    try {
      const data = await signup(formData);

      if (data.error) {
        setServerError(data.error);
      } else {
        loginUser(data);
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred while signing up.");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Must contain only valid characters";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Must be a valid email address";
    }

    setErrors(errors);

    return errors;
  };

  return (
    <Container maxWidth={"xs"} sx={{ mt: { xs: 2, md: 6 } }}>
      <Stack alignItems="center">
        <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
          <Link to="/" color="inherit" underline="none">
            Connect++
          </Link>
        </Typography>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Typography color="text.secondary">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            autoFocus
            required
            id="username"
            name="username"
            onChange={handleChange}
            error={errors.username !== undefined}
            helperText={errors.username}
          />
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            autoComplete="email"
            required
            id="email"
            name="email"
            onChange={handleChange}
            error={errors.email !== undefined}
            helperText={errors.email}
          />
          {otpSent && (
            <>
              <TextField
                label="Enter OTP"
                fullWidth
                margin="normal"
                required
                id="otp"
                name="otp"
                onChange={handleOtpChange}
              />
              <Button onClick={verifyOtp} variant="outlined" sx={{ my: 2 }}>
                Verify OTP
              </Button>
            </>
          )}
          {!otpSent && (
            <Button onClick={sendOtp} variant="outlined" sx={{ my: 2 }}>
              Send OTP
            </Button>
          )}
          <TextField
            label="Password"
            fullWidth
            required
            margin="normal"
            autoComplete="password"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password !== undefined}
            helperText={errors.password}
          />
          <ErrorAlert error={serverError} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
            disabled={!otpVerified}
          >
            Sign Up
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default SignupView;
