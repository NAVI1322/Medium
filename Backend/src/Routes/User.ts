import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signInInput, signUpInput } from "@100xnavi/medium-common";



export const userRoute = new Hono<{
	Bindings: {    // in this we specify the datatypes of the env variable
		DATABASE_URL:string,
        JWT_SECRET:string  
	}
}>();


userRoute.post('/signup', async  (c) => {   // c => context 

    const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())   // this creates a prisma client to perform queries
   

  const body = await c.req.json();
  
  const {success} = signUpInput.safeParse(body)

  if(!success)
  {
      c.status(411)
      c.json({
          erorr:"inputs are not correct"
      })
  }

  try{

    
    const user = await prisma.user.create({
      data:{
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        password:body.password
      }
    })
  
    const token  = await sign({id:user.id},c.env.JWT_SECRET)   // this send a promise
   
    return c.json({
      message:"user Signup successfully",
      jwt:token
    })
  }
  catch(e)
    {
      console.log(e)
      return c.status(403);
    }
  })
  
  
  userRoute.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
  
    const body = await c.req.json();


  const {success} = signInInput.safeParse(body)

  if(!success)
  {
      c.status(411)
      c.json({
          erorr:"inputs are not correct"
      })
  }
  
    try{
      const user = await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        },
        select:{
            id:true
        }
      })
     if(!user)
     {
       c.status(403);
       return c.json({
        message:"user not found"})
    }
    const token  = await sign({id:user},c.env.JWT_SECRET)   // this send a promise
   
  
    return c.json({
      message:"user Signed In successfully",
      jwt:token
    })
    
  }catch(e)
    {
      console.log("error while sign In")
    }
  })


  userRoute.get('/delete', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())   // this creates a prisma client to perform queries

        const blog = await prisma.user.deleteMany()
       
    return c.json({
        message:"deleted successfully"
    })
  })





