import React from 'react';

const ResultTableName = ({ name }) => {
    let nameTable = name.map((data) => {
        return (
            <td>
                {data}
            </td>
        )
    })
    return (
            <tr className='resultTableName'>
                <td>
                    <p></p>
                </td>
                {nameTable}
            </tr>
    );
};

export default ResultTableName;