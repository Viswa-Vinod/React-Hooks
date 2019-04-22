import React, { useReducer, useEffect } from 'react';
import reducer, { initialState } from '../state/reducer';
import Context from '../context';
import PublishMessage from './PublishMessage';
import MessageBoard  from './MessageBoard';
import PubSub from '../pubsub';
import SetUsername from './SetUsername';

const pubsub = new PubSub(); 



function App () {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  
  useEffect(() => {
    pubsub.addListener({
      message: messageObject => {
        const { channel, message } = messageObject;
        console.log('received message', { channel, message });
        dispatch(message);
      }
    });
  }, []);
  console.log({ state });

    return (
      <Context.Provider value={{ state, dispatch, pubsub }}>
        <h2>    
            Reaction
        </h2>
        <SetUsername />
        <hr />
        <PublishMessage/>
        <hr />
        <MessageBoard />
      </Context.Provider>
    );
  
}

export default App;
