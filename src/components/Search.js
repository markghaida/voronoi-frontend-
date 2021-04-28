import { useEffect, useRef, useState } from 'react';

const Search = ( { searchValue, setSearch, errors, lastReceipt, resultLength } ) => {
  useEffect( ( ) => {
    // searchInput.current.focus( );
    document.addEventListener('keydown', e => {searchInput.current.focus( ) } );
  }, [ ] );
  // const [ input, setInput ] = useState( "" )

  const handleChange = e => {
    setSearch( e.target.value )
  };

  const searchInput = useRef( );

  let background;

  if (lastReceipt !== searchValue && searchValue !== "") background = "0px 0px 5px rgb(0,200,0,1)"

  if (resultLength === 0 && searchValue !== "") background = "0px 0px 5px rgb(200,0,0,1)"

  return(
   <div id="SearchBar" style={ { boxShadow: background } }>
     <div style={{ width:"35px" }}></div>
     <input
       ref={ searchInput }
       value={ searchValue }
       onChange={e => handleChange(e)}
       onFocus={e=> window.scrollTo(0,0)}
       placeholder="Honey is yummy 🍯 ..."
       type="text"
      //  onMouseEnter={ e => searchInput.current.focus() }
      //  onMouseLeave={ e => searchInput.current.blur() }
       />
       <br></br>
      <p style={{color: "red"}}>{errors}</p>
     <div style={{ width:"35px" }}></div>
   </div>
 );
};

export default Search;
