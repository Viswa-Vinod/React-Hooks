import React from 'react'
import { useFetch } from './hooks';

export default function Joke() {

    const { setup, punchline } = useFetch('https://official-joke-api.appspot.com/random_joke', {});     
    
    return ( 
    <div>
      <h3>Joke Of The Session</h3>    
      <p>{setup}</p>
      <p><em>{punchline}</em></p>
    </div>
  )
}

