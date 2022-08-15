import connection from "../dbStrategy/postgres.js";

async function getPostsByHashtag(hashtag) {
    const {rows:userData} = await connection.query(`
    SELECT name, picture_url 
	FROM users 
    JOIN posts ON posts.user_id = users.id
	JOIN "hashtags-posts" ON posts.id = "hashtags-posts".post_id
	JOIN hashtags ON "hashtags-posts".hashtag_id = hashtags.id
    LEFT JOIN likes ON likes.post_id = posts.id
    WHERE hashtags.hashtag = $1
    GROUP BY users.id;`,[hashtag])
    if(userData.length === 0){
        return (404)
    }
    const {rows:posts} = await connection.query(`
    SELECT posts.id AS "postId", posts.link_url AS link, posts.description, COUNT(likes) AS likes
    FROM posts 
	JOIN "hashtags-posts" ON posts.id = "hashtags-posts".post_id
	JOIN hashtags ON "hashtags-posts".hashtag_id = hashtags.id
    LEFT JOIN likes ON likes.post_id = posts.id
    WHERE hashtags.hashtag = $1
    GROUP BY posts.id;
    `,[hashtag]) 
    
    const data = {
        name:userData[0].name,
        picture:userData[0].picture_url,
        posts
    }

    return({...data});
}

async function getTrendingHashtags() {
    return connection.query(`SELECT 
    hashtags.hashtag 
    FROM hashtags
    ORDER BY hashtags.count DESC
    LIMIT 10`)
}


const hashtagRepository = {
    getPostsByHashtag,
    getTrendingHashtags
  };
  
  export default hashtagRepository;