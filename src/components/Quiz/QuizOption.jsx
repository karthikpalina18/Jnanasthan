// src/components/Quiz/QuestionOption.jsx
import React from 'react';

const QuestionOption = ({ option, isSelected, onSelect }) => {
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer ${
        isSelected 
          ? 'bg-blue-50 border-blue-500' 
          : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelect(option._id)}
    >
      {option.text}
    </div>
  );
};

export default QuestionOption;