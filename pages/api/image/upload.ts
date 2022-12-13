import multer from "multer"
import { NextApiRequest, NextApiResponse } from "next"
import createRouter from "next-connect"
import {PutObjectCommand, PutObjectCommandInput} from "@aws-sdk/client-s3"
import s3, { bucketName } from "../../../config/s3"
import sharp from "sharp"

const bucketURL = "https://find-your-job.s3.sa-east-1.amazonaws.com/"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const handler = createRouter<NextApiRequest,NextApiResponse>()

handler
.post(upload.single("image"), async (req,res)=>{
  const file = req.file

  const type = JSON.parse(req.body.object).type

  //Get current Date to generate a unique file name
  const rawDate = new Date().toLocaleString().replaceAll("/","").replaceAll(" ","").replaceAll(":","")
  const fileName = rawDate + file?.originalname.replaceAll(" ","-")

  const folder = "profile-pictures/"

  const buffer = await sharp(file?.buffer).resize({fit:"contain"}).webp({quality:80}).toBuffer()

  const params:PutObjectCommandInput = {
    Bucket: bucketName,
    Key: folder+fileName,
    Body: buffer,
    ContentType: file?.mimetype
  }

  const command = new PutObjectCommand(params)

  if(type === "register") {
    s3.send(command)
  } else if(type === "update"){
    await s3.send(command)
  }

  const imageUrl = bucketURL + folder + fileName

  res.json({imageUrl})
})

export default handler

export const config = {
  api:{
    bodyParser: false
  }
}