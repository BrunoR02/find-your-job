import { S3Client } from "@aws-sdk/client-s3"

const region = "sa-east-1"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string
export const bucketName = "find-your-job-files"

const s3 = new S3Client({ 
  credentials:{
    accessKeyId,
    secretAccessKey
  },
  region,
})

export default s3