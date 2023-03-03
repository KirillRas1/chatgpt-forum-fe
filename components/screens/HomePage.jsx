import { useState } from 'react';
import GoogleLoginButton from '../GoogleLogin';
import { Message } from '../styles';




export default function HomePage() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([]);

  const postMessage = (message) => {
    setUserMessages([...userMessages, message]);
    axios.post('/generate_text', {
      prompt: message
    })
    .then(function (response) { 
      if (response.status == 200) {
        setBotMessages([...botMessages, response.data])
      }
        
    })
    .catch(function (error) {
      console.log(error);
    });
    setCurrentMessage('')
  }
  const mergedArray = userMessages.map(function(e, i) {
    return [e, botMessages[i]];
  });
  return (
    <div>
      <ul>
        {mergedArray.map(([userMessage, botMessage]) => (
          <div>
            <Message key={userMessage+"user"}>{userMessage}</Message>
            <Message key={botMessage+"bot"}>{botMessage}</Message>
          </div>
        ))}
      </ul>
      
      <input type="text" value={currentMessage} onChange={e => setCurrentMessage(e.target.value)}/>
      <button onClick={e => postMessage(currentMessage)}>Submit</button>
      <GoogleLoginButton/>
    </div>
  );
}