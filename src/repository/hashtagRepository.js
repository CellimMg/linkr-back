import connection from "../dbStrategy/postgres.js";

async function getPostsByHashtag(hashtag) {
    return connection.query(`SELECT 
    posts.id AS id, 
    posts.user_id AS "userId", 
    users.name AS "username", 
    users.picture_url AS "userImage", 
    posts.link_url AS "link", 
    posts.description AS "description" 
    FROM posts
    JOIN "hashtags-posts" ON posts.id = "hashtags-posts".post_id
	JOIN hashtags ON "hashtags-posts".hashtag_id = hashtags.id
    JOIN users ON posts.user_id = users.id
    WHERE hashtags.hashtag = $1`, [hashtag]);
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