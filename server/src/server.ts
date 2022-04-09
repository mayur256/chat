import { Socket } from 'dgram';
import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'

// Types definitions for socket.io
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

class App {
  private express: Application;
  public httpServer: any;
  private ioSocket: any;

  constructor() {
    // Initializing http, express and socket server
    this.express = express();
    // enable CORS middleware
    this.enableCors();
    this.createHttpServer();
    this.createSocketServer();
    
    // waits for connection event on socket
    this.captureSocketConnectionEvent()
  }

  // create http server
  createHttpServer() {
    this.httpServer = createServer(this.express);
  }

  // create socket server on top of http server
  createSocketServer() {
    this.ioSocket = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(this.httpServer, {
      cors: {
        origin: '*',
      },
    });
  }

  captureSocketConnectionEvent() {
    // fired when a new connection is established
    this.ioSocket.on('connection', (socket: any) => {
      console.log(socket.data);
      socket.on('hello', (payload: any) => {
        // client to server event
        console.log("hello event", payload);
      })
    })
  }

  enableCors() {
    const corsOptions = {
      origin: 'http://localhost:3000/',
    };

    this.express.use(cors(corsOptions));
  }
}


// Exports an instance of http server
export default new App().httpServer;
