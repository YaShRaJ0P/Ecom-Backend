
import { RateLimiterMongo } from "rate-limiter-flexible";

export let rateLimeterMongo = null

const POINTS = 10
const DURATION = 30

export const rateLimiterInit = (connection)=>{
    rateLimeterMongo = new RateLimiterMongo({
        storeClient:connection,
        points:POINTS,
        duration:DURATION
    })

}