const express = require('express')
const multer = require('multer')
const app = express()
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)  // util function converts callback based method to promise based for async code management more better
const cors = require('cors')
const upload = multer({dest : "uploads/"})
const { uploadFile, getFileStream } = require('./s3')
app.use(cors())

// once we create s3 bucket,we need to create a policy for it as well,which has get,put,delete bucket option

// then click on resources,then add ARN,then give policy name and create it

// Now we need to assign this policy to user,once we have created the user,assigned the policy we just created then created its access key 

// Now we will use the AWS SDK

app.post('/images',upload.single('image'),async(req,res)=>{
    const file = req.file
    const {description} = req.body
    const result = await uploadFile(file)
    // Once all is done,we need to remove the image from uploads directory since image already uploaded to s3 bucket
    // we create unlinkFile promise using fs.unlink and util module,use that promise after uploadFile function
    await unlinkFile(file.path)

    // we can use multer s3 to direclty upload to s3 instead of doing it to server then s3 then removing from server

    // But this way,it gives us some time so we can perform some operations like resize the image
    // resize
    // apply filter
    res.json({imagePath : `image/${result.Key}`})
})

// Now when user uploads a file to s3,he gets back a response which has key, using that key,he can access the image
app.get('/image/:key',async(req,res)=>{
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
})


app.listen(3000,()=>{
    console.log("listening on port 3000");
})
