const multer = require("multer");
const CreateNews = require("../models/CreateNews")

const Storage = multer.diskStorage({
    destination: 'uploadNews',
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },

});

exports.upload = multer({
    storage: Storage
}).single('newsImg')

exports.createNews = async (req, res) => {
    const { title, image,description, catagory } = req.body;
    console.log(req.body);
    const userId = req.mediaReporterId;
    const date = new Date().toLocaleString();
    const news = await CreateNews({
        title,
        image,
        description,
        catagory,
        userId,
        date
    })
    await news.save();
    res.json(news)
}

exports.allNews = async (req, res) => {
    const sort = { date: -1 };
    const news = await CreateNews.find().sort(sort);
    res.json({ data: news ,success: true})
}

exports.myNews = async (req, res) => {
    const sort = { date: -1 };
    const news = await CreateNews.find({userId: req.mediaReporterId}).sort(sort);
    res.json({ data: news,success: true })
}

