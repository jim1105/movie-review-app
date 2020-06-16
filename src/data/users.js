export const NOVICE = {
    username: "newuser",
    password: "newuser",
    firstname: "Novice",
    lastname: "User",
    onboardingComplete:false,
    hasUsedFilter: false,
    checkoutList: {
        allIds: [],
        byIds: {}
    }
}

export const EXPERT = {
    username: "expert",
    password: "expert",
    firstname: "Expert",
    lastname: "User",
    onboardingComplete: true,
    hasUsedFilter: true,
    checkoutList: {
        allIds: [1, 10],
        byIds: {         
                1:{
                    title: "Guardians of the Galaxy Vol. 2",
                    year:'2017',
                    genre: ["Action", "Adventure", "Comedy", "Sci-Fi"],
                    director: "James Gunn",
                    rating:7.6,
                    review:[{author:'dora', message:'good movie', date:'2019/09/03'}]
                },
                10:{
                    title: "Avengers: Endgame",
                    year: "2019",
                    genre: ["Action", "Adventure", "Drama", "Sci-Fi"],
                    director: "Anthony Russo, Joe Russo",
                    rating:8.4,
                    review:[]
                },
       }
    }
}

export const accounts = {
    1: NOVICE,
    2: EXPERT
}