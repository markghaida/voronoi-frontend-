import { useEffect, useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';


const keysLayout = {
  "default": [
    '0 1 2 3 4 5 6 7 8 9',
    'q w e r t y u i o p',
    'a s d f g h j k l',
    'z x c v b n m',
    '{space} {bksp}'
  ]
};

const Keys = ( { onType, value } ) => {
    return(
      <div id="Keys">
      <Keyboard
        onChange={ e =>{ console.log(e); onType(e)} }
        layout={ keysLayout }
      />
      </div>
    );
};

// onKeyPress={this.onKeyPress}
export default Keys;
