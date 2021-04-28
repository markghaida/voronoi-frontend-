import { useEffect, useRef, useState } from 'react';
import Keys from './Keys';



const Search = ( { searchValue, setSearch, errors, lastReceipt, resultLength } ) => {
  useEffect( ( ) => {
    // searchInput.current.focus( );
    document.addEventListener('keydown', e => {searchInput.current.focus( ) } );
  }, [ ] );
  // const [ input, setInput ] = useState( "" )

  const handleChange = e => setSearch( e );

  const searchInput = useRef( );

  const boxShadow = (
    lastReceipt !== searchValue && searchValue !== "" ? "0px 0px 5px rgb(0,200,0,1)" :
    resultLength === 0 && searchValue !== "" ? "0px 0px 5px rgb(200,0,0,1)" : null
  );

  return(
   <div
     id="SearchBar"
     style={ { boxShadow: boxShadow } }
     onTouchEnd={ e => { searchInput.current.blur( ); e.preventDefault( ); } }
     >
    <div>
      <input
        ref={ searchInput }
        value={ searchValue }
        onChange={e => handleChange(e.target.value)}
        placeholder="Search..."
        type="text"
        onTouchEnd={ e => { searchInput.current.blur( ); e.preventDefault( ); } }
        onTouchStart={ e => { searchInput.current.blur( ); e.preventDefault( ); } }
        />
      <br></br>
      <p style={{color: "red"}}>{errors}</p>
      <div style={{ width:"35px" }}></div>
    </div>
    <Keys
      value={ searchValue }
      onType={ handleChange }
    />
   </div>
 );
};

// readOnly="readonly"
export default Search;
