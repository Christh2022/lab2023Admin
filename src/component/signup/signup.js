import React, { useState } from 'react';
import { UserAuth } from '../../authoContext/AuthContext';
import { doc, setDoc } from "firebase/firestore";
import './signup.css'
import {  database, storage } from '../../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [file, setFile] = useState("")
    const [imgProfile, setImgProfile] = useState("")
    const {logout , signUp} = UserAuth();
    const navigate = useNavigate()
    
    const UUID = ()=>{
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
        });
    }
    //console.log(UUID());

    
    

    const submit = async(e)=>{
        e.preventDefault()
        try{
            const userCredential = await signUp(email, password)
            const user = userCredential.user
            sendEmailVerification(user)
            console.log(user);
            
            const admin = doc(database, 'admin', user.uid)

            await setDoc(admin, {
                nom : name,
                email: email,
                temps: serverTimestamp(),
                statut: 0
            })

            const storageImage = async (image)=>{
                return  new Promise ((resolve, reject)=>{
                    const filename = `images/${user.uid}-${image.name}-${UUID()}`
                    const storageRef = ref(storage, filename);
                    const uploadTask = uploadBytesResumable(storageRef, image)
                    uploadTask.on('state_changed', 
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                                    default: ;
                            }

                            
                        }, 
                        (error) => {
                            // Handle unsuccessful uploads
                            reject(error)
                        }, 
                        () => {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                                resolve(downloadURL);
                                setImgProfile(downloadURL)
                                await updateProfile(user, {
                                    displayName : name,
                                    photoURL : downloadURL, 
                                })
                            });
                        }
                    );
                })
            }
            storageImage(file);
            console.log(imgProfile);
            alert("veuillez vous reconnecter");
            logout();
            navigate('/authentification');
            //console.log(usconsole.log(user.uid, name, email, password, file.name);
        }catch(err){
            console.log(err);
            
        }
    }
    return (
        <div className='signup'>
            <h1>Ajouter un Administrateur </h1>
            <form onSubmit={submit}>
                <input type='text' placeholder='Nom' onChange={(e)=>setName(e.target.value)}/> 
                <input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' placeholder='Mot de passe' onChange={(e)=>setPassword(e.target.value)}/> 
                <input type='file'onChange={(e)=>setFile(e.target.files[0])} accept='.jpeg, .png, .jpg'/>
                <button type='submit'>Ajouter</button>
            </form>
        </div>
    );
};

export default Signup;