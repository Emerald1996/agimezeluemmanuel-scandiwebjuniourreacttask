import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Navigation.css"
import { ListCategory } from '../Styles/attributeStyle'
import menubutton from "../Assets/menubutton.svg"
import cancelbutton from "../Assets/cancelbutton.svg"

export class Navigation extends Component {
    constructor() {
      super()
    
      this.state = {
         isMenuOpen: false
      }
      this.handleMenu = this.handleMenu.bind(this)
    }

    handleMenu(){
       this.setState({isMenuOpen: !this.state.isMenuOpen}) 
    }
  render() {
    const {active , categories} = this.props
  
    return (
        <>
            <div className="menu_btn" onClick={this.handleMenu} >
                <img src={!this.state.isMenuOpen ? menubutton : cancelbutton} alt="menu_button" />
            </div>
             <div className="navigation" id={this.state.isMenuOpen ? "open_link" : "close_link"}>
                {
                    categories?.map((category , index) => {
                        return(
                            <ul key={index}>
                                <ListCategory active={active === category ? true : false}  >
                                    <Link className="links" key={index} to={`/${index === 0 ? "" : category}`} onClick={this.handleMenu} >
                                        {category.toUpperCase()}
                                    </Link>
                                </ListCategory>
                            </ul>
                        )
                    })
                }
            </div>
        
        </>
    )
  }
}

export default Navigation