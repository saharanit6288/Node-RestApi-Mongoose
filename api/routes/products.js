const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.parse(new Date())+'_'+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5 //maximum size 5 mb file
    },
    fileFilter: fileFilter
});

router.get('/', productsController.get_all_products);

router.post('/', checkAuth, upload.single('imagePath'), productsController.create_product);

router.get('/:id', productsController.get_product_by_id);

router.patch('/:id', checkAuth, productsController.update_product);

router.delete('/:id', checkAuth, productsController.delete_product);

module.exports = router;