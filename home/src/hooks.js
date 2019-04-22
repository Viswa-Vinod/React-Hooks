import { useEffect, useState } from 'react';

export const useFetch = (url, initialVal) => {
    const [ result, setResult ] = useState(initialVal);
  
    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then(setResult);
    },[]);
  
    return result;
}

export const useDynamicTransition = ({ increment, delay, length }) => {
    const [ index, setIndex ] = useState(0);
    // const [ delay, setDelay ] = useState(3*SECONDS);
    // const [ increment, setIncrement ] = useState(1);

    useEffect(() => {        
        const interval = setInterval(() => {
            setIndex((storedIndex) => (storedIndex + increment)%length );
        }, delay)

        return () => clearInterval(interval)
    }, [delay,increment]);

    return index;
} 