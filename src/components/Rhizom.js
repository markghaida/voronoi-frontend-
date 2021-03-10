import { useEffect, useState, useRef } from 'react';
import * as d3 from "d3";
import {Delaunay} from "d3-delaunay";




//update

const Rhizom = ( { bookmarks } ) => {

  const [ vContext, setContext ] = useState( null );
  const [ plottedPts, setPts ] = useState( [ ] );
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


 const allBookmarks = bookmarks.map( bookmark =>
   <div key={bookmark.id}>
      <img src={bookmark.image} />
      <p>URL: {bookmark.url}</p>
      <p>Header Title: {bookmark.h1}</p>
      <p>Body: {bookmark.body}</p>
      {/* <p>Tags:{bookmark.tags.map((tag) => <p>{tag.category_name}</p> )}</p> */}
      <button>Remove</button>
    </div>
  );

  const placeOnPlane = ( ) => plottedPts.map( ( pt, i ) =>
    <div className="datumPike" style={{left: pt[0]-25, top: pt[1]-25 }}>
      <div
        key={ i }
        className="bookmarkBox"
        onClick={()=> window.open(bookmarks[i].url, "_blank")}>
        <h4>{ bookmarks[i].h1 }</h4>
        <img className="bookMarkGlyph" src={ bookmarks[ i ].image }/>
          <p className="bookBody">{ bookmarks[i].body }</p>
      </div>
    </div>
    )

  const rhiz = useRef( );

  useEffect( ( ) => { make_voronio( ); }, [ ] );
  useEffect( ( ) => {
    let width = rhiz.current.clientWidth;
    let height = rhiz.current.clientHeight;
    setPts( Array.from( { length: bookmarks.length }, ( ) => [ Math.random( ) * width, Math.random( ) * height ] ) );
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
