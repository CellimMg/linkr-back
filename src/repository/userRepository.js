import connection from "../dbStrategy/postgres.js";

async function searchUsers(search){
   return await connection.query(`SELECT * FROM users WHERE users.name ILIKE '${search}%' `)
}
async function userPost(userId){
    const {rows:userData} = await connection.query(`
    SELECT users.name, users.picture_url, array_agg(follows.follower_id) AS followers FROM users 
    LEFT JOIN follows ON follows.followed_id = users.id 
    WHERE users.id = $1
    GROUP BY users.id`,[userId])
    if(userData.length === 0){
        return (404)
    }
    const {rows:posts} = await connection.query(`
    SELECT posts.id AS "postId", posts.link_url AS link, posts.description, COUNT(likes) AS likes,url_title As "urlTitle", url_image AS "urlImage", url_description AS "urlDescription",
    (SELECT array_agg(json_build_object('name',users.name,'id',users.id)) FROM likes JOIN users ON likes.user_id = users.id WHERE likes.post_id = posts.id) AS "whoLikes",
    
    (SELECT array_agg(json_build_object('author',users.name,'userId',users.id,'text', comments.text, 'user_picture',users.picture_url)) FROM comments JOIN users ON comments.author_id = users.id WHERE comments.post_id = posts.id ) AS "whoComments"
    FROM posts 
    LEFT JOIN likes ON likes.post_id = posts.id
    
    WHERE posts.user_id = $1
    
    GROUP BY posts.id
    `,[userId])  
    
    const data = {
        name:userData[0].name,
        picture:userData[0].picture_url,
        followers:userData[0].followers,
        posts
    }
    return({...data})
}

export const userRepository = {
    searchUsers,
    userPost
}