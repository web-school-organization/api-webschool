import express from 'express'

declare global {
    namespace Express {
        interface Request {
            user: {
                type: boolean;
                id: string;
            };
        }
    }
}