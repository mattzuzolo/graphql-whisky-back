// Types for Apollo Server context
import { PrismaClient, PrismaClientOptions } from '@prisma/client';
// import { Request } from 'express';

type Context = {
  db: PrismaClient<PrismaClientOptions, never>;
  // request: Request;
};

export default Context;
