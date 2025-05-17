import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/quiz/${id}`, {
          headers: {
            'x-auth-token': token
          }
        });
        setQuiz(res.data);
        
        // Start a new attempt
        const attemptRes = await axios.post(
          `http://localhost:5000/api/attempt/start`,
          { 
            quizId: id,
            startedAt: new Date().toISOString() // Ensure proper date format
          },
          {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json'
            }
          }
        );
        setAttempt(attemptRes.data);
        setTimeLeft(res.data.timeLimit);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz. Please check your connection and try again.');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
    // Clear any submission error when the user selects an option
    if (submissionError) {
      setSubmissionError(null);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if user has answered at least one question
      if (Object.keys(selectedOptions).length === 0) {
        setSubmissionError("Please answer at least one question before submitting");
        setIsSubmitting(false);
        return;
      }
      
      const token = localStorage.getItem('token');
      
      // Ensure we have proper data before submission
      if (!quiz || !quiz._id || !id) {
        setSubmissionError("Missing quiz data. Please refresh the page and try again.");
        setIsSubmitting(false);
        return;
      }
      
      // Format answers with proper structure
      const answers = Object.entries(selectedOptions).map(([questionId, optionId]) => ({
        questionId,
        selectedOptionId: optionId
      }));
      
      // Log submit data for debugging
      console.log("Submitting answers:", {
        quizId: id,
        attemptId: attempt?._id,
        answers,
        completedAt: new Date().toISOString() // Add proper completion timestamp
      });
      
      const requestData = { 
        quizId: id,
        answers,
        completedAt: new Date().toISOString() // Ensure proper date format
      };
      
      // Add attempt ID if available
      if (attempt && attempt._id) {
        requestData.attemptId = attempt._id;
      }
      
      // If we have a startedAt from the attempt, include it
      if (attempt && attempt.startedAt) {
        requestData.startedAt = attempt.startedAt;
      } else {
        // Fallback - provide a valid date
        requestData.startedAt = new Date().toISOString();
      }
      
      const res = await axios.post(
        `http://localhost:5000/api/attempt/submit`,
        requestData,
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          },
          timeout: 10000 // Add timeout to prevent indefinite waiting
        }
      );
      
      console.log("Submission successful:", res.data);
      
      // Navigate to results page
      if (res.data && res.data._id) {
        navigate(`/result/${res.data._id}`);
      } else if (attempt && attempt._id) {
        // Fallback to attempt ID if available
        navigate(`/result/${attempt._id}`);
      } else {
        // Final fallback
        navigate('/quizzes?success=true');
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
      
      let errorMessage = 'Failed to submit quiz. Please try again.';
      
      // Extract useful error information
      if (err.response) {
        // Server responded with an error
        console.error('Server error response:', err.response.data);
        console.error('Status code:', err.response.status);
        
        if (err.response.data && err.response.data.message) {
          errorMessage = `Server error: ${err.response.data.message}`;
        } else if (err.response.status === 500) {
          errorMessage = 'Server error: There was a problem with the date field. Please try again.';
        }
      } else if (err.request) {
        // No response received
        console.error('No response received:', err.request);
        errorMessage = 'Server did not respond. Please check your connection and try again.';
      } else {
        // Request setup error
        console.error('Request error:', err.message);
        errorMessage = `Request error: ${err.message}`;
      }
      
      setSubmissionError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading quiz...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!quiz) return <div className="text-center p-4">Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="text-xl font-mono bg-gray-100 px-3 py-1 rounded">
            {formattedTime}
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl mb-4">{currentQuestion.questionText}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={option._id} 
                className="flex items-center"
              >
                <input 
                  type="radio" 
                  id={`option-${index}`}
                  name={`question-${currentQuestionIndex}`}
                  className="mr-2"
                  checked={selectedOptions[currentQuestion._id] === option._id}
                  onChange={() => handleOptionSelect(currentQuestion._id, option._id)}
                />
                <label 
                  htmlFor={`option-${index}`} 
                  className="cursor-pointer w-full py-2"
                  onClick={() => handleOptionSelect(currentQuestion._id, option._id)}
                >
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Display submission error message */}
        {submissionError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {submissionError}
          </div>
        )}

        <div className="flex justify-between">
          <button 
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded ${
              currentQuestionIndex === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            Previous
          </button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded ${
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;