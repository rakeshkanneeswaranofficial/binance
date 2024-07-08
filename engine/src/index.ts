import { RedisClientType, createClient } from "redis";

async function main() {
    const client: RedisClientType = createClient();
    client.connect();
    for (let index = 0; index < 4; index++) {
        const response = await client.rPop("message");
        console.log(response);
    }


}

main();

