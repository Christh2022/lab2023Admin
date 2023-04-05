import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {IoIosMenu} from 'react-icons/io'
import {RxCross2} from 'react-icons/rx'
import {BiCartDownload} from 'react-icons/bi'
import {AiOutlineUser} from 'react-icons/ai'
import './Navbar.css'
import gsap from 'gsap';

const Navbar = ({Logo}) => {
    const [showMenu, setShowMenu] = useState(false)

    // eslint-disable-next-line
    useEffect(()=>{
        
        if(showMenu === true){
            gsap.timeline().fromTo('.close-btn-mobile', {opacity: 0, x: '100%'}, {
                x: '0',
                opacity: 1,
                duration: 1.2,
                delay: 0
            })

            gsap.timeline().fromTo('.nav-item', {y: 100, opacity: 0}, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                delay: 1
            })
        }
         
    }, [showMenu])

    useEffect(()=>{

        //animation menu de navigation
        gsap.timeline().fromTo('.home-menu', { y: '-100%', opacity: 0}, {
            y: 0,
            opacity: 1,
            duration: 0.1,
            delay: 1.6
        })

        //animation logo 
        gsap.timeline().fromTo('.nav-logo', {opacity: 0, x: '-100%' }, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 1.9
        })  

        //animation du lien accueil
        gsap.timeline().fromTo('.item-nav-home', {opacity: 0, y: '-100%'}, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 1.85
        })  

        //animation du lien tournée
        gsap.timeline().fromTo('.item-nav-tournee', {opacity: 0, y: '-100%'}, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 1.90
        })

        //animation du lien actus
        gsap.timeline().fromTo('.item-nav-actus', { opacity: 0, y: '-100%'}, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 1.95
        })

        //animation du lien boutique
        gsap.timeline().fromTo('.item-nav-store', { opacity: 0, y: '-100%'}, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 2
        })

        //animation du lien  des icons du menu de navigation 
        gsap.timeline().fromTo('.nav-menu-icons', { opacity: 0, x: '100%'}, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 2.05
        })  

        //animation du lien  des icons du menu de navigation en format mobile
        gsap.timeline().fromTo('.mobile-btn-menu', { opacity: 0, y: '-100%'}, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 2.1
        })

        
        }, [/* Ajouter une dépendance vide pour que useEffect ne soit appelé qu'une seule fois 
         Cela garantit que les animations ne se produiront qu'une seule fois lors du montage
         du composant*/]
    )

    const handleMobile= ()=>{
        setShowMenu(!showMenu)
    }

    const handlehideNavItem = ()=>{
        gsap.timeline().fromTo('.nav-item', {y: 0, opacity: 1}, {
            y: '100%',
            opacity: 0,
            duration: 0.4,
            delay: 1
        })

        setTimeout(()=>{
            setShowMenu(!showMenu)
        }, 3500)
    }
    return (
        <div className='home-menu'>
            <nav>
                <div className='menu-nav'>
                    <ul>
                        <li className='item-nav-home'><Link>accueil</Link></li>
                        <li className='item-nav-tournee'><Link>tournée</Link></li>
                    </ul>
                    <div className='nav-logo'>
                        <Link><img src={Logo} alt='logo'/></Link>
                    </div>
                    <ul>
                        <li className='item-nav-actus'><Link>actus</Link></li>
                        <li className='item-nav-store'><Link>boutique</Link></li>
                    </ul>
                </div>
                <span className='nav-menu-icons'> <AiOutlineUser/> <BiCartDownload/> </span>
            </nav>

            <div className="mobile-home-menu">
                <nav>
                    <div className='nav-logo'>
                        <img src={Logo} alt='logo'/>
                    </div>
                    <ul className={showMenu? 'show-mobile-menu' : 'hide-mobile-menu'}>
                        <li >
                            <Link>
                                <span data-clip="accueil" className='nav-item'>accueil</span> 
                            </Link>
                        </li>
                        <li >
                            <Link>
                                <span data-clip="tournée" className='nav-item'>tournée</span> 
                            </Link>
                        </li>
                        <li >
                            <Link>
                                <span data-clip="actus" className='nav-item'>actus</span> 
                            </Link>
                        </li>
                        <li >
                            <Link>
                                <span data-clip="boutique" className='nav-item'>boutique</span> 
                            </Link>
                        </li>
                    </ul>
                    <button className={showMenu? 'mobile-btn-menu hide' : 'mobile-btn-menu'} onClick={showMenu? handlehideNavItem :handleMobile}>
                        <span> <AiOutlineUser/> <BiCartDownload/></span>
                        {showMenu?  <span className='close-btn-mobile'><RxCross2/></span> : <span><IoIosMenu /></span>}
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;