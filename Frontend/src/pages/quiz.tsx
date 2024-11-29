import { useState } from 'react';

import AnswerBox from '../components/answerBox'
import ExplanationBox from '../components/explanationBox'

import questions from '../data/questions.ts'

function QuizPage() {
    const [userAnswer, setUserAnswer] = useState('');
    const [userExplanation, setUserExplanation] = useState('');
    const [level, setLevel] = useState(1);
    const [isCorrect, setIsCorrect] = useState(false);

    async function handleSubmitAnswer() {
        const currentQuestion = questions[level - 1];

        if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            setIsCorrect(true);
        } else {
            alert('Try again!');
        }

        setUserAnswer('');
    }

    async function handleSubmitExplanation() {
        if (level <  questions.length) {
            setLevel(level + 1);
            setIsCorrect(false);
        } else {
            alert("Congratulations, you've completed all levels!");
            setIsCorrect(false);
            setLevel(1); // Reset to first card
        }

        setUserExplanation('');
    }

    return <div className='bg-[#282b30] p-8 text-center text-white flex flex-col justify-start items-center h-full w-full min-h-screen'>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold'>Level {level}</h1>
            <div className='rounded-lg p-5 m-5 bg-[#36393e] h-96'>
                <img
                    src={questions[level - 1].image} // edit
                    alt="Flashcard Question"
                    className='object-cover w-full h-full rounded-lg'
                />
            </div>
            {
                isCorrect ? <ExplanationBox
                    userExplanation={userExplanation}
                    setUserExplanation={setUserExplanation}
                    handleSubmit={handleSubmitExplanation}
                /> : <AnswerBox
                    userAnswer={userAnswer}
                    setUserAnswer={setUserAnswer}
                    handleSubmit={handleSubmitAnswer}
                />
            }
        </div>
    </div>;
}

export default QuizPage;
