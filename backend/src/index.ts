import { Hono } from 'hono'
//Prisma Imports
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
// JWT Auths
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

const jwtpassword = 123456;
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>();
app.use('/*', cors())
// Middleware 
app.use('/api/v1/blog/*',async(c,next)=>{
    const header_auth = c.req.header('Authorization');
    // @ts-ignore
    const payload = await verify(header_auth,c.env.JWT_SECRET);
    if(!payload)
    {
        c.status(403)
        return c.json({msg:"UnAuthorized!"});
    }
    c.set("jwtPayload",payload.id);
    await next()
});
//Test Route
app.get('/',(c)=>{return c.text("Test!")});
// Signup Route
app.post('/api/v1/user/signup',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
   }).$extends(withAccelerate())
   
   const body = await c.req.json();
   const user_check = await prisma.user.findUnique({
    where: {email: body.email}
   });
   if(user_check)
   {
      return c.json({msg:"User Exists!"});
   }
   const user = await prisma.user.create({
     data: {
       email: body.email,
       password: body.password,
     },
   })
   // @ts-ignore
   const token = await sign({user: user.id},c.env.JWT_SECRET);
   return c.json({AuthToken: token});
});
// SignIn Route
app.post('/api/v1/user/signin',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
   }).$extends(withAccelerate());
   const body = await c.req.json();
   const user_check = await prisma.user.findUnique({ where: {email: body.email}});
   if(!user_check)
   {
      alert("User Not Found!");
      return c.json({msg:"User Dosen't Exist Please Sign-up"});
   }
   else {
      //@ts-ignore
      const token = await sign({user: user_check.id},c.env.JWT_SECRET);
      return c.json({AuthToken: token});
   }
});

app.post('/api/v1/blog',(c)=>{
  return c.text("hello");
});

app.put('/api/v1/blog',(c)=>{
  return c.text("hello");
});

/*app.get('/api/v1/blog/:id', (c) => {
  return c.json({Blogs: Blogss});
});*/

app.get('/api/v1/blog/bulk',(c)=>{
    return c.json({Blog: {
      id:1,
      authorId: 11,
      content: "this is my first blog",
      title: "my first blog",
      published: false
  }});
});

export default app
