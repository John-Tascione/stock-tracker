import React from 'react';
import '../../App.css'
import { Button } from './NavBtn'
import './style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import backround from '../../assets/imgs/stockChart.jpg'


  // const handleButtonClick = (event) => {
  //   event.preventdefault();

  // }


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
        
        {!Auth.loggedIn()
        ? 
        <div className='main-btns pop'>
          <Link to="/login">          
            <Button 
              className='btn' 
              buttonStyle='btn--info' 
              buttonSize='btn--large'
              >
              LOGIN
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button 
              className='btn' 
              buttonStyle='btn--info' 
              buttonSize='btn--large'
            >
              SIGN UP
            </Button>
          </Link>
        </div>
        :
        <Link to="/profile">          
        <Button 
          className='btn' 
          buttonStyle='btn--info' 
          buttonSize='btn--large'
          >
          Profile Dashboardjohn
        </Button>
      </Link>
        }
        
    </div>
)
}

export default Main;