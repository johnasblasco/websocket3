import { useState, useEffect } from "react";
import io from 'socket.io-client';
import axios from 'axios'


const socket = io('http://localhost:3500');

const App = () => {
      const [hehe, setHehe] = useState([]);

      useEffect(() => {
            if (socket) {
                  socket.on('ey', (eyow) => {
                        console.log('Received data from server:', eyow);
                        setHehe(eyow);
                  });
                  socket.on('newUser', (eyow) => {
                        setHehe(prevEyow => [...prevEyow, eyow])
                  });
            }

            return () => {
                  if (socket) {
                        socket.off('ey');
                        socket.off('newUser');
                  }
            };
      }, []);

      const handleButton = () => {
            const newHehe = { name: 'hehe', age: 20, gender: 'ale' };

            console.log([...hehe, newHehe])
            axios.post('http://localhost:3500/user', newHehe)
                  .then(res =>
                        socket.emit('newUser', res.data)
                  )
      };
      return (
            <div>
                  {hehe.map((h) => {
                        return (
                              h.name + ", "
                        )
                  })}
                  <button onClick={handleButton}>
                        Click me boy
                  </button>
            </div>
      );
}

export default App;
