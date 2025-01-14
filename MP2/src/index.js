// Here we are importing all the required items.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

// Here we are using ReactDOM.render and BrowserRouter.
ReactDOM.render( 

  <BrowserRouter basename = {process.env.PUBLIC_URL}>
      <App /> 
  </BrowserRouter>,

  document.getElementById('root')   // Here we are getting the root element by id.
);
