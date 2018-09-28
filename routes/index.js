const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/campgrounds');
});

module.exports = router;
