/** SERVER CONFIGURATION */
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path");

// Choose a port, default is 4002 (could be almost anything)
const PORT = process.env.PORT || 4002;

// When on Heroku, serve the UI from the build folder
if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'build')));  
    app.get('*', (req, res) => {    
        res.sendfile(path.join(__dirname = 'build/index.html'));  
    })
}

// When on local host, server from the public folder. 
// Rule will not be written if production conditional has executed
app.get('*', (req, res) => {  
    app.sendFile(path.join(__dirname+'public/index.html'));
})

// Listen for client connections
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

let messages = [];
let customers= [];
let flag =false;
let showSupport = false;
io.on("connection", client => {

    client.on("join room", ({rm, name})=> {
        const room = client.rooms?client.rooms[Object.keys(client.rooms)[0]]:''
        console.log(room)
        client.join(rm);
        client.name = name;
        if(rm === 'live support'){
            client.leave('waiting room')
            console.log('I left waiting room')
        }
        if(rm === 'live support' && name !== "admin"){
            customers.push(name);
            flag = !flag;
            showSupport = !showSupport;
        }
        if(rm === 'live support' && name === "admin"){
            customers.push(name);
            showSupport = !showSupport;
        }

        io.sockets.emit("joined room", {rm, customers, flag, showSupport});
        if(rm === 'live support' && name ==='admin'){
            flag = true;
            showSupport = false;
            io.sockets.in('waiting room').emit("joined room", {rm, customers, flag, showSupport});
        }
     })
     //send messages
     client.emit("notification", "Hello, " + client.id);
        client.on("new message", ({msg, name}) => {
            if(msg !== "!@#"){
                messages.push(name + " says: " + msg);
                io.sockets.in('live support').emit('all messages', messages);
            } 
        })

     client.on("leave room", ({rm, name}) => {
        if(customers.includes(client.name)){
            client.leave('live support')
            client.join('waiting room')
            messages = [];
            flag = false;
            showSupport = false;
            var i = customers.indexOf(client.name);
            customers.splice(i, 1);
            console.log(customers)
            customers = [];
            io.sockets.in('waiting room').emit("left room", {rm, customers, flag, showSupport});
            io.sockets.emit("joined room", {rm, customers, flag, showSupport});
            io.sockets.in('live support').emit('updated customer list', customers)
            io.sockets.emit('all messages', messages);
        }
    })

     client.on('disconnect', ()=> {
        if(customers.includes(client.name)){
            client.leave('live support')
            client.join('waiting room')
            messages = [];
            flag = false;
            showSupport = false;
            rm = 'live support'
            var i = customers.indexOf(client.name);
            customers.splice(i, 1);
            console.log(customers)
            customers = [];
            io.sockets.in('waiting room').emit("left room", {rm, customers, flag, showSupport});
            io.sockets.emit("joined room", {rm, customers, flag, showSupport});
            io.sockets.in('live support').emit('updated customer list', customers)
            io.sockets.emit('all messages', messages);
        }
    });
})