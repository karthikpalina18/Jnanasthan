import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    timeLimit: 30,
    passingScore: 70,
    isPublished: false
  });
  
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Categories for dropdown
  const categories = [
    'Programming',
    'Web Development',
    'Data Science',
    'Mathematics',
    'Computer Science',
    'General Knowledge',
    'Other'
  ];

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/admin/quizzes/${id}`, {
          headers: { 'x-auth-token': token }
        });
        
        const quiz = response.data;
        
        // Set form data
        setFormData({
          title: quiz.title || '',
          description: quiz.description || '',
          category: quiz.category || '',
          timeLimit: quiz.timeLimit || 30,
          passingScore: quiz.passingScore || 70,
          isPublished: quiz.isPublished || false
        });
        
        // Format questions to match our state structure
        if (quiz.questions && quiz.questions.length > 0) {
          const formattedQuestions = quiz.questions.map(q => {
            // Ensure there are always 4 options (pad with empty strings if needed)
            const options = [...q.options];
            while (options.length < 4) {
              options.push('');
            }
            
            return {
              question: q.question || '',
              options: options,
              correctOption: q.correctOption || 0,
              explanation: q.explanation || '',
              _id: q._id // Keep the original question ID if it exists
            };
          });
          
          setQuestions(formattedQuestions);
        } else {
          // Provide a default empty question if none exist
          setQuestions([{
            question: '',
            options: ['', '', '', ''],
            correctOption: 0,
            explanation: ''
          }]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const newQuestions = [...questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [name]: value
    };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOption = optionIndex;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        explanation: ''
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill in all required quiz details.');
      return false;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setError(`Question ${i + 1} is empty.`);
        return false;
      }

      // Check if at least 2 options are provided
      let validOptions = 0;
      for (let j = 0; j < q.options.length; j++) {
        if (q.options[j].trim()) validOptions++;
      }

      if (validOptions < 2) {
        setError(`Question ${i + 1} needs at least 2 options.`);
        return false;
      }

      // Check if correct option is filled
      if (!q.options[q.correctOption].trim()) {
        setError(`Correct option for question ${i + 1} cannot be empty.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const quizData = {
        ...formData,
        questions: questions.map(q => {
          const questionData = {
            question: q.question,
            options: q.options.filter(opt => opt.trim() !== ''), // Filter out empty options
            correctOption: q.correctOption,
            explanation: q.explanation
          };
          
          // Include the question ID if it exists (for existing questions)
          if (q._id) {
            questionData._id = q._id;
          }
          
          return questionData;
        })
      };
      
      await axios.put(`/api/admin/quizzes/${id}`, quizData, {
        headers: { 'x-auth-token': token }
      });
      
      setSaving(false);
      navigate('/admin/quizzes');
    } catch (err) {
      console.error('Error updating quiz:', err);
      setError('Failed to update quiz. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading quiz data...</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Quiz</h1>
        <Link to="/admin/quizzes" className="btn btn-outline-secondary">
          Back to Quizzes
        </Link>
      </div>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header">
            <h4>Quiz Details</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="category" className="form-label">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="timeLimit" className="form-label">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="timeLimit"
                  name="timeLimit"
                  min="1"
                  max="180"
                  value={formData.timeLimit}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="passingScore" className="form-label">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="passingScore"
                  name="passingScore"
                  min="0"
                  max="100"
                  value={formData.passingScore}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleFormChange}
              />
              <label className="form-check-label" htmlFor="isPublished">
                Publish Quiz (visible to users)
              </label>
            </div>
          </div>
        </div>
        
        <h4 className="mb-3">Questions</h4>
        
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Question {qIndex + 1}</h5>
              {questions.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeQuestion(qIndex)}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor={`question-${qIndex}`} className="form-label">
                  Question Text <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id={`question-${qIndex}`}
                  name="question"
                  rows="2"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  required
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label className="form-label">
                  Options <span className="text-danger">*</span> (at least 2 required)
                </label>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="input-group mb-2">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        name={`correctOption-${qIndex}`}
                        checked={question.correctOption === oIndex}
                        onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                        aria-label="Correct option radio button"
                      />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    />
                  </div>
                ))}
                <small className="text-muted">
                  Select the radio button next to the correct answer.
                </small>
              </div>
              
              <div className="mb-3">
                <label htmlFor={`explanation-${qIndex}`} className="form-label">
                  Explanation (Optional)
                </label>
                <textarea
                  className="form-control"
                  id={`explanation-${qIndex}`}
                  name="explanation"
                  rows="2"
                  placeholder="Explain why the correct answer is right (shown after answering)"
                  value={question.explanation}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
        
        <div className="mb-4">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>
        
        <div className="d-flex justify-content-between">
          <Link to="/admin/quizzes" className="btn btn-outline-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuiz;