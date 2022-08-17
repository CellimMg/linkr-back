import connection from '../dbStrategy/postgres.js'

export async function listComments(req,res){
    try{
        res.send('list comentarios')

    }catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
}

export async function comment(req,res){
    try{
        const {userId,postId,text} = req.body
        await connection.query(`INSERT INTO comments("author_id","post_id","text") VALUES($1,$2,$3)`,[userId,postId,text])
        res.send('list comentarios')

    }catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
}