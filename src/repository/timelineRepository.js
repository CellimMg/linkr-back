import connection from "../dbStrategy/postgres.js";

const timelineRepository = {
    savePost: async (postData, userId, title, image, urlDescription) => {
        const { rows } = await connection.query(`INSERT INTO posts (user_id, link_url, description, url_title, url_description, url_image) VALUES ($1, $2, $3, $4, $5, $6) returning id`, [userId, postData.link, postData.description, title, urlDescription, image]);

        if(rows.length > 0){
            await connection.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`, [userId, rows[0].id]);
        }
        
    },
    getTimelinePosts: async () => {
        const { rows } = await connection.query(`SELECT users.id AS "userId", users.name AS "username", users.picture_url AS "userImage", 
        posts.id AS "postId", posts.link_url AS "link", posts.description, posts.url_title AS "urlTitle", posts.url_description AS "urlDescription", posts.url_image AS "urlImage",
        likes.count AS "likes" 
        FROM users
        JOIN posts
        ON users.id = posts.user_id
        JOIN likes
        ON posts.id = likes.post_id
        ORDER BY posts.id DESC
        LIMIT 20`);

        return rows;
    },

    deletePost: async (postId) => {
        const { rows } = await connection.query(`SELECT * FROM posts WHERE id = $1 AND user_id = $2 `, [postId, userId]);

        if(rows.length > 0){
            await connection.query(`DELETE FROM posts WHERE id= $1`, [postId]);
        }
        
    }
}

export default timelineRepository;