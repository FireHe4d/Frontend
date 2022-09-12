import React, {useState} from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText} from "@material-ui/core"
import { useNavigate } from "react-router";
import { PostWithoutAuth } from "../../service/HttpService";
import { Routes,Route, Link, BrowserRouter} from "react-router-dom";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './styles.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import Divider from "@material-ui/core/Divider";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import TryIcon from '@mui/icons-material/Try';
import LogoutIcon from '@mui/icons-material/Logout';

function Regis() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
    const handleUsername = (value) => {
        setUsername(value)
    } 

    const handlePassword = (value) => {
        setPassword(value)
    } 

    const sendRequest = (path) => {
        PostWithoutAuth(("/auth/"+path), {
          email : username, 
            password : password,
          })
          .then((res) => res.json())
          .then((result) => {
            if(result.accessToken!=null&&result.refreshToken!=null&&result.userId!=null){
            localStorage.setItem("tokenKey",result.accessToken);
                            localStorage.setItem("refreshKey",result.refreshToken);
                            localStorage.setItem("currentUser",result.userId);
                            localStorage.setItem("user_name",username)}})
          .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        console.log(localStorage)
        window.location.reload(false)
        navigate('/');
    }
  
    return(

        <div className='home'>
      <div className='parent'>
        <div className="wrapper child1">
          <input type="checkbox" id="btn" hidden />
          <label htmlFor="btn" className="menu-btn">
            <MenuIcon />
            <ExpandLessIcon />
          </label>
          <nav id="sidebar">
            <div className="title">Receipt Menu</div>

              <ul className="list-items">
              <li>
                <h1>Main</h1>
              </li>
              <li>
                <Link to="/">
                  <HomeIcon />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/random">
                  <ShuffleIcon />
                  Random Receipts
                </Link>
              </li>
              <li>
                <Link to="/trend">
                  <WhatshotIcon />
                  Trending
                </Link>
              </li>
              <li>
                <h1>Account</h1>
              </li>
             
              <li>
              <Link to="/auth">
                {localStorage.getItem("currentUser") == null?  <LoginIcon />:
           "" }
               {localStorage.getItem("currentUser") == null?  "Login":
             ""}
                  
                  </Link>
              </li>
              <li>
              <Link to="/register">
                {localStorage.getItem("currentUser") == null?  <HowToRegIcon />:
            "" }
               {localStorage.getItem("currentUser") == null?  "Register":
             ""}
                 
                 </Link>
              </li>
              
              <li>
              <Link to="/profile">
                {localStorage.getItem("currentUser") == null?  "":
            <AccountBoxIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Profile"}
                  
                  </Link>
              </li>
              <li>
              <Link to="/favorite">
                {localStorage.getItem("currentUser") == null?  "":
            <FavoriteIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Favorite"}
                  
                  </Link>
              </li>
              <li>
              <Link to="/remember">
                {localStorage.getItem("currentUser") == null?  "":
            <BookIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Remember"}
                  
                  </Link>
              </li>
              <li>
              <Link to="/tried">
                {localStorage.getItem("currentUser") == null?  "":
            <TryIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Tried"}
                  
                  </Link>
              </li>
              <li>
              <Link to="/" >
                {localStorage.getItem("currentUser") == null?  "":
            <LogoutIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Logout"}
                  
                  </Link>
              </li>
              <li>
                <h1>Service</h1>
              </li>
              <li>
                <a href="/setting">
                  <SettingsIcon />
                  Setting
                </a>
              </li>

                <div className="icons">
                  <a href="#" aria-label="Facebook">
                    {" "}
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="twitter">
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="Github">
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="youtube">
                    <FacebookIcon />
                  </a>
                </div>
              </ul>

          </nav>
        </div>

      
       
      </div>
      <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          
        </div>
        <Divider orientation="vertical" flexItem></Divider>


        {/* List & Empty View */}
        <div className='home_list-wrap'>

        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input  onChange = {(i) => handleUsername(i.target.value)}/>
            <InputLabel  style={{top: 80}}>Password</InputLabel>
            <Input  style={{top: 40}}
            onChange = {(i) => handlePassword(i.target.value)}/>
            <Button variant = "contained"
                style = {{marginTop : 60,
                background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color : 'white'}}
                onClick= {() => handleButton("register")}>Register</Button>
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            <Button component={Link} to="/auth" variant="contained" color="primary">
  Login
</Button>
            
        </FormControl>

        </div>
        <Divider orientation="vertical" flexItem></Divider>
        
      </div>
    </div>
       
    )
}

export default Regis;