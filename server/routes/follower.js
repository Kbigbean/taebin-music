const express = require('express');
const router = express.Router();
const {Follower} = require("../models/Follower");

//=================================
//          Music
//=================================

router.post('/followerNumber', (req, res) => {
    Follower.find({'userTo': req.body.userTo})
        .exec((err, follow) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, followerNumber: follow.length});
        })
});

router.post('/following', (req, res) => {
    Follower.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, follow) => {
            if (err) res.status(400).send(err);

            let result = false;
            if (follow.length !== 0) {
                result = true
            }
            res.status(200).json({success: true, following: result});
        })
});

router.post('/unFollow', (req, res) => {
    Follower.findOneAndDelete({userTo: req.body.userTo, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err});
            res.status(200).json({success: true, doc});
        });
});

router.post('/follow', (req, res) => {
    const follow = new Follower(req.body);

    follow.save((err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({success: true})
    })
});


module.exports = router;
