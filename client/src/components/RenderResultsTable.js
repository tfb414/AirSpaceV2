import React from 'react';
import ResultTableName from './ResultTableName'
import ResultTableResponse from './ResultTableResponse'


const RenderResultsTable = (props) => {
    return (
        <div>
            <table>
                <ResultTableName {...props}/>
                <ResultTableResponse {...props} />
            </table>
        </div>
    );
};

export default RenderResultsTable;