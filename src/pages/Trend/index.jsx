import React, { useEffect, useState } from 'react';
import EmptyView from '../../components/common/EmptyView';
import List from '../../components/Home/List';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import TryIcon from '@mui/icons-material/Try';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Routes,Route, Link, BrowserRouter} from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const Trend = () => {

    const instance = {
        baseURL: `https://tamaktar.herokuapp.com`
    }
    const requests = {
        fetchTypes: `/type`,
        fetchNations: `/nation`,
        fetchReceipts: `/recept`,
        fetchReceiptIngredient: `/recept/ingredient`,
        fetchIngredient: `/ingredient`,
        fetchRandom:`/recept/random`,

    }
    const [trendList, setTrendList] = useState([]);
    const [type_receipts, setTypeofDish] = useState([]);

    const [ingList, setIngList] = useState([]);

    const [nations, setNation]= useState([]);
    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("user_name")
      }
 
    async function fetchTypes() {
        const data = await fetch(`${instance.baseURL}${requests.fetchTypes}`);
        const res = await data.json();
        setTypeofDish(res);
    }


    async function fetchNations() {
        const data = await fetch(`${instance.baseURL}${requests.fetchNations}`);
        const res = await data.json();
        setNation(res);
    }


    async function fetchIngredient() {
        const data = await fetch(`${instance.baseURL}${requests.fetchIngredient}`);
        const res = await data.json();
        setIngList(res);
    }
    async function fetchRandom(trend) {
        const data = await fetch(`${instance.baseURL}/recept/trend/${trend}`);
        const res = await data.json();
        setTrendList(res);
    }
    useEffect(() => {

        fetchNations();
        fetchTypes();
        fetchIngredient();

        fetchRandom("unknown");
    }, []);




    const handleTrend = (trend) => {
       
        fetchRandom(trend);

    };

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


                <div className="child2">

                    <button className="glow-on-hover" onClick={() => handleTrend("yearly")} type="button">Yearly</button>

                </div>
                <div className="child2">

                    <button className="glow-on-hover" onClick={() => handleTrend("semi")} type="button">Semi-Annually</button>

                </div>
                <div className="child2">

                    <button className="glow-on-hover" onClick={() => handleTrend("quartely")} type="button">Quartely</button>

                </div>
                <div className="child2">

                    <button className="glow-on-hover" onClick={() => handleTrend("monthly")} type="button">Monthly</button>

                </div>
                <div className="child2">

                    <button className="glow-on-hover" onClick={() => handleTrend("weekly")} type="button">Weekly</button>

                </div>
                <div className="child2">

                    <button className="glow-on-hover" onClick={() => handleTrend("daily")} type="button">Daily</button>

                </div>
            </div>

            <div className='home_panelList-wrap'>
                {/* Filter Panel */}

                <div className='home_panel-wrap'>

                </div>
                {/* List & Empty View */}
                <Divider orientation="vertical" flexItem></Divider>

                <div className='home_list-wrap'>
                    {trendList ? <List list={trendList}  type_receipts={type_receipts} nations={nations} ingList={ingList}/> : <EmptyView />}
                </div>
                <Divider orientation="vertical" flexItem></Divider>


            </div>

        </div>
    );
};


export default Trend;
