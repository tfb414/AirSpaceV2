import React from 'react';

const ResultTableResponse = ({ question }) => {
    let keys = Object.keys(question);
    let totalQuestions = keys.length;
    let scores = [];
    let tableData = keys.map((data) => {
        let responses = question[data];
        let singleResponse = responses.map((info, index) => {
            if(scores[index] === undefined) {
                scores.push(0);
            }
            if(info.value === true) {
                scores[index] += 1;
            }
            return (
                <td>
                    <p className={String(info.value)}>{info.text}</p>
                </td>
            )
        })

        return (
        <tr>
            <td className='questionBox'>
                    {responses[0].question_text}
            </td>
            {singleResponse}    
        </tr>    
        )
    })

    let newScores = scores.map(score => {
        score = Math.round(score / totalQuestions * 100);
        score = String(score) + "%";
        return score;
    })
    let scoreCells;
    // if ()
    scoreCells = newScores.map(score => {
        return (
            <td>{score}</td>
        )
    })
    return (
        <tbody>
            {tableData}
            <tr>
                <td>Score</td>
                {scoreCells}
            </tr>
        </tbody>
    );
};

export default ResultTableResponse;