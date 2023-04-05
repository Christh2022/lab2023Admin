import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import {MdOutlineAttachFile} from 'react-icons/md'
import {BiMicrophone} from 'react-icons/bi'
import {IoIosSend} from 'react-icons/io'
import './chatcomponent.css'

const ChatComponnent = () => {
    const [name, setName] = useState ("")
    const [profile, setProfile] = useState("")
    const [message, setMessage] = useState("")

    useEffect(()=>{
        const userInfo = ()=>{
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    setName(user.displayName);
                    setProfile(user.photoURL)
                }
            })
        }
        userInfo()
    }, [])

    const sendMessage = (e)=>{
        e.preventDefault()
        console.log(message);
        setMessage("")
    }





    return (
      <div className="chat-wrapper">
            <div className="card-left">
                <span className='profile' style={{flexDirection: 'row'}}>
                    <img src={profile} className='user-img' alt='/'/>
                    <span>{name}</span>
                </span>
            </div>
            <div className="card-right">
                <div className="card-right-profile">
                    <span className='profile' style={{flexDirection: 'row'}}>
                        <img src={profile} className='user-img' alt='/'/>
                        <span>{name}</span>
                    </span>
                </div>
                <div className="chatcomponent">
                    <span className='profile' >
                        <img src={profile} className='user-img' alt='/'/>
                        <span>{message}</span>
                    </span>
                    <span className='profile' style={{flexDirection: 'row'}}>
                        <img src={profile} className='user-img' alt='/'/>
                        <span>{name}</span>
                    </span>
                    <span className='profile' style={{flexDirection: 'row'}}>
                        <img src={profile} className='user-img' alt='/'/>
                        <span>{name}</span>
                    </span>
                    <span className='profile' style={{flexDirection: 'row'}}>
                        <img src={profile} className='user-img' alt='/'/>
                        <span>{name}</span>
                    </span>
                    
                </div>
                <form onSubmit={sendMessage}>
                    <span>
                        <span><MdOutlineAttachFile/></span>
                        <span><BiMicrophone/></span>
                    </span>
                    <input value={message} onChange={(e)=>setMessage(e.target.value)}/>
                    <button type='submit'>
                        <IoIosSend/>
                    </button>
                </form>
            </div>
      </div>
    );
};

export default ChatComponnent;