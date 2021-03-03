import logo from './logo.svg';
import './App.css';
import Rhizom from './components/Rhizom.js';
import Search from './components/Search.js';
import { useEffect, useState } from 'react';
import { timeFormatDefaultLocale } from 'd3';

// const backend = 'http://localhost:3000/bookmarks';
const backend = 'http://localhost:3000/bookmarks';


function App() {

  const [ searchValue, setSearch ] = useState("");
  const [ bookmarks, setBookmarks ] = useState([]);

  function getBookmarks(searchInput){
    fetch(backend)
    .then(response => response.json())
    .then(bookmarkList => filterBookmarks(bookmarkList, searchInput.toLowerCase()))
}

  function filterBookmarks(bookmarkList, searchInput){
    // console.log(bookmarkList)

    let newArr = [];
    bookmarkList.forEach((bookmark) => {
        bookmark.tags.forEach((tag) => {
            console.log(tag.category_name)
            newArr.push(tag.category_name.toLowerCase())
        })
    })

    const filteredList = bookmarkList.filter((bookmark) =>

      bookmark.body.toLowerCase().includes(searchInput) || bookmark.url.toLowerCase().includes(searchInput) || bookmark.h1.toLowerCase().includes(searchInput) || bookmark.body.toLowerCase().includes(searchInput) || newArr.includes(searchInput))

      setBookmarks(filteredList);
  }

  return (
    <div id="App">
      <Search searchValue={ searchValue } setSearch={ setSearch } getBookmarks={getBookmarks}/>
      <Rhizom bookmarks={ bookmarks }/>
    </div>
  );
};

export default App;
