import React, { Component } from 'react'
import { connect } from 'react-redux';
import "../Styles/ProductListItems.css"
import cartImage from "../Assets/cart.svg"
import { addItemToCart } from '../Redux/cartSlice';
import { v4 as uuid } from "uuid";
import { Link } from 'react-router-dom';

export class ProductListItems extends Component {
  addProductToCart( id,product) {
    this.props.addItemToCart(product)
    alert(`${product.name.toUpperCase()} added to cart successfully`)
  }
  render() {
    const { product, cartItemIds, currentCurrency, category } = this.props
    const uid = uuid()
    // Label products that is out of stock
    const availabilityStock = product.inStock ? "item_list" : 'no_item' // Check css properties
    const noStock = !product.inStock ? 'no_stock': 'item_list'

    // destructure the properties
    const { name, prices, gallery, inStock, brand, id } = product
    let price = prices.find((price) => {
      return price.currency.symbol === currentCurrency
    })
    return (
      <>
        <div className={availabilityStock} key={id}>
          <div className="product_display">
            <div className="products">
              <Link to={`/${category?.name}/${product.id}`} key={product.id} className="product_image_link">
                <img src={gallery[0]} 
                  alt={name} 
                  title={name} 
                  width="350px" 
                  height="200px"
                />             
              </Link>

              {!inStock && (
                <p className={noStock}>Out of stock</p>
              )}
              <div className='product_tag'>
                  <h3>{brand} {name}</h3>
                  <p>{currentCurrency} {price.amount}</p>
                </div>
              {
                inStock && (
                  <div className="category_cart_btn" 
                    onClick={() => this.addProductToCart(product.id + uid, {
                    ...product, 
                    id: product.id + uid,
                    productId: product.id,
                    selected: {},
                    quantity: 1
                  },
                  cartItemIds.includes(product.id)
                  )}
                  >
                    <img src={cartImage} alt="addToCartbutton" className='image_color'/>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currentCurrency,
    cartItemIds: state.cartItemIds,
  }
}
const mapDispatchToProps = (dispatch) => {
  return ({
    addItemToCart: (product) => dispatch(addItemToCart(product)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItems)