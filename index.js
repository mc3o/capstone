const express = require('express');
const {Client} = require('pg');
const path = require('path');
const bodyParser = require('body-parser')
var app = express();

const connectionString = 'postgres://postgres:sec123@127.0.0.1:5432/school';
const client = new Client({
    connectionString: connectionString
});

client.connect();

const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './views');
app.set('view engine', 'ejs');
// using callback

app.get('/', async (req, res, ) =>{
    const rows = await getAllTeachers()
    // res.setHeader("content-type", "application/json")
    res.render('home', {
        title: 'SM',
        teachers: rows
    })
    
});
async function getAllTeachers() {
    const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'SELECT * FROM teachers'
      }// to avoid sql injection
   try {
       const results =  await client.query(query)        

        return results.rows; // to return all records result.rows
   }
   catch (e) {
       return []
   }
   
}

app.get('/', async (req, res) => {
    let result = {}
    try {
        const {id} = req.body
        await getUserById(id)
        result.success = true
    }
    catch(e){
        result.success = false
    }
})
async function getUserById(id) {
    const query = {
        text: "SELECT * FROM teachers WHERE id = $1",
        values: [id]
    }
    const result = await client.query(query)
    return result.rows[0]
}
async function insertTeacher(id, name, age) {
    const query1 = {
        text: 'INSERT INTO teachers(id, name, age) VALUES($1, $2, $3)',
        values: [id, name, age]
      }
       await client.query(query1)        
       return true    
}
app.post('/add', async (req, res) => {
    let result = {}
   
    try {
        const {id, name, age} = req.body
        await insertTeacher(id, name, age)
        
        res.redirect('/')
           
    }
    catch(e) {
        res.send(e)
        result.success = false
    }
   

})

async function deleteTeacher(id){
    const query = {
        text: "DELETE FROM teachers WHERE id = $1",
        values: [id]
    }
    await client.query(query)
    return true
}
app.delete('/delete/:id', async (req, res) => {
    let result = {}
    try {
        const {id} = req.params
        await deleteTeacher(id)
        res.redirect('/')
    }
    catch(e) {
        res.send(e)
        result.success = false
    }
})

async function updateTeacher(id, name, age) {
    const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'UPDATE teachers SET id =$1, name =$2, age=$3 WHERE id =$1',
        values: [id, name, age]
      }// to avoid sql injection
      await client.query(query)
      return true       
}
app.put('/edit', async (req, res) => {
    try{
        let {id, name, age} = req.body
        await updateTeacher(id, name, age)
        res.redirect('/')
    }
    catch(e){
        res.send(e)
    } 
    
})




app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`)
})


