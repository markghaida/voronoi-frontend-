import { useEffect, useState, useRef } from 'react';


const BookmarkCard = ( { i, pt, sizing, data, best, queryLen } ) => {
    // const [ point, setP ]
    let bg = "";
    if( i === 0 ) bg = "rgba(100,255,100,0.2)";
    return <div className="datumPike" id={ data.url } key={ data.url } style={{
            left: ( pt[0] - 25 ) - sizing[0]/2,
            top: pt[1] - 25,
            zIndex: queryLen - i
          }}>
            <div className="bookmarkBox" onClick={()=> window.open(data.url, "_blank")}
              style={{
                maxWidth: sizing[0],
                maxHeight: sizing[1],
                backgroundColor: bg
              }}>
              <div className="bookmarkHeader" style={{
                fontSize:`${ ( data.score / best.score * 14 ) + 6 }px`
                }}>
                { data.h1 }</div>
              <img className="bookMarkGlyph" src={ data.image }/>
                <p className="bookBody">{ data.body }</p>
            </div>
          </div>;
};

export default BookmarkCard;
