import { useEffect, useState, useRef } from 'react';
import * as d3 from "d3";
import {Delaunay} from "d3-delaunay";
import BookmarkCard from "./BookmarkCard";




const Rhizom = ( { bookmarks } ) => {

  //VoronoiContainer
  const [ vContext, setContext ] = useState( null );
  const [ canvasElem, setCanvasElem ] = useState( null );
  const [ graphedBookmarks, setGraphMap ] = useState( [ ] ); //NEW
  const [ windowSize, setWindowSize ] = useState({ width: undefined, height: undefined });

  useEffect( ( ) => {
    const handleResize = ( ) => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener( "resize", handleResize );
    handleResize( );
    return ( ) => window.removeEventListener( "resize", handleResize );
  }, [ ] );

  const make_voronoi = ( ) => {
    const canvas = d3.select( rhiz.current ).append( "canvas" );
    const context = canvas.node( ).getContext( "2d" ); //https://stackoverflow.com/questions/38340082/d3-svg-not-rendering-on-initial-component-render-react
    canvas.attr('width', windowSize.width);
    canvas.attr('height', windowSize.height);
    setContext( context ); setCanvasElem( canvas ); update( );
    // context.canvas.onmousemove = event => { event.preventDefault(); particles[0] = [event.layerX, event.layerY]; update(); };
  };

  const update_canvas_size = ( ) => {
    if( !canvasElem ) return;
    canvasElem.attr('width', windowSize.width);
    canvasElem.attr('height', windowSize.height);
    update( );
  };

  useEffect( ( ) => update_canvas_size( ), [ windowSize ] );

  const update = ( ) => { //https://observablehq.com/@d3/hover-voronoi?collection=@d3/d3-delaunay
    if( !vContext ) return
    const pointArray = graphedBookmarks.map( item => [ item.position.x, item.position.y ] );
    const delaunay = Delaunay.from( pointArray );
    const voronoi = delaunay.voronoi( [ 5, 5, windowSize.width - 5, windowSize.height - 5 ] );
    vContext.clearRect( 0, 0, windowSize.width, windowSize.height );
    vContext.beginPath( );
    delaunay.render( vContext );
    vContext.strokeStyle = "rgb(240,240,240)";
    vContext.stroke( );

    vContext.beginPath( );
    voronoi.render( vContext );
    voronoi.renderBounds( vContext );
    vContext.strokeStyle = "rgb(190,190,190)";
    vContext.stroke( );

    vContext.beginPath( );
    delaunay.renderPoints(vContext);
    vContext.fill( );
    // delaunay.renderPoints( context );
  }

  const mappedElems = graphedBookmarks.map( ( mark, i ) =>
    <div className="datumPike" key={ mark.data.url } style={{ left: ( mark.position.x - 25 ) - mark.size.w/2, top: mark.position.y-25, zIndex: graphedBookmarks.length - i }}>
      <div className="bookmarkBox" onClick={()=> window.open(mark.data.url, "_blank")} style={{ maxWidth: mark.size.w, maxHeight: mark.size.h }}>
        <div className="bookmarkHeader" style={{ fontSize:`${(mark.data.score/graphedBookmarks[0].score*14)+6}px` }}>
          { mark.data.h1 }</div>
        <img className="bookMarkGlyph" src={ mark.data.image }/>
        <p className="bookBody">{ mark.data.body }</p>
      </div>
    </div>
  );


  useEffect( ( ) => make_voronoi( ), [ ] );

  const graph_bookmarks = ( ) => {

    let first_X, leftMost, rightMost, topMost, bottomMost, highestScore;
    if( bookmarks[0] ) highestScore = bookmarks[0].score;

    const graphing_data = bookmarks.map( ( mark, i ) => {
      //Our output format
      const elem = { data: mark, position: { x: null, y: null }, size: { w: null, h: null } };

      /*
      xStrength determines position on the x axis. We use the order of our search result as they are in order of search relevance.
      HOW: it's a percentage of how close to the center of the screen the element will display.
      WHY:  because we want the most relevant to appear the most centered.
      */
      let xStrength = (bookmarks.length - i) / bookmarks.length;

      //converting xStrength to screen centered-ness
      let xPos = ( xStrength * windowSize.width ) / 2;

      [ elem.size.w, elem.size.h ] = [ ( mark.score / highestScore ) * 300, ( mark.score / highestScore ) * 300 ];

      //NOT FINISHED

      /*
      bool alternates the placement from left and right.
      TRUE = left, FALSE = right
      */
      let bool = Math.random( ) > 0.5 ? false : true;

      if( !bool ) xPos = windowSize.width - xPos;
      let yPos = Math.random( ) * windowSize.height;
      // let yPos = height/2;
      if( !leftMost || !rightMost ) [ rightMost, leftMost ] = [ windowSize.width/2 + elem.size.w/2 + 15, windowSize.width/2 - elem.size.w/2 - 15 ];
      else {
        if( bool ) {
          if( xPos + ( elem.size.w / 2 ) > leftMost ) [ xPos, leftMost  ] = [ leftMost - elem.size.w/2, xPos - elem.size.w/2 - 15 ];
          else leftMost = xPos - elem.size.w/2 - 15;
        }
        else if( !bool && xPos + ( elem.size.w / 2 ) < rightMost ) [ xPos, rightMost ] = [ rightMost + elem.size.w / 2, xPos + elem.size.w / 2 + 15 ];
      };
      [ elem.position.x, elem.position.y ] = [ xPos, yPos ];
      return elem;
    } );
    setGraphMap( graphing_data );
    update( );
  };
  useEffect( ( ) => graph_bookmarks( ), [ bookmarks ] );

  const rhiz = useRef( );

  update( );
  return(
    <div id="VoronoiContainer">
      <div id="vShell" ref={ rhiz }/>
      { mappedElems }
    </div>
  );
};

export default Rhizom;
