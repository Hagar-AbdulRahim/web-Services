import { models } from "./db/db.js";
import { sequelize } from "./db/db.js";

async function findAdmin() {
    try {
        await sequelize.authenticate();
        const admin = await models.users.findOne({
            where: { account_type: 'admin' }
        });
        if (admin) {
            console.log("Admin Found:");
            console.log(JSON.stringify(admin, null, 2));
        } else {
            console.log("No Admin found in database.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}

findAdmin();
