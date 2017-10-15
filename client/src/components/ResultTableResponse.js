import React from 'react';

const ResultTableResponse = ({ question }) => {
    let keys = Object.keys(question);
    let scores = [];
    let tableData = keys.map((data) => {
        let responses = question[data]
        let totalQuestions = data.length;
        let correct = 0;
        let singleResponse = responses.map((info) => {
            if(info.value) {
                correct += 1;
            }
            return (
                <td>
                    <p className={String(info.value)}>{info.text}</p>
                </td>
            )
        })
        let score = Math.round(correct / totalQuestions * 100);
        score = String(score) + "%";
        console.log(score);
        scores.push(score);
        return (
        <tr>
            <td className='questionBox'>
                    {data}
            </td>
            {singleResponse}    
        </tr>    
        )
    })
    let scoreCells = scores.map(score => {
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