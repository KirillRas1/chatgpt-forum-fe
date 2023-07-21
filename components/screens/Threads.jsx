import { useState } from 'react';
import axios from 'axios';


export default function Messages() {
    const [messages, setMessages] = useState([]);
    const getMessages = () => {
        axios.get('/posts/')
        .then(function (response) { 
          if (response.status == 200) {
              setMessages([...botMessages, response.data])
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    return (<div>
        <button onClick={getMessages}>Get Messages</button>
        <ul>
            {messages.map((message, index) => (<div key={index}><p>message</p></div>))}
        </ul>
    </div>)
}