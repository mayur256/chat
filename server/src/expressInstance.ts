import express, { Application } from 'express';

class App {
  public express: Application;

  constructor () {
    this.express = express();
  }
}

export default new App().express;
