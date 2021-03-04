import { useEffect, useRef } from 'react';

const Search = ({searchValue, setSearch, getBookmarks}) => {

  useEffect( ( ) => {
    searchInput.current.focus();
  }, [ ] );

  const handleChange = e => {
    setSearch(e.target.value)
    getBookmarks(e.target.value);
  };

  const searchInput = useRef( );

  return(
   <div id="SearchBar">
     <div style={{ width:"35px" }}></div>
     <input
       ref={ searchInput }
       placeholder="Honey is yummy 🍯 ..."
       type="text"
       value={ searchValue }
       onChange={ e => handleChange(e) }
       onMouseEnter={ e => searchInput.current.focus() }
       onMouseLeave={ e => searchInput.current.blur() }
       />
     <div style={{ width:"35px" }}></div>
   </div>
 );
};

export default Search;
