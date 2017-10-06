import React from 'react';
import ResultTableName from './ResultTableName'
import ResultTableResponse from './ResultTableResponse'


const RenderResultsTable = (props) => {
    return (
        <div className='resultBox'>
            <table>
                <ResultTableName {...props}/>
                <ResultTableResponse {...props} />
            </table>
        </div>
    );
};

export default RenderResultsTable;