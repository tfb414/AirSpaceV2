import React from 'react';

const QuizOptionInput = ({RonChange, value, target, onChange, addOption, num, selected }) => {
    return (
        <div className='quizOptionItem'>
            <input type='text' value={value} target={target} onChange={onChange}></input>
            {/* <p>Correct</p> */}
            <input type='radio' name={num} onChange={RonChange} target={target} checked={selected}></input>    
        </div>
    );
};

export default QuizOptionInput;