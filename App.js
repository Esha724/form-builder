import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/form').then((response) => {
      setForm(response.data);
    });
  }, []);

  if (!form) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>{form.title}</h1>
      <form onSubmit={handleSubmit}>
        {form.questions.map((question) => (
          <div key={question._id}>
            <label>{question.label}</label>
            {question.type === 'Text' && <input type="text" />}
            {question.type === 'Radio' &&
              question.options.map((option) => (
                <div key={option}>
                  <input type="radio" name={question._id} value={option} />
                  <span>{option}</span>
                </div>
              ))}
            {question.type === 'Checkbox' &&
              question.options.map((option) => (
                <div key={option}>
                  <input type="checkbox" name={question._id} value={option} />
                  <span>{option}</span>
                </div>
              ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
