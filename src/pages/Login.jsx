import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  IconButton, 
  InputAdornment,
  Alert
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import GroupIcon from '@mui/icons-material/Group';
import unilertLogo from "../assets/unilert-logo-dark.png";

function Login() {
  const [formData, setFormData] = useState({
    securityId: '',
    password: '',
  });
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { securityId, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  // Information slides for the right panel
  const infoSlides = [
    {
      title: "Campus Emergency Alerts",
      description: "Get instant notifications about emergencies, weather alerts, and critical situations on campus.",
      icon: <NotificationsActiveIcon sx={{ fontSize: 60, color: "#E8A317" }} />,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "24/7 Security Monitoring",
      description: "Our dedicated security team monitors campus activity round the clock to ensure student safety.",
      icon: <SecurityIcon sx={{ fontSize: 60, color: "#E8A317" }} />,
      image: "https://images.unsplash.com/photo-1557318041-1ce374d55ebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Community Safety Network",
      description: "Join thousands of students and staff in creating a safer campus environment for everyone.",
      icon: <GroupIcon sx={{ fontSize: 60, color: "#E8A317" }} />,
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  // Auto-transition between slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, [infoSlides.length]);
  
  useEffect(() => {
    if (isError) {
      setFormError(message);
    }
    
    if (isSuccess || user) {
      navigate('/');
    }
    
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!securityId || !password) {
      setFormError('Please enter both Security ID and password');
      return;
    }
    
    const userData = {
      securityId,
      password,
    };
    
    dispatch(login(userData));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "#f5f9ff",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        position: "relative"
      }}
    >
      {/* Background Shapes */}
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          top: '10%',
          left: '-5%',
          backgroundColor: 'rgba(0, 102, 204, 0.1)',
          borderRadius: '50px',
          transform: 'rotate(45deg)',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          bottom: '15%',
          right: '-2%',
          backgroundColor: 'rgba(0, 102, 204, 0.08)',
          borderRadius: '50px',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          top: '40%',
          right: '20%',
          backgroundColor: 'rgba(0, 102, 204, 0.15)',
          borderRadius: '25px',
          zIndex: 0
        }}
      />

      <Grid container sx={{ width: '100%', margin: 0, padding: 0, position: 'relative', zIndex: 1 }}>
        {/* Left side - Login Form */}
        <Grid item xs={12} md={5} 
          sx={{ 
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 2, md: 4 },
            height: "100vh"
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 450 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%"
              }}
            >
              {/* Logo and Title */}
              <Box 
                component="img" 
                src={unilertLogo} 
                alt="Unilert Logo"
                sx={{ 
                  width: 70, 
                  height: 70, 
                  mb: 1 
                }} 
              />
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: "bold", 
                  color: "#E8A317",
                  mb: 1
                }}
              >
                UNILERT
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#333", 
                  mb: 3 
                }}
              >
                Campus Safety Login
              </Typography>

              {/* Display error if any */}
              {formError && (
                <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                  {formError}
                </Alert>
              )}

              {/* Login Form */}
              <Box component="form" onSubmit={onSubmit} sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Security ID Number"
                  name="securityId"
                  value={securityId}
                  onChange={onChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SecurityIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={onChange}
                  variant="outlined"
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    backgroundColor: "#003366",
                    borderRadius: 2,
                    fontWeight: "bold",
                    mb: 2,
                    "&:hover": {
                      backgroundColor: "#002244"
                    }
                  }}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
              </Box>

              {/* Sign Up Link */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  Don't have an account?{" "}
                  <Typography
                    component={RouterLink}
                    to="/signup"
                    variant="body1"
                    sx={{
                      color: "#003366",
                      fontWeight: "bold",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline"
                      }
                    }}
                  >
                    Sign up
                  </Typography>
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
        
        {/* Right side - Information Slides */}
        <Grid item xs={12} md={7} 
          sx={{ 
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            overflow: 'hidden',
            height: "100vh",
            padding: 0
          }}
        >
          {infoSlides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 51, 102, 0.8)',
                color: 'white',
                opacity: currentSlide === index ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 4,
                zIndex: currentSlide === index ? 2 : 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: 4,
                  p: 4,
                  textAlign: 'center',
                  maxWidth: '80%'
                }}
              >
                {slide.icon}
                <Typography variant="h3" component="h2" fontWeight="bold" mb={2}>
                  {slide.title}
                </Typography>
                <Typography variant="h6">
                  {slide.description}
                </Typography>
              </Box>
            </Box>
          ))}
          
          {/* Slide indicators */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              zIndex: 3
            }}
          >
            {infoSlides.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: currentSlide === index ? '#E8A317' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;