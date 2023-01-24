import React from 'react'
import './NavBtn.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--outline-login', 'btn--checkmark', 'btn--xmark'];
const SIZES = ['btn--meduim', 'btn--large', 'btn--yesfriends', 'btn--nofriends'];

export const Button = ({children, type, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    // in the above array it applies what I input, if there is no style put in it automatically goes to the first style(btn info)
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

return (
    <>
        {/* used to update the button sizes and styles when needed */}
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}onClick={onClick} type={type}>
            {/* renders whatever i put in the 'parent' button */}
            {children}
        </button>
    </>
    );
};