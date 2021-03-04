import logo from './logo.svg';
import './App.css';
import Rhizom from './components/Rhizom.js';
import Search from './components/Search.js';
import { useEffect, useState } from 'react';
import { timeFormatDefaultLocale } from 'd3';

// const backend = 'http://localhost:3000/bookmarks';
const backend = 'https://still-caverns-30577.herokuapp.com/bookmarks';


function App() {

  const [ searchValue, setSearch ] = useState("");
  const [ bookmarks, setBookmarks ] = useState([]);

  function getBookmarks(searchInput){
    let res = searchInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res !== null){
      console.log("fetching this bookmark now")
      // fetch('https://still-caverns-30577.herokuapp.com/bookmarks', {
      fetch('http://localhost:3000/bookmarks', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url: searchInput}),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
      }else if (searchInput.length === 0){
        console.log("there is no input in the bar")
        return true
      }else{
        console.log("filtering based off of your input")
    //if condition below to determine if the searchInput is actually a URL
    // if so then do a post request to /bookmarks which will then hit the create controller...
    // if(searchInput)
        fetch(backend, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({search: searchInput}),
          })
          .then(response => response.json())
          .then(bookmarkList => {
            console.log(bookmarkList)
            setBookmarks(bookmarkList)
          })
      }
  }

  // function filterBookmarks(bookmarkList, searchInput){
  //   // console.log(bookmarkList)

  //   let newArr = [];
  //   bookmarkList.forEach((bookmark) => {
  //       bookmark.tags.forEach((tag) => {
  //           console.log(tag.category_name)
  //           newArr.push(tag.category_name.toLowerCase())
  //       })
  //   })

  //   const filteredList = bookmarkList.filter( ( bookmark ) =>

  //     bookmark.body.toLowerCase().includes(searchInput) || bookmark.url.toLowerCase().includes(searchInput) || bookmark.h1.toLowerCase().includes(searchInput) || bookmark.body.toLowerCase().includes(searchInput) || newArr.includes(searchInput))
  //     // have a different weight for each (body, h1, url, tag, etc.)
  //     // for example if search input matches to the tag, then 10 points
  //     // for example if search input matches to the , then 7 points
  //     setBookmarks(filteredList);
  // }

  return (
    <div id="App">
      <Search searchValue={ searchValue } setSearch={ setSearch } getBookmarks={getBookmarks}/>
      <Rhizom bookmarks={ bookmarks }/>
    </div>
  );
};

export default App;
