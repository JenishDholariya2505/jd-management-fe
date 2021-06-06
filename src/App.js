import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
import { broadcastSocket } from './helper/config/socketHandle';

const ENDPOENT = 'http://localhost:2505/';

function App() {
  const [color, setColor] = useState('red')
  useEffect(() => {
    let socket = socketIOClient(ENDPOENT);
    socket.on('topic/all', (data) => {
      // setColor(data.dataPass.color)
      console.log(data, 'data all');
    })
    socket.on('topic/one', (data) => {
      // setColor(data.dataPass.color)
      console.log(data, 'data one');
    })
  }, []);

  return (
    <div className="App">
      <header style={{ backgroundColor: color }} className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <button onClick={() => broadcastSocket({ color: color === 'red' ? 'blue' : 'red', allShare: true })}>br</button>
        <button onClick={() => broadcastSocket({ color: color === 'red' ? 'blue' : 'red', allShare: false })}>test</button> */}
      </header>
    </div>
  );
}

export default App;
