import React, { Component } from 'react'
import "../Styles/Loading.css"

export class Loading extends Component {
  render() {
    return (
      <>
      <div className='loading_container'>
        <div className="loader">
        </div>
        <h4>Please wait...</h4>
      </div>
      </>
    )
  }
}

export default Loading