const prisma = require("../prisma")
const bcrypt = require("bcrypt")

const seed = async () => {

    const createItems = async() => {
        const items = [
            {name: "Vase"},
            {name: "Flowers"},
            {name: "Footballs"},
            {name: "Baseball Bats"},
            {name: "Basketball Shoes"},
        ];

        await prisma.item.createMany({
            data: items
        });
    };

    const createUsers = async() => {
        const users = [
            {name: "Sravan", username: "TheAltruist", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1)},
            {name: "Andrew", username: "Andy", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1)},
            {name: "Tyler", username: "Ty", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1)},
            {name: "Noah", username: "Noad", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1)},
            {name: "Julian", username: "J", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1)}
        ];

        await prisma.user.createMany({
            data: users
        });
    };

    const createReviews = async() => {
        const reviews = [
            {
                text:"I love Vase!", 
                rating:3.1, 
                item_id:1, 
                user_id:1
            },
            {
                text:"I love Flowers!", 
                rating:4.5, 
                item_id:2, 
                user_id:2
            },
            {
                text:"I love Football!", 
                rating:2.6, 
                item_id:3, 
                user_id:3
            },
            {
                text:"I love Baseball!", 
                rating:5.0, 
                item_id:4, 
                user_id:4
            },
            {
                text:"I love Basketball!", 
                rating:1.5, 
                item_id:5, 
                user_id:5
            },
        ];

        await prisma.review.createMany({
            data: reviews
        });
    };

    const createComments = async() => {
        const comments = [
            {text:"Vase FTW!!", item_id:1, user_id:5, review_id:1},
            {text:"Flowers FTW!!", item_id:2, user_id:4, review_id:2},
            {text:"Football FTW!!", item_id:3, user_id:3, review_id:3},
            {text:"Baseball FTW!!", item_id:4, user_id:2, review_id:4},
            {text:"Basketball FTW!!", item_id:5, user_id:1, review_id:5},
        ];

        await prisma.comment.createMany({
            data: comments
        });
    };

    await createUsers();
    await createItems();
    await createReviews();
    await createComments();
};
seed()
    .then(async() => await prisma.$disconnect())
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });