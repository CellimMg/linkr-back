import connection from "../dbStrategy/postgres.js";

const timelineRepository = {
    savePost: async (postData, title, image, urlDescription) => {
        const { rows } = await connection.query(`INSERT INTO posts (user_id, link_url, description, url_title, url_description, url_image) VALUES ($1, $2, $3, $4, $5, $6) returning id`, [postData.userId, postData.link, postData.description, title, urlDescription, image]);

        if(rows.length > 0){
            await connection.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`, [postData.userId, rows[0].id]);
        }
        
    },

    saveHashtag: async (string, userId) => {
            const { rows: data, rowCount } = await connection.query(`SELECT * FROM hashtags WHERE hashtag = $1`, [string]);
            if(rowCount > 0) { 
                await connection.query(`UPDATE hashtags SET count = $1 WHERE hashtag = $2`, [data[0].count +1, string]);
                const { rows: post } = await connection.query(`SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC LIMIT 1`, [userId]);
                await connection.query(`INSERT INTO "hashtags-posts" (hashtag_id, post_id) VALUES ($1, $2)`, [data[0].id, post[0].id]);
            } else { 
                await connection.query(`INSERT INTO hashtags (hashtag) VALUES ($1)`, [string]);
                const { rows: newHashtag } = await connection.query(`SELECT * FROM hashtags WHERE hashtag = $1`, [string]);
                const { rows: post } = await connection.query(`SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC LIMIT 1`, [userId]);
                await connection.query(`INSERT INTO "hashtags-posts" (hashtag_id, post_id) VALUES ($1, $2)`, [newHashtag[0].id, post[0].id]);    
            } 
    },

    getTimelinePosts: async () => {
        const { rows } = await connection.query(`SELECT users.id AS "userId", users.name AS "username", users.picture_url AS "userImage", 
        posts.id AS "postId", posts.link_url AS "link", posts.description, posts.url_title AS "urlTitle", posts.url_description AS "urlDescription", posts.url_image AS "urlImage",
        likes.count AS "likes" 
        FROM users
        JOIN posts
        ON users.id = posts.user_id
        LEFT JOIN likes
        ON posts.id = likes.post_id
       GROUP BY users.id,posts.id
        ORDER BY posts.id DESC
        LIMIT 20`);
         
        return rows;
    },

    updatePost: async (postId, postDescription) => {
        const updatedDescription = await connection.query(`UPDATE posts SET description = $1 WHERE id = $2`, [postDescription, postId]);
        console.log(updatedDescription);
        if(updatedDescription.rowCount > 0){
            return 204;
        }else{
            return 404;
        }
    },

    deletePost: async (postId) => {
        const { rows } = await connection.query(`SELECT * FROM posts WHERE id = $1 AND user_id = $2 `, [postId, userId]);

        if(rows.length > 0){
            await connection.query(`DELETE FROM posts WHERE id= $1`, [postId]);
        }
        
    }
} 

export default timelineRepository;