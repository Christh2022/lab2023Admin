import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';

const ForgotPassword = () => {
    const [email, setEmail] = useState()
    const handlePasswordSubmit = async(e)=>{
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email)
            alert("Veuillez consulter votre adresse mail")
        } catch (error) {
            console.log(error);
        }
    }


    return (
            <div className='forgotpassword'>
                <h1>Mot de passe oublibé</h1>
                <form onSubmit={handlePasswordSubmit}>
                    <input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                    <button type='submit'>Envoyer</button>
                </form>
            </div>
    );
};

export default ForgotPassword;