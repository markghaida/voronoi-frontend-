import { useEffect, useRef, useState } from 'react';

const Search = ({searchValue, setSearch, getBookmarks}) => {
  const [input, setInput] = useState("")
  useEffect( ( ) => {
    searchInput.current.focus();
  }, [ ] );

  const handleChange = e => {
    console.log(input)
    setSearch(input)
    getBookmarks(input);
  };

  const searchInput = useRef( );

  return(
   <div id="SearchBar">
     <div style={{ width:"35px" }}></div>
     <input
       ref={ searchInput }
       value={input}
       onChange={e => setInput(e.target.value)}
       placeholder="Honey is yummy 🍯 ..."
       type="text"
       
       onMouseEnter={ e => searchInput.current.focus() }
       onMouseLeave={ e => searchInput.current.blur() }
       />
       <button onClick={e => handleChange(e)} value={ searchValue }>Enter</button>
     <div style={{ width:"35px" }}></div>
   </div>
 );
};

export default Search;
