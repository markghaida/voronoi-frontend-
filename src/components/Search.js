import { useEffect, useRef, useState } from 'react';


const fetchGradientGraphic = 'linear-gradient(90deg,var(--AOS_Bg), var(--AOS_Bg), var(--AOS_Bg), var(--AOS_Accent), var(--AOS_Bg),var(--AOS_Bg),var(--AOS_Bg) )';
const errorGradientGraphic = 'linear-gradient(90deg,var(--AOS_Bg), var(--AOS_Bg), var(--AOS_Bg), rgba(255,0,0,0.2), var(--AOS_Bg),var(--AOS_Bg),var(--AOS_Bg) )';

const Search = ( { searchValue, setSearch, errors, lastReceipt, resultLength } ) => {


  const handleChange = e => setSearch( e.target.value );

  const searchInput = useRef( );
  useEffect( ( ) => searchInput.current.focus( ), [ ] );

  let boxShadow, backgroundImage, animation;
  if ( lastReceipt !== searchValue && searchValue !== "") [ boxShadow, backgroundImage, animation ] = [ "inset 0px 0px 5px rgb(0,200,0,1)", fetchGradientGraphic, 'gradientBG 1s ease infinite' ];
  if ( resultLength === 0 && searchValue !== "") [ boxShadow, backgroundImage, animation ] = [ "inset 0px 0px 5px rgb(200,0,0,1)", errorGradientGraphic, 'gradientBG 3s ease infinite' ];

  let top = "25%";
  return <div id="SearchBar" style={{boxShadow: boxShadow, backgroundImage: backgroundImage, top: top, animation: animation}}>
     <div style={{ width:"35px" }}></div>
     <input
       ref={ searchInput }
       value={ searchValue }
       onChange={e => handleChange(e)}
       placeholder="Honeycomb 🍯..."
       type="text"
       />
      <br/>
      <p style={{color: "red"}}>{errors}</p>
     <div style={{ width:"35px" }}></div>
   </div>;
};

export default Search;
