import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectHandler from "./config/db.config";
import assembleRoutes from "./api-routes";

// Controller
import messageController from './Modules/Message/Controllers/message';
import userController from './Modules/User/Controllers/user';

// type definitions
import { ServerToClientEvents, ClientToServerEvents, Message, InterServerEvents } from './utils/CommonTypes';

// Server Global State
import { addUser, getUserBySocketId, removeUser } from "./state";
import user from './Modules/User/Controllers/user';

// Application Class
class App {
  private express: Application;
  public httpServer: any;
  private ioSocket: any;
  private activeClientSocket: any = null;

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
    this.ioSocket.on('connection', (clientSocket: any): void => {
      // sign in event from client
      this.activeClientSocket = clientSocket;
      this.activeClientSocket.on('signIn', (userId: string): void => {
        // at this point client is signed in
        // store the connect client in server global state
        addUser({ userId, socketId: this.activeClientSocket.id });
        
        // handle events or messages specific to a client
        this.handleClientEvents();
        
        // handle online status change
        this.handleUserOnlineStatus(userId);
      });
    });
  }

  handleUserOnlineStatus = async (userId: string): Promise<void> => {
    try {
      if (await userController.setOnlineStatus(userId, true)) {
        this.activeClientSocket.broadcast.emit('isOnline', userId);
      }
      
    } catch (ex: any) {
      console.log(`Error in App.handleUserOnlineStatus :: ${ex}`)
    }
  }

  handleClientEvents = () => {
    this.activeClientSocket.on('message', this.handleClientMessage);
    // fired when connection disconnects / lost
    this.activeClientSocket.on('disconnect', this.handleUserDisconnect)
  }

  handleClientMessage = (message: Message) => {
    // store the message via controller
    try {
      messageController.storeMessage(message);
      /*const toBeEchoedMsg = {
        _id: Math.floor(Math.random() * 1000000000),
        ...message
      }

      this.ioSocket.emit('echoMessage', toBeEchoedMsg);*/
    } catch (ex: any) {
      console.log(`Error while storing client message in database`)
    }
  }

  handleUserDisconnect = async () => {
    const connectedUser = getUserBySocketId(this.activeClientSocket?.id ?? '');
    if (connectedUser) {
      await user.setOnlineStatus(connectedUser.userId, false);
      this.activeClientSocket.broadcast.emit('user-disconnected', connectedUser.userId);
    }
    removeUser(this.activeClientSocket.id);
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

  // getter for httpServer
  getHttpServer = () => {
    return this.httpServer;
  }

  // getter for socket server
  getSocketInstance = () => {
    return this.ioSocket;
  }

  // getter for current connected client socket
  getClientSocket = () => {
    return this.activeClientSocket;
  }

  // getter for socket server
  getSocketServer = () => {
    return this.ioSocket;
  }
}

// Instantiate App
const app = new App();

// Exports an instance of http server
export default app.getHttpServer();

// Exports an instance of socket
export const clientSocket = app.getClientSocket();

// Export an instance of server socket
export const serverSocket = app.getSocketServer();
