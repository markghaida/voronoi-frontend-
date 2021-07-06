import logo from './logo.svg';
import './App.css';
import Rhizom from './components/Rhizom';
import Search from './components/Search';
import Head from './components/Head';
import { useEffect, useState } from 'react';
import { timeFormatDefaultLocale } from 'd3';

// const backend = 'http://localhost:3000/bookmarks';
const backend = 'https://honeycomb-app.herokuapp.com/bookmarks';

function App( ){

  const getBookmarks = async ( ) => {
    console.log(searchValue)
    if ( searchValue.length === 0 ){
      console.log("there is no input in the bar")
      return setBookmarks( [ ] );
    }
    let res = searchValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if( res !== null ){ 
      console.log("saving this bookmark now")
      fetch(backend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { url: searchValue } ),
      })
      .then( response => response.json( ) )
      .then( data => {
        console.log( 'Success:', data );

        // I have to first determine if the data returned is coming
        //back as an error
        setSearch("")
        if(data[0] === "Url has already been taken"){
          setErrors( data[ 0 ] )
        }else{
          filteredList( data )
        }
      })
    }else{
      console.log("filtering based off of your search")
      // debugger 
      fetch( `${ backend }/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { search: searchValue } )
        } )
      .then( response => response.json( ) )
      .then( response => {  setLastReceipt( response.search ); filteredList( response.bookmarks ); } );
      // .then( response => console.log(response));
      // debugger 
    }
  }
  
  const filteredList = ( bookmarkList ) => {
    console.log(bookmarkList)
    let filteredBookmarks = bookmarkList.filter( ( bookmark ) => bookmark.score > 9 )
    setBookmarks( filteredBookmarks );
  } 
  const [ errors, setErrors ] = useState( "" );
  const [ lastReceipt, setLastReceipt ] = useState( "" );
  const [ searchValue, setSearch ] = useState( "" );
  const [ bookmarks, setBookmarks ] = useState( [ ] );
  useEffect( ( ) => {
    getBookmarks( );
  }, [ searchValue ] );

  return (
    <div id="App">
      {/* <Head
        resultLength={ bookmarks.length }
      /> */}
      <Search searchValue={ searchValue }
      setSearch={ setSearch } 
      errors={ errors } 
      lastReceipt={ lastReceipt } 
      resultLength={ bookmarks.length }
      />
      <Rhizom bookmarks={ bookmarks }/>
    </div>
  );
};

export default App;
