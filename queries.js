const db = require('./sequelize.js');

// function getAllHosts() {
//     return db.host.findAll();
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

function addGQRSurvey(guest_id, question_id, response) {
    db.guest_question_response.findAll({
        attributes: ['gqr_id'],
        where: {guest_id, question_id},
        raw: true,
    }).then(resp => {
        if (resp.length === 0) {
            db.guest_question_response.create({
                guest_id,
                question_id,
                response, 
            })
        } else {
            db.guest_question_response.update({
                response,
                gqr_id: resp[0].gqr_id},
                {where: {guest_id, question_id}}
            )
        }
    })
}

function addGQRQuiz(guest_id, question_id, option_id) {
    db.guest_question_response.findAll({
        attributes: ['gqr_id'],
        where: {guest_id, question_id},
        raw: true,
    }).then(resp => {
        if (resp.length === 0) {
            db.guest_question_response.create({
                guest_id,
                question_id,
                option_id, 
            })
        } else {
            db.guest_question_response.update({
                option_id,
                gqr_id: resp[0].gqr_id},
                {where: {guest_id, question_id}}
            )
        }
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
    full outer join options o
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

function deleteAllOptions(sq_id) {
    return db.sequelize.query(`DELETE 
    FROM options o  
        USING sq_question_option sqqo 
    WHERE o.option_id = sqqo.option_id AND
        sqqo.sq_id = '${sq_id}';`)
}



// // function getGuestsForHost(host_id) {
// //     host_guest.findAll({
// //         include: [{
// //             model: 
// //         }]
// //     })
// // }

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
    getSQ,
    addGQRQuiz,
    addGQRSurvey
};



// db.sequelize.query(`insert into guest_question_response (guest_id, response, question_id)
//         values ('${guest_id}', '${response}', '${question_id}')
//         on conflict (guest_id, question_id)
//         do update set (response) = ('${response}')
//         where guest_question_response.guest_id = '${guest_id}' and guest_question_response.question_id = '${question_id}';`, { type: db.sequelize.QueryTypes.INSERT});