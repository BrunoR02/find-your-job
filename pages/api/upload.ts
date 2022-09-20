import multer from "multer"
import { NextApiRequest, NextApiResponse } from "next"
import createRouter from "next-connect"
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3"

const region = "sa-east-1"
const bucketName = "find-your-job-files"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string
const bucketURL = "https://find-your-job-files.s3.sa-east-1.amazonaws.com/"

export const s3 = new S3Client({ 
  credentials:{
    accessKeyId,
    secretAccessKey
  },
  region,
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const handler = createRouter<NextApiRequest,NextApiResponse>()

handler
.post(upload.single("image"), async (req,res)=>{
  const file = req.file

  //Get current Date to generate a unique file name
  const rawDate = new Date().toLocaleString().replaceAll("/","").replaceAll(" ","").replaceAll(":","")
  const fileName = rawDate + file?.originalname.replaceAll(" ","-")

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file?.buffer,
    ContentType: file?.mimetype
  }

  const command = new PutObjectCommand(params)

  await s3.send(command)

  const imageUrl = bucketURL + fileName

  res.json({imageUrl})
})

export default handler

export const config = {
  api:{
    bodyParser: false
  }
}