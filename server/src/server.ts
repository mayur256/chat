import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectHandler from "./config/db.config";
import assembleRoutes from "./api-routes";

// Controller
import messageController from './Modules/Message/Controllers/message';

// type definitions
import { ServerToClientEvents, ClientToServerEvents, Message, InterServerEvents } from './types';

class App {
  private express: Application;
  public httpServer: any;
  private ioSocket: any;

  // application constructor
  constructor() {
    // Initializing http, express and socket server
    this.express = express();
    this.enableCookieParser();
    this.parseJsonBody();
    // enable CORS middleware
    this.enableCors();
    this.createHttpServer();
    this.createSocketServer();
    
    // establish connection with database
    this.dbConnect();
    // enable routing
    this.mountRoutes();
    // waits for connection event on socket
    this.captureSocketConnectionEvent()
  }

  // create http server
  createHttpServer() {
    this.httpServer = createServer(this.express);
  }

  // create socket server on top of http server
  createSocketServer() {
    this.ioSocket = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents>(this.httpServer, {
      cors: {
        origin: '*',
      },
    });
  }

  parseJsonBody = () => {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
  }

  captureSocketConnectionEvent = () => {
    // fired when a new connection is established
    this.ioSocket.on('connection', (clientSocket: any) => {
      // sign in event from client
      clientSocket.on('signIn', () => {
        // at this point client is signed in
        // handle events or messages specific to a client
        this.handleClientEvents(clientSocket);
      });
    });   
  }

  handleClientEvents = (clientSocket: any) => {
    clientSocket.on('message', this.handleClientMessage);
  }

  handleClientMessage = (message: Message) => {
    // store the message via controller
    messageController.storeMessage(message);
  }

  enableCors() {
    const corsOptions = {
      origin: 'http://localhost:3000',
    };

    this.express.use(cors(corsOptions));
  }

  // Initialize db connection
  dbConnect = () => {
    try {
      connectHandler.connect();
    } catch (err) {
      connectHandler.disconnect();
    }
  }

  // register routes into the application
  mountRoutes = () => {
    const router = express.Router();
    assembleRoutes(router);
    this.express.use('/api', router);
  };

  // enable cookie-parser
  enableCookieParser = () => {
    this.express.use(cookieParser())
  }
}

// Exports an instance of http server
export default new App().httpServer;
