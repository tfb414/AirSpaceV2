const db = require('./sequelize.js');

// function getAllHosts() {
//     return db.host.findAll();
// }

// function getHostById(host_id) {
//     return db.host.findById(host_id);
// }

function upsertHost(host_id, first_name, last_name) {
    db.host.upsert({
        host_id,
        first_name,
        last_name
    }).catch((err) => {
        console.log(err);
    })
}

function upsertGuest(guest_id, first_name, last_name) {
    db.guest.upsert({
        guest_id,
        first_name,
        last_name
    }).catch((err) => {
        console.log(err);
    })
}

function addHostGuest(host_id, guest_id) {
    return db.host_guest.count({ where: { host_id, guest_id } })
    .then(count => {
        if (count === 0) {
            return db.host_guest.create({
                guest_id,
                host_id
            })
        }
        return count;
    }).catch((err) => {
        return err;
    });
}

//check if it's already in the host_guest db
//then add to the host_guest table

// // function findGuestsByHostId() {
// //     db.host_guest.findAll({
// //         attributes: [],
// //         include: [{

// //             model: db.guest,
// //             required: true,
// //             where: {guest_id: Sequelize.col('db.host_guest.guest_id')}
// //         }]
// //     })
// // }

function addSQ(sq_name, host_id, type) {
    return db.sq.create({
        sq_name,
        host_id,
        type
    })
}

function addQuestion(question_text, question_number) {
    return db.question.create({
        question: question_text,
        question_number
    })
}

function addOption(option_text, option_value) {
    return db.option.create({
        option_text,
        option_value
    })
}

function addSQQuestionOption(sq_id, question_id, option_id) {
    db.sq_question_option.create({
        option_id,
        question_id,
        sq_id
    })
}

function getSQResultsHost(sq_id, host_id) {
    return db.sequelize.query(`select distinct g.first_name, g.last_name, g.guest_id, gqr.response, q.question, sq.sq_name, o.option_text, o.option_value
    from guest g
    inner join host_guest hg
    on hg.guest_id = g.guest_id
    inner join sq sq
    on sq.host_id = hg.host_id
    inner join sq_question_option sqqo
    on sqqo.sq_id = sq.sq_id
    inner join question q
    on q.question_id = sqqo.question_id
    left outer join guest_question_response gqr
    on gqr.question_id = q.question_id and gqr.guest_id = hg.guest_id
    inner join options o
    on o.option_id = gqr.option_id
    where sqqo.sq_id='${sq_id}' and hg.host_id='${host_id}';`, { type: db.sequelize.QueryTypes.SELECT});
  
}

// Gets list of all surveys or quizzes for a given host
function getSQList(host_id, sqtype) {
    return db.sq.findAll({
        attributes: ['sq_id', 'sq_name'],
        where: {host_id, type: sqtype},
        raw: true,
    })
}

// Gets survey name, id, questions, question id, options, option id, and option value from database for given sq_id
function getSQ(sq_id) {
    return db.sequelize.query(`select sqqo.sq_id, sq.sq_name, q.question, q.question_number, q.question_id, o.option_text, o.option_id, o.option_value
    from sq_question_option sqqo
    inner join sq sq
    on sq.sq_id = sqqo.sq_id
    inner join question q
    on q.question_id = sqqo.question_id
    full outer join options o
    on o.option_id = sqqo.option_id
    where sqqo.sq_id = '${sq_id}';`, { type: db.sequelize.QueryTypes.SELECT})
}

// // function getGuestsForHost(host_id) {
// //     host_guest.findAll({
// //         include: [{
// //             model: 
// //         }]
// //     })
// // }

// // function addHostToDatabase(host_id, email, first_name, last_name){
// //   return db.one(`
// //     insert into host(host_id, email, first_name, last_name)
// // 	    values ('${host_id}', '${email}', '${first_name}', '${last_name}')
// // 	    returning host_id, email, first_name, last_name;
// //     `).then((result) =>{

// //     //   return result.host_id;
// //     //put what we want to have returning here
// //   }).catch(console.log);
// // }

// // function addSQToDatabase(sq_name)
// //     return db.one(`
// //         insert into sq(sq_name)
// //             values ('${sq_name}')
// //             returning sq_id, sq_name
// //     `).then((result)=>{
// //         //put what we want to return here
// //     }).catch(console.log);

// // function addQuestionToDatabase(question, question_number)
// //     return db.one(`
// //         insert into question(question, question_number)
// //             values ('${question}}', '${question_number}')
// //             returning question_id
// //         `).then((result)=>{
// //             //put what to return here
// //         }).catch(console.log);

// //         //q_id 5

// // function addOptionToDatabase(option, option_value){
// //     return db.one(`
// //         insert into option(option, option_value)
// //             values ('${option}', '${option_value}')
// //             returning option, option_value, option_id
// //     `).then((result)=> {
// //         //put what to return here
// //     }).catch(console.log);
// // }

// // //option_id: 7-11

// // function addSQQuestionOptionToDatabase(sq_id, question_id, option_id ){
// //     return db.one(`
// //         insert into sq_question_option(sq_id, question_id, option_id )
// //             values ('${sq_id}', '${question_id}', '${option_id}')
// //             returning sq_id
// //     `).((result) => {
// //         //put what to return here
// //     }).catch(console.log);
// // }

// // function addGuestToDatabase(guest_id, email, first_name, last_name){
// //   return db.one(`
// //     insert into guest(guest_id, email, first_name, last_name)
// // 	    values ('${guest_id}', '${email}', '${first_name}', '${last_name}')
// // 	    returning guest_id, email, first_name, last_name;
// //     `).then((result) =>{

// //     //   return result.guest_id;
// //     //put what we want to have returning here
// //   }).catch(console.log);
// // }

// // function hostGuestToDatabase(host_id, guest_id){
// //     return db.one(`
// //         insert into host_guest(host_id, guest_id)
// //             values ('${host_id}', '${guest_id}')
// //             returning host_id, guest_id
// //     `).then((results)=>{
// //         //put what we want to return here
// //     }).catch(console.log)
// // }

// // function guestQuestionResponse(guest_id, question_id, response){
// //     return db.one(`
// //         insert into guest_question_response(guest_id, question_id, response)
// //             values ('${guest_id}', '${question_id}', '${response}')
// //             returning guest_id, question_id, response

// //     `).then((results)=>{
// //         //put what we want to return here
// //     }).catch(console.log)
// // } 

// // function submitGuestResponse(guest_id, question_id, response){
// //     return db.one(`
// //         insert into guest_question_response(guest_id, question_id, response)
// //             values ('${guest_id}', '${question_id}', '${response}')
// //             returning guest_id, question_id, response
// //     `).then((results)=>{
// //         //put what you want to return here
// //     }).catch(console.log);
// // }

// module.exports = {
//     getHostById, 
//     addHost, 
//     addGuest, 
//     addSQ, 
//     addQuestion, 
//     addOption, 
//     addSQQuestionOption,
//     addHostGuest,
//     findGuestsByHostId
// };

module.exports = {
    upsertHost,
    upsertGuest,
    addSQ,
    addQuestion,
    addOption,
    addSQQuestionOption,
    addHostGuest, 
    getSQResultsHost,
    getSQList,
    getSQ
};



