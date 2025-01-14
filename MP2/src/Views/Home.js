// Here we are importing all the required items.
import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.scss';
import List from './List';
import axios from 'axios';
import Marvel from './Marvel.jpg';

// Here we are creating a react class called App.
class App extends React.Component  
{
  // Here we are creating the constructor for the App class.
  constructor() 
  {
    super();   // Here we are creating the super component.

    // Here we are creating four JSX properties.
    this.state = 
    {
      marvelCharacters: {},
      characterValue: '',
      sortProperty: "name",
      sortOrder: "Ascending"
    };
    
    // Here we are declaring the handleSearchChange function.
    this.handleSearchChange = this.handleSearchChange.bind(this);

    // Here we are declaring the handleSortedPropertyChange function.
    this.handleSortedPropertyChange= this.handleSortedPropertyChange.bind(this);

    // Here we are declaring the handleSortedOrderChange function.
    this.handleSortedOrderChange = this.handleSortedOrderChange.bind(this);

    // Here we are declaring the handleClick function.
    this.handleClick = this.handleClick.bind(this);

    // Here we are creating a variable called homeUrl.
    this.homeUrl = `https://gateway.marvel.com/v1/public/characters?apikey=1beffc73cfcb7fecae036c51624243fb&ts=1&hash=6d68bd58c614c6c6d3e316fd3fc0b6d1&nameStartsWith=`;
  }

  // Here we are implementing the handleSearchChange function.
  handleSearchChange (event) 
  {
    // Here we are setting the state of event.target.value.
    this.setState ({ value: event.target.value });
    this.handleClick();
  }

  // Here we are implementing the handleSortedPropertyChange function.
  handleSortedPropertyChange (event)
  {
    // Here we are setting the state of event.target.value.
    this.setState ({ sortProperty: event.target.value});
  }

  // Here we are implementing the handleSortedOrderChange function.
  handleSortedOrderChange (event)
  {
    // Here we are setting the state of event.target.value.
    this.setState ({ sortOrder: event.target.value});
  }

  // Here we are implementing the handleClick function.
  handleClick () 
  {
    // Here we are creating a variable called homeUrl2.
    let homeUrl2 = `https://gateway.marvel.com/v1/public/characters?apikey=1beffc73cfcb7fecae036c51624243fb&ts=1&hash=6d68bd58c614c6c6d3e316fd3fc0b6d1&nameStartsWith=${this.state.value}`;

    // If this.state.sortProperty equals "modified".
    if (this.state.sortProperty === "modified")
    {
      // If this.state.sortOrder equals "Descending".
      if (this.state.sortOrder === "Descending")
      {
        // Here we are setting the value once again to the variable called homeUrl2.
        homeUrl2 = `https://gateway.marvel.com/v1/public/characters?apikey=1beffc73cfcb7fecae036c51624243fb&ts=1&hash=6d68bd58c614c6c6d3e316fd3fc0b6d1&nameStartsWith=${this.state.value}&orderBy=-modified`;
      }
      else   // If this.state.sortOrder does not equal "Descending".
      {
        // Here we are setting the value once again to the variable called homeUrl2.
        homeUrl2 = `https://gateway.marvel.com/v1/public/characters?apikey=1beffc73cfcb7fecae036c51624243fb&ts=1&hash=6d68bd58c614c6c6d3e316fd3fc0b6d1&nameStartsWith=${this.state.value}&orderBy=modified`;
      }
    }

    // If this.state.sortProperty equals "name".
    if (this.state.sortProperty === "name")
    {
      // If this.state.sortOrder equals "Descending".
      if (this.state.sortOrder === "Descending")
      {
        // Here we are setting the value once again to the variable called homeUrl2.
        homeUrl2 = `https://gateway.marvel.com/v1/public/characters?apikey=1beffc73cfcb7fecae036c51624243fb&ts=1&hash=6d68bd58c614c6c6d3e316fd3fc0b6d1&nameStartsWith=${this.state.value}&orderBy=-name`;
      }
      else   // If this.state.sortOrder does not equal "Descending". 
      {
        // Here we are setting the value once again to the variable called homeUrl2.
        homeUrl2 = `https://gateway.marvel.com/v1/public/characters?apikey=1beffc73cfcb7fecae036c51624243fb&ts=1&hash=6d68bd58c614c6c6d3e316fd3fc0b6d1&nameStartsWith=${this.state.value}&orderBy=name`;
      }
    }

    // Here we are getting the marvel character information using axios.
    axios.get (homeUrl2).then ((respondToHomeUrl2) => { this.setState ({marvelCharacters: respondToHomeUrl2.data.data}); }).catch (() => { this.setState ({marvelCharacters: {}}); });
  }

  render ()   // Here is the start of the render().
  {
    // Here we are returning the format of the List View.
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

        {/* Here is a div called searchCharacter. */}
        <div className = "searchCharacter">

          <from>

            {/* Here is a input called searchCharacterData. */}
            <input className = "searchCharacterData" onChange = {this.handleSearchChange} placeholder = 'Please search for a marvel character here' value = {this.state.value} />

          </from>
          
          {/* Here is a input called searchButton. */}
          <button className = 'searchButton' onClick = {this.handleClick}> Search </button>

        </div>

        <br/>

        {/* Here is a input called propertyRadio. */}
        <div className = "propertyRadio">

          Please select a sorting property (default is Character Name): 

          {/* Here is a input called characterName. */}
          <input className = "characterName" type = "radio" value = "name" checked = {this.state.sortProperty === "name"} onChange = {this.handleSortedPropertyChange} />

          Character Name

          {/* Here is a input called lastModifiedCharacter. */}
          <input className = "lastModifiedCharacter" type = "radio" value = "modified" checked = {this.state.sortProperty === "modified"} onChange = {this.handleSortedPropertyChange} />

          Last Modified Character

        </div>

        {/* Here is a input called orderRadio. */}
        <div className = "orderRadio">

          Please select a sorting order (default is Ascending Order):

          {/* Here is a input called ascendingOrder. */}
          <input className = "ascendingOrder" type = "radio" value = "Ascending" checked = {this.state.sortOrder === "Ascending"} onChange = {this.handleSortedOrderChange} />

          Ascending Order

          {/* Here is a input called descendingOrder. */}
          <input className = "descendingOrder" type = "radio" value = "Descending" checked = {this.state.sortOrder === "Descending"} onChange = {this.handleSortedOrderChange} />

          Descending Order

        </div>

        <br/>

        {/* Here is a div called homeList. */}
        <div className = 'homeList'>

          {/* Here we are listing out all of the marvel characters for List View.*/}
          <List marvelCharacters = {this.state.marvelCharacters} />

        </div>

      </div>
    );
  }
}

export default App;   // Here we are exporting the class called Gallery.