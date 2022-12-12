import { DeleteObjectCommand, DeleteObjectCommandInput } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import s3, { bucketName } from "../../../config/s3";

const bucketURL = "https://find-your-job.s3.sa-east-1.amazonaws.com/"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method === "POST"){
    const {imageUrl} = req.body

    const imageName = imageUrl.replace(bucketURL,"")

    const params:DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: imageName  
    }

    const command = new DeleteObjectCommand(params)

    await s3.send(command)

    res.send(200)
  }
}