import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      admin?: any; // Change `any` to the appropriate type for the admin object
      token?: string; // This is your token property
    }
  }
}
