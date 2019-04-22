import React, { useState } from 'react';
import PICTURES from './data/pictures';
import { useDynamicTransition } from './hooks';

const SECONDS = 1000;
const MINIMUM_DELAY = 1000;
const MINIMUM_INCREMENT = 1;

export default function Gallery() {
    // const [ index, setIndex ] = useState(0);
    const [ delay, setDelay ] = useState(3*SECONDS);
    const [ increment, setIncrement ] = useState(1);

    const index = useDynamicTransition({
        delay, increment, length: PICTURES.length
    })
    // useEffect(() => {
    //     console.log({delay});
    //     const interval = setInterval(() => {
    //         setIndex((storedIndex) => (storedIndex + increment)%PICTURES.length );
    //     }, delay)

    //     return () => {clearInterval(interval)}
    // }, [delay,increment])

    const updateDelay = event => {
        const delay = Number(event.target.value) * SECONDS;

        setDelay(delay >= MINIMUM_DELAY ? delay : MINIMUM_DELAY);
    }

    const updateIncrement = event => {
        const increment = Number(event.target.value);
        setIncrement( increment >= MINIMUM_INCREMENT ? increment : MINIMUM_INCREMENT);
    }

  return (
    <div className='Gallery'>
        <img src={PICTURES[index].image} alt='gallery'/>
        <div className='multi-form'>
            <div>
            Gallery transition delay (seconds) : 
            <input type='number' onChange={updateDelay}/>
            </div>
            <div>
                Gallery increment: <input type='number' onChange={updateIncrement}/>
            </div>
        </div>
    </div>
  )
}
