import PubNub from 'pubnub';
import pubnubConfig from './pubnub.config';


export const MESSAGE_CHANNEL = 'MESSAGE_CHANNEL';

export default function PubSub() {
    
    const pubnub = new PubNub(pubnubConfig);
    pubnub.subscribe({ channels: [ MESSAGE_CHANNEL ]});
    this.addListener = listenerConfig => pubnub.addListener(listenerConfig);
    this.publish = message =>{
        console.log('publishing message', { message });
        pubnub.publish({ message, channel: MESSAGE_CHANNEL});
    } 
}

