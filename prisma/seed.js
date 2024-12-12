const prisma = require("../prisma")
const bcrypt = require("bcrypt")

const seed = async () => {

    const createdUsers = await prisma.user.createManyAndReturn({
        data: [
            {name: "Sravan Taraknath", username: "TheAltruist", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1), email: "sravan.taraknath@example.com"},
            {name: "Andrew Yang", username: "Andy", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1), email: "andrew.yang@example.com"},
            {name: "Tyler Bos", username: "Ty", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1), email: "tyler.bos@example.com"},
            {name: "Noah Acierto", username: "Noad", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1), email: "noah.acierto@example.com"},
            {name: "Julian Bias", username: "J", password: bcrypt.hashSync("password", Math.floor(Math.random() * 10) + 1), email: "julian.bias@example.com"}
        ],
        select: {
            id: true
        }
    });

    const createdItems = await prisma.item.createManyAndReturn({
        data: [
            {
                name: "Essence Mascara Lash Princess",
                description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
                category: "beauty",
                price: 9.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
            },
            {
                name: "Eyeshadow Palette with Mirror",
                description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
                category: "beauty",
                price: 19.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png"
            },
            {
                name: "Powder Canister",
                description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
                category: "beauty",
                price: 14.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png"
            },
            {
                name: "Red Lipstick",
                description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
                category: "beauty",
                price: 12.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png"
            },
            {
                name: "Red Nail Polish",
                description: "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
                category: "beauty",
                price: 8.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png"
            },
            {
                name: "Calvin Klein CK One",
                description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
                category: "fragrances",
                price: 49.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png"
            },
            {
                name: "Chanel Coco Noir Eau De",
                description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
                category: "fragrances",
                price: 129.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png"
            },
            {
                name: "Dior J'adore",
                description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
                category: "fragrances",
                price: 89.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/1.png"
            },
            {
                name: "Dolce Shine Eau de",
                description: "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
                category: "fragrances",
                price: 69.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png"
            },
            {
                name: "Gucci Bloom Eau de",
                description: "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
                category: "fragrances",
                price: 79.99,
                imageUrl:"https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png"
            }
        ],
        select: {
            id: true
        }
    });

    let countOfUsers = createdUsers.length;
    let countOfItems = 0

    const createdReviews = await prisma.review.createManyAndReturn({
        data: [
            {
                rating: 2,
                text: "Very unhappy with my purchase!",
                created_at: new Date(),
                item_id: createdItems[0].id,
                user_id: createdUsers[4].id
            },
            {
                rating: 2,
                text: "Not as described!",
                created_at: new Date(),
                item_id: createdItems[1].id,
                user_id: createdUsers[3].id
            },
            {
                rating: 5,
                text: "Very satisfied!",
                created_at: new Date(),
                item_id: createdItems[2].id,
                user_id: createdUsers[2].id
            },
            {
                rating: 4,
                text: "Very satisfied!",
                created_at: new Date(),
                item_id: createdItems[3].id,
                user_id: createdUsers[1].id
            },
            {
                rating: 1,
                text: "Very disappointed!",
                created_at: new Date(),
                item_id: createdItems[4].id,
                user_id: createdUsers[0].id
            },
            {
                rating: 5,
                text: "Highly impressed!",
                created_at: new Date(),
                item_id: createdItems[5].id,
                user_id: createdUsers[0].id
            },
            {
                rating: 5,
                text: "Very happy with my purchase!",
                created_at: new Date(),
                item_id: createdItems[6].id,
                user_id: createdUsers[1].id
            },
            {
                rating: 4,
                text: "Great value for money!",
                created_at: new Date(),
                item_id: createdItems[7].id,
                user_id: createdUsers[2].id
            },
            {
                rating: 5,
                text: "Highly impressed!",
                created_at: new Date(),
                item_id: createdItems[8].id,
                user_id: createdUsers[3].id
            },
            {
                rating: 5,
                text: "Great product!",
                created_at: new Date(),
                item_id: createdItems[9].id,
                user_id: createdUsers[0].id
            },
            {
                rating: 4,
                text: "Very pleased!",
                created_at: new Date(),
                item_id: createdItems[9].id,
                user_id: createdUsers[3].id
            },
            {
                rating: 5,
                text: "Very pleased!",
                created_at: new Date(),
                item_id: createdItems[8].id,
                user_id: createdUsers[2].id
            },
            {
                rating: 5,
                text: "Very pleased!",
                created_at: new Date(),
                item_id: createdItems[7].id,
                user_id: createdUsers[1].id
            },
            {
                rating: 5,
                text: "Great product!",
                created_at: new Date(),
                item_id: createdItems[6].id,
                user_id: createdUsers[0].id
            },
            {
                rating: 4,
                text: "Highly recommended!",
                created_at: new Date(),
                item_id: createdItems[5].id,
                user_id: createdUsers[4].id
            },
            {
                rating: 5,
                text: "Great value for money!",
                created_at: new Date(),
                item_id: createdItems[4].id,
                user_id: createdUsers[1].id
            },
            {
                rating: 3,
                text: "Very disappointed!",
                created_at: new Date(),
                item_id: createdItems[3].id,
                user_id: createdUsers[2].id
            },
            {
                rating: 1,
                text: "Poor quality!",
                created_at: new Date(),
                item_id: createdItems[2].id,
                user_id: createdUsers[3].id
            },
            {
                rating: 1,
                text: "Disappointing product!",
                created_at: new Date(),
                item_id: createdItems[1].id,
                user_id: createdUsers[4].id
            },
            {
                rating: 4,
                text: "Great product!",
                created_at: new Date(),
                item_id: createdItems[0].id,
                user_id: createdUsers[2].id
            },
            {
                rating: 4,
                text: "Excellent quality!",
                created_at: new Date(),
                item_id: createdItems[0].id,
                user_id: createdUsers[3].id
            },
            {
                rating: 5,
                text: "Fast shipping!",
                created_at: new Date(),
                item_id: createdItems[1].id,
                user_id: createdUsers[2].id
            },
            {
                rating: 4,
                text: "Excellent quality!",
                created_at: new Date(),
                item_id: createdItems[2].id,
                user_id: createdUsers[1].id
            },
            {
                rating: 4,
                text: "Would buy again!",
                created_at: new Date(),
                item_id: createdItems[3].id,
                user_id: createdUsers[0].id
            },
            {
                rating: 4,
                text: "Very satisfied!",
                created_at: new Date(),
                item_id: createdItems[4].id,
                user_id: createdUsers[4].id
            },
            {
                rating: 1,
                text: "Poor quality!",
                created_at: new Date(),
                item_id: createdItems[5].id,
                user_id: createdUsers[1].id
            },
            {
                rating: 5,
                text: "Very happy with my purchase!",
                created_at: new Date(),
                item_id: createdItems[6].id,
                user_id: createdUsers[2].id
            },
            {
                rating: 5,
                text: "Great value for money!",
                created_at: new Date(),
                item_id: createdItems[7].id,
                user_id: createdUsers[3].id
            },
            {
                rating: 4,
                text: "Excellent quality!",
                created_at: new Date(),
                item_id: createdItems[8].id,
                user_id: createdUsers[4].id
            },
            {
                rating: 4,
                text: "Fast shipping!",
                created_at: new Date(),
                item_id: createdItems[9].id,
                user_id: createdUsers[4].id
            }
        ],
        select: {
            id: true
        }
    });

    let countOfReviews = createdReviews.length

    const createComments = await prisma.comment.createManyAndReturn({
        data: [
            {
                text:"I agree with this review",
                review_id: createdReviews[--countOfReviews].id,
                item_id: createdItems[0].id,
                user_id: createdUsers[0].id
            },
            {
                text:"I disagree",
                review_id: createdReviews[--countOfReviews].id,
                item_id: createdItems[1].id,
                user_id: createdUsers[1].id
            },
            {
                text:"It seems slightly expensive",
                review_id: createdReviews[--countOfReviews].id,
                item_id: createdItems[2].id,
                user_id: createdUsers[2].id
            },
            {
                text:"Yes, me too!",
                review_id: createdReviews[--countOfReviews].id,
                item_id: createdItems[3].id,
                user_id: createdUsers[3].id
            },
            {
                text:"Mine lasted for over a year.",
                review_id: createdReviews[--countOfReviews].id,
                item_id: createdItems[4].id,
                user_id: createdUsers[4].id
            },
        ]
    });

    // await createdUsers();
    // await createdItems();
    // // await createReviews();
    // // await createComments();
};
seed()
    .then(async() => await prisma.$disconnect())
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });