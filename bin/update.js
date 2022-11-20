const database = require('../db');
const models = require('../schemes');
(async () => {
    console.log("Migration...");
    console.log(`Models:`);
    console.log(
        Object
            .keys(models)
    );
    await database.sync();
    console.log("Migration success!!!");
    process.exit(1);
})();