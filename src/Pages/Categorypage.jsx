import React, { Component } from 'react'
import FETCH_PRODUCTS from "../GraphqlQueryStore/productList"
import { graphql } from '@apollo/client/react/hoc'
import ProductListItem from "../Components/ProductListItems"
import "../Styles/Categorypage.css"

export class Categorypage extends Component {

  componentDidMount() {
    document.title = "category"
    let menuName = this.props.categoryName
    this.props.setActiveCategory(menuName)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.categoryName !== this.props.categoryName){
      let menuName = this.props.categoryName
      this.props.setActiveCategory(menuName)
    }
  }
  render() {
     const  {data} = this.props
     const {category} = data
    
    return (
      <div className='product_list'>
        <h1>{category?.name.toUpperCase()}</h1>
        <div className="product_display">
          {
            category?.products?.map((product) => {
              return (
                  <ProductListItem product={product} category={category}/>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default graphql(FETCH_PRODUCTS, {
  options: (props) => ({
    variables: {
      input: { title: props.categoryName}
    }
  })
})(Categorypage)