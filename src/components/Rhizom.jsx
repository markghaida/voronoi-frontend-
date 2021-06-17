import { useEffect, useState, useRef } from 'react';
// import BookmarkCard from '../components/BookmarkCard.js';
import * as d3 from "d3";
import { Delaunay } from "d3-delaunay";




const Rhizom = ( { bookmarks } ) => {

  const [ vContext, setContext ] = useState( null );
  const [ plottedPts, setPts ] = useState( [ ] );
  const [ sizing, setSizing ] = useState( [ ] );
  const [ plottedBookmarks, setFloatingBookmarks ] = useState( [ ] );

  const make_voronio = ( ) => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    width = rhiz.current.clientWidth;
    height = rhiz.current.clientHeight;
    console.log(width,height);
    const canvas = d3.select( rhiz.current ).append("canvas")
    const context = canvas.node().getContext("2d"); //https://stackoverflow.com/questions/38340082/d3-svg-not-rendering-on-initial-component-render-react
    canvas.attr('width', width);
    canvas.attr('height', height);
    // canvas.attr('position', "absolute");
    setContext( context );
    // setLoci(particles)

    update( );
    // context.canvas.onmousemove = event => {
    //   event.preventDefault();
    //   particles[0] = [event.layerX, event.layerY];
    //   update();
    // };
  };

  const update = ( ) => { //https://observablehq.com/@d3/hover-voronoi?collection=@d3/d3-delaunay <<<<!!!!
    if( !vContext ) return

    let width = rhiz.current.clientWidth;
    let height = rhiz.current.clientHeight;
    // height = window.innerHeight;
    // height = window.screen.height;

    const delaunay = Delaunay.from( plottedPts );
    const voronoi = delaunay.voronoi( [ 5, 5, width - 5, height - 5 ] );
    vContext.clearRect(0,0,width,height);
    vContext.beginPath();
    delaunay.render(vContext);
    vContext.strokeStyle = "rgb(240,240,240)";
    vContext.stroke();

    vContext.beginPath();
    voronoi.render(vContext);
    voronoi.renderBounds(vContext);
    vContext.strokeStyle = "rgb(190,190,190)";
    vContext.stroke();

    vContext.beginPath();
    delaunay.renderPoints(vContext);
    vContext.fill();
    // delaunay.renderPoints( context );
  }

  const placeOnPlane = ( ) => plottedPts.map( ( pt, i ) =>
    <div className="datumPike" key={ bookmarks[i].url } style={{
      left: ( pt[0] - 25 ) - sizing[i][0]/2, 
      top: pt[1]-25, 
      zIndex: bookmarks.length - i 
    }}>
      <div className="bookmarkBox" onClick={()=> window.open(bookmarks[i].url, "_blank")}
        style={{ 
          maxWidth: sizing[i][0], 
          maxHeight: sizing[i][1],
        }}>
        <div className="bookmarkHeader" style={{
          fontSize:`${(bookmarks[i].score/bookmarks[0].score*14)+6}px`
          }}>
          { bookmarks[i].h1 }</div>
        <img className="bookMarkGlyph" src={ bookmarks[ i ].image }/>
          <p className="bookBody">{ bookmarks[i].body }</p>
      </div>
    </div>
    )

  // const placeOnPlane = ( ) => {
  //     return bookmarks.map( 
  //     ( data, i ) => <BookmarkCard i={i} pt={plottedPts[i]} sizing={sizing[i]} 
  //     data={data} best={bookmarks[0]} queryLen={bookmarks.length}
  //   />
  //   )
  // }



  const rhiz = useRef( );

  useEffect( ( ) => { make_voronio( ); }, [ ] );
  useEffect( ( ) => {
    let width = rhiz.current.clientWidth;
<<<<<<< HEAD:src/components/Rhizom.jsx
    // let height = rhiz.current.clientHeight;
    const height = rhiz.current.clientHeight;
=======
    let height = rhiz.current.clientHeight;
>>>>>>> parent of 3da2709... updated y on best match and changed some styling:src/components/Rhizom.js

    // Array.from( { length: bookmarks.length }, ( ) => [ Math.random( ) * width, Math.random( ) * height ] )
    
    let first_X, leftMost, rightMost, topMost, bottomMost, highestScore;
    let sizes = [ ];
    if( bookmarks[0] ) highestScore = bookmarks[0].score;

    setPts(
      bookmarks.map( ( mark, i ) => {
        let xStrength = (bookmarks.length - i) / bookmarks.length;
        // console.log( xStrength );
        let xPos = (xStrength * width) / 2;
        // console.log( xPos );
        console.log( mark.score );
        //----------
        let [ bW, bH ] = [ ( mark.score / highestScore ) * 300, ( mark.score / highestScore ) * 300 ];
        sizes.push( [ bW, bH ] );
        //----------
        let bool = Math.random( ) > 0.5 ? false : true;
        if( !bool ) xPos = width - xPos;
        let yPos = Math.random( ) * height;
        // yPos = height/2;
        
        if( i === 0 ) {
          [ rightMost, leftMost ] = [ width/2 + bW/2 + 15, width/2 - bW/2 - 15 ]
        }
        else{
          // console.log("right!!")
          if( bool ) {
            if( xPos + ( bW / 2 ) > leftMost ) {
              xPos = leftMost - bW / 2;
              leftMost = xPos - bW / 2 - 15;
            } 
            else leftMost = xPos - bW / 2 - 15;
          }
          else {
            if( !bool ) {
              if( xPos - ( bW / 2 ) < rightMost ) {
                xPos      = rightMost + bW / 2;
                rightMost = xPos + bW / 2 + 15;
              } 
              else rightMost = xPos + bW / 2 + 15;
            }
          }
        }
<<<<<<< HEAD:src/components/Rhizom.jsx
        let yPos = i <= 3  ? height/2 :
        ( i > 3 && i < 7 ) ?  Math.random( ) * ( height / 2 ) :
        Math.random( ) * height

=======
>>>>>>> parent of 3da2709... updated y on best match and changed some styling:src/components/Rhizom.js
        return [ xPos, yPos ];
      })  
    );
    setSizing( sizes );

    const checkOthers = ( thisPt, otherPts ) => {

    }


    // setPts( Array.from( { length: bookmarks.length }, ( ) => [ Math.random( ) * width, Math.random( ) * height ] ) );
  }, [ bookmarks ] );
  useEffect( ( ) => { update( ); setFloatingBookmarks(placeOnPlane)}, [ plottedPts ] );
  // { allBookmarks }
  return(
    <div id="VoronoiContainer">
      <div id="vShell" ref={ rhiz }/>
      { plottedBookmarks }
    </div>
  );
};

export default Rhizom;
