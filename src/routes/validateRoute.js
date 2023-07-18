import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();
router.use(express.json());

const pass = 'password'; // Hashed password: 'password123'

router.post('/', async (req, res) => {
    const { password } = req.body;
  
    // Compare the entered password with the hashed password
    // const passwordMatch = await bcrypt.compare(password, pass);
    console.log(password);
    const passwordMatch = (password === pass);
  
    if (passwordMatch) {
        return res.json({ valid: true });
    } else {
        return res.json({ valid: false });
    }
});

export default router;