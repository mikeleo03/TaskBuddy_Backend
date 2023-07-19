import express from 'express';

const router = express.Router();
router.use(express.json());

const pass = process.env.EDIT_PASS;

router.post('/', async (req, res) => {
    const { password } = req.body;
  
    // Compare the entered password with the hashed password
    const passwordMatch = (password === pass);
  
    if (passwordMatch) {
        return res.json({ valid: true });
    } else {
        return res.json({ valid: false });
    }
});

export default router;