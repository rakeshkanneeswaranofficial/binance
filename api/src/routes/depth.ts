import { Router } from "express";
import { RedisManager } from "../types/RedisManager";
import { GET_DEPTH } from "../types";

const depthRouter = Router();

depthRouter.get("/", async (req, res) => {
    const { symbol } = req.query;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_DEPTH,
        data: {
            market: symbol as string
        }
    });
    return res.json(response.payload);
})

