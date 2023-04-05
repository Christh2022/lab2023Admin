import React, { useState } from 'react';
import ForgotPassword from '../../component/ForgotPassword/ForgotPassword';
import Login from '../../component/login/login';
import './auth.css'

const Authentification = ({changeCssBody}) => {
    const [isActive, setIsActive] = useState(false)

    const show = ()=>{
        setIsActive(!isActive)
    }


    return (
        <div className='container-auth'>
            <div className='formContent'>
                <div className='authentification'>
                    <div className='login-section'>
                        <div className={isActive ? 'showlogin' : 'hidelogin'} ><ForgotPassword changeCssBody={changeCssBody}/></div>
                        <button className= {isActive ? 'btn-login hide' : 'btn-login'} onClick={show} style={{fontSize: '15px'}}>Mot de passe oublié</button> 
                    </div>
                    <div className='signup-section'>
                        <div className={!isActive? 'showsignup': 'hidesignup'}><Login changeCssBody={changeCssBody}/></div>
                        <button className= {!isActive ? 'btn-signup hide' : 'btn-signup'} onClick={show}>Connexion</button> 
                    </div>
                </div>
                <div className={isActive? "hideForm" : "showForm"}></div>
            </div>
        </div>
    );
};

export default Authentification;