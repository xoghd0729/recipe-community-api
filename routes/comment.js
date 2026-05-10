const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('comment', {
            title: require('../package.json').name
        });
    })
    .post(async (req, res, next) => {
        const { userId, comment } = req.body;

        try {
            await Comment.create({ userId, comment });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// 댓글 수정
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, { comment }, { new: true });
        res.json(updatedComment); // 수정된 댓글 반환 (여기서는 JSON 형태로 반환)
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 삭제
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        await Comment.findByIdAndDelete(id);
        res.sendStatus(204); // No Content 상태 코드 반환
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
