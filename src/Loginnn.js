
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Lock from '@material-ui/icons/Lock';
import Mail from '@material-ui/icons/Mail';
import './Loginnn.css'
import { auth} from '../src/Firebase/Config'
import {signInWithEmailAndPassword} from 'firebase/auth';
import {  useState } from 'react';

import { useNavigate } from 'react-router-dom';
// import Log from './ab.jpg'

const theme = createMuiTheme({
  palette:{
    primary:{main: '#F5B62A'},
    secondary:{main:'#383938'},
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    backgroundColor: 'white',
    borderradius: '4px',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
  },
  inputF:{

  },
  avatar: {
    margin: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signup: {
    margin: theme.spacing(-2, 0, 2),
  },
}));




export default function Loginnn() {
  const classes = useStyles();
  const navi=useNavigate();
  const navlog=()=>
  {
    navi('/signupp')
  }

  const handleDat= (e)=>
  {
      e.preventDefault();  

      signInWithEmailAndPassword(auth,emailS,passW).then((userCredential)=>
      {
        console.log(userCredential);
        
        navi('/home')
      }).catch((error)=>
      {
        console.log(error);
        alert(error.message)
      })
    }



      const [emailS, setEmail] = useState("")
  
      const [passW, setpassW] = useState("")
    
  return (
    <MuiThemeProvider theme={theme}>
    <Container component="main" maxWidth="sm" onSubmit={handleDat}>
      <CssBaseline />
      <div className={classes.paper}>
      <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
      >   
        <Grid item xs={9}>
            {/* <img src={Log} maxWidth="300" alt="Logo" className={classes.avatar} /> */}
        </Grid>
      </Grid>
        
        <Typography component="div">
          <Box fontSize={30} fontWeight={600} m={-2} >
              Login page
          </Box>
        </Typography>
        <Typography component="div">
          <Box fontSize={16} m={1} paddingT>
            Login into your account
          </Box>
        </Typography>
        <form className={classes.form} noValidate>
          <Grid 
              container
              direction="row"
              justify="center"
              alignItems="center"
          >
            <Grid item xs={9}>
              <TextField
                className={classes.inputF}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={emailS}
                onChange={(e)=>
                  {
                    setEmail(e.target.value)
                  }} 
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Mail color="disabled"/></InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={9}>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              
              autoComplete="current-password"
              value={passW}
            onChange={(e)=>
              {
                setpassW(e.target.value)
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock color="disabled" /></InputAdornment>,
              }}
              />
            </Grid>

            <Grid item xs={9}>
              <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              />
            </Grid>
              
            <Grid item xs={9} >
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              m={0}
              >
                Login
              </Button>
            </Grid>

            {/* <Grid item>
              <Link href="#" variant="body2" color="secondary" >
                Forgot your password?
              </Link>
            </Grid> */}

            {/* <Grid item xs={9}>  
              <Typography component="div">
                <Box fontSize={20} m={3} paddingT>
                  <Link href="#" color="secondary" >
                        YOU DO NOT HAVE AN ACCOUNT?
                  </Link>
                </Box>
              </Typography>
            </Grid> */}

            <Grid item xs={9}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.signup}
              m={-1}
              onClick={navlog}
              >
              Create an account
              </Button>
            </Grid>

          </Grid>

          
        </form>
      </div>
    </Container>
    </MuiThemeProvider>
  );
}
