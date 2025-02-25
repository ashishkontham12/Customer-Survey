import { useState } from "react";
import "./SurveyApp.css";

// Define the survey questions
const surveyQuestions = [
  { id: 1, question: "How satisfied are you with our service?", type: "rating" },
  { id: 2, question: "What do you like most about our product?", type: "text" },
  { id: 3, question: "Would you recommend us to others?", type: "rating" },
  { id: 4, question: "What improvements would you suggest?", type: "text" },
  { id: 5, question: "How likely are you to purchase again?", type: "rating" },
];

function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-heading">Welcome to Our Customer Survey</h1>
        
        <span><p className="welcome-message">
          Your feedback is important to us. 
          Help us improve by sharing your thoughts.
        </p></span>
        <button className="start-button" onClick={onStart}>
          Start Survey
        </button>
        <div className="welcome-footer">
          <p className="footer-text">It only takes a few minutes!</p>
        </div>
      </div>
    </div>
  );
}

const SurveyApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [surveyStarted, setSurveyStarted] = useState(false); // State to track if the survey has started

  // Limit the survey to only 5 questions
  const totalQuestionsToShow = 5;
  const questionsToDisplay = surveyQuestions.slice(0, totalQuestionsToShow);

  const handleNext = () => {
    // Check if the current question has been answered
    if (!responses[questionsToDisplay[currentQuestion].id]) {
      alert("Please answer the question before proceeding.");
      return;
    }

    // Move to the next question
    if (currentQuestion < questionsToDisplay.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    // Move to the previous question
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleResponse = (value) => {
    // Save the response for the current question
    setResponses((prev) => ({
      ...prev,
      [questionsToDisplay[currentQuestion].id]: value,
    }));
  };

  const handleSubmit = () => {
    // Check if the last question has been answered
    if (!responses[questionsToDisplay[currentQuestion].id]) {
      alert("Please answer the question before submitting.");
      return;
    }

    // Log the responses and mark the survey as submitted
    console.log("Survey Responses:", responses);
    setSubmitted(true);
  };

  const handleStartSurvey = () => {
    setSurveyStarted(true); // Start the survey
  };

  // Display a thank you message after submission
  if (submitted) {
    return (
      <div className="thank-you-container">
        <h1 className="thank-you-heading">Thank You for Your Feedback!</h1>
        <p className="thank-you-message">We appreciate your time.</p>
      </div>
    );
  }

  // Display the welcome screen if the survey hasn't started
  if (!surveyStarted) {
    return <WelcomeScreen onStart={handleStartSurvey} />;
  }

  // Render the survey questions
  return (
    <div className="survey-container">
      <div className="survey-card">
        <h1 className="survey-heading">Customer Survey</h1>
        <h2 className="question-text">
          {questionsToDisplay[currentQuestion].question}
        </h2>
        {questionsToDisplay[currentQuestion].type === "rating" ? (
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`rating-button ${
                  responses[questionsToDisplay[currentQuestion].id] === num
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleResponse(num)}
              >
                {num}
              </button>
            ))}
          </div>
        ) : (
          <textarea
            className="response-textarea"
            placeholder="Type your response..."
            value={responses[questionsToDisplay[currentQuestion].id] || ""}
            onChange={(e) => handleResponse(e.target.value)}
          />
        )}
        <div className="navigation-container">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="navigation-button prev-button"
          >
            Previous
          </button>
          <p className="question-count">
            Question {currentQuestion + 1} of {questionsToDisplay.length}
          </p>
          {currentQuestion === questionsToDisplay.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="navigation-button submit-button"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!responses[questionsToDisplay[currentQuestion].id]}
              className="navigation-button next-button"
            >
              Next
            </button>
          )}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questionsToDisplay.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SurveyApp;