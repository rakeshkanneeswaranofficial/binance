import { Router } from "express";
import { RedisManager } from "../types/RedisManager";
import { CREATE_ORDER, CANCEL_ORDER, GET_OPEN_ORDERS } from "../types";

const orderRouter = Router();

orderRouter.post("/", async (req, res) => {

    const { market, price, quantity, side, userId } = req.body;
    console.log({ market, price, quantity, side, userId })
    const response = await RedisManager.getInstance().sendAndAwait({
        type: CREATE_ORDER,
        data: {
            market,
            price,
            quantity,
            side,
            userId
        }
    })

    return res.json(response.payload);
})

orderRouter.delete("/", async (req, res) => {
    const { orderId, market } = req.body;
    console.log({ orderId, market })
    const response = await RedisManager.getInstance().sendAndAwait({
        type: CANCEL_ORDER,
        data: {
            orderId,
            market
        }
    })
    return res.json(response.payload);
})



orderRouter.get("/open", async (req, res) => {
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_OPEN_ORDERS,
        data: {
            userId: req.query.userId as string,
            market: req.query.market as string
        }
    });

    return res.json(response.payload);
});