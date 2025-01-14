// Here we are importing all the required items.
import React from 'react';
import PropTypes from 'prop-types';
import './Styles.scss';
import { Link } from 'react-router-dom';

// Here we are creating a react class called List.
class List extends React.Component   
{
  render()   // Here is the start of the render().
  {
    // Here we are checking if any characters have been searched.
    const noMarvelCharactersSearched = ((Object.entries (this.props.marvelCharacters).length === 0) && (this.props.marvelCharacters.constructor === Object));

    // If there are characters that have been searched.
    if (!noMarvelCharactersSearched) 
    {
      // Here we are getting all the data for the marvel characters.
      const marvelCharactersList = this.props.marvelCharacters.results.map ((marvelCharactersData, index) => 
      {
        // Here we are creating a variable called ListUrl.
        let ListUrl = `${marvelCharactersData.thumbnail.path}.${marvelCharactersData.thumbnail.extension}`;
        // Here we are creating a variable called lastModified.
        let lastModified = marvelCharactersData.modified.substring (0, 10);

        // Here are creating an outline for the List.
        return(
          <ul>

            {/* Here we are creating a li called optionsList.*/}
            <li className = "optionsList" key = {index}>

              {/* Here is a link called list. */}
              <Link to = {`/Character/${marvelCharactersData.id}`} className = "list">

                  {/* Here we are creating a div called searchedInformation.*/}
                  <div className = "searchedInformation">

                    {/* Here we are creating a img called listImage.*/}
                    <img src = {ListUrl} className = "listImage" alt = "LI"/>

                    <br/>

                    {/* Here we are creating a p called listName.*/}
                    <p className = 'listName'> Character Name: {marvelCharactersData.name} </p>

                    {/* Here we are creating a p called listModified.*/}
                    <p className = 'listModified'> Last modified: {lastModified} </p>

                    <br/>
                    <br/>
                    <br/>

                  </div>

              </Link>

            </li>
            
          </ul>
        );
      });

      // Here we are returning the searched results.
      return (
        // Here we are creating a ul called unorderedSearchList.
        <ul className="unorderedSearchList">

          {/* Here we are creating a li called searchList.*/}
          <li className="searchList"> {marvelCharactersList} </li>

        </ul>
      );
    } 
    else   // If there are not characters that have been searched.
    {
      // Here we are returning the result when there is nothing searched.
      return (
        // Here we are creating a div called noSearch.
        <div className = "noSearch">

          <p> You have not searched for any characters yet! </p>

        </div>
      );
    }
  }
}

// Here we are implementing the propTypes library for the List class.
List.propTypes = 
{
  results: PropTypes.arrayOf (PropTypes.shape
  ({
    id: PropTypes.number,
    name: PropTypes.string,
    modified: PropTypes.string,
    thumbnail: PropTypes.shape 
    ({
      path: PropTypes.string,
      extension: PropTypes.string
    })
  }))
};

export default List;   // Here we are exporting the class called Gallery.