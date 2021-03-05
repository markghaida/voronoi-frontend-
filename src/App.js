import logo from './logo.svg';
import './App.css';
import Rhizom from './components/Rhizom.js';
import Search from './components/Search.js';
import { useEffect, useState } from 'react';
import { timeFormatDefaultLocale } from 'd3';

// const backend = 'http://localhost:3000/bookmarks/search/';
const backend = 'https://pure-temple-85885.herokuapp.com/bookmarks/search';


function App( ) {

  const getBookmarks = async ( ) => {
    console.log(searchValue)
    if (searchValue.length === 0){
      console.log("there is no input in the bar")
      return setBookmarks( [ ] );
    }
    let res = searchValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res !== null){
      console.log("fetching this bookmark now")
      fetch( backend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { url: searchValue } ),
      })
      .then( response => response.json( ) )
      .then( data => {
        console.log( 'Success:', data );
      } )
    } else {
      console.log("filtering based off of your input")
      let ourInput = searchValue; //holding this incase values changes by the time fetch is done
      fetch( backend, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { search: searchValue  } )
        } )
      .then( response => response.json( ) )
      .then( bookmarkList => {
        console.log( bookmarkList );
        if( ourInput === searchValue ) setBookmarks( bookmarkList );;
      } );
    }
  }

  const [ searchValue, setSearch ] = useState( "" );
  const [ bookmarks, setBookmarks ] = useState( [ ] );
  useEffect( ( ) => {
    getBookmarks( );
  }, [ searchValue ] );

  return (
    <div id="App">
      <Search searchValue={ searchValue } setSearch={ setSearch }/>
      <Rhizom bookmarks={ bookmarks }/>
    </div>
  );
};

export default App;
