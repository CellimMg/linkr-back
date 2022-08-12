import connection from "../dbStrategy/postgres.js";

async function getPostsByHashtag(hashtag) {
    return connection.query(`SELECT 
    posts.id AS id, 
    posts.user_id, 
    users.name, 
    users.picture_url, 
    posts.link_url AS link, 
    posts.description AS description 
    FROM posts
    JOIN hashtags ON posts.id = hashtags.post_id
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