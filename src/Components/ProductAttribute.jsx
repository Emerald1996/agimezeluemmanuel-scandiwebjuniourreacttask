import React, { Component } from 'react'
import { connect } from 'react-redux'
import parse from 'html-react-parser';
import {addItemToCart} from "../Redux/cartSlice"
import { v4 as uuid } from "uuid";
import "../Styles/ProductAttribute.css"
import { ButtonSizes, SelectedColor, AttributeSizes } from '../Styles/attributeStyle';

export class ProductAttribute extends Component {
  constructor() {
    super()
  
    this.state = {
       selectedAttribute: {}
    }
  }

  componentDidMount() {
    document.title = "product || add to cart"
    if(this.props.product) {
      let product = this.props.cart?.find(
      (item) =>  {
       return item.id === this.props.product?.id
      })

      this.setState({
        selectedAttribute: product?.selected ? product?.selected : this.state.selectedAttribute
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      let product = this.props.cart?.find(
        (item) => {
          return item.id === this.props.product.id
        }
      );
      this.setState({
        selectedAttribute: product?.selectedAttribute ? product?.selectedAttribute : this.state.selectedAttribute
      });
    }
  }

  addProductToCart( id,product) {
    this.props.addItemToCart(product)
    alert(`${product.name.toUpperCase()} added to cart successfully`)
  }

  handleAttribute(selectedAttribute) {
    this.setState({
      selectedAttribute: { ...this.state.selectedAttribute, ...selectedAttribute },
    },console.log("selected ", selectedAttribute));
  }
  render() {
    const {product, currentCurrency} = this.props
    const {selectedAttribute} = this.state
    

    // universally unique identifier that is generated using random characters
    const uid = uuid()

    const price = product?.prices?.find((price) => {
      return price.currency.symbol === currentCurrency
    })

    // product stock button styles

    this.btnStyle = product?.instock ? "addToCartBtn" : "noStockBtn"

    return (
      <>
        
        {
        
          product.attributes.map((attribute) => {
            return attribute.id !== "Color" ? (
              <AttributeSizes>
                <h3>{attribute.name.toUpperCase()}</h3>
                <div >
                  {
                    attribute.items.map((item, index) => {
                      return(
                      <ButtonSizes
                        key={item.id} 
                        onClick={()=>this.handleAttribute({
                          [attribute.id]: item.id
                        })} 
                        selected={
                          selectedAttribute[attribute.id] ? selectedAttribute[attribute.id] === item.id : index === 0
                        }
                        >
                          {item.value}
                      </ButtonSizes>
                      )
                    })
                  }
                </div>
              </AttributeSizes>
            ) : (
              <div  key={attribute.id} colorIndex={attribute.items.length}>
                <h4>{attribute.name.toUpperCase()}:</h4>
                <div style={{display: 'flex', marginTop: "-12px"}}>
                  {attribute.items.map((item, index) => (
                    <SelectedColor
                      style={{backgroundColor: item.value }}
                      onClick={() =>
                        this.handleAttribute({
                          [attribute.id]: item.id,
                        })
                      }
                      
                      selected={
                        selectedAttribute[attribute.id]
                          ? selectedAttribute[attribute.id] === item.id
                          : index === 0
                      }
                      key={item.id}
                    >
                    </SelectedColor>
                  ))}
                </div>
              </div>
            )
          })
        }
        <div className="price">
          <h3>PRICE:</h3>
          <p><big>{currentCurrency}</big> {price?.amount}</p>
        </div>

        <div className="add_to_cart_btn">
          {
            product.inStock ? 
            <button className='addToCartBtn' 
              onClick={() => this.addProductToCart(product.id + uid, {
              ...product, 
              id: product.id + uid,
              productId: product.id,
              selected: this.state.selectedAttribute,
              quantity: 1
            })}
            >
              Add to cart
            </button> :
             <button disabled className='noStockBtn'>Out of stock</button>
          }
        </div>

        <div className="desc">
          <p>{parse(product.description)}</p>
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    cart: state.cartItems,
    currentCurrency: state.currentCurrency,
    cartItemIds: state.cartItemIds,
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    addItemToCart: (product) => {
      return dispatch(addItemToCart(product))
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttribute)
