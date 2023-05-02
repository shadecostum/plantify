
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
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { addDoc, collection  } from 'firebase/firestore';
import {  useState } from 'react';
import { db ,auth} from '../src/Firebase/Config';
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




export default function Sighnupp() {
 
    const [userName, setuserName] = useState("")
    const [emailS, setEmail] = useState("")
    // const [phoneN, setphoneN] = useState("")
    const [passW, setpassW] = useState("")
    const [uuid,setuuid]= useState({id:""})
    const [phoneN, setphoneN] = useState("");
   const [error, setError] = useState("");
    // const [checkLog, setcheckLog] = useState([])
  
    // const {auth} = useContext(firebaseContext);
  //  const collectionRef=collection(db,"userss");
  
  
  const navi=useNavigate();
  const classes = useStyles();

  const alredy=()=>
  {
    navi('/loginn')
  }
  
    const handleDat = (e)=>
    {
        const phone = e.target.value;
            // Define a regular expression that matches a valid phone number with 10 digits
            const phoneRegex = /^[0-9]{10}$/;
            if (phoneRegex.test(phone)) {
              setphoneN(phone);
              setError("");
            } else {
              setphoneN("");
              setError("Please enter a valid phone number with 10 digits");
            }
     
        e.preventDefault();  
  
       createUserWithEmailAndPassword(auth,emailS,passW).then((userCredential)=>
       {
         console.log(userCredential);
         navi('/login')
         const uid = userCredential.user.uid;
         setuuid({
          id:uid
        });
         console.log(uuid);
         const userRef = collection(db, 'users')
         addDoc(userRef, {name:userName,email:emailS,phone:phoneN,id:uid})
         }).catch(error=>
          {
            console.log(error.message);
            alert(error.message)
          })

  
          
        } 
          
       
          
    
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
              SIGN UP
          </Box>
        </Typography>
        <Typography component="div">
          <Box fontSize={16} m={1} paddingT onClick={alredy}>
            Sign into your account
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
                type='email'
                label="Email"
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
                className={classes.inputF}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                
                label="User name"
                name="text"
                autoComplete="text"
                autoFocus
               
              value={userName}
                
            onChange={(e)=>
            {
              setuserName(e.target.value)
            }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Mail color="disabled"/></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={9}>
      <TextField
        className={classes.inputF}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Phone Number"
        name="number"
        type="number"
        autoComplete="number"
        autoFocus
        value={phoneN}
        onChange={(e)=>
            {
              setphoneN(e.target.value)
            }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail color="disabled" />
            </InputAdornment>
          ),
        }}
      />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
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
                Sign In
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
              onClick={alredy}
              >
              Alredy have account
              </Button>
            </Grid>

          </Grid>

          
        </form>
      </div>
    </Container>
    </MuiThemeProvider>
  );
}
