import { useEffect, useState, useRef } from 'react';
import * as d3 from "d3";
import {Delaunay} from "d3-delaunay";




//update
const make_voronio = ( rhiz, setLoci ) => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  width = rhiz.current.clientWidth;
  height = rhiz.current.clientHeight;
  console.log(width,height);
  const canvas = d3.select( rhiz.current ).append("canvas")
  const context = canvas.node().getContext("2d"); //https://stackoverflow.com/questions/38340082/d3-svg-not-rendering-on-initial-component-render-react
  canvas.attr('width', width);
  canvas.attr('height', height);
  const particles = Array.from( { length: 150/2 }, ( ) => [ Math.random( ) * width, Math.random( ) * height ] );
  setLoci(particles)

  const update = ( ) => { //https://observablehq.com/@d3/hover-voronoi?collection=@d3/d3-delaunay <<<<!!!!
    const delaunay = Delaunay.from( particles );
    const voronoi = delaunay.voronoi( [ 5, 5, width - 5, height - 5 ] );
    context.clearRect(0,0,width,height);
    context.beginPath();
    delaunay.render(context);
    context.strokeStyle = "rgb(230,230,230)";
    context.stroke();

    context.beginPath();
    voronoi.render(context);
    voronoi.renderBounds(context);
    context.strokeStyle = "rgb(150,150,150)";
    context.stroke();

    context.beginPath();
    delaunay.renderPoints(context);
    context.fill();
    // delaunay.renderPoints( context );
  }
  update( );
  context.canvas.onmousemove = event => {
    event.preventDefault();
    particles[0] = [event.layerX, event.layerY];
    update();
  };
};

const Rhizom = ( { bookmarks } ) => {

  const [ divLoci, setDivLoci ] = useState( [ ] );

  useEffect( ( ) => {
    make_voronio( rhiz, setDivLoci );
  }, [ ] );

 const allBookmarks = bookmarks.map( bookmark =>
   <div key={bookmark.id}>
      <img src={bookmark.image} />
      <p>URL: {bookmark.url}</p>
      <p>Header Title: {bookmark.h1}</p>
      <p>Body: {bookmark.body}</p>
      <p>Tags:{bookmark.tags.map((tag) => <p>{tag.category_name}</p> )}</p>
      <button>Remove</button>
    </div>
  );

  const placeOnPlane = divLoci.map( pt =>
      <div className="bookmarkBox" style={{left: pt[0]-25, top: pt[1]-25 }}>
        HI!
      </div>

    )

  const rhiz = useRef( );

  return(
    <div id="VoronoiContainer">
      { allBookmarks }
      <div id="vShell" ref={rhiz}/>
      { placeOnPlane }
    </div>
  );
};

export default Rhizom;
