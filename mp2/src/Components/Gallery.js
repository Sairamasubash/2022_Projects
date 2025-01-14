import React, { Component } from 'react';
import {Button, List, Image, Input,  Container  } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'normalize.css';
import styles from './Gallery.scss';
import axios from 'axios'
import PropTypes from 'prop-types';
import GalleryView from './Gallery2'
import EventView from './EventView'


class Gallery extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      characters: {},
      filter: '',
      charlist:{}
    };

    this.public_key = '2f5e26fcc035d8014d57fece2897cba7';
    var private_key = 'eaa5cfc4f3318b6176607cc731eeb694d5454718';
    this.ts = Date.now();
    var msg = `${this.ts}${private_key}${this.public_key}`;
    var md5 = require('md5');
    this.hash = md5(msg);
    

    this.filterUrl = 'https://gateway.marvel.com:443/v1/public/events/';
    this.baseUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}&orderBy=-modified&limit=50`;
    // GET some data back!
    axios.get(this.baseUrl).then((response) => {
      this.setState({
        characters: response.data.data,
        charlist:{}
      });

    }).catch((error) => {
      console.log(error);
    });
    // this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    // this.handleOptionChange= this.handleOptionChange.bind(this);
    // this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  clickHandler(id) {
    // Form the URL
    this.setState({filter: ""});
    let url = `${this.filterUrl}${id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
    console.log('clicked');
    console.log(id);
    // GET some data back!
    axios.get(url).then((response) => {
      	this.setState({charlist: response.data.data.results[0].characters});
      	this.setState({filter: id});
      	this.setState({characters:{}});
    }).catch((error) => {
       console.log(error);
    });
    
}

  render() {
  	if (this.state.filter===''){
      console.log(this.state.characters);
  		return (
     	 <div>
     	    <div className="navbar" id="navbar">
            <Image src="https://cdn.freebiesupply.com/logos/large/2x/marvel-logo-png-transparent.png"  className='center'/>
          </div>
     	   <div className="menu">
     	        <Link to="/">Search</Link>
              <Link to="/gallery">Gallery</Link>
     	   </div>
     	   <div className="filter">
     	   	<span className="selectevent">Select an event:</span>
     	       <a value='315' onClick={() => this.clickHandler('315')}> Infinity </a>
     	       <a value='333' onClick={() => this.clickHandler('333')}> Monsters Unleashed </a>
     	       <a value='266' onClick={() => this.clickHandler('266')}> Other - Evolve or Die </a>
     	       <a value='336' onClick={() => this.clickHandler('336')}> Secret Empire </a>
     	       <a value='60'  onClick={() => this.clickHandler('60')}> World War Hulks </a>
     	       <a value="234" onClick={() => this.clickHandler('234')}> Avengers Disassembled </a>
     	   </div>
     	   <div>
     	     <Container className='galleryContainer'>
     	         <GalleryView characters={this.state.characters} />
     	     </Container>
     	   </div>
     	 </div>
    	);
  	}

  	else{
      console.log("change event");
      // console.log(this.state.charlist);
  		return (
  			<div>
     		   <div className="navbar" id="navbar">
            <Image src="https://cdn.freebiesupply.com/logos/large/2x/marvel-logo-png-transparent.png"  className='center'/>
          </div>
     		   <div className="menu">
     		       <Link to="/">Search</Link>
              <Link to="/gallery">Gallery</Link>
     		   </div>
     	 	
     	 		<div className="filter">
     	   		<span className="selectevent">Select an event:</span>
     	   		   <a value='315' onClick={() => this.clickHandler('315')}> Infinity </a>
     	       	   <a value='333' onClick={() => this.clickHandler('333')}> Monsters Unleashed </a>
     	       	   <a value='266' onClick={() => this.clickHandler('266')}> Other - Evolve or Die </a>
     	       	   <a value='336' onClick={() => this.clickHandler('336')}> Secret Empire </a>
     	       	   <a value='60'  onClick={() => this.clickHandler('60')}> World War Hulks </a>
     	       	   <a value="234" onClick={() => this.clickHandler('234')}> Avengers Disassembled </a>
     	   		</div>
     	   		<Container className='galleryContainer'>
     	         <EventView characters={this.state.charlist} />
     	     </Container>
     	   </div>
  		)
  	}
    
  }
}

export default Gallery