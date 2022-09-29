import "reflect-metadata"
import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import { buildSchema } from 'type-graphql'
import UserResolver from '../../src/resolvers/UserResolver'
import Cors from "micro-cors"
import { RequestHandler } from "next/dist/server/next"

const schema = await buildSchema({
  resolvers: [UserResolver],
})

const cors = Cors()
const server = new ApolloServer({schema,introspection:true,cache:"bounded",parseOptions:{noLocation:true}})

export const config = {
  api:{
    bodyParser: false
  }
}

const startServer = server.start()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "OPTIONS")
  await startServer
  await server.createHandler({path:"/api/graphql"})(req,res)
}

export default cors(handler as RequestHandler)
