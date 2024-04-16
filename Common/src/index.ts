import z from "zod"



// zod infer for common module to 
// share same logic between 
// frontend and backend

export const signUpInput = z.object({
    firstName: z.string().min(3),
    lastName:z.string().min(3).optional(),
    email:z.string().email(),
    password:z.string().min(6)


})

export const signInInput = z.object({
    email:z.string().email(),
    password:z.string().min(6)


})

export const  createBlogInput = z.object({
    title:z.string(),
    content:z.string(),

})

export const updateBlogInput = z.object({
    title:z.string().min(1),
    content:z.string(),
    id:z.number()


})


export  type UpdateBlogInput =z.infer<typeof updateBlogInput>
export  type CreateBlogInput =z.infer<typeof createBlogInput>
export  type SignupignUpInput =z.infer<typeof signUpInput>
export  type SignInInput =z.infer<typeof signInInput>



