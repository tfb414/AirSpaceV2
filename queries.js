const host = require('./models/host.js');
const guest = require('./models/guest.js');
const guest_question_response = require('./models/guest_question_response.js');
const host_guest = require('./models/host_guest.js');
const option = require('./models/option.js');
const question = require('./models/question.js');
const sq = require('./models/sq.js');
const sq_question_option = require('./models/sq_question_option.js');


function getAllHosts() {
    return host.findAll();
}

function getHostById(host_id) {
    return host.findById(host_id);
}

function addHost(host_id, email, first_name, last_name) {
    host.create({
        host_id,
        email,
        first_name,
        last_name
    })
}

function addGuest(guest_id, email, first_name, last_name) {
    guest.create({
        guest_id,
        email,
        first_name,
        last_name
    })
}

function addHostGuest(guest_id, host_id) {
    host_guest.create({
        guest_id,
        host_id
    })
}

function addSQ(sq_name) {
    sq.create({
        sq_name
    })
}

function addQuestion(question_text, question_number) {
    question.create({
        question: question_text,
        question_number
    })
}

function addOption(option_text, option_value) {
    option.create({
        option: option_text,
        option_value
    })
}

function addSQQuestionOption(sq_id, question_id, option_id) {
    sq_question_option.create({
        option_id,
        question_id,
        sq_id
    })
}

// function getGuestsForHost(host_id) {
//     host_guest.findAll({
//         include: [{
//             model: 
//         }]
//     })
// }

// function addHostToDatabase(host_id, email, first_name, last_name){
//   return db.one(`
//     insert into host(host_id, email, first_name, last_name)
// 	    values ('${host_id}', '${email}', '${first_name}', '${last_name}')
// 	    returning host_id, email, first_name, last_name;
//     `).then((result) =>{
      
//     //   return result.host_id;
//     //put what we want to have returning here
//   }).catch(console.log);
// }

// function addSQToDatabase(sq_name)
//     return db.one(`
//         insert into sq(sq_name)
//             values ('${sq_name}')
//             returning sq_id, sq_name
//     `).then((result)=>{
//         //put what we want to return here
//     }).catch(console.log);

// function addQuestionToDatabase(question, question_number)
//     return db.one(`
//         insert into question(question, question_number)
//             values ('${question}}', '${question_number}')
//             returning question_id
//         `).then((result)=>{
//             //put what to return here
//         }).catch(console.log);

//         //q_id 5

// function addOptionToDatabase(option, option_value){
//     return db.one(`
//         insert into option(option, option_value)
//             values ('${option}', '${option_value}')
//             returning option, option_value, option_id
//     `).then((result)=> {
//         //put what to return here
//     }).catch(console.log);
// }

// //option_id: 7-11

// function addSQQuestionOptionToDatabase(sq_id, question_id, option_id ){
//     return db.one(`
//         insert into sq_question_option(sq_id, question_id, option_id )
//             values ('${sq_id}', '${question_id}', '${option_id}')
//             returning sq_id
//     `).((result) => {
//         //put what to return here
//     }).catch(console.log);
// }

// function addGuestToDatabase(guest_id, email, first_name, last_name){
//   return db.one(`
//     insert into guest(guest_id, email, first_name, last_name)
// 	    values ('${guest_id}', '${email}', '${first_name}', '${last_name}')
// 	    returning guest_id, email, first_name, last_name;
//     `).then((result) =>{
      
//     //   return result.guest_id;
//     //put what we want to have returning here
//   }).catch(console.log);
// }

// function hostGuestToDatabase(host_id, guest_id){
//     return db.one(`
//         insert into host_guest(host_id, guest_id)
//             values ('${host_id}', '${guest_id}')
//             returning host_id, guest_id
//     `).then((results)=>{
//         //put what we want to return here
//     }).catch(console.log)
// }

// function guestQuestionResponse(guest_id, question_id, response){
//     return db.one(`
//         insert into guest_question_response(guest_id, question_id, response)
//             values ('${guest_id}', '${question_id}', '${response}')
//             returning guest_id, question_id, response

//     `).then((results)=>{
//         //put what we want to return here
//     }).catch(console.log)
// }

// function getSurveyQuestionsOptions(survey_id){
//     return db.one(`
//         select q.question, o.option, q.question_number
//             from sq_question_option sqqo
//             inner join option o
//             on o.option_id = sqqo.option_id
//             inner join question q
//             on q.question_id = sqqo.question_id
//             where sqqo.sq_id = '${sq_id}'
//     `).then((results)=>{
//         //put what you want to return here
//     }).catch(console.log)
// }

// function submitGuestResponse(guest_id, question_id, response){
//     return db.one(`
//         insert into guest_question_response(guest_id, question_id, response)
//             values ('${guest_id}', '${question_id}', '${response}')
//             returning guest_id, question_id, response
//     `).then((results)=>{
//         //put what you want to return here
//     }).catch(console.log);
// }

module.exports = {
    getHostById, 
    addHost, 
    addGuest, 
    addSQ, 
    addQuestion, 
    addOption, 
    addSQQuestionOption
};



