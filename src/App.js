// a couple of functions from the React library
import React, { Component, Fragment } from "react";
// import components
import Helmet from './Components/Helmet.js';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
// import axios
import axios from 'axios';
// CSS for the `App` component
import "./App.scss";

class App extends Component {
  constructor() {
    super()

    this.state = {
      veganArray: [],
      isLoading: true
    }
  }

  componentDidMount() {
    axios({
      url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
      method: 'GET',
      responseType: 'json',
      params: {
        product_tags: 'vegan',
      }
    }).then((response) => {
      this.setState({
        veganArray: response.data,
        isLoading: false,
      })
    })
}

  render() {
    return (
      <Fragment>
        <Helmet />
        {
          this.state.isLoading
          ?
            <div className="preloader">
              <p>loading</p>
            </div>
          :
            <Fragment>
              <Header />
              <Main />
              <Footer />
            </Fragment>
        }
      </Fragment>
    );
  }
}

export default App;
