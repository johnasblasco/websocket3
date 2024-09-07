import { useState, useEffect } from "react";
import io from 'socket.io-client';

// Custom hook for managing socket connection
const useSocket = (url) => {
      const [socket, setSocket] = useState(null);

      useEffect(() => {
            const newSocket = io(url);
            setSocket(newSocket);

            return () => {
                  newSocket.disconnect();
            };
      }, [url]);

      return socket;
};

const App = () => {
      const [hehe, setHehe] = useState([]);
      const socket = useSocket('http://localhost:3500');

      useEffect(() => {
            if (socket) {
                  socket.on('ey', (eyow) => {
                        console.log('Received data from server:', eyow);
                        setHehe(eyow);
                  });
            }

            return () => {
                  if (socket) {
                        socket.off('ey');
                  }
            };
      }, [socket]);

      const handleButton = () => {
            const newHehe = [...hehe, 1];
            setHehe(newHehe);

            if (socket) {
                  socket.emit('ey', newHehe);
            }
      };

      return (
            <div>
                  {hehe.join(', ')}
                  <button onClick={handleButton}>
                        Click me boy
                  </button>
            </div>
      );
}

export default App;
