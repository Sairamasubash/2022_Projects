import React from 'react';
import Home from './Components/Home';
import './Components/Home.scss';
import {Routes,Route} from 'react-router-dom'
import Gallery from './Components/Gallery';
import Detail from './Components/Detail';

function App() {
  return (
    <>
     <Routes>
       <Route path='/'element={<Home/>}/>
       <Route path='/Gallery'element={<Gallery/>}/>
       <Route path='/char/:id' element={<Detail/>}/>
     </Routes>
    </>
  )
}

export default App;