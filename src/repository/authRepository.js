import connection from "../dbStrategy/postgres.js"

export async function create(userData) {
    try {
        const { name, email, password, pictureUrl } = userData;

        await connection.query(`
            INSERT INTO "users" ("name", "email", "password", "picture_url") VALUES 
            ($1, $2, $3, $4)
        `, [name, email, password, pictureUrl]);
    } catch (error) {
        if (error.detail && error.detail.includes("already exists.")) throw "EMAIL_EXISTS";
        throw "UNEXPECTED_ERROR";
    }
}