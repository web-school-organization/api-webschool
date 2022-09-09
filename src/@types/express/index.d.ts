import express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        type: string;
        id: string;
      };
    }
  }
}