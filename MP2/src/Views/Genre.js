// Here we are importing all the required items.
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import GalleryTwo from './GalleryTwo';

// Here we are creating a react class called Genre.
class Genre extends React.Component 
{
  // Here we are creating the constructor for the Genre class.
  constructor(props) 
  {
    let hashing = require('md5');   // Here we are creating a variable called hashing.
    
    super(props);   // Here we are creating the super component.

    // Here we are creating three JSX properties.
    this.state = 
    {
      characters: [],
      results: {},
      characterValue: ''
    };

    // Here we are using the map function to go through all of the marvel characters.
    this.props.characters.items.map ((ganres) => 
    {
      // Here we are creating a variable called genreUrl.
      let genreUrl = `https://gateway.marvel.com:443/v1/public/characters/${ganres.resourceURI.substring (ganres.resourceURI.length - 8, ganres.resourceURI.length)}?apikey=1beffc73cfcb7fecae036c51624243fb&ts=${Date.now()}&hash=${hashing(`${Date.now()}9312b8d7a08924b14a53925cff1f22ffd378622c1beffc73cfcb7fecae036c51624243fb`)}`;
          
      // Here we are getting the marvel character information using axios.
      axios.get (genreUrl).then ((respondToGenreUrl) => { return respondToGenreUrl.data.data.results[0]; }).then ((ganre) => { let combined = this.state.characters.concat(ganre); this.setState({characters: combined}); }).then (() => { this.setState ({ results: {results: this.state.characters} }); }); 
      
      return console.log("Warning Removed");
    });
  }

  render()   // Here is the start of the render().
  {
    // Here we are returning the genre results. 
    return (
      // Here we are creating a div called ganres.
      <div className = 'ganres'>

        {/* Here we are listing out all of the marvel characters for the Gallery View.*/}
        <GalleryTwo characters = {this.state.results} />

      </div>
    );
  }
}

// Here we are implementing the propTypes library for the Genre class.
Genre.propTypes = 
{
  items: PropTypes.arrayOf (PropTypes.shape
  ({
    resourceURI:PropTypes.string,
  }))
};

export default Genre;   //Here we are exporting the class called Gallery.