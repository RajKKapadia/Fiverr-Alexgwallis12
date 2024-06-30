import { Router, Request, Response } from "express";
import { detectIntent } from "../utils/dialogflowService";

const router = Router();

router.post('/webhook', async (req: Request, res: Response) => {
    try {
        const { sessionId, query } = req.body;
        if (!sessionId || !query) {
            return res.status(400).json({ status: 'error', response: 'Missing sessionId or query' });
        }
        const result = await detectIntent(sessionId, query);
        res.json(result);
    } catch (error) {
        console.error('Error in webhook route:', error);
        res.status(500).json({ status: 'error', response: 'Internal server error' });
    }
});

export default router;
