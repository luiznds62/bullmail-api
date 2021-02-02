import express, { Router, Request, Response, NextFunction } from "express";

class Controller {
  basePath: string;
  router: express.Router;

  constructor(path) {
    this.router = express.Router();
    this.basePath = path;
  }
}

export default Controller;
