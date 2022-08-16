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

export async function read(userData) {
    try {
        const { email } = userData;
        const { rows } = await connection.query(`SELECT * FROM "users" WHERE "users".email = $1`, [email]);
        return rows;
    } catch (error) {
        console.log(error);
        throw "UNEXPECTED_ERROR";
    }
}