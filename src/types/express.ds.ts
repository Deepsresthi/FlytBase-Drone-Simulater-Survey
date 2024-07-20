import { Request } from 'express';

interface ExtendedRequest extends Request {
  user?: any; // Use a more specific type if you have a user structure
}

export default ExtendedRequest;
