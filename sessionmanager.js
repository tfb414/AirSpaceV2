const express = require('express');
const session = require('express-session');
const passport = require('passport');

const sessionStore = new session.MemoryStore();
const sharedSession = session({
    secret: 'asdfjkl;',
    resave: true,
    saveUninitialized: true,
    cookie: {},
    store: sessionStore,
})
const getUserEmail = (ws, req) => {
   return sharedSession(req, {}, function(){
        req.session.save(function() {
            console.log(req.session.passport.user);
            return req.session.passport.user;
        })
    })
}

module.exports = {
    sessionStore,
    sharedSession,
    getUserEmail
}

// sharedSession(ws.upgradeReq, {}, function(){
//     ws.upgradeReq.session.save(function() {
//         var sess = ws.upgradeReq.session;
//         sessionStore.get(sid,function(err, ss){
//             sessionStore.createSession(ws.upgradeReq, sess);
//             console.log(ws.upgradeReq.session.passport.user);
//         })
//     })
// })