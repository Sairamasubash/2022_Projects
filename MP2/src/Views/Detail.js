// Here we are importing all the required items.
import React from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Marvel from './Marvel.jpg';
import './Styles.scss';
import PropTypes from 'prop-types';

// Here we are creating a react class called Detail.
export const Detail = () =>   
{
  // Here we are using useParams from react-router-dom.
  const {id} = useParams ();

  // Here we are using useState from react.
  var [detail, setDetail] = useState ()

  // Here we are creating the getCharacterDetails function.
  const getCharacterDetails = async () =>
  {
    // Here we are getting the marvel character details using axios.
    const respondToDetailUrl = await axios.get (`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=1beffc73cfcb7fecae036c51624243fb&hash=6d68bd58c614c6c6d3e316fd3fc0b6d1`)

    // Here we are settinng the marvel character details after using axios.
    setDetail (respondToDetailUrl.data.data.results[0])
  }

  getCharacterDetails ();   // Here we are calling the getCharacterDetails function.

  // Here we are returning the detailView.
  return (
    <>
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

      {
        // Here we are checking if there is any detail for the selected item.
        (!detail) ? "" : 
        (
          // Here is a div called detailInformations. 
          <div className = "detailInformations">

            {/* Here is a div called detailDescription. */}
            <div className = "detailDescription">

              {/* Here is a p. */}
              <p> Character Name: {detail.name} </p>

              <br/>

              {/* Here is a p. */}
              <p> Last Modified: {detail.modified.substring (0, 10)} </p>

              <br/>
              
              {/* Here is a p. */}
              <p> Character Description: {detail.description} </p>

              <br/>

            </div>

            <br/>

            {/* Here is a div called detailImage. */}
            <div className = "imageDetail">

              {/* Here is a img. */}
              <img src = {`${detail.thumbnail.path}.${detail.thumbnail.extension}`} className = "detailImage" alt = "DI" />

            </div>

          </div>
        )
      }
    </>
  )
}

// Here we are implementing the propTypes library for the Detail class.
Detail.propTypes = 
{
  results: PropTypes.arrayOf (PropTypes.shape
  ({
    id:PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    modified: PropTypes.string,
    thumbnail:PropTypes.shape
    ({
      path:PropTypes.string,
      extension: PropTypes.string
    })
  }))
};

export default Detail;   // Here we are exporting the class called Detail.