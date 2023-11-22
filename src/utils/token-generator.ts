import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants';

const getToken = (payload: any) => jwt.sign(payload, SECRET_KEY);

const verifyToken = (payload: any) => jwt.verify(payload, SECRET_KEY);

export { getToken, verifyToken };