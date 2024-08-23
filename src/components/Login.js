import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const token = response.data.token;
            
            // ถอดรหัส JWT 
            const payload = JSON.parse(atob(token.split('.')[1]));
            const id_user = payload.id_user;

            // เก็บไว้ใน localStorage 
            localStorage.setItem('token', token);

            navigate(`/home/${id_user}`);
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            alert('Invalid credentials');
        }
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br />
            <form onSubmit={handleLogin} className={'inputContainer'}>
                <div className={'inputContainer'}>
                    <input
                        value={username}
                        placeholder="Enter your username here"
                        onChange={(ev) => setUsername(ev.target.value)}
                        className={'inputBox'}
                        required
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={'inputBox'}
                        type="password"
                        required
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input 
                        className={'inputButton'} 
                        type="submit"  
                        value={'Log in'} 
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;
