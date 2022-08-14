import connection from "../dbStrategy/postgres.js";

async function searchUsers(search){
   return await connection.query(`SELECT * FROM users WHERE users.name ILIKE '${search}%' `)
}
async function userPost(userId){
    const {rows:userData} = await connection.query(`SELECT name,picture_url FROM users WHERE id = $1`,[userId])
    if(userData.length === 0){
        return (404)
    }
    const {rows:posts} = await connection.query(`
    SELECT posts.id AS "postId", posts.link_url AS link, posts.description, COUNT(likes) AS likes
    FROM posts 
    JOIN likes ON posts.id = likes.post_id 
    WHERE posts.user_id = $1
    GROUP BY posts.id`,[userId])

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