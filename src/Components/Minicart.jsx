import React, { Component } from 'react'
import cartImage from "../Assets/cart.svg"
import { connect } from 'react-redux'
import "../Styles/Minicart.css"
import CartProduct from './CartProduct'
import { Link } from 'react-router-dom'

export class Minicart extends Component {
  constructor() {
    super()
  
    this.state = {
       minicartOpen: false,
    }
    this.handleCart = this.handleCart.bind(this);
  }

  handleCart() {
    this.setState({
      minicartOpen: !this.state.minicartOpen,
    })
  }

  render() {
    const{ cart, currentCurrency } = this.props

    // Total amount calculation using reduce method

    const totalAmount = cart.reduce((total, cartItem) => {
			cartItem?.prices?.forEach(({ currency, amount }) => {
				if (currency.symbol === currentCurrency) {
					total = total + amount * cartItem.quantity;
				}
			});
			return total;
		}, 0);
   
    return (
      <>
      <div className='minicart_container' >
        <div className="cart_img" onClick={this.handleCart}>
          <img src={cartImage} alt="" />
        </div>
        <span className='cart_length'>
          <p>{cart.length}</p>
        </span>
        {
          this.state.minicartOpen &&
          <>
            <div className="minicart_overlay" onClick={this.handleCart}></div> 
            <div className="minicart_body">
              <h2>My bag: {" "} 
                <span>{cart.length} {cart.length > 1 ? 'items' : 'item'}</span>
              </h2>
              {
                cart.length === 0 ? 
                (<div className="empty_cart">
                  <p>Your cart is empty</p>
                </div>): (
                  cart.map(({attributes, brand, category, gallery, id, name, productId, prices, quantity,selected}) => {
                    const currencyPrice = prices.find((currency)=> currency.currency.symbol === currentCurrency)
                    return (
                      <div className="minicart_product_display">
                        <CartProduct 
                          attributes={attributes}
                          brand={brand}
                          category={category}
                          currentCurrency={currentCurrency}
                          gallery={gallery}
                          id={id}
                          key={id}
                          name={name}
                          selected={selected}
                          currencyPrice={currencyPrice.amount}
                          productId={productId}
                          cart={cart}
                          quantity={quantity}
                        />
                      </div>

                
                    )
                  })
                )
              }
              <div className="total_amount">
                <p>Total:</p> {" "}
                <p>{currentCurrency} {totalAmount.toFixed(2)}</p>
              </div>

              <div className="minicart_btn_links">
                <Link to="/cart" className='view active'>
                  <button className='active' onClick={this.handleCart}>View Bag</button>
                </Link>
                <button onClick={()=> alert("...Though, it might take a while, Never give up on your dreams!")}>Checkout</button>
              </div>
            </div>
          
          </>
        }
      </div>

      
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currentCurrency: state.currentCurrency,
    cartQuantity: state.cartQuantity
  };
};

export default connect(mapStateToProps)(Minicart)