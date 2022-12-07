const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

router.post('/models',(req, res) => {
    if (req.files) {
        console.log(req.files)
        let oldName = req.files[0].path;//获取名字
        //给新名字加上原来的后缀
        let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
        fs.renameSync(oldName, newName);//改图片的名字
        res.send({
            err: 0,
            url:
                "http://localhost:3005/upload/" +
                req.files[0].filename +
                path.parse(req.files[0].originalname).ext//该图片的预览路径
        });
    }
})
module.exports = router