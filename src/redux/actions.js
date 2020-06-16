import firebase from '../fbConfig';
import { sendMessage, joinTheRoom, updateTheCustomers, leaveTheRoom} from "../client";
import { NEW_MESSAGE, TOGGLE_ROOM, NEW_CUSTOMER, TOGGLE_SUPPORT, UPDATE_CUSTOMER, INCREMENT_COUNTS,SET_MOVIE_FILTER,POPULATE_MOVIES, SET_GENRE, TOGGLE_BOX, RESET_CHECKBOX, TOGGLE_CLICK, SET_CLICK, RESET_CLICK, LOGIN, LOGOUT, SIGNUP, ATTEMPT_LOGIN, INVALID_LOGIN, LOGIN_ERROR, SUCCESSFUL_LOGIN, STORE_REVIEWS, ADD_MOVIE_TO_USER, COMPLETE_ONBOARDING, FILTER_USED, TOGGLE_BOARDING, POPULATE_USER_MOVIES, ONBOARD, FETCH_FAIL, IS_FETCHING, TOGGLE_FETCH, RESET_FETCH, TOGGLE_FETCHPOST, TOGGLE_SIGNUP_FLAG, SET_SIGNUP_FLAG, RESET_SIGNUP_FLAG, SUCCESSFUL_SIGNUP, INVALID_SIGNUP} from "./actionTypeConstants";
import { INVALID } from '../constants';


//actions for live chat feature
export const sendToServer = (message, name) => {
    return dispatch => {
        sendMessage(message, name, result=> {
            console.log(result);
            dispatch(newMessage(result));
        });
    }
}

export const joinRoom = (rm, name) => {
    return dispatch => {
        console.log("testing join room")
        joinTheRoom(rm, name, result=>{
            dispatch(toggleRoom(result.flag))
            dispatch(newCustomer(result.customers))
            dispatch(toggleSupport(result.showSupport))
        });
    }
}

export const leaveRoom = (rm, name) => {
    return dispatch => {
        console.log("testing leave room")
        leaveTheRoom(rm, name, result=>{
            dispatch(toggleRoom(result.flag))
            dispatch(newCustomer(result.customers))
            dispatch(toggleSupport(result.showSupport))
        });
    }
}

export const updateCustomers = (dumy) => {
    return dispatch => {
        console.log("testing update customers")
        updateTheCustomers(dumy,result=>{
            dispatch(updateCustomer(result))
        });
    }
}

export const newMessage = messages => ({
    type: NEW_MESSAGE,
    payload: {
        messages
    }
})

export const toggleRoom = showRoom => ({
    type: TOGGLE_ROOM,
    payload:{
        showRoom
    }
})

export const toggleSupport = showSupport => ({
    type: TOGGLE_SUPPORT,
    payload:{
        showSupport
    }
})

export const newCustomer = customers => ({
    type: NEW_CUSTOMER,
    payload: {
        customers
    }
})

export const updateCustomer = customers => ({
    type: UPDATE_CUSTOMER,
    payload: {
        customers
    }
})

//actions for movie search and filter
export const incrementCounts= (id) => ({
    type: INCREMENT_COUNTS,
    payload: {id}
  });
export const setMovieFilter = filter => ({ type: SET_MOVIE_FILTER, payload: { filter } });
export const populateMovies = (movies) => (
    {
      type:POPULATE_MOVIES,
      payload: {
        movies: movies
      }
    }
  )
export const setGenre = genre => ({ type: SET_GENRE, payload:{GENRES:genre}});
export const toggleBox = num => ({
    type: TOGGLE_BOX,
    payload: { num}
});
export const resetCheckbox = () => ({type: RESET_CHECKBOX});
export const toggleClick =()  => ({type: TOGGLE_CLICK});
export const setClick = click => ({ type: SET_CLICK, payload: { click } });
export const resetClick = click => ({ type: RESET_CLICK, payload: { click } });

export const toggleSignupFlag =()  => ({type: TOGGLE_SIGNUP_FLAG});
export const setSignupFlag = click => ({ type: SET_SIGNUP_FLAG, payload: { click } });
export const resetSignupFlag = click => ({ type: RESET_SIGNUP_FLAG, payload: { click } });

export const login = (userInfo) => ({
    type: LOGIN,
    payload: userInfo
})

export const logout = () => ({
    type: LOGOUT
})

export const attemptLogin = () => ({
    type: ATTEMPT_LOGIN
})

export const invalidLogin = () => ({
    type: INVALID_LOGIN
})

export const loginError = () => ({
    type: LOGIN_ERROR
})

export const successfulLogin = () => ({
    type: SUCCESSFUL_LOGIN
})

export const validateLogin = (username, password) => {
    return dispatch => {
        dispatch(fetchStarted());
        setTimeout(()=>{
            dispatch(attemptLogin());
            const database = firebase.firestore();
            database.collection("users")
            .where("username", "==", username)
            .where("password", "==", password)
            .get()
            .then((queryStapshot) => {
                if (queryStapshot.size === 1) {
                    const doc = queryStapshot.docs[0];
                    const user = {
                        currentUser: doc.id,
                        name: doc.data().name,
                        username: doc.data().username,
                        onboardingComplete: true,
                        movies: doc.data().movies,
                        onboardingComplete: doc.data().onboardingComplete,
                    }
                    dispatch(successfulLogin());
                    dispatch(login(user));
                    dispatch(toggleFetch());
                }
                else {
                    console.log("Invalid login")
                    dispatch(invalidLogin());
                    dispatch(toggleFetch());
                }
            })
            .catch(error => {
                console.log("Login error")
                dispatch(loginError());
            });
        }
        ,1000)
    }
}

