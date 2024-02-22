import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

import { DeleteObjectCommand, GetObjectCommand, ListBucketsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// creating instance of s3 class

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3Client = new S3Client({
  region,
  credentials : {
    accessKeyId,
    secretAccessKey
  }
})




// uploads a file to s3




// downloads a file from s3// uploads a file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
  
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename
    }
    return s3Client.send(new PutObjectCommand(uploadParams));
  }
  
  // downloads a file from s3
async  function getFileStream(fileKey) {
    const getObjectParams = {
      Key: fileKey,
      Bucket: bucketName
    }
    const { Body } = await s3Client.send(new GetObjectCommand(getObjectParams));
    return Body;
  }

async function deleteFile(filename){
  const deleteParams = {
    Bucket : bucketName,
    Key : filename
  }
  return s3Client.send(new DeleteObjectCommand(deleteParams))
}
  
  export {uploadFile,getFileStream,deleteFile}