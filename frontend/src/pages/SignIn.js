import React, { useState, useEffect } from 'react'
import { getJWTToken } from '../common/functions';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import "../styles.css";

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        const token = getJWTToken(username, password);
        const response = await fetch('http://localhost:4000/login', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                token,
            },
        });
        const res = await response.json();
        if(res.status!=='bad') 
        {
            alert(res.message);
        localStorage.setItem("token", token);
        navigate({
            pathname: '/',
        });
    }
        else {
            alert(res.message)
        }
    }
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                <div className="form">
                    <div className="input-container">
                        <label>Username </label>
                        <input onChange={(e) => { setUsername(e.target.value) }} type="text" name="uname" required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input onChange={(e) => { setPassword(e.target.value) }} type="password" name="pass" required />
                    </div>
                    <div className="button-container">
                        <button onClick={handleSignIn}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignIn;