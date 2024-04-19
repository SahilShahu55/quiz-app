import React, { useState } from 'react';
import quizData from '../quizData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(""); 
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    // Delay moving to the next question to allow the user to see feedback
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null); // Reset for the next question
        setSelectedAnswer(""); // Reset selected answer
      } else {
        setShowScore(true);
      }
    }, 1000); // Adjust time as needed
  };

  return (
    <div className='bg-gradient-to-r from-purple-500 to-pink-500 p-10 rounded-xl mx-4'>
      {showScore ? (
          <div>
            <div className='font-semibold text-xl text-white'> You scored {score} out of {quizData.length}</div>
            <div className='flex justify-center items-center '>
                <a href="/" className='bg-black hover:bg-white text-white hover:text-black rounded-2xl px-6 py-2 text-sm font bold hover:border-2 border-black hover:font-bold  border-2 my-10 '>Retake Quiz</a>
            </div>
          </div>
        ) : (
         <>
          <div className='text-white flex flex-col gap-4 mb-5'>
           
              <span className='font-semibold '>Question {currentQuestion + 1}/{quizData.length}</span>
              <h6 className='font-semibold text-center'>{quizData[currentQuestion].question}</h6>

          </div>
          <div className='grid grid-cols-2 md:grid-cols-4  gap-6 py-2 md:gap-10  mt-10 md:mt-0'>
            {quizData[currentQuestion].options.map((option) => (
              <button 
                onClick={() => handleAnswerOptionClick(option)} 
                key={option}
                style={{ backgroundColor: selectedAnswer === option ? (isCorrect ? 'lightgreen' : 'pink') : '' }}
                className='bg-black hover:bg-white text-white hover:text-black rounded-2xl px-6 py-2 text-sm font bold hover:border-2 border-black hover:font-bold  border-2'
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div style={{ marginTop: '10px' }}>
              {isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;