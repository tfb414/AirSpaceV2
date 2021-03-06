import React from 'react';
import QuizOptionInput from './QuizOptionInput.js'

const SurveyQuestionInput = ({RonChange, Qvalue, QonChange, OonChange, num, remove, option, addOption, removeOption }) => {
    let Qindex = String(num-1)
    let Oindex = 0
    let Options = option.map((data) => {
        let target = Qindex + Oindex
        Oindex += 1
        return <QuizOptionInput value={data.text} target={target} RonChange={RonChange} onChange={OonChange} addOption={addOption} num={num} selected={data.value}/>
    })
    return (
        <div className='quizQuestionItem'>
            <div className='QuestionClump'>
                <p className="SurveyNum">{num}.</p>
                <input className ="surveyQInput"type="text" target={num} value={Qvalue} onChange={QonChange}></input>
                <button className='subtractQuizQues' onClick={remove} target={num}>—</button>
            </div>
            <div className='quizOptionsBlock'>
                <div className='correct'>
                    <p>Correct</p>
                </div>
                <form>
                    {Options}
                </form>
                <div className='quizOptionButtons'>
                    <button className='addQoption' target={num} onClick={addOption}> + </button>
                    <button className='subtractQoption' target={num} onClick={removeOption}> — </button>
                </div>
            </div>
        </div>
    );
};

export default SurveyQuestionInput;