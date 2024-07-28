import express from "express";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());


app.get('/users', async (req, res) => {
     
    let users = [];

    if(req.query){
        
        users = await prisma.user.findMany({ 
            where:
        {
            id: req.query.id,
            email: req.query.email,
            name: req.query.name,
            age: req.query.age
        }
         });

    }
    else{
        users = await prisma.user.findMany();
    }
    res.json(users).sendStatus(200);

})

app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          age: req.body.age
        } 
     })
    res.sendStatus(201);
})

app.put('/users/:id', async (req, res) => {
    await prisma.user.update({
        where: { 
            id: req.params.id
         },
        data: {
          email: req.body.email,
          name: req.body.name,
          age: req.body.age
        } 
     })
    res.sendStatus(202);
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: { 
            id: req.params.id
         }
     })
    res.sendStatus(203);
})




app.listen(3000)
