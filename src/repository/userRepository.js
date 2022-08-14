import connection from "../dbStrategy/postgres.js";

async function searchUsers(search){
   return await connection.query(`SELECT * FROM users WHERE users.name ILIKE '${search}%' `)
}
async function userPost(userId){
    let quantyLikes = 0
    const {rows:userData} = await connection.query(`SELECT name,picture_url FROM users WHERE id = $1`,[userId])
    if(userData.length === 0){
        return (404)
    }
    const {rows:likes} = await connection.query(`SELECT COUNT(*) FROM likes WHERE ${userId}= likes.user_id GROUP BY likes.id`)
    if(likes.length >= 1){
        quantyLikes = likes[0].count
    }
    const {rows:posts} = await connection.query(`
    SELECT posts.id AS "postId", posts.link_url AS link, posts.description, $1 AS likes
    FROM posts 
    WHERE posts.user_id = $2
    `,[quantyLikes,userId])
    
    const data = {
        name:userData[0].name,
        picture:userData[0].picture_url,
        posts
    }
    return({...data})
}

export const userRepository = {
    searchUsers,
    userPost
}