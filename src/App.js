import logo from './logo.svg';
import './App.css';
import Rhizom from './components/Rhizom.js';
import Search from './components/Search.js';
import { useEffect, useState } from 'react';
import { timeFormatDefaultLocale } from 'd3';

const backend = 'http://localhost:3000/bookmarks/search';
// const backend = 'https://pure-temple-85885.herokuapp.com/bookmarks/search';

function App() {

// ================
  // const getBookmarks = async ( ) => {
// ===============
  const getBookmarks = (searchInput) => {
// =====================
    console.log(searchValue)
    // if( searchValue === "" ) return [];
    if (searchValue.length === 0){
      console.log("there is no input in the bar")
      return setBookmarks( [ ] );
    }
    let res = searchValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res !== null){
      console.log("fetching this bookmark now")
      // =======
      fetch('https://pure-temple-85885.herokuapp.com/bookmarks', {
      // fetch('http://localhost:3000/bookmarks', {
      method: 'POST', 
      // ==========
      // fetch( backend, {
      // method: 'POST',
      // =================
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url: searchValue}),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
      }else{
        console.log("filtering based off of your input")
        //  ************************************
    // //if condition below to determine if the searchInput is actually a URL
    // // if so then do a post request to /bookmarks which will then hit the create controller...
    // // if(searchInput)
        fetch(backend, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({search: searchInput})
          })
          .then(response => response.json())
          .then(bookmarkList => {
            console.log(bookmarkList)
            setBookmarks(bookmarkList)
          })
    //  ************************************


    // ==========================
        // let ourInput = searchValue; //holding this incase values changes by the time fetch is done
        // fetch( backend )
        // .then( response => response.json( ) )
        // .then( data => {
        //   console.log(ourInput, searchValue );
        //   if( ourInput === searchValue ) filterBookmarks( data, searchValue );
        // } );
        // ==============================
    }
  }

  // function filterBookmarks(bookmarkList, searchInput){
  //   console.log(bookmarkList)

  //   let newArr = [];
  //   bookmarkList.forEach((bookmark) => {
  //       bookmark.tags.forEach((tag) => {
  //           // console.log(tag.category_name)
  //           newArr.push(tag.category_name.toLowerCase())
  //       })
  //   })

  //   const filteredList = bookmarkList.filter( bookmark =>

  //     bookmark.body.toLowerCase().includes(searchInput) || bookmark.url.includes(searchInput) || bookmark.h1.toLowerCase().includes(searchInput))
  //     // || bookmark.body.toLowerCase().includes(searchInput) || newArr.includes(searchInput))
  //     // have a different weight for each (body, h1, url, tag, etc.)
  //     // for example if search input matches to the tag, then 10 points
  //     // for example if search input matches to the , then 7 points
  //     setBookmarks(filteredList);
  // }


  const [ searchValue, setSearch ] = useState( "" );
  const [ bookmarks, setBookmarks ] = useState( [ ] );
  useEffect( ( ) => {
    getBookmarks( );
  }, [ searchValue ] );

  return (
    <div id="App">
      <Search searchValue={ searchValue } setSearch={ setSearch } getBookmarks={getBookmarks}/>
      <Rhizom bookmarks={ bookmarks }/>
    </div>
  );
};

export default App;
