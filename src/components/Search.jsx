import { useEffect, useRef, useState } from 'react';
import Keys from './Keys';


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
     <input
       ref={ searchInput }
       value={ searchValue }
       onChange={e => handleChange(e)}
       placeholder="Search..."
       type="text"
       onTouchEnd={ e => { searchInput.current.blur( ); e.preventDefault( ); } }
      //  onMouseEnter={ e => searchInput.current.focus() }
      //  onMouseLeave={ e => searchInput.current.blur() }
       />
       <br></br>
      <p style={{color: "red"}}>{errors}</p>
     <div style={{ width:"35px" }}></div>
   </div>
 );
};

// readOnly="readonly"
export default Search;
