import React from 'react';

const ResultTableResponse = ({ question }) => {
    let keys = Object.keys(question);
    let tableData = keys.map((data) => {
        let responses = question[data]
        let singleResponse = responses.map((info) => {
            return (
                <td>
                    <p className={info.value}>{info.text}</p>
                </td>
            )
        })
        return (
        <tr>
            <td className='questionBox'>
                    {data}
            </td>
            {singleResponse}    
        </tr>    
        )
    })
    console.log(tableData)
    return (
        <tbody>
            {tableData}
        </tbody>
    );
};

export default ResultTableResponse;