export const invalidSignup = () => ({
    type: INVALID_SIGNUP
})

export const successfulSignup = () => ({
    type: SUCCESSFUL_SIGNUP
})

export const attemptSignup = (name, username, password) => {
    return dispatch => {
        var taken = false
        const database = firebase.firestore();
        database.collection("users")
        .get()
        .then((queryStapshot) => {
            queryStapshot.forEach(doc => {
                if(doc.data().username === username){
                    dispatch(invalidSignup())
                    taken = true
                }
            })
            if(taken === false){
                console.log("did it get HERE")
                dispatch(addUser(name, username, password))
            }
            
        })
        .catch(error => {
            console.log("Signup error")
        });
    }
}

export const addUser = (name, username, password) => {
    return dispatch => {
        dispatch(fetchStarted());
        setTimeout(()=>{
            const database = firebase.firestore();
            database.collection("users")
            .add({
                name: name,
                username: username,
                password: password,
                onboardingComplete: false,
                movies: []
            })
            .then(doc => {
                let id = doc.id
                dispatch(signup());
                dispatch(toggleFetch());
                dispatch(toggleSignupFlag());
            })
            dispatch(signup());
            dispatch(validateLogin(username, password));
            dispatch(toggleFetch());

        }, 1000)
    }
}

export const signup = () => ({
    type: SIGNUP
})

export const onboard = () => ({
    type: ONBOARD
});

export const getReviews = () => {
    return dispatch => {
            dispatch(fetchStarted());
            setTimeout(()=>{
                console.log("get the reviews");
                const database = firebase.firestore();
                database.collection("reviews")
                //.where("movie", "==", movie)
                .get()
                .then((queryStapshot) => {
                    if (queryStapshot.size > 0) {
                        const reviews = {};
                        queryStapshot.forEach(doc => {
                            reviews[doc.id] = {
                                movie: doc.data().movie,
                                title: doc.data().title,
                                review: doc.data().review,
                                author: doc.data().author,
                                year: doc.data().date,
                                //countdown: doc.data().countdown
                            }
                        console.log(doc.id)
                        })
                        dispatch(storeReviews(reviews));
                        dispatch(toggleFetch());
                    }
                    else {
                        console.log("No reviews")
                        dispatch(toggleFetch());
                    }
                })
                .catch(error => {
                    console.log("Error getting reviews")
                })
            }, 1000)
    }
};

export const storeReviews = reviews => ({
    type: STORE_REVIEWS,
    payload: {
        reviews: reviews
    }
})

export const addReview = (movie, title, author, year, review) => {
    return dispatch => {
            const database = firebase.firestore();
            database.collection("reviews")
            .add({
                movie: movie,
                title: title,
                author: author,
                year: year,
                review: review,
                //countdown: countdown
            })
            .then(doc => {
                let id = doc.id
            })
            dispatch(getReviews());
    }
}

export const addToWatchlist = (currentUser, movie) => {
    return dispatch => {
        dispatch(fetchStarted());
        setTimeout(()=>{
            const database = firebase.firestore();
            database.collection("users").doc(currentUser)
                .update({
                    movies: firebase.firestore.FieldValue.arrayUnion(movie)
                })
                .then(() => {
                    dispatch(addMovieToUser(currentUser, movie))
                    dispatch(onboardingComplete())
                    dispatch(toggleFetch())
                    //dispatch(getWatchlist(currentUser))
                })
                .catch(error => {
                    console.log("Error updating watchlist")
                })
        }, 1000)
             
    }
};

export const addMovieToUser = (currentUser, movie) => ({
    type: ADD_MOVIE_TO_USER,
    payload: {
        currentUser: currentUser,
        movie: movie
    }
})

export const rentWatchlist = (currentUser) => {
    return dispatch => {
        const database = firebase.firestore();
        database.collection("users").doc(currentUser)
            .update({
                movies: []
            })
            .then(() => {
                //dispatch(rentMovies())
                //dispatch(getWatchlist(currentUser))
            })
            .catch(error => {
                console.log("Error renting")
            })
    }
};

export const onboardingCompleteInDatabase = (currentUser) => {
    return dispatch => {
        const database = firebase.firestore();
        database.collection("users").doc(currentUser)
            .update({
                onboardingComplete: true
            })
            .then(() => {
                dispatch(onboardingComplete())
            })
            .catch(error => {
                console.log("Error updating onboarding")
            })
             
    }
};

export const onboardingComplete = () => ({type: COMPLETE_ONBOARDING});
export const filterUsed = () => ({type: FILTER_USED});
export const toggleBoarding = () => ({type: TOGGLE_BOARDING});

export const populateUserMovies = (userMovies) => (
    {
      type:POPULATE_USER_MOVIES,
      payload: {
        userMovies: userMovies
      }
    }
  )

export const fetchFailed = () => ({type: FETCH_FAIL})
export const fetchStarted = () => ({type: IS_FETCHING})
export const toggleFetch = () => ({type: TOGGLE_FETCH})
export const toggleFetchPost = () => ({type: TOGGLE_FETCHPOST})
export const resetFetch = () => ({type: RESET_FETCH})

