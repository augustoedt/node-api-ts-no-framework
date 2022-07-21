//using node-fetch until @types@node implement that function from node18
import { RequestInfo, RequestInit } from 'node-fetch';
import assert from "node:assert";
import test from "node:test";
import { promisify } from "node:util";
import ApiServer from "../../src/server";

test('Book Integration Test Suite', async(t)=>{
    
    const TEST_PORT = 9009
    const testServerAddress = `http://localhost:${TEST_PORT}/`;

    const instance  = new ApiServer();
    const server = instance.Start(TEST_PORT)
    const fetch = require('node-fetch')

    // await t.test('create book', async (t)=>{
    //     const book = {title: "test", description: "test description", author: "test author"};

    //     const request = await fetch(testServerAddress+"books", {
    //         method: 'POST',
    //         body: JSON.stringify(book)
    //     })

    //     assert.deepStrictEqual(
    //         request.headers.get('Content-Type'),
    //         'application/json'
    //     )

    //     assert.strictEqual(request.status, 201)
        
    //     const result = await request.json()

    //     console.log(result)

    // })

    await t.test('update book', async (t)=>{
        const book = {id: "e0f55a18-7667-46ea-ae5d-e71487a751ce", title: "New Title"};

        const request = await fetch(testServerAddress+"book", {
            method: 'POST',
            body: JSON.stringify(book)
        })

        assert.deepStrictEqual(
            request.headers.get('Content-Type'),
            'application/json'
        )

        assert.strictEqual(request.status, 201)
        
        const result = await request.json()

        console.log(result)

    })

    await promisify(server.close.bind(server))();
})

