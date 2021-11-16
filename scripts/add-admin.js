if (process.argv.length < 3) {
    console.log('Specify admin\'s email');
}

const admin = require('firebase-admin');

const email = process.argv[2];

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const addAdminRole = async (email) => {
    const user = await admin.auth().getUserByEmail(email);

    if (user.customClaims && user.customClaims.admin === true) {
        return console.log(`User (${email}) is an admin already`);
    }

    await admin.auth().setCustomUserClaims(user.uid, {
        admin: true
    });

    console.log(`Credentials successfully added for ${email}`);
}

addAdminRole(email)
    .then(() => {
        process.exit(0);
    })
    .catch(e => {
        console.error(e);
    })
