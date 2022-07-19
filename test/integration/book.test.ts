import test from "node:test";
import { promisify } from "node:util";
import ApiServer from "../../src/server";

test('Book Integration Test Suite', async(t)=>{
    
    const TEST_PORT = 9009
    const testServerAddress = `http://localhost:${TEST_PORT}/books`;

    const instance  = new ApiServer();
    const server = instance.Start(TEST_PORT)

    await t.test('create book', async (t)=>{
        const book = {title: "test", description: "test description", author: "test author"};
    })

    await promisify(server.close.bind(server))();
})