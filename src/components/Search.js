import { useEffect, useRef, useState } from 'react';

const Search = ( { searchValue, setSearch } ) => {
  useEffect( ( ) => {
    searchInput.current.focus( );
  }, [ ] );
  // const [ input, setInput ] = useState( "" )

  const handleChange = e => {
    setSearch( e.target.value )
  };

  const searchInput = useRef( );


  return(
   <div id="SearchBar">
     <div style={{ width:"35px" }}></div>
     <input
       ref={ searchInput }
       value={ searchValue }
       onChange={e => handleChange(e)}
       placeholder="Honey is yummy 🍯 ..."
       type="text"
       onMouseEnter={ e => searchInput.current.focus() }
       onMouseLeave={ e => searchInput.current.blur() }
       />
     <div style={{ width:"35px" }}></div>
   </div>
 );
};

export default Search;
