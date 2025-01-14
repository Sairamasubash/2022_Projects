import React, { Component } from 'react';
import {Button, List, Image, Input,  Container  } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styles from './Home.scss';
import ListView from './List';
import 'normalize.css';
import axios from 'axios'
import PropTypes from 'prop-types';


class App extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
      characters: {},
      selectedOption:"name",
      selectedOrder:"Ascending",
    };

    var public_key = '2f5e26fcc035d8014d57fece2897cba7';
    var private_key = 'eaa5cfc4f3318b6176607cc731eeb694d5454718';
    var ts = Date.now();
    var msg = `${ts}${private_key}${public_key}`;
    var md5 = require('md5');
    var hash = md5(msg);
    


    // this.baseUrl = 'https://gateway.marvel.com/v1/public/characters?apikey=2f5e26fcc035d8014d57fece2897cba7&ts=1??&hash=nameStartsWith=';
    this.baseUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${public_key}&ts=${ts}&hash=${hash}&nameStartsWith=`;
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleOptionChange= this.handleOptionChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  clickHandler() {
    // Form the URL
    let url = `${this.baseUrl}${this.state.value}`;
    if (this.state.selectedOption === "name"){
      if(this.state.selectedOrder === "Descending"){
        url = `${url}&orderBy=-name`;
      }else{
        url = `${url}&orderBy=name`;
      }
    }
    if (this.state.selectedOption === "modified"){
      if(this.state.selectedOrder === "Descending"){
        url = `${url}&orderBy=-modified`;
      }else{
        url = `${url}&orderBy=modified`;
      }
    }
    console.log('here');
    console.log(url);
    // GET some data back!
    axios.get(url).then((response) => {
      console.log(response);

      this.setState({
        characters: response.data.data
      });

    }).catch((error) => {
      console.log(error);
      this.setState({
        characters:{}
      });
    });
  }

  inputChangeHandler(event) {
    this.setState({ value: event.target.value });
  }

  handleOptionChange(event){
    this.setState({ selectedOption: event.target.value});
    console.log(this.state.selectedOption);
    console.log(event.target.value);
  }

  handleOrderChange(event){
    this.setState({ selectedOrder: event.target.value});
  }


  render() {
    return (
      <div>
        <div className="navbar" id="navbar">
          <Image src="https://cdn.freebiesupply.com/logos/large/2x/marvel-logo-png-transparent.png"  className='center'/>
        </div>
        <div className="menu">
            <Link to="/">Search</Link>
            <Link to="/gallery">Gallery</Link>
        </div>
        <div className="searchbar">
          <Input
            onChange={this.inputChangeHandler}
            placeholder='Search a character here'
            value={this.state.value}
            className="searchbar_input"
          />
          <Button className='button' onClick={this.clickHandler}> Search </Button>
        </div>

        <div className='radiodiv'>
          <form>
              <span className="radioinput">
                <label><input
                  type="radio"
                  value="name"
                  className="form-check-input"
                  checked={this.state.selectedOption === "name"}
                  onChange={this.handleOptionChange}
                  />
                  Name
                </label>
              </span>

              <span className="radioinput">
                <label>
                  <input
                    type="radio"
                    value="modified"
                    className="form-check-input"
                    checked={this.state.selectedOption === "modified"}
                    onChange={this.handleOptionChange}
                  />
                  Last Modified
                </label>
              </span>
            </form>

            <form>
              <span className="radioinput">
                <label><input
                  type="radio"
                  value="Ascending"
                  className="form-check-input"
                  checked={this.state.selectedOrder === "Ascending"}
                  onChange={this.handleOrderChange}
                  />
                  Ascending
                </label>
              </span>

              <span className="radioinput">
                <label>
                  <input
                    type="radio"
                    value="Descending"
                    className="form-check-input"
                    checked={this.state.selectedOrder === "Descending"}
                    onChange={this.handleOrderChange}
                  />
                  Descending
                </label>
              </span>
            </form>
        </div>

        <div>
          <Container className='listContainer'>
              <ListView characters={this.state.characters} />
          </Container>
        </div>
      


      </div>
    );
  }
}

export default App;