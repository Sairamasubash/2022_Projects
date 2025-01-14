// Here we are importing all the required items.
import React from 'react';
import Home from './Views/Home';
import './Views/Styles.scss';
import {Routes, Route} from 'react-router-dom';
import Gallery from './Views/Gallery';
import Detail from './Views/Detail';

// Here we are creating a react function called App.
function App() {
  // Here we are returning the paths to the three links that are being used.
  return (
    <>
     <Routes>
       <Route path = '/' element = {<Home/>}/>   
       <Route path = '/Gallery' element = {<Gallery/>}/>
       <Route path = '/Character/:id' element ={<Detail/>}/>
     </Routes>
    </>
  )
}

export default App;   // Here we are exporting the function called App.