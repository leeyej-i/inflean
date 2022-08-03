const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');


//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    // 가져온 이미지 저장하기
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})

router.post('/', (req, res) => {

    //받아온 정보 DB에 저장
    const product = Product(req.body)
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

})

router.post('/products', (req, res) => {

    //모든 상품들 정보 가져오기
    // 조건이 없으므로 모든 값들 가져옴

    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let term = req.body.searchTerm

    let findArgs = {};

    // console.log(req.body.filters)
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0], //이상
                    $lte: req.body.filters[key][1] //이하
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    console.log('findArgs', findArgs)

    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer") //writer의 정보값들 확인하기
            .skip(skip) //가져올 위치
            .limit(limit)// limit 수 만큼 정보가져오기
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            })
    } else {

        Product.find(findArgs)
            .populate("writer") //writer의 정보값들 확인하기
            .skip(skip) //가져올 위치
            .limit(limit)// limit 수 만큼 정보가져오기
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            })
    }
})


module.exports = router;
