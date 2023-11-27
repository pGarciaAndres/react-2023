import React from 'react'
import image from '../assets/logo.png'
import { header, logo } from './Header.css'

export const Header: React.FC = () => {
  return (
    <nav className={header}>
      <a href='/'>
        <img src={image} className={logo} alt='Hacker News' />
      </a>
    </nav>
  )
}
