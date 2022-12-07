const express = require('express')
const multer = require('multer')
const cors = require('cors')
const modelRouter = require('./router/index')
const app = express()
const objMulter = multer({ dest: "../public/upload" })
//any表示任意类型的文件
// app.use(objMulter.image())//仅允许上传图片类型
app.use(objMulter.any())
//将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面
app.use(express.static("./public"))
app.use(cors())
app.use('/api/', modelRouter)

app.listen('3005', () => {
    console.log('localhost:3005')
})