/** CLIENT CONFIGURATION - connect to the server */
const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
// Localhost port must match server
let host = process.env.NODE_ENV === 'production' ?
    "appname.herokuapp.com" : "localhost:4002"   
let socket = socketIOClient.connect(host, {secure: true});
// Checks which host we're connected to (for troubleshooting);
console.log("connected to " + host);

socket.on("notification", msg => {
    console.log("Server says: " + msg);
})

export const sendMessage = (msg, name, callbackFunc) => {
    socket.emit("new message", {msg, name});
    socket.on("all messages", result => {
        callbackFunc(result);
    })
}

export const joinTheRoom = (rm, name, callbackFunc) => {
    socket.emit("join room", {rm, name});
    socket.on("joined room", result =>{
        callbackFunc(result)
    });
}

export const leaveTheRoom = (rm, name, callbackFunc) => {
    socket.emit("leave room", {rm, name});
    socket.on("left room", result =>{
        callbackFunc(result)
    });
}

export const updateTheCustomers = (dumy, callbackFunc) => {
    socket.emit("update customer list", dumy);
    socket.on("updated customer list", result =>{
        callbackFunc(result)
    });
}