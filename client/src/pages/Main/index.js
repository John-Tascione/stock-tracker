import React from 'react';
import '../../App.css'
import { Button } from './NavBtn'
import './style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import backround from '../../assets/imgs/stockChart.jpg'


const Main = () => {
return (
    <div className='main-container' style= {{ 
      backgroundImage: "url(" + backround + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat' }}>
        
        <h1 className='pop'>
          Stock Track 
        <i className='fas fa-chart-line is-size-1-touch is-hidden-mobile' />
        </h1>        
    </div>
)
}

export default Main;