import { updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import './forgotpassword.css'

const ChangePassword = () => { 

    const [password, setPassword] = useState("")
    const [confirmPasseword, setConfirmPassword] = useState("")
    const [showMessage, setShowMessage] = useState(false)


    const changePassword = async (e)=>{
        e.preventDefault()
        if(password && confirmPasseword){
            const user = auth.currentUser
            if(password === confirmPasseword){
                try { 
                    await updatePassword (user, password)
                    console.log(password);
                    alert("Succes")
                    setShowMessage(false)
                } catch (error) {
                    console.log(error);
                }
            } else {
                setShowMessage(!showMessage)
            }
            console.log("hello");
        } else {
            console.log("veuillez remplir tous les champs");
        }
        setPassword("")
        setConfirmPassword("")
    }



    return (
        <>
            <h2 className='fp-title'>Changer de mot de passe</h2>
            <form className='fP-form' onSubmit={changePassword}>
                <input type='password' value={password} placeholder='Nouvelle mot de passe' onChange={(e)=>setPassword(e.target.value)}/>
                <input type='password' value={confirmPasseword} placeholder='Comfirmation du mot de passe' onChange={(e)=>setConfirmPassword(e.target.value)}/>
                {showMessage? <span style={{background: 'red', color: 'white', textAlign: 'center'}}>les mots de passe ne sont pas identiques</span> : ""}
                <button type='submit'>Enregistrer</button>
            </form>  
        </>
    );
};

export default ChangePassword;