import multer from "multer"
import { NextApiRequest, NextApiResponse } from "next"
import createRouter from "next-connect"
import {PutObjectCommand, PutObjectCommandInput} from "@aws-sdk/client-s3"
import s3, { bucketName } from "../../config/s3"

const bucketURL = "https://find-your-job-files.s3.sa-east-1.amazonaws.com/"


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const handler = createRouter<NextApiRequest,NextApiResponse>()

handler
.post(upload.single("image"), (req,res)=>{
  const file = req.file

  //Get current Date to generate a unique file name
  const rawDate = new Date().toLocaleString().replaceAll("/","").replaceAll(" ","").replaceAll(":","")
  const fileName = rawDate + file?.originalname.replaceAll(" ","-")

  const params:PutObjectCommandInput = {
    Bucket: bucketName,
    Key: fileName,
    Body: file?.buffer,
    ContentType: file?.mimetype
  }

  const command = new PutObjectCommand(params)

  s3.send(command)

  const imageUrl = bucketURL + fileName

  res.json({imageUrl})
})

export default handler

export const config = {
  api:{
    bodyParser: false
  }
}