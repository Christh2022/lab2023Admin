import React, { useEffect, useState } from 'react';
import profile from '../../component/img/2.png'
import {BsChatLeft} from 'react-icons/bs'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {AiOutlineAppstore} from 'react-icons/ai'
import {CiSearch} from 'react-icons/ci'
import {HiBars3} from 'react-icons/hi2'
import {HiOutlinePlus} from 'react-icons/hi2'
import SideBar from '../../component/sidebar/SideBar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Signup from '../../component/signup/signup';


const Addadmin = () => {
    const [showResearch, setShowResearch] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()


    
    const sideBarShow = ()=>{
        setShowMenu(!showMenu)
    }

    const research = ()=>{
        setShowResearch(!showResearch)
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setName(user.displayName);
                setEmail(user.email)
                if(user.photoURL){
                    setImage(user.photoURL)
                } else {
                    setImage(profile)
                }
            } else{
                setName("")
                setEmail("")
                setImage("")
                navigate('/authentification')
            }
        })
    })

 


    return (

        <>
            <div className='body'>
                <div className='wrrapper'>
                    {/*side bar wrapper*/}
                    <div className={showMenu? 'sidebar-wrapper show' :'sidebar-wrapper'}>
                        <SideBar
                            sideBarShow={sideBarShow}
                            AiOutlineAppstore={AiOutlineAppstore}
                        />
                    </div>
                    {/*end side bar wrapper*/}
                    
                    {/*start hearder*/}
                    <Header 
                        email={email}
                        name={name}
                        profile={image}
                        research={research}
                        iconChat = {<BsChatLeft/>}
                        iconAppStore = {<AiOutlineAppstore/> }
                        iconModif = {<IoMdNotificationsOutline/>}
                        iconBars = {<HiBars3/>}
                        iconSearch = {<CiSearch/>}
                        iconPlus = {<HiOutlinePlus/>}
                        sideBarShow={sideBarShow}
                        showResearch={showResearch}
                    />
                    {/* end  hearder*/}
                    {/*start page wrapper*/}
                    <div className='page-wrapper'>
                        <div className='page-content' style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
                            <div className='col-12 col-lg-8 '>
                                <div className=' card list-card'>
                                    <div className='card-body'>
                                        <Signup/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*start page wrapper*/}
                    {/*start overlay*/}
                    <div className='overlay toggle-icon'></div>
                    {/*end overlay*/}
                </div>
            </div>
        </>
    )   

};

export default Addadmin;