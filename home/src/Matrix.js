import React, { useState } from 'react';
import MATRIX_FRAMES from './data/matrix';
import { useDynamicTransition } from './hooks';
const MINIMUM_DELAY = 10;
const MINIMUM = 1;

export default function Matrix() {

    
    const [ delay, setDelay ] = useState(500);
    const [ increment, setIncrement ] = useState(5);

    const index = useDynamicTransition({delay, increment, length: MATRIX_FRAMES.length})
    const updateDelay = (event) => {
        const delay = Number(event.target.value);
        setDelay(delay >= MINIMUM_DELAY ? delay : MINIMUM_DELAY)
    }
    
    const updateIncrement = (event) => {
        const increment = Number(event.target.value);
        setIncrement(increment >= MINIMUM ? increment : MINIMUM)
    }
    // console.log({delay, increment});

  return (
    <div className='Matrix'>
        <img src={MATRIX_FRAMES[index]} alt='matrix-animation'/>
        <div className='multiform'>
            <div>
                Frame transition delay (seconds): 
                <input onChange={updateDelay}/>            
            </div>
            <div>
                Frame increment: 
                <input type='number' onChange={updateIncrement}/>
            </div>
        </div>
    </div>
  )
}
