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
// blogRoute.use('/*', async (c , next)=>
// {
//     const autHeader =  c.req.header("authorization")
    
//     if(!autHeader)
//     return c.json("auth failed - could not get the autheader")
    
//     const user =  await verify(autHeader,c.env.JWT_SECRET)
    
//     if(user)
//     c.set("userId",user.id)   // there we set the userid globally
//     else
//     {    c.status(403);
//         return c.json({message:"user does not found"})
//     } 
//     await next();
// })




// ***********************************************************************************************************************
blogRoute.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()); // this creates a prisma client to perform queries

  try {
    const body = await c.req.json();

   
    // Check if the user exists before creating the blog post
    const userExists = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    }); 

    console.log(userExists)
    if (!userExists) {
      throw new Error('User not found');
    }

    // Create the blog post
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        category:body.category,
        published: true,
        authorId: body.userId,
      },
    });

    return c.json({
      Blog_id: blog.id,
    });
  } catch (error) {
    console.error('Error posting blog:', error);
     c.status(401)
     return c.json({
      message: 'Error while posting blog' + error,
      
    });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after the operation
  }
});

  

   blogRoute.get('GetProfileData/:id',async(c)=>{

    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())  

    const id = c.req.param('id');
    
    try{

      const GetUserData= await prisma.user.findUnique({
        where:{
          id:id
        },
        select:{
          firstName:true,
          lastName:true,
          email:true,
          comments:true,
        }
      })

      console.log(GetUserData)
     
     
      c.status(200)
      return c.json({
          message:"User Data Retrieved",
          UserData:GetUserData

      });

    }
    catch(e)
    {
      c.status(401)
      return c.json({
          message:"Something Went Wrong, While Retriving User Profile data",
       

      });

    }

   })
  
  blogRoute.put('/:id',async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())   // this creates a prisma client to perform queries
       
      const id = c.req.param('id');
    try{
        const body = await c.req.json();
        
        if (body.firstName || body.lastName) 
        {
          const updatedUser = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              firstName: body.firstName,
              lastName: body.lastName,
            },
            select:{
              firstName:true,
              lastName:true,
              email:true,
            }
          });
    
          c.status(200);
          return c.json({
            message: 'User data has been updated successfully',
            user: updatedUser,
          });
        }
        else {
        const blog = await prisma.post.update({

          where:{
             id:parseInt(id)
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
    }
    catch(e)
    {
        c.status(403);
        console.log(e)
        return c.json({
            message:"error while updating the blog"
        })
    }
    finally {
      await prisma.$disconnect(); // Disconnect Prisma client after the operation
    }

    
  })


  
  


  //   _______________________________Comments_________________________________________

  blogRoute.get('/getComments/:id',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 

    const id = c.req.param('id');

    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: parseInt(id)
        },
        select: {
          postId: true,
          content: true,
          createdAt: true,
          authorId: true
        }
      });
    
      // Map over each comment object to extract the required properties
      const formattedComments = comments.map(comment => ({
        id: comment.postId,
        content: comment.content,
        createdAt: comment.createdAt,
        authorId: comment.authorId
      }));
    
      c.status(200);
      return c.json({
        message: `fetched comments from ${id}`,
        data: formattedComments
      });
    } catch (error) {
      
      console.log("error :" + error);
    
    }
  })


  blogRoute.post('/postComment/:id', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const postId = c.req.param("id"); 
    const body = await c.req.json(); 
  
    try {
      if (postId!=null) {
        const newComment = await prisma.comment.create({
          data: {
            postId: parseInt(postId),
            content: body.content,
            authorId: body.authorId,
          },
          select :{
            postId:true,
            content:true,
            authorId:true,
            createdAt:true
          }
        });
  
        c.status(201); 
        return c.json({
          message: `Comment created successfully for post ID: ${postId}`,
          data: newComment
        });
      } else {
        throw new Error("Comment Id is missing or invalid");
      }
    } catch (error) {
      console.log("error :" + error);
      c.status(500); 
      return c.json({ error: "An error occurred while posting the comment." + error  });
    }
});



