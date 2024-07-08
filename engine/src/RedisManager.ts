import { WsMessage } from "./types/toWs";
import { ORDER_UPDATE, TRADE_ADDED } from "./types";
import { RedisClientType, createClient } from "redis";
import { MessageToApi } from "./types/toApi";

type DbMessage = {
    type: typeof TRADE_ADDED,
    data: {
        id: string,
        isBuyerMaker: boolean,
        price: string,
        quantity: string,
        quoteQuantity: string,
        timestamp: number,
        market: string
    }
} | {
    type: typeof ORDER_UPDATE,
    data: {
        orderId: string,
        executedQty: number,
        market?: string,
        price?: string,
        quantity?: string,
        side?: "buy" | "sell",
    }
}


export class RedisManager {

    private static instance: RedisManager;
    private client: RedisClientType;

    private constructor() {
        this.client = createClient();
        this.client.connect();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new RedisManager();
            return this.instance;

        }

        return this.instance
    }

    public pushMessage(message: DbMessage) {
        this.client.publish("db_processor", JSON.stringify(message));
    }

    public publishMessage(channel: string, message: WsMessage) {
        this.client.publish(channel, JSON.stringify(message))
    }

    public sendToApi(clientId: string, message: MessageToApi) {

    }
}
