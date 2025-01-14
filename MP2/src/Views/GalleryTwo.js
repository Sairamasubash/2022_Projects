// Here we are importing all the required items.
import React from 'react';
import PropTypes from 'prop-types';
import './Styles.scss';
import { Link } from 'react-router-dom';

// Here we are creating a react class called GalleryTwo.
class GalleryTwo extends React.Component 
{
  render()   // Here is the start of the render().
  {
    // Here we are checking if any characters have been searched.
    const noMarvelCharactersSearched = ((Object.entries (this.props.characters).length === 0) && (this.props.characters.constructor === Object));

    // If there are characters that have been searched.
    if (!noMarvelCharactersSearched) 
    {
      // Here we are getting all the data for the marvel characters.
      const marvelCharactersGallery = this.props.characters.results.map ((marvelCharactersData, index) => 
      {
        // Here we are creating a variable called galleryTwoUrl.
        let galleryTwoUrl = `${marvelCharactersData.thumbnail.path}.${marvelCharactersData.thumbnail.extension}`;

        // Here are creating an outline for the Gallery.
        return (
          // Here we are creating a div called optionsGallery.
          <div className = "optionsGallery" key={index}>

            {/* Here is a link called gallery. */}
            <Link to = {`/Character/${marvelCharactersData.id}`} className = "gallery">

              {/* Here we are creating a img called galleryTwoImage.*/}
              <img src = {galleryTwoUrl} className = "galleryTwoImage" alt = "GTI"/>

            </Link>

          </div>
        );
      });

      // Here we are returning the gallery results.
      return (
        // Here we are creating a div called searchGallery.
        <div className = "searchGallery">

          {/* Here we are printing out the gallery.*/}
          {marvelCharactersGallery}

        </div>
      );
    } 
    else   // If there are not characters that have been searched.
    {
      // Here we are returning the result when there is nothing searched.
      return (
        // Here we are creating a div called noGallerySearch.
        <div className = "noGallerySearch">

          <p> You have not searched for any characters yet! </p>

        </div>
      );
    }
  }
}

// Here we are implementing the propTypes library for the GalleryTwo class.
GalleryTwo.propTypes = 
{
  results: PropTypes.arrayOf (PropTypes.shape
  ({
    id:PropTypes.number,
    modified:PropTypes.string,
    thumbnail:PropTypes.shape
    ({
      path:PropTypes.string,
      extension: PropTypes.string
    })
  }))
};

export default GalleryTwo;   // Here we are exporting the class called Gallery.