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
    if ( searchValue.length === 0 ) setBookmarks( [ ] );
    const res = searchValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if( res !== null ){
      fetch( backend, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify( { url: searchValue } ),
      })
      .then( response => response.json( ) )
      .then( data => {
        if(data[0] === "Url has already been taken"){ setErrors( data[ 0 ] ) }
        else filteredList( data );
      } );
    }else{
      fetch( `${ backend }/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { search: searchValue } )
        } )
      .then( response => response.json( ) )
      .then( response => {  setLastReceipt( response.search ); filteredList( response.bookmarks ); } );
    }
  }

  //cleaning up bookmarks here
  const filteredList = ( bookmarkList ) => {

    //if no results.. do nothing
    if( !bookmarkList[0] ) return setBookmarks( [ ] );

    //parseing strring in similar_bookmarks to JSON
    if( bookmarkList[0]) bookmarkList.forEach((item, i) => {
      item.similar_bookmarks = JSON.parse( item.similar_bookmarks ).similar_bookmarks;
      console.log( item.similar_bookmarks );
    });

    //if the score is less than 9 we are going to remove it. #TEMP
    let filteredBookmarks = bookmarkList.filter( ( bookmark ) => bookmark.score > 9 );
    setBookmarks( filteredBookmarks );
  }
  const [ errors, setErrors ] = useState( "" );
  const [ lastReceipt, setLastReceipt ] = useState( "" );
  const [ searchValue, setSearch ] = useState( "" );
  const [ bookmarks, setBookmarks ] = useState( [ ] );
  useEffect( ( ) => getBookmarks( ), [ searchValue ] );

  // {<Head resultLength={ bookmarks.length }/>}
  return <div id="App">
    <Search searchValue={ searchValue } setSearch={ setSearch } errors={ errors } lastReceipt={ lastReceipt } resultLength={ bookmarks.length }/>
    <Rhizom bookmarks={ bookmarks }/>
  </div>;
};

export default App;
