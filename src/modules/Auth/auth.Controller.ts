import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../User/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     res.status(400).json({ message: 'Email already exists' });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'User registration failed',
      success: false,
      error: error,
      stack: error instanceof Error ? error.stack : 'User registration failed',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
     res.status(400).json({ message: 'Invalid credentials' });
     return
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
       res.status(400).json({ message: 'Invalid credentials' });
    }
    // Include email in token payload for later filtering if needed.
    const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({
      message: 'User login failed',
      success: false,
      error: error,
      stack: error instanceof Error ? error.stack : 'User login failed',
    });
  }
};
