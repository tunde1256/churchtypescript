import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Admin from '../Model/AdminModel'; // Adjust the import path as needed

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }; // Type assertion
    const admin = await Admin.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.admin = admin; // Attach admin instance to request
    req.token = token; // Attach the token to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

export default auth;
