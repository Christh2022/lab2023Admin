import React, { useState } from 'react';
import Logo from '../img/2.png'
import {BiArrowToRight, BiHomeCircle, BiUserCircle, BiSupport} from 'react-icons/bi'
import {FiUserPlus} from 'react-icons/fi'
import {BsArrowLeftShort} from 'react-icons/bs'
import {SlLock} from 'react-icons/sl'
import './sidebar.css'
import { UserAuth } from '../../authoContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = ({sideBarShow, AiOutlineAppstore}) => {

    const [sousMenu, setSousMenu] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const {logout} = UserAuth()
    const navigate = useNavigate()

    const handleMenu = ()=>{
        setSousMenu(!sousMenu)
    }

    const handleMenuAuth = ()=>{
        setShowAuth(!showAuth)
    }

    const handleLogout = async()=>{
        try{
            await logout()
            navigate('/authentification')
        }catch(error){
            console.log(`une erreur s'est produite : ${error}`)
        }
    }
    
    

    return (
        <>
          <div className='simplebar-wrapper' style={{margin: '0'}}>
            <div className='simplebar-height-auto-observer-wrapper'>
                <div className='simplebar-height-auto-observer'></div>
            </div>
            <div className='simplebar-mask'>
                <div className='simplebar-offset' style={{left : '0', bottom : '0'}}>
                    <div className='simplebar-content-wrapper' style={{height: '100%', overflow: 'hidden scroll', }}>
                        <div className='simplebar-content' style={{padding: '0'}}>
                            <div className='sidebar-header'>
                                <div>
                                    <img src={Logo} className='logo-icon' alt='/'/>
                                </div>
                                <div>
                                    <h4 className='logo-text'>LOGO</h4>
                                </div>
                                <div className='toggle-icon-wrapper ms-auto'>
                                    <span className='toggle-icon' onClick={sideBarShow}>
                                        <BiArrowToRight/>
                                    </span>
                                </div>
                            </div>
                            <ul className='metismenu' id='menu'>
                                <li>
                                    <Link to="/">
                                        <span className='item'>
                                            <div className='parent-icon'>
                                                <BiHomeCircle/>
                                            </div>
                                            <p className='menu-title'>Dashboard</p>
                                        </span>
                                    </Link>
                                </li>
                                <li  className={sousMenu? 'showbackground' : ''}>
                                    <span className={sousMenu? 'item turnarrow has-arrow' : 'item has-arrow'} onClick={handleMenu}>
                                        <div className='parent-icon'>
                                            <AiOutlineAppstore/>
                                        </div>
                                        <p className='menu-title'>Applications</p>
                                    </span>
                                    <ul style={{height: '0.05px'}} className={sousMenu? 'mm-collapse show' : 'mm-collapse'} >
                                        <li>
                                            <span className='item'>
                                                <div className='parent-icon'>
                                                    <BsArrowLeftShort/>
                                                </div>
                                                <p className='menu-title'>Email</p>
                                            </span>
                                        </li>
                                        <li>
                                            <Link to='/ChatBox'>
                                                <span className='item'>
                                                    <div className='parent-icon'>
                                                        <BsArrowLeftShort/>
                                                    </div>
                                                    <p className='menu-title'>ChatBox</p>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <span className='item'>
                                                <div className='parent-icon'>
                                                    <BsArrowLeftShort/>
                                                </div>
                                                <p className='menu-title'>file Manager</p>
                                            </span>
                                        </li>
                                        <li>
                                            <span className='item'>
                                                <div className='parent-icon'>
                                                    <BsArrowLeftShort/>
                                                </div>
                                                <p className='menu-title'>Contact</p>
                                            </span>
                                        </li>
                                        <li>
                                            <span className='item'>
                                                <div className='parent-icon'>
                                                    <BsArrowLeftShort/>
                                                </div>
                                                <p className='menu-title'>calendrier</p>
                                            </span>
                                        </li>
                                        
                                    </ul>
                                </li>
                                <li className={sousMenu? 'menu-label pages' : 'menu-label'}>Pages</li>
                                <li  className={sousMenu? (showAuth? 'showbackground auth show' : 'showbackground auth') : (showAuth? 'showbackground' : '')}>
                                    <span className={showAuth? 'item turnarrow has-arrow' : 'item has-arrow'} onClick={handleMenuAuth}>
                                        <div className='parent-icon'>
                                            <SlLock/>
                                        </div>
                                        <p className='menu-title'>Authentification</p>
                                    </span>
                                    <ul style={{height: '0.05px'}} className={showAuth? 'mm-collapse show' : 'mm-collapse'} >
                                        <li>
                                            <Link to='/mot_de_passe_oublie'>
                                                <span className='item'>
                                                    <div className='parent-icon'>
                                                        <BsArrowLeftShort/>
                                                    </div>
                                                    <p className='menu-title'>Mot de passe</p>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <span className='item'>
                                                <div className='parent-icon'>
                                                    <BsArrowLeftShort/>
                                                </div>
                                                <p className='menu-title' onClick={handleLogout}>Déconnexion</p>
                                            </span>
                                        </li>
                                    </ul>
                                </li>
                                <li className={sousMenu? (showAuth? 'user-down profile': 'user-down'):(showAuth? 'profile-user':'')}>
                                    <span className='item'>
                                        <div className='parent-icon'>
                                            <BiUserCircle/>
                                        </div>
                                        <p className='menu-title'>Profile</p>
                                    </span>
                                </li>
                                <li className={sousMenu? (showAuth? 'menu-label pages others' : 'menu-label pages other'):(showAuth? 'menu-label others':'menu-label')}>Autres</li>
                                <li className={sousMenu? (showAuth? 'documentation-down show' : 'documentation-down'):(showAuth? 'documentation-down folder':'')}>
                                    <Link to='/add_admin'>
                                        <span className='item'>
                                            <div className='parent-icon'>
                                                <FiUserPlus/>
                                            </div>
                                            <p className='menu-title'>Ajouter Admin</p>
                                        </span>
                                    </Link>
                                </li>
                                <li className={sousMenu? (showAuth? 'support-down show' : 'support-down'):(showAuth? 'support-down show2':'')}>
                                    <span className='item'>
                                        <div className='parent-icon'>
                                            <BiSupport/>
                                        </div>
                                        <p className='menu-title'>Support</p>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='simplebar-placeholder' style={{width: 'auto', height: '1305px'}}></div>
          </div>
        </>
    );
};

export default SideBar;