//  _______________________________LIKES_________________________________________

blogRoute.post('/likes/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

   const postId = parseInt(c.req.param("id")); 
    const {userId }=  await c.req.json(); 
  console.log(userId + "  " + postId)
  try {

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });

    if (existingLike) {
       c.status(201)
       return c.json({
        success: true,
        error: 'You have already liked this post.',
      });
    } else {
      // Create a new like entry
      const newLike = await prisma.like.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });
     

      c.status(200)
      return c.json({
        success: true,
        message: 'Like added successfully.',
        data: newLike,
       
      });
    }
  } catch (error) {
    console.error('Error adding like:', error);
   c.status(500)
  return  c.json({
      success: false,
      error: 'An error occurred while adding like. ' + error,
    });
  }
});


blogRoute.get('/getLikes/:id',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const postId = parseInt(c.req.param("id")); 
  try{
    

    const likeCount = await prisma.like.count({
     where: {
       postId: postId,
     }, 
   });

  
   c.status(201)
   return c.json({
     message:"successfully reterive likes for "+postId,
     success:false,
     Liked:true,
     LikeCount:likeCount

  })}
  catch(e)
  {
    console.log("erroe while getting likes " + e)
    c.status(401)
    return c.json({
      message:"error While getting likes for "+postId,
      success:false
    })
  }

})

blogRoute.post('/likes/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

   const postId = parseInt(c.req.param("id")); 
    const {userId }=  await c.req.json(); 
  console.log(userId + "  " + postId)
  try {

   

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });

    if (existingLike) {

       c.status(401)
       return c.json({
        success: false,
        error: 'You have already liked this post.',
      });
    } else {
      // Create a new like entry
      const newLike = await prisma.like.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });

      const likeCount = await prisma.like.count({
        where: {
          postId: postId,
        },
      });

      console.log("likedCount" + likeCount)

      c.status(200)
      return c.json({
        success: true,
        Liked:true,
        LikeCount:likeCount,
        message: 'Like added successfully.',
        data: newLike,
       
      });
    }
  } catch (error) {
    console.error('Error adding like:', error);
   c.status(500)
  return  c.json({
      success: false,
      error: 'An error occurred while adding like. ' + error,
    });
  }
});


blogRoute.put('/likes/:id', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
     const postId = parseInt(c.req.param("id")); 
    const { userId } = await c.req.json();

   
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });


    if (existingLike) {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId: postId,
            userId: userId,
          },
        },
      });

      

      c.status(200); // OK
      return c.json({
        success: false,
        Liked:false,
        message: 'Post disliked.',
      });
    } else {
      c.status(200); // Not Found
      return c.json({
        success: false,
  
        Liked:false,
        error: 'Like not found. Cannot delete.',
      });
    }
  } catch (error) {
    console.error('Error adding or removing like:', error);
    c.status(500);
    return c.json({
      success: false,
      error: 'An error occurred while adding or removing like.',
    });
  }
});


//------------------------------------------------------------------------------------------

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
    finally {
      await prisma.$disconnect(); // Disconnect Prisma client after the operation
    }

    
  })
  

  blogRoute.post('/PostAbout/:id',async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())   // this creates a prisma client to perform queries

 
     

      const {About}= await c.req.json();
      const id = c.req.param("id");
      console.log(id);
      try{
      
        const UserExist =  await prisma.user.findUnique({
          where:{
            id:id
          }
        });

        console.log(UserExist)
        if(!UserExist)
        {
          c.status(400);
          return  c.json({
              message:"User Does not Exist",
              
          })
           
        }
        else
        {
          const about = await prisma.user.update({
            where:{ id:id },
            data:{About:About }
          })
          console.log(about)
          c.status(200);
          
        return  c.json({
            message:"About Section Updated Successfully"
          })

        }
      

      }
      catch(e)
      {
        c.status(400);
        return    c.json({
              message:" Unable to update About",
  
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
