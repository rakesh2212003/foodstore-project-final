const router = require('express').Router()
const admin = require('firebase-admin')
let data = []
const userIds = new Set();

router.get('/', (req, res) => {
    return res.send("Inside the router")
})

router.get('/jwtVerification', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ msg: 'Token Not Found' })
    }
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decodedValue = await admin.auth().verifyIdToken(token)
        if (!decodedValue) {
            return res.status(500).json({ success: false, msg: 'Unauthorized access' })
        }
        return res.status(200).json({ success: true, data: decodedValue })
    } catch (err) {
        return res.status(500).send({ success: false, msg: err.message })
    }
})

// const listAllUsers = (nextPageToken) => {
//     admin.auth()
//         .listUsers(100, nextPageToken)
//         .then((listUsersResult) => {
//             listUsersResult.users.forEach((userRecord) => {
//                 data.push(userRecord.toJSON()) //here
//             });
//             if (listUsersResult.pageToken) {
//                 listAllUsers(listUsersResult.pageToken);
//             }
//         })
//         .catch((error) => {
//             console.log('Error listing users:', error);
//         });
// };

const listAllUsers = (nextPageToken) => {
    admin.auth()
        .listUsers(100, nextPageToken)
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
                const user = userRecord.toJSON();
                if (!userIds.has(user.uid)) {
                    userIds.add(user.uid);
                    data.push(user);
                }
            });
            if (listUsersResult.pageToken) {
                listAllUsers(listUsersResult.pageToken);
            } else {
                console.log('All users have been listed and corrected.');
                // You can process `data` here if needed
            }
        })
        .catch((error) => {
            console.log('Error listing users:', error);
        });
};

// listAllUsers()

router.get('/all', async (req, res) => {
    listAllUsers()
    try {
        return res.status(200).send({ success: true, data: data, dataCount: data.length })
    } catch (err) {
        return res.send({ success: false, msg: `Error in listing users: ${err}` })
    }
})

module.exports = router