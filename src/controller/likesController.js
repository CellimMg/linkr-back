import connection from "../dbStrategy/postgres.js";

export async function postLike(req,res){
    try{
        // body { postId , userId}
        const {userId,postId} = req.body;
    
        await connection.query('INSERT INTO likes("user_id","post_id") VALUES($1,$2)',[userId,postId])
        res.send('like')

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}
export async function getLikes(req,res){
    try{
        const userId = req.params.userId;
        const postId = req.params.postId
    
        const likes = await connection.query(`SELECT * FROM likes WHERE user_id = $1 AND post_id = $2`,[userId,postId])
        if(likes.rowCount === 1){
            return res.send(true)
        }else{
            return res.send(false)
        }
        

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}
export async function unLike(req,res){
    try{
        // body { postId , userId}
        const {userId,postId} = req.body;
        
    
        await connection.query('DELETE FROM likes WHERE user_id = $1 AND post_id = $2',[userId,postId])
        res.send('like')

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}