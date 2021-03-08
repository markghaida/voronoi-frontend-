import { useEffect, useRef, useState } from 'react';

const Search = ( { searchValue, setSearch, errors, setSubmit } ) => {
  useEffect( ( ) => {
    searchInput.current.focus( );
  }, [ ] );
  // const [ input, setInput ] = useState( "" )

  const handleChange = e => {
    setSearch( e.target.value )
  };

  const handleClick = e => {
    setSubmit("clicked")
  }

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
      //  onMouseEnter={ e => searchInput.current.focus() }
      //  onMouseLeave={ e => searchInput.current.blur() }
       />
      <p style={{ color:"red" }} >{errors}</p>
      {setSubmit ? <button onClick={(e) => handleClick(e)}>Create Bookmark</button> : <button onClick={(e) => handleClick(e)}>Create Bookmark</button>}
     <div style={{ width:"35px" }}></div>
   </div>
 );
};

export default Search;
