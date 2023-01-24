import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'


function Footer() {
  return (
    <footer className='footer-container pop'>
      <section className='social-media'>
        <div className='social-media-wrap is-flex is-flex-direction-column'>
          <div className='website-rights'>Stock Track</div>
          <div className='social-icons mb-5'>
            <a
              className='social-icon-link Github'
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/John-Tascione/stock-tracker"
            >
              <i className='fab fa-github'/>
            </a>
            <a
              className='social-icon-link linkedin'
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/john-tascione/"
              
            >
              <i className='fab fa-linkedin'/>
            </a>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer