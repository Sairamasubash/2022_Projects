import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Image, Card, Container} from 'semantic-ui-react'
import axios from 'axios'
import GalleryView from './Gallery2'


class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      characters: [],
      results:{}
    };
    console.log("in EventView");
    this.public_key = '2f5e26fcc035d8014d57fece2897cba7';
    var private_key = 'eaa5cfc4f3318b6176607cc731eeb694d5454718';
    this.ts = Date.now();
    var msg = `${this.ts}${private_key}${this.public_key}`;
    var md5 = require('md5');
    this.hash = md5(msg);
    
    this.baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';

    // GET some data back!
    this.props.characters.items.map((info,idx)=>{
          var char_id = info.resourceURI.substring(info.resourceURI.length-7,info.resourceURI.length);
          var url = `${this.baseUrl}${char_id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
          
          // GET some data back!
          axios.get(url).then((response) => {
            
            return response.data.data.results[0];
          }).then((character)=>{
              var joined = this.state.characters.concat(character);
              this.setState({characters:joined});
          }).then((response)=>{
              // console.log(this.state.characters);
          }).then((response)=>{
              this.setState({results:{results:this.state.characters}});
              // console.log(this.state.results);

          }).catch((error) => {
            console.log(error);
          });
        });
    }

  render() {
    console.log("in event");
        // console.log(this.state.results);

      // Display some data about the Pokemon, and its abilities.
      return (

          <Container className='galleryContainer'>
            <GalleryView characters={this.state.results} />
          </Container>
        
      )
  }
  
}

EventView.propTypes = {
  available: PropTypes.number,
  collectionURI: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
      resourceURI:PropTypes.string,
      name:PropTypes.string,
    })),
}
export default EventView