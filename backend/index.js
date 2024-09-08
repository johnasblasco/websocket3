import express from 'express'
import {Server, Server as SocketIOServer} from 'socket.io'
import mongoose from 'mongoose'
import userRoutes, {init} from './routes/userRoutes.js'
import axios from 'axios'
import cors from 'cors'

//kunin muna si express kase mag sesetup ng middleware
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use("/user", userRoutes)

//connect sa database
mongoose.connect('mongodb+srv://johnasblasco:XJqJKdAYkUHtvMBM@cluster0.bxlnnpb.mongodb.net/BookStore?retryWrites=true&w=majority&appName=Cluster0')
.then(() =>{
      console.log("Connected to the database!")
})
.catch(error => console.log("Error connecting to database",error))


//mag up ng server
const expressServer = app.listen(3500, () => {
      console.log('Server listening on port 3500');
});


//gumamit ng SocketIO at ipasok ung expressServer
const io = new Server(expressServer, {cors: {origin: `*`}})


//Whenever a new client connects to the server, gagawin nya to.
//but mag ru run lang yan if nakapag setup kana sa frontend mo or yung client connection mo
io.on('connection', socket => {
      //sabihin na may na ka connect na
      console.log("may nag connect na sa port 3500 siguro si frontend yun o baka hucker")

      //send this to all like everybody na na ka connect i se send tong data na to
      const data = async () => {
            try {
                  const userData = await axios.get('http://localhost:3500/user');
                  socket.emit('ey', userData.data)
            } catch (error) {
                  
            }
      }
      data();
})



init(io);