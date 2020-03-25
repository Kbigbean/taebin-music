const express = require('express');
const router = express.Router();
const {Music: Music} = require("../models/Music");
const {Follower} = require('../models/Follower');
const {auth} = require("../middleware/auth");
const multer = require('multer');

let CoverImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || '.png' || '.jpeg') {
            return cb(res.status(400).end('only jpg, png, jpeg is allowed'), false);
        }
        cb(null, true);
    }
});

let MusicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.mp3') {
            return cb(res.status(400).end('only mp3 is allowed'), false);
        }
        cb(null, true);
    }
});

const imgUpload = multer({storage: CoverImageStorage}).single("file");

const musicUpload = multer({storage: MusicStorage}).single("file");

//=================================
//          Music
//=================================

router.post('/uploadCoverImage', (req, res) => {
    imgUpload(req, res, err => {
        if (err) {
            return res.json({success: false, err});
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename});
    })
});

router.post('/uploadMusic', (req, res) => {
    musicUpload(req, res, err => {
        if (err) {
            return res.json({success: false, err});
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename});
    })
});

router.post('/uploadMusicData', (req, res) => {
    const music = new Music(req.body);
    music.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({success: true})
    });
});

router.get('/getMusics', (req, res) => {
    Music.find()
        .populate('writer')
        .exec((err, musics) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, musics})
        })
});

router.post('/getMusicDetail', (req, res) => {
    Music.findOne({"_id": req.body.musicId})
        .populate('writer')
        .exec((err, musicDetail) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({success: true, musicDetail});
        })
});

router.post('/getFollowMusics', (req, res) => {
    Follower.find({userFrom: req.body.userFrom})
        .exec((err, followerInfo) => {
            if (err) return res.status(400).send(err);

            let followingUser = [];

            followerInfo.map((follower, i) => {
               followingUser.push(follower.userTo);
            });

            Music.find({writer: {$in: followingUser}})
                .populate('writer')
                .exec((err, musics) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({success: true, musics});
                })
        })
});

module.exports = router;
