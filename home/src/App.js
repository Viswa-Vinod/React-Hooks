import React, { useState } from 'react';
import Joke from './Joke';
import Stories from './Stories';
import Task from './Task';
import Gallery from './Gallery';
import Matrix from './Matrix';
function App() {

    const [userQuery, setUserQuery] = useState('');
    const [ showGallery, setShowGallery ] = useState(true);

    const updateUserQuery = (event) => {
      setUserQuery(event.target.value );
    }

    const handleKeyPress = (event) => 
        event.key === 'Enter' && searchQuery();
    
    const searchQuery = () => {
      window.open(`https://www.google.com/search?q=${userQuery}`, '_blank');
    }

    const toggleShowGallery = () => {
      setShowGallery(!showGallery);
    }

    return (
      <div className="App">
       <h1>Hello Vinod</h1>
       <div className="form">
        <input value={userQuery} onKeyPress={handleKeyPress} onChange={updateUserQuery} />
        <button onClick={searchQuery}  >Search</button>
       </div>
       <hr />
       <Matrix />
       <hr />
       <div>
       {showGallery && <Gallery />}
       <button onClick={toggleShowGallery}>{showGallery ? 'Hide' : 'Show'}</button>
       </div>
       <hr />
        <Joke />
        <hr />
        <Stories />
        <hr /> 
        <Task />        
      </div>
    );
  
}

export default App;
