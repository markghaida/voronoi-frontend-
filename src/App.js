import logo from './logo.svg';
import './App.css';
import Rhizom from './components/Rhizom.js';
import Search from './components/Search.js';
import { useEffect, useState } from 'react';
import { timeFormatDefaultLocale } from 'd3';

// const backend = 'http://localhost:3000/bookmarks';
const backend = 'https://guarded-wave-40506.herokuapp.com/bookmarks';


function App( ){

  const getBookmarks = async ( ) => {
    console.log(searchValue)
    if (searchValue.length === 0){
      console.log("there is no input in the bar")
      return setBookmarks( [ ] );
    }
    let res = searchValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res !== null){
      setSubmit(true)
      if (submitButton === "clicked"){
        console.log("fetching this bookmark now")
        fetch(backend, {
        // mode: 'no-cors',
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
          if(data[0] === "Url has already been taken"){
            setErrors(data[0])
          }else{
            filteredList(data)
          }
          // if it is, setErrors
            // if it isnt, trigger a fetch and re-render bookmarks that
              //match the input
        } )
    }}else{
      let ourInput = searchValue; //holding this incase values changes by the time fetch is done
      fetch( `${backend}/search`, {
        mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { search: searchValue  } )
        } )
      .then( response => response.json( ) )
      .then( bookmarkList => {
        console.log( bookmarkList );
        if( ourInput === searchValue ) filteredList( bookmarkList );
      } );
    }
  }

  const filteredList = (bookmarkList) => {
    let filteredBookmarks = bookmarkList.filter((bookmark) => bookmark.score > 9)
    setBookmarks(filteredBookmarks);
  } 
  const [ errors, setErrors] = useState("")
  const [ submitButton, setSubmit] = useState(false)
  const [ searchValue, setSearch ] = useState( "" );
  const [ bookmarks, setBookmarks ] = useState( [ ] );
  useEffect( ( ) => {
    getBookmarks( );
  }, [ searchValue ] );

  return (
    <div id="App">
      <Search searchValue={ searchValue } setSearch={ setSearch } errors={errors} setSubmit={setSubmit}/>
      <Rhizom bookmarks={ bookmarks }/>
    </div>
  );
};

export default App;
