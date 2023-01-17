import React, { Component } from 'react'
import logo from "../Assets/logo.svg"
import Navigation from './Navigation'
import Currencyswitcher from './Currencyswitcher'
import Minicart from './Minicart'

import "../Styles/Header.css"
import { Link } from 'react-router-dom'

export class Header extends Component {
  render() {
    const {activeCategory , categories} = this.props
    return (
      <div className='header'>
        <Navigation active={activeCategory} categories={categories} />
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="right_nav">
            <Currencyswitcher />
            <Minicart />
        </div>
      </div>
    )
  }
}

export default Header