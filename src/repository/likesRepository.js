import connection from '../dbStrategy/postgres.js'

async function likePost(userId,postId){
    return await connection.query('INSERT INTO likes("user_id","post_id") VALUES($1,$2)',[userId,postId])
}
async function likes(userId,postId){
    return await connection.query(`
        SELECT *  FROM likes 
        
        WHERE user_id = $1 AND post_id = $2`,
        [userId,postId])
}
async function unlike(userId,postId){
    return await connection.query('DELETE FROM likes WHERE user_id = $1 AND post_id = $2',[userId,postId])
}

async function likesNames(){
   return await connection.query(`
    SELECT likes.*,users.name FROM likes
    JOIN users ON likes.user_id = users.id
    WHERE likes.post_id = ${postId}
    `)
}
export  const likesRepository = {
    likePost,
    likes,
    unlike,
    likesNames
}