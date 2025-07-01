import request from "supertest";
import server,{ connectDB} from "../server";
import db from "../config/db";

// describe('get /api', () => {
//     test('should send back a json response', async ()=>{
//         const res = await request(server).get('/api')
//         expect(res.status).toBe(200)

//         expect(res.status).not.toBe(404)
//     })
// })

jest.mock('../config/db')
describe('connectdb', () =>{
    test('should handle databse connection error', async() =>{
        jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar DB'))
        const consoleSpy = jest.spyOn(console,'log')

        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})