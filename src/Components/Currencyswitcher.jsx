import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc'
import {FETCH_CURRENCIES} from "../GraphqlQueryStore/currency"
import { connect } from 'react-redux'
import { setCurrency } from '../Redux/cartSlice'
import ArrowUp from "../Assets/arrowup.svg"

import "../Styles/Currencyswitcher.css"

export class Currencyswitcher extends Component {
  constructor() {
    super()
  
    this.state = {
       currencyDropdown: false,
    }
    this.setCurrencyDropdown = this.setCurrencyDropdown.bind(this)
  }

  setCurrencyDropdown() {
    this.setState({currencyDropdown: !this.state.currencyDropdown})
  }
  componentDidMount(){

  }


  render() {
    const { data, currentCurrency } = this.props
    return (
      <>
      <div className="currency_display" >
        <p  onClick={ this.setCurrencyDropdown } style={{fontSize: "25px"}}>
          <div   >
            {currentCurrency} 
            <img src={ArrowUp} alt="arrowUp" style={{transform: this.state.currencyDropdown ? "rotate(180deg)" : null, transition: ".5s"}}/>
          </div>
        </p>
        
        <div className="currencies">
          {
            this.state.currencyDropdown && (
              data?.currencies?.map(({symbol , label}) => {
                return (
                 this.state.currencyDropdown && 
                 <div
                  className="symbol__label" 
                  onClick={()=> this.props.setCurrency(symbol, this.setState({currencyDropdown: !this.state.currencyDropdown}))}
                  key={symbol}
                  >
                    <p>{symbol}</p>
                    <p>{label}</p>
                  </div>
                )
              })
            )
          }
        </div>
      </div>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    currentCurrency: state.currentCurrency,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    setCurrency: (symbol) => {
     return dispatch(setCurrency(symbol))
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps)
(graphql(FETCH_CURRENCIES)(Currencyswitcher))