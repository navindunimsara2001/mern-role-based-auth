import express from 'express';
const router = express.Router();
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const test = (req,res)=>{
    const text = "Server test path working....."
    res.status(200).json(text);
}

router.get("/test", test);

export default router;