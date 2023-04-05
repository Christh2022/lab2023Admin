import React from 'react';

const Header = ({
        showResearch, 
        sideBarShow, 
        iconBars, 
        iconSearch, 
        iconPlus, 
        research, 
        email, 
        profile, 
        name, 
        iconModif, 
        iconAppStore, 
        iconChat    
    }) => {
    return(
        <header>
            <div className='topbar'>
                <nav className='navbar navbar-expand'>
                    <div className={showResearch? 'mobile-toggle-menu hide' : 'mobile-toggle-menu'}>
                        <span onClick={sideBarShow} className='icon-menu'>
                            {iconBars}
                        </span>
                    </div>
                    <div className={showResearch? 'search-bar flex-grow-1 hide' : 'search-bar flex-grow-1'}>
                        <div className={showResearch? 'container-search' : 'container-search'}>
                            <input placeholder='...Recherche' className='form-control search-control'/>
                            <span  className={showResearch? 'search-show' : 'search-show hide'} style={{cursor: 'pointer'}}>
                                {iconSearch}
                            </span>
                        </div>
                        <span className={showResearch? 'close hide' : 'close'} style={{cursor: 'pointer'}} onClick={research} >
                            {iconPlus}
                        </span>
                        
                    </div>
                    <div className={showResearch? 'top-menu hide': 'top-menu ms-auto'}>
                        <ul className='navbar-nav'>
                                <li className='mobile-search-icon'>
                                    <span onClick={research}  className='nav-link' style={{cursor: 'pointer'}}>
                                        {iconSearch}
                                    </span>
                                </li>
                                <li className='nav-item dropdown dropdown-large'>
                                    <span className='nav-link' style={{cursor: 'pointer'}}>
                                        {iconAppStore}
                                    </span>
                                </li>
                                <li className='nav-item dropdown dropdown-large'>
                                    <span className='nav-link'  style={{cursor: 'pointer'}}>
                                        {iconModif}
                                    </span>  
                                </li>
                                <li className='nav-item dropdown dropdown-large'>
                                    <span className='nav-link' style={{fontSize: '1rem', cursor: 'pointer'}}>
                                        {iconChat}
                                    </span>
                                </li>
                        </ul>
                    </div>
                    <div className={showResearch? 'user-box hide' :'user-box dropdown'}>
                        <span className='profile'>
                            <img src={profile} className='user-img' alt='/'/>
                            <div className='user-info' >
                                <span>{name}</span>
                                <span>{email}</span>
                            </div>
                        </span>
                        <ul className='dropdown-menu dropdown-menu-end' ></ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header;