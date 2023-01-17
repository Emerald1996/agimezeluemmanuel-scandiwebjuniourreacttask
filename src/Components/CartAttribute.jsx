import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonSizes, SelectedColor,  AttributeSizes } from '../Styles/attributeStyle'

export class CartAttribute extends Component {
    constructor() {
        super()
    
        this.state = {
        selectedAttribute: {}
        }
    }
  componentDidMount() {
    document.title = "Minicart"
      let product = this.props.cart.find((item) =>  {
       return item.id === this.props.id
      })

      this.setState({
        selectedAttribute: product?.selected ? product?.selected : this.state.selectedAttribute
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      let product = this.props.cart.find(
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
    const { attributes, selectedAttribute } = this.props
    return (
      <>
        {
        
          attributes.map((attribute) => {
            return attribute.id !== "Color" ? (
              <div >
                <h3>{attribute.name.toUpperCase()}</h3>
                <AttributeSizes key={attribute.id}>
                  {
                    attribute.items.map((item, index) => {
                      return(
                      <ButtonSizes 
                        key={item.id} 
                         
                        selected={
                          selectedAttribute[attribute.id] ? selectedAttribute[attribute.id] === item.id : index === 0
                        }
                      >
                          {item.value}
                      </ButtonSizes>
                      )
                    })
                  }
                </AttributeSizes>
              </div>
            ) : (
              <div  key={attribute.id}>
                <h4>{attribute.name.toUpperCase()}:</h4>
                <div style={{display: 'flex', marginTop: "-12px"}}>
                  {attribute.items.map((item, index) => (
                    <SelectedColor
                      key={item.id}
                      style={{backgroundColor: item.value }}
                      onClick={() =>
                        this.handleAttribute({
                          [attribute.id]: item.id,
                        })
                      }
                      selected={
                        selectedAttribute[attribute.id] ? selectedAttribute[attribute.id] === item.id  : index === 0
                      }
                    >
                    </SelectedColor>
                  ))}
                </div>
              </div>
            )
          })
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CartAttribute)