// Here we are importing all the required items.
import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.scss';
import axios from 'axios';
import GalleryTwo from './GalleryTwo';
import Genre from './Genre';
import Marvel from './Marvel.jpg';

// Here we are creating a react class called Gallery.
class Gallery extends React.Component 
{
  // Here we are creating the constructor for the Gallery class.
  constructor() 
  {
    let hashing = require('md5');   // Here we are creating a variable called hashing. 
    
    super();   // Here we are creating the super component.

    // Here we are creating four JSX properties.
    this.state = 
    {
      characters: {},
      characterValue: '',
      galleryChange: '',
      characterGallery: {}
    };

    // Here we are creating a variable called galleryUrl.
    this.galleryUrl = `https://gateway.marvel.com/v1/public/characters?apikey=1beffc73cfcb7fecae036c51624243fb&ts=${Date.now()}&hash=${hashing(`${Date.now()}9312b8d7a08924b14a53925cff1f22ffd378622c1beffc73cfcb7fecae036c51624243fb`)}&orderBy=name&limit=100`;

    // Here we are getting the marvel character information using axios.
    axios.get (this.galleryUrl).then ((respondToGalleryUrl) => { this.setState ({characters: respondToGalleryUrl.data.data, characterGallery: {} }); }).catch(() => {});

    // Here we are declaring the handleClick function.
    this.handleClick = this.handleClick.bind(this);
  }

  // Here we are implementing the handleClick function.
  handleClick(galleryId) 
  {
    let hashing2 = require('md5');   // Here we are creating a variable called hashing2.

    this.setState({galleryChange: ""});   // Here we are setting the state of galleryChange.

    // Here we are creating a variable called galleryUrl2.
    let galleryUrl2 = `https://gateway.marvel.com:443/v1/public/events/${galleryId}?apikey=1beffc73cfcb7fecae036c51624243fb&ts=${Date.now()}&hash=${hashing2(`${Date.now()}9312b8d7a08924b14a53925cff1f22ffd378622c1beffc73cfcb7fecae036c51624243fb`)}`;

    // Here we are getting the marvel character information using axios.
    axios.get (galleryUrl2).then ((respondToGalleryUrl2) => { this.setState({characterGallery: respondToGalleryUrl2.data.data.results[0].characters}); this.setState({galleryChange: galleryId}); this.setState ({characters: {} }); }).catch(() => {});
  }

  render()   // Here is the start of the render().
  {
    // If this.state.galleryChange does not equal ''.
    if (this.state.galleryChange !== '')
    {
      // Here we are returning the Gallery View when a genre is selected.
  		return (
  		  <div>

          {/* Here is a div called Header. */}
          <div className="Header">

            {/* Here is a img called homeImage. */}
            <img src={Marvel} className='homeImage' alt="HI"/>

            <br/>

            {/* Here is a Link called link. */}
            <Link to = "/" className = "link"> Search </Link>

            {/* Here is a Link called link. */}
            <Link to = "/gallery" className = "link"> Gallery </Link>

          </div>
     	 	
          <br/>

          {/* Here is a div called genreSelection. */}
     	 		<div className="genreSelection">

            Please select a title: 

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('302')}> Fear Itself </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('303')}> Age of X </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('305')}> Spider-Island </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('308')}> X-Men: Regenesis </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('309')}> Shattered Heroes</a>

            {/* Here is an a called one. */}
     	      <a href = {() => false} className = "one" onClick={() => this.handleClick('310')}> Avengers VS X-Men </a>

            {/* Here is an a called one. */}
     	      <a href = {() => false} className = "one" onClick={() => this.handleClick('311')}> Marvel NOW! </a>

            {/* Here is an a called one. */}
     	      <a href = {() => false} className = "one" onClick={() => this.handleClick('314')}> Age of Ultron </a>

            {/* Here is an a called one. */}
     	      <a href = {() => false} className = "one" onClick={() => this.handleClick('315')}> Infinity </a>

            {/* Here is an a called one. */}
     	      <a href = {() => false} className = "one" onClick={() => this.handleClick('316')}> X-Men: Battle of the Atom </a>

     	   	</div>

          <br/>

          {/* Here is a div called gallery. */}
     	    <div className = 'gallery'>

            {/* Here we are listing out all of the marvel characters for the selected genre.*/}
     	      <Genre characters = {this.state.characterGallery}/>

     	    </div>

     	  </div>
    	);
  	}
    else   // If this.state.galleryChange equals ''.
    {
      // Here we are returning the original Gallery View.
  		return (
        <div>

          {/* Here is a div called Header. */}
          <div className="Header">

            {/* Here is a img called homeImage. */}
            <img src={Marvel} className='homeImage' alt="HI"/>

            <br/>

            {/* Here is a Link called link. */}
            <Link to = "/" className = "link"> Search </Link>

            {/* Here is a Link called link. */}
            <Link to = "/gallery" className = "link"> Gallery </Link>

          </div>

          <br/>

          {/* Here is a div called genreSelection. */}
          <div className="genreSelection">

            Please select a title: 

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('302')}> Fear Itself </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('303')}> Age of X </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('305')}> Spider-Island </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('308')}> X-Men: Regenesis </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('309')}> Shattered Heroes</a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('310')}> Avengers VS X-Men </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('311')}> Marvel NOW! </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('314')}> Age of Ultron </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('315')}> Infinity </a>

            {/* Here is an a called one. */}
            <a href = {() => false} className = "one" onClick={() => this.handleClick('316')}> X-Men: Battle of the Atom </a>
            
          </div>

          <br/>

          {/* Here is a div called gallery. */}
          <div className='gallery'>

            {/* Here we are listing out all of the marvel characters for Gallery View.*/}
            <GalleryTwo characters = {this.state.characters} />

          </div>

        </div>        
  		);
  	}   
  }
}

export default Gallery;   // Here we are exporting the class called Gallery.