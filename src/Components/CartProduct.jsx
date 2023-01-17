import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleCount, removeItemFromCart } from '../Redux/cartSlice';
import CartAttribute from './CartAttribute';
import { Link } from 'react-router-dom';

export class CartProduct extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        imageArrayIndex: 0,
        selectedAttribute: {}
    }
  }

  componentDidMount() {
    //find selected attribute prop  in cart
      const product = this.props.cart?.find((item) =>  {
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

  // image slider click event
  handleSlider = (prev , next) => {
  if (this.state.imageArrayIndex === 0 && !next) {
    this.setState({ imageArrayIndex: prev - 1 });
    return;
  }
  if (this.state.imageArrayIndex === prev - 1 && next) {
    this.setState({ imageArrayIndex: 0 });
    return;
  }
  if (next) {
    this.setState({ imageArrayIndex: this.state.imageArrayIndex + 1 });
    return;
  } else {
    this.setState({ imageArrayIndex: this.state.imageArrayIndex - 1 });
    return;
  }
}
  render() {
    const { attributes, brand, category, currentCurrency, currencyPrice, gallery, id, name,  productId, quantity} = this.props
    const {selectedAttribute} = this.state
    return (
      <div className='minicart_info'>
        <div className="minicart_item_info">
          <button onClick={ ()=>this.props.removeItemFromCart(id,alert(`${name.toUpperCase()} has been removed from cart successfully`))}>X</button>
          <Link to={`/${category}/${productId}`} className='product_name_navigate'>
            <h2>{brand}</h2>
            <h3>{name}</h3>
          </Link>
          <div><CartAttribute attributes={attributes} selectedAttribute={selectedAttribute}/></div>
          <div className="minicart_item_price">
            <p>PRICE:</p>
            <p><big>{currentCurrency}</big> {(currencyPrice * quantity).toFixed(2)}</p>
          </div>
        </div>

        <div className="minicart_count_btns">
          <button onClick={() => this.props.handleCount({ id, add: true })}>+</button>
          <p>{quantity}</p>
          <button onClick={() => this.props.handleCount({ id, subtract: true })}>-</button>
        </div>

        <div className="slider">
          <img src={gallery[this.state.imageArrayIndex]} alt="gallery" />
          {
            gallery.length > 1 && (
              <div className="slider_btns">
                <p onClick={() => this.handleSlider(gallery.length)}>{"<"}</p>
                <p  onClick={() => this.handleSlider(gallery.length)}>{">"}</p>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleCount: (product) => {
      return dispatch(handleCount(product))
    },
    removeItemFromCart: (id) =>{ 
      return dispatch(removeItemFromCart(id))
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CartProduct)