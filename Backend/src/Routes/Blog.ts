import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from "hono/jwt";


export const blogRoute = new Hono<{
	Bindings: {    // in this we specify the datatypes of the env variable
		DATABASE_URL:string,
        JWT_SECRET:string  
	},
    Variables:{   // there we defined the userID as string to overcome the type error in middleware
        userId:string
    }
}>();

// this is the middle ware to check the authiticite of the user
blogRoute.use('/*', async (c , next)=>
{
    const autHeader =  c.req.header("authorization")
    
    if(!autHeader)
    return c.json("auth failed - could not get the autheader")
    
    const user =  await verify(autHeader,c.env.JWT_SECRET)
    
    if(user)
    c.set("userId",user.id)   // there we set the userid globally
    else
    {    c.status(403);
        return c.json({message:"user does not found"})
    } 
    await next();
})




// ***********************************************************************************************************************
blogRoute.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())   // this creates a prisma client to perform queries
       
      try{
        
        const body = await c.req.json();
        // here we have to sanatize the body
       
        const authorId = c.get("userId")


       
      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content:body.content,
            published: true,
            authorid: authorId
        }
      })

    return c.json({
        id:blog.id
    })
      }
      catch(e)
      {
        console.log("error in posting blog")
        c.status(401)
        return c.json(
            {message:"error while posting blog"}
        )
      }
  })
  
  
  blogRoute.put('/',async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())   // this creates a prisma client to perform queries
       
    try{
        const body = await c.req.json();
         
  
        const blog = await prisma.post.update({
  
          where:{
             id:body.id
          },
  
          data:{
              title: body.title,
              content:body.content,
              published: true,
              
          }

        })

        c.status(200)
        return c.json({
            message:"blog has updated successfully"

        })
    }
    catch(e)
    {
        c.status(403);
        console.log(e)
        return c.json({
            message:"error while updating the blog"
        })
    }

    
  })
  

  // add featue pagination
  blogRoute.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())   // this creates a prisma client to perform queries

        const blog = await prisma.post.findMany()
       
    return c.json({
        message:"fetched successfully",
        blogs:blog
    })
  })

  
  blogRoute.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())   // this creates a prisma client to perform queries
       
      const id = c.req.param("id");


      try{
      const blog = await prisma.post.findFirst({
        where: {
            id:Number(id)
        },
      
      })
      
      if(!blog)
      {
        c.status(400)
        return c.json({
            message:"blog id is not correct"
          })
      }
      
      return c.json({
        blog
      })
    }
    catch(e)
    {

        console.log("error : "+ e)
        c.status(403)
        return c.json({
            message:"not able to get the required post"
        })
    }

    
  })
  

  

  blogRoute.get('/delete', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())   // this creates a prisma client to perform queries

        const blog = await prisma.post.deleteMany()
       
    return c.json({
        message:"deleted successfully"
    })
  })
