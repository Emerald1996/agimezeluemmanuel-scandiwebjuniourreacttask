import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "../Styles/CartPage.css"
// import "../Styles/CartProduct.css"
import { removeItemFromCart, handleCount,clearCartItems } from '../Redux/cartSlice';
// import CartAttribute from '../Components/CartAttribute';
import CartProduct from '../Components/CartProduct';

export class CartPage extends Component {
  constructor() {
    super()
  
    this.state = {
        imageArrayIndex: 0,
        selectedAttribute: {}
    }
  }
  componentDidMount() {
    document.title = "Cart"
      let product = this.props.cart?.find((item) =>  {
        console.log("item " , item)
       return item.id === this.props.id
      })

      this.setState({
        selectedAttribute: product?.selected ? product?.selected : this.state.selectedAttribute
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      let product = this.props.cart?.find(
        (item) => {
          return item.id === this.props.id
        }
      );
      this.setState({
        selectedAttribute: product?.selected ? product?.selected : this.state.selectedAttribute,
      });
    }
  }

  render() {
    const { cart, currentCurrency, totalQuantity} = this.props
    // const {imageArrayIndex, selectedAttribute} = this.state
    const totalAmount = cart.reduce((total, cartItem) => {
        cartItem?.prices?.forEach(({ currency, amount }) => {
            if (currency.symbol === currentCurrency) {
                total = total + amount * cartItem.quantity;
            }
        });
        return total;
    }, 0);
    
    return (
      <div className="cart_body">
        <h2>CART</h2>
        {
            cart.length === 0 ? (
                <div className="empty_cart">
                    <p>Your cart is empty. {" "} 
                    <Link to="/" className='empty_cart_link'>
                        <span>click to continue shopping</span>
                    </Link>
                    </p>
                </div>
            ): (
                <div className="cart_container">

                    {cart.map(({attributes, brand, category, gallery, id, name, prices, productId, quantity, selected}) => {
                      const currencyPrice = prices.find((currency)=> currency.currency.symbol === currentCurrency)
                       return (
                        <div className='cart_info' key={id}>
                            <div className="display_cartproducts">
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
                        </div>
                        )
                    })}
                    <div className='accumulator'>
                      <div className="total">
                        <p>Tax 21%:{" "} <span>{currentCurrency} {(totalAmount * 0.21).toFixed(2)}</span></p>
                        <p>Quantity:{" "} <span>{totalQuantity}</span></p>
                        <p>Total:{" "} <span>{currentCurrency} {totalAmount.toFixed(2)}</span></p>
                        <button onClick={()=> alert("Your order is processing, buy yourself a coffee and chill!😇 ")}>Order </button>
                      </div>
                      <div className="clear_cart">
                        <button onClick={() => this.props.clearCartItems()} style={{border: "none", cursor: "pointer", color: "red"}}>Clear cart</button>
                      </div>
                    </div>
                </div>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currentCurrency: state.currentCurrency,
    totalQuantity: state.totalQuantity
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCount: (product) => dispatch(handleCount(product)),
    removeItemFromCart: (id) => dispatch(removeItemFromCart(id)),
    clearCartItems: () => dispatch(clearCartItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)