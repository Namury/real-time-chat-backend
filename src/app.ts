import "./paths";
import express from "express";
import "dotenv/config";
import routes from "./routes";
import cors from "cors";
import * as os from "os";

const app = express();
const PORT: number = Number(process.env.PORT) || 3010;

const allowedOrigins = [
  "http://localhost:" + String(PORT),
  "http://localhost:3000",
  "http://localhost:3001",
  "https://namury-rtctest.herokuapp.com/",
  "https://namury-rtc.herokuapp.com/",
  "https://namury-rtc-frontend.herokuapp.com/",
  "https://namury-rtc-backend.herokuapp.com/",
  
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);


const io = new Server(httpServer, { 
	cors: {
		origin: [
			"https://namury-rtc.herokuapp.com/",
			"https://namury-rtc.herokuapp.com/room",
			"https://namury-rtc.herokuapp.com/chat",
		],
		credentials:true
  	} 
});

io.on('connection', (socket) => {
	console.log("a user connected");
  
	function log(message:string, value?:string ) {
		var array = ['Message from server:'];
		array.push(message);
	  if(value)
		  array.push(value);
		socket.emit('log', array);
	  }
	
	  
	  //Defining Socket Connections
	  socket.on('message', function(message:string, room:string) {
		log('Client said: ', message);
		// for a real app, would be room-only (not broadcast)
		socket.in(room).emit('message', message, room);
	  });
	
	  socket.on('create or join', function(room:any) {
		log('Received request to create or join room ' + room);
	
		var clientsInRoom = io.sockets.adapter.rooms.get(room);
		var numClients = clientsInRoom ? Object.keys(clientsInRoom).length : 0;
		log('Room ' + room + ' now has ' + numClients + ' client(s)');
	
		if (numClients === 0) {
		  socket.join(room);
		  log('Client ID ' + socket.id + ' created room ' + room);
		  socket.emit('created', room, socket.id);
	
		} else if (numClients === 1) {
		  log('Client ID ' + socket.id + ' joined room ' + room);
		  io.sockets.in(room).emit('join', room);
		  socket.join(room);
		  socket.emit('joined', room, socket.id);
		  io.sockets.in(room).emit('ready');
		} else { // max two clients
		  socket.emit('full', room);
		}
	  });
	
	  socket.on('ipaddr', function() {
		var ifaces = os.networkInterfaces();
		for (var dev in ifaces) {
			//@ts-ignore
		  ifaces[dev].forEach(function(details:os.NetworkInterfaceInfo) {
			if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
			  socket.emit('ipaddr', details.address);
			}
		  });
		}
	  });
	
	  socket.on('bye', function(){
		console.log('received bye');
	  });
  });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(options));

httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	routes(app);
  });
