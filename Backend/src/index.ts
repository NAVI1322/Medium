import { Hono } from 'hono'

import { sign, verify } from 'hono/jwt'
import { userRoute } from './Routes/User';
import { blogRoute } from './Routes/Blog';

const app = new Hono<{
	Bindings: {    // in this we specify the datatypes of the env variable
		DATABASE_URL:string,
    JWT_SECRET:string  
	}
}>();


app.route('api/v1/user',userRoute)
app.route('api/v1/blog',blogRoute)


export default app
