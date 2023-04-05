
import { reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../authoContext/AuthContext";
import { auth } from "../../firebase";

const Edit = ({newEmail, name}) =>{
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newEmailValue, setNewEmailValue] = useState("");
    const [newPassword, setNewPassword] = useState("*********");
    const [newName, setNewName] = useState("");
    const navigate = useNavigate()
    const {logout} = UserAuth()
    
    const handleEditName = () => {
        setIsEditingName(!isEditingName);
    };

    const handleEditEmail = () => {
        setIsEditingEmail(!isEditingEmail);
    };

    const handleEdiPassword = ()=>{
        setIsEditingPassword(!isEditingPassword);
    }

    const promptForCredentials =  ()=>{
        alert('veuillez vous connecter')
        navigate('/authentification')
    }
    
    //Fonction pour éditer le mail
    const handleSaveEmail = async (e)=>{
        e.preventDefault()
        try {
            const user = auth.currentUser
            setIsEditingEmail(!isEditingEmail);
            console.log(newEmailValue)
            await updateEmail(auth.currentUser, newEmailValue)
            await reauthenticateWithCredential(user, promptForCredentials())
            await logout()
        } catch (error) {
           console.log(error); 
        }
    }

    //Fonction pour éditer le Nom
    const handleSaveName = async (e)=>{
        e.preventDefault()
        try {
            const user = auth.currentUser
            setIsEditingName(!isEditingName);
            console.log(newEmailValue)
            await updateProfile(auth.currentUser, {
                displayName: newName, 
                photoURL: ""
            })
            await reauthenticateWithCredential(user, promptForCredentials())
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    //Fonction pour éditer le mot de passe
    const handleSavePassword = async(e)=>{
        e.preventDefault()
        
        try { 
            const user = auth.currentUser
            await updatePassword(user, newPassword)
            await logout()
            await reauthenticateWithCredential(user, promptForCredentials())
            console.log(newPassword);
        } catch (error) {
            console.log(error);
            console.log(newPassword);
        }
    }

    

    return (
        <div>
            {isEditingName ? (
                <form onSubmit={handleSaveName}>
                    <input type="text" onChange={(e)=>setNewName(e.target.value)} />
                    <button type="submit">enregistrer</button>
                </form>
            ) : (
                <div>
                    <p >{name}</p>
                    <button onClick={handleEditName}>Modifier</button>
                </div>
            )}

            {isEditingEmail ? (
                <form onSubmit={handleSaveEmail}>
                    <input type="email" onChange={(e)=>setNewEmailValue(e.target.value)} />
                    <button type="submit">enregistrer</button>
                </form>
            ) : (
                <div>
                    <p >{newEmail}</p>
                    <button onClick={handleEditEmail}>Modifier</button>
                </div>
            )}

            {isEditingPassword ? (
                <form onSubmit={handleSavePassword}>
                    <input type="password" onChange={(e)=>setNewPassword(e.target.value)} />
                    <button type="submit">enregistrer</button>
                </form>
            ) : (
                <div>
                    <input type='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} disabled/>
                    <button onClick={handleEdiPassword}>Modifier</button>
                </div>
            )}
        
        </div>
    );
}

export default Edit;
