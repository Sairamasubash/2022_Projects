import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Image, Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import styles from './Gallery2.scss'


class GalleryView extends Component {
  render() {
    // Check if the object is empty
    const noCharacter = Object.entries(this.props.characters).length === 0
      && this.props.characters.constructor === Object;

    if (noCharacter) {
      return (
        <Card className="noCharacter">
          <h3>No character yet!</h3>
        </Card>
      )
    } else {
      // Iterate over the Pokemon's abilities and generate a label for each.
      const characters_view = this.props.characters.results.map((character_data,idx)=>{
          // console.log(idx);
          var url = `${character_data.thumbnail.path}.${character_data.thumbnail.extension}`;
          var date = character_data.modified.substring(0,10);
          var id = character_data.id;
          var char = `/char/${id}`;
          return(

              <Grid.Column key={idx}>
               <Link to={char}>
                <div>
                  <Card className="noCharacter">
                    <Image src={url} />
                  </Card>
                </div>
                </Link>
                  
              </Grid.Column>
            )
        });

      // Display some data about the Pokemon, and its abilities.
      return (
          <Grid container columns={3}>
            {characters_view}
          </Grid>
        
      )
    }
  }
}

GalleryView.propTypes = {
  // count: PropTypes.number,
  // limit: PropTypes.number,
  // offset: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.shape({
      id:PropTypes.number,
      name:PropTypes.string,
      modified:PropTypes.string,
      thumbnail:PropTypes.shape({
        path:PropTypes.string,
        extension: PropTypes.string
      })
    })),
  // total: PropTypes.number,
}
export default GalleryView