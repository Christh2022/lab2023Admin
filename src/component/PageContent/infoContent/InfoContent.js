import React from 'react';
import './infoContent.css'
import {IoTriangle} from 'react-icons/io5'

const InfoContent = ({title, stitle, cbody, CardIcon, style}) => {
   
    return (
        <div className='col'>
            <div className='card'>
                <div className='card-body'>
                    <div className='card-content'>
                        <div>
                            <p className='card-content-title'>{title}</p>
                            <h4 className='card-content-h4'>{stitle}</h4>
                            <p className='card-content-paragraph'>
                                <span className='card-content-icon'><IoTriangle/></span>
                                {cbody}
                            </p>
                        </div>
                        <div style={style} className='card-icon' >{CardIcon}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoContent;