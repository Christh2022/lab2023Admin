import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../authoContext/AuthContext';
import './login.css'

const Login = () => {

    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const {user, login} = UserAuth();
    const navigate = useNavigate();

    const submit = async(e)=>{
        e.preventDefault();

        try{
            await login(email, password);
            //console.log(email, password)
            navigate('/');
        }catch(err){
            console.log(err);
            console.log(user);
        }
        
    }

    return (
        <>
            <div className='login'>
                <h1>Connexion</h1>
                <form onSubmit={submit}>
                    <input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                    <input type='password' placeholder='Mot de passe' onChange={(e)=>setPassword(e.target.value)}/>
                    <button type='submit'>se connecter</button>
                </form>
                
            </div> 
        </>
    );
};

export default Login;