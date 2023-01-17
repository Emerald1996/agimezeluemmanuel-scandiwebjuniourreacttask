import React, { Component } from 'react'
import { graphql } from "@apollo/client/react/hoc";
import FETCH_CATEGORIES from './GraphqlQueryStore/categories'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Loading from "./Components/Loading"
import Header from './Components/Header';
import Categorypage from './Pages/Categorypage';
import ProductDescriptionPage from "./Pages/ProductDescriptionPage"

import "./App.css"
import CartPage from './Pages/CartPage';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      activeCategory: "",
    };
    this.setActiveCategory = this.setActiveCategory.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.loading) {
      this.setState({ activeCategory: this.props.data?.categories[0].name });
    }
  }

  setActiveCategory(category) {
    this.setState({ activeCategory: category });
  }
  render() {
    const {data} = this.props
    const categories = data.categories?.map((category) =>{ 
     return category.name
    });
    // console.log("data",categories)
    return (
      <div className='App'>
        <Router>
          {data.loading ? ( <Loading/>) : 
          (<Header activeCategory={this.state.activeCategory} categories={categories}/>)
          }

          <div>
            <Routes>
              {
                this.props.data?.categories?.map((category , index) => {
                  return (
                    <Route
                      exact
                      key={index}
                      path={index === 0 ? "/" : `${category.name}`}
                      element={
                        <Categorypage
                          categoryName={category.name}
                          setActiveCategory={this.setActiveCategory}
                        />
                      }
                    />
                    )
                  })
              }
              {
                categories?.map((category) => {
                  return (
                  <Route 
                    exact 
                    key={category} 
                    path={`/${category}/:id`} 
                    element={<ProductDescriptionPage/>} 
                  />
                  )
                })
              }
              <Route path='/cart' element={<CartPage/>}/>
            </Routes>
          </div>
        </Router>

      </div>
    )
  }
}

export default graphql(FETCH_CATEGORIES)(App);
