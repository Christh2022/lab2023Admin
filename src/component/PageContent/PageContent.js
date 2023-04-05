import React from 'react';
import InfoContent from './infoContent/InfoContent';
import {FiUsers} from 'react-icons/fi'
import {RiMoneyEuroCircleLine} from 'react-icons/ri'
import {BsDisc} from 'react-icons/bs'
import {GiMicrophone} from 'react-icons/gi'
import './PageContent.css'

const PageContent = () => {

    const colorstyle = {
        backgroundColor: 'rgb(23 160 14 / .11)',
        color: '#15ca20 ',
      };

    const colorViewsStyle = {
        backgroundColor: 'rgb(13 202 240 / 18%)',
        color: '#0dcaf0'
    }

    const colorAlbumStyle = {
        backgroundColor: 'rgb(244 17 39 / .11)',
        color: '#fd3550'
    }

    const colorTourneeStyle = {
        backgroundColor: 'rgb(255 193 7 / .11)',
        color: '#ffc107'
    }
    return (
        <div className='row row-col-1 row-col-md-2 row-col-xxl-4'>
            <InfoContent title='Revenu' stitle='1500€' cbody='34€ from last week' CardIcon={<RiMoneyEuroCircleLine/>} style={colorstyle}/>
            <InfoContent  title='Tournée' stitle='100' cbody='24 from last Moth' CardIcon={<GiMicrophone/>} style={colorTourneeStyle} />
            <InfoContent  title='Visiteur' stitle='600' cbody='100 from last week' CardIcon={<FiUsers/>} style={colorViewsStyle}/>
            <InfoContent title='Album' stitle='60' cbody='100 from last week' CardIcon={<BsDisc/>} style={colorAlbumStyle}/>
        </div>
    );
};

export default PageContent;