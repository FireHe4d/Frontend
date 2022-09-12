import { React, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GetWithAuth, PutWithAuth } from "../../service/HttpService";
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box
} from "@material-ui/core";


function User() {
  const userId = localStorage.getItem("currentUser");
  const [user, setUser] = useState();
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [picture, setPicture] = useState("")
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState("")

  const logout = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("refreshKey")
    localStorage.removeItem("user_name")
  }
  const getUser = () => {
    GetWithAuth("/users/" + userId)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setUser(result);
        },
        (error) => {
          console.log(error)
        }
      )
  }

  useEffect(() => {
    getUser()
  }, [])
  const handleFirstname = (value) => {
    setFirstName(value)
  }

  const handleLastname = (value) => {
    setLastName(value)
  }
  const handleBirthday = (value) => {
    setBirthday(value)
  }

  const handleGender = (value) => {
    console.log(value)
    setGender(value)
  }
  const handleEmail = (value) => {
    setEmail(value)
  }

  const handlePhone = (value) => {
    setPhone(value)
  }
  const handlePicture = (value) => {
    setPicture(value)
  }

  const handleBio = (value) => {
    setBio(value)
  }
  const handlePassword = (value) => {
    setPassword(value)
  }
  const sendRequest = () => {
    PutWithAuth(("/users/" + userId), {
      password: password,
      email: email,
      firstname: firstname,
      lastname: lastname,
      birthday: birthday,
      gender: gender,
      phone: phone,
      picture: picture,
      bio: bio,
    })
      .then((result) => {
        getUser();
        window.location.reload(false);
      })
      .catch((err) => console.log(err))
  }

  const handleButton = () => {
    sendRequest()
    setFirstName("")
    setLastName("")
    setBirthday("")
    setGender("")
    setEmail("")
    setPicture("")
    setPhone("")
    setBio("")
    setPassword("")
  }
  return (
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
                  {localStorage.getItem("currentUser") == null ? <LoginIcon /> :
                    ""}
                  {localStorage.getItem("currentUser") == null ? "Login" :
                    ""}

                </Link>
              </li>
              <li>
                <Link to="/register">
                  {localStorage.getItem("currentUser") == null ? <HowToRegIcon /> :
                    ""}
                  {localStorage.getItem("currentUser") == null ? "Register" :
                    ""}

                </Link>
              </li>

              <li>
                <Link to="/profile">
                  {localStorage.getItem("currentUser") == null ? "" :
                    <AccountBoxIcon />}
                  {localStorage.getItem("currentUser") == null ? "" :
                    "Profile"}

                </Link>
              </li>
              <li>
                <Link to="/favorite">
                  {localStorage.getItem("currentUser") == null ? "" :
                    <FavoriteIcon />}
                  {localStorage.getItem("currentUser") == null ? "" :
                    "Favorite"}

                </Link>
              </li>
              <li>
                <Link to="/remember">
                  {localStorage.getItem("currentUser") == null ? "" :
                    <BookIcon />}
                  {localStorage.getItem("currentUser") == null ? "" :
                    "Remember"}

                </Link>
              </li>
              <li>
                <Link to="/tried">
                  {localStorage.getItem("currentUser") == null ? "" :
                    <TryIcon />}
                  {localStorage.getItem("currentUser") == null ? "" :
                    "Tried"}

                </Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  {localStorage.getItem("currentUser") == null ? "" :
                    <LogoutIcon />}
                  {localStorage.getItem("currentUser") == null ? "" :
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
          <div className='card'>
            <img src={user?.picture} alt="John" />
            <h1>{user?.firstname} {user?.lastname} </h1>
            <p class="title">{user?.birthday}, {user?.gender}</p>
            <a >{user?.email}</a>
            <a >{user?.phone}</a>
            <p><button>{user?.bio}</button></p>
          </div>

          <p>Profile Edit Form</p>
          <form>
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Name"
              variant="outlined" onChange={(i) => handleFirstname(i.target.value)}
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Surname"
              variant="outlined" onChange={(i) => handleLastname(i.target.value)}
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Picture"
              variant="outlined" onChange={(i) => handlePicture(i.target.value)}
            />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Password"
              variant="outlined" onChange={(i) => handlePassword(i.target.value)}
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="email"
              label="Email"
              variant="outlined" onChange={(i) => handleEmail(i.target.value)}
            />
            <br />

            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="date"
              label="Birthday"
              variant="outlined" onChange={(i) => handleBirthday(i.target.value)}
            />
            <br />
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group" onChange={(i) => handleGender(i.target.value)}
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />

            </RadioGroup>
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="number"
              label="Phone Number"
              variant="outlined" onChange={(i) => handlePhone(i.target.value)}
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="BIO"
              variant="outlined" onChange={(i) => handleBio(i.target.value)}
            />

            <br />
            <Button variant="contained" color="primary" onClick={() => handleButton()}>
              save
            </Button>
          </form>

        </div>
        <Divider orientation="vertical" flexItem></Divider>

      </div>
    </div>

  )
}

export default User;