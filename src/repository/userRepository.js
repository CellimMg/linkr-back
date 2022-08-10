import connection from "../dbStrategy/postgres.js";

async function searchUsers(search){
   return await connection.query(`SELECT * FROM users WHERE users.name ILIKE '${search}%' `)
}
async function userPost(userId){
    const {rows:userData} = await connection.query(`SELECT name,picture_url FROM users WHERE id = $1`,[userId])
    const {rows:posts} = await connection.query(`SELECT * FROM posts
    WHERE posts.user_id = $1`,[userId])
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