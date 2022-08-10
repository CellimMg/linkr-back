import connection from '../dbStrategy/postgres.js'

export  async function listPosts(req,res){
    try{
        const search = req.query.value
        const {rows:data} = await connection.query(`SELECT * FROM users WHERE users.name LIKE '${search}%' `)

        res.send(data)

    }catch(error){        
        console.log(error);
        res.sendStatus(500);
          
    }
}