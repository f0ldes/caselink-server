const express = require('express');
const router = express.Router();
const { saveCase } = require('../dal/case-dal');

/* Make a case endpoint: */
router.post('/create', async (req, res) => {
    const { userId, title, briefDescription, detailedDescription, caseCategory,  } = req.body;

    try {
        const caseId = await saveCase(userId, title, briefDescription, detailedDescription, caseCategory);
        res.status(200).json({ success: true, message: 'Case saved successfully!'});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error."});
    }
});


module.exports = router;