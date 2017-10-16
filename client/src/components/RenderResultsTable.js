import React from 'react';
import ResultTableName from './ResultTableName'
import ResultTableResponse from './ResultTableResponse'


const RenderResultsTable = (props) => {
    return (
        <div class="SQTABLE">
            <table className="table table-hover results">
                <ResultTableName {...props}/>
                <ResultTableResponse {...props} />
            </table>
        </div>
    );
};

export default RenderResultsTable;