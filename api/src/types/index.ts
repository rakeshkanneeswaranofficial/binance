export const CREATE_ORDER  = 'CREATE_ORDER';
export const CANCEL_ORDER = 'CANCEL_ORDER';
export const ON_RAMP = 'ON_RAMP';
export const GET_OPEN_ORDER = 'GET_OPEN_ORDER';
export const GET_DEPTH = 'GET_DEPTH';



export type MessageFromOrderbook = 

{
    type : 'DEPTH',
    payload : {
        market : string,
        bids : [string,string][],
        asks : [string,string][]
    }
} |
{

    type : 'ORDER_PLACED',
    payload : {
        orderid : String,
        executedQty : number,
        fills : [{
            price : string,
            qty : string,
            tradeId : String
        }]
        
    }
} |
{
    type : 'ORDER_CANCELED',
    payload : {
        orderid : String,
        executedQty : number,
        remainingQty : number
    }
} |

{
    type : 'OPEN_ORDER',
    payload: {
        orderId: string,
        executedQty: number,
        price: string,
        quantity: string,
        side: "buy" | "sell",
        userId: string
    }[]

}

