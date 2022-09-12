import React, {useState} from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText} from "@material-ui/core"
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

import { Routes, Link, BrowserRouter} from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

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

function Setting() {
    const [selectedMode, setSelectedMode] = useState(true);

    const [selectedLanguage, setSelectedLanguage] = useState(true);
    const [value, setValue] = useState(5);

    const handleChangeMode = (event,value) => {
        setSelectedMode(event.target.checked);
    
      };
      const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("user_name")
      }
      const handleChangeLanguage = (event,value) => {
        setSelectedLanguage(event.target.value);
      };
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
              <Link to="/" onClick={logout}>
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

        
            <p>Dark/Light Mode</p>
        <Checkbox
                checked={selectedMode}
                onChange={handleChangeMode}
                inputProps={{ 'aria-label': 'controlled' }}
                color="primary"
            />
            <p>Language</p>

<Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLanguage}
          label="Language"
          onChange={handleChangeLanguage}
        >
  <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <p>Rating</p>

        <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
        <p>Problem Form</p>
        <FormControl>
<TextField fullWidth label="Problem..." id="fullWidth" />

<Button variant = "contained"
                style = {{marginTop : 60,
                background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color : 'white'}}
                onClick= {() => alert("login")}>Send The Problem</Button>
            


            
            
        </FormControl>

        </div>
        <Divider orientation="vertical" flexItem></Divider>
        
      </div>
    </div>
       
    )
}

export default Setting;