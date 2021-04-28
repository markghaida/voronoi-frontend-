import { useEffect, useState, useRef } from 'react';

const Head = ( { resultLength } ) => {
    return(
      <div id="Head">
        {resultLength}
      </div>
    );
};

export default Head;
