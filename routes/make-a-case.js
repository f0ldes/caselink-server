const express = require('express');
const router = express.Router();
const { saveCase } = require('../utils(dal)/make a case/saveCase');
const { verifyJWT } = require('../services/tokenService');


/* Middleware for checking the checking the token and getting the user id. */
router.use('/create', (req, res, next) => {
    const token = req.cookies.authToken;
    if(!token) {
        return res.status(401).json({error: 'Authentication failed. Required cookie not found.'})
    }
    const verifiedData = verifyJWT(token);
    if(!verifiedData){
        return res.status(401).json({error: 'Authentication denied. Not a valid user. '})
    }
    req.user = verifiedData;
    next();
})

/* Make a case endpoint: */
router.post('/create', async (req, res) => {
    //add timestamp 
    const { title, briefDescription, detailedDescription, caseCategory, categoryTags, timestamp  } = req.body;
    const userId = req.user.userId;
    try {
        console.log(categoryTags, caseCategory)
        console.log(req.body)
        await saveCase(userId, title, briefDescription, detailedDescription, caseCategory, categoryTags, timestamp); //saving it as JSON currently
        res.status(200).json({ success: true, message: 'Case saved successfully!'});
    } catch (error) {
        console.error("Error saving the case:", error)
        res.status(500).json({ success: false, message: "Internal server error."});
    }
});


module.exports = router;




/*
                <Grid container sx={{ marginTop: '20px', marginBottom: '20px', border: '1px solid white', borderRadius: '5px' }}>
                    <Grid item xs={12}>
                        <Box sx={{ width: 1, bgcolor: 'background.paper' }}>
                            <Box sx={{ width: 1, borderBottom: '1px solid white', padding: '10px' }}>
                                <Typography variant="h6" component="div">
                                    Upload Documents
                                </Typography>
                            </Box>
                            <Controller
                                name="documents"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <FormControl sx={{ m: 0, width: '100%' }}>
                                        <InputLabel htmlFor="select-multiple-chip" style={{ visibility: 'hidden' }}>Hidden Label</InputLabel>
                                        <Select
                                            {...field}
                                            id="select-multiple-chip"
                                            multiple
                                            input={<Input label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, personName, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
 */