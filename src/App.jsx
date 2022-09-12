import React from 'react';
import Home from './pages/Home';
import './App.css';
import User from './components/User/User';
import Auth from './components/Auth/Auth';
import Regis from './components/Auth/Register';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Random from "./pages/Random";
import Trend from "./pages/Trend";
import Receipt from "./pages/Receipt";
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';

const App = () =>

            <BrowserRouter>
                <Routes>
                    <Route path="/"  element={<Home/>}/>
                    <Route path="/trend" element={<Trend/>} />
                    <Route path="/random" element={<Random />} />
                    <Route path="/receipt/:receipt_id" element={<Receipt />} />
                    <Route path="/auth" element={localStorage.getItem("currentUser") ? <Navigate to="/" /> : <Auth/>} />
                    <Route path="/register" element={localStorage.getItem("currentUser") ? <Navigate to="/" /> : <Regis/>} />
                    <Route path="/profile" element={localStorage.getItem("currentUser") ? <User/>:<Navigate to="/" /> } />
                    <Route path="/favorite" element={localStorage.getItem("currentUser") ? <Favorite receip="favorite"/>:<Navigate to="/" /> } />
                    <Route path="/remember" element={localStorage.getItem("currentUser") ? <Favorite receip="remember"/>:<Navigate to="/" /> } />
                    <Route path="/tried" element={localStorage.getItem("currentUser") ? <Favorite receip="tried"/>:<Navigate to="/" /> } />
                    <Route path="/setting" element={<Setting />} />



                </Routes>
            </BrowserRouter>

;

export default App;
