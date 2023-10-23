import io from "socket.io-client";

import {apiDomain} from '../config/config';


const ENDPOINT = apiDomain;


const socket = io(ENDPOINT, {withCredentials: true});


socket.onAny((eventName, ...args) => {
    
    if(eventName === 'join'){
        alert("A User wants to chat with you");
    }
});
