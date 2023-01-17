import React, { Component } from 'react'
import { graphql } from "@apollo/client/react/hoc";
import { SINGLE_PRODUCTS } from '../GraphqlQueryStore/singleProduct';
import withRouter from "../Pages/withRouter"
import ProductAttribute from "../Components/ProductAttribute"

import "../Styles/ProductDescriptionPage.css"

export class ProductDescriptionPage extends Component {
  constructor() {
    super()
  
    this.state = {
       imageArrIndex: 0
    }
  }

   imageOnclick = (index) =>{
    this.setState({imageArrIndex: index})
  }


  render() {
    const {data} = this.props
    const {product} = data

 
    return (
      <>
        {
          product && (
            <div className="product_desc_page">
              <div className="product_img">

                <div className="small_image">
                  {
                    product.gallery.map((images , index) => {
                      return (
                        <img 
                          key={images} 
                          src={images} 
                          alt={product.name}
                          onClick={()=>this.imageOnclick(index)} 
                        />
                      )
                    })
                  }
                </div>
                <img src={product.gallery[this.state.imageArrIndex]} alt={product.name} className="big-image" />

              </div>

              <div className="product_info">
                 <h2>{product.brand}</h2> 
                 <h3>{product.name}</h3>
                 
                 <div>
                  <ProductAttribute product={product}/>
                 </div>
                 
                
              </div>
            </div>
          )
        }
      </>
    )
  }
}

export default
 withRouter(graphql(SINGLE_PRODUCTS, {
  options: (props) => ({
    variables: {
      id: props.router.params.id
    }
  })
})(ProductDescriptionPage))