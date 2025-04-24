import { useState, useEffect } from 'react'
import './App.css'
import profileImage from './assets/es.jpg'
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

function App() {
  // State to track which projects are expanded
  const [expandedProjects, setExpandedProjects] = useState({})
  // State to track if chat is visible
  const [isChatVisible, setIsChatVisible] = useState(false)

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "AI Document Analysis Workflow",
      description: "An automated system that uses NLP to extract key information from legal documents, categorize content, and generate executive summaries. Built with LangChain and GPT-4."
    },
    {
      id: 2,
      title: "Conversational Customer Support Agent",
      description: "An AI-powered virtual assistant that provides 24/7 customer support, handles common inquiries, and escalates complex issues to human agents when necessary. Features sentiment analysis, multi-language support, and integration with CRM systems."
    },
    {
      id: 3,
      title: "Automated Research Assistant",
      description: "An agentic workflow that searches academic databases, extracts relevant information, and synthesizes findings into structured reports. Uses a combination of vector search and recursive summarization techniques."
    },
    {
      id: 4,
      title: "Meeting Insights Generator",
      description: "A tool that transcribes meetings, identifies action items, summarizes key points, and generates follow-up tasks automatically. Built with Whisper API for transcription and a custom GPT model for insights extraction."
    }
  ]

  // Toggle project expansion
  const toggleProject = (id) => {
    setExpandedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Function to show chat
  const showChat = () => {
    setIsChatVisible(true)
  }

  // Add chat styling for text visibility
  useEffect(() => {
    // Create a style element specifically targeting the input field text
    const styleElement = document.createElement('style');
    styleElement.id = 'chat-input-fix';
    styleElement.textContent = `
      /* Target specifically the input text with !important at highest specificity */
      .n8n-chat__input-field, 
      .n8n-chat__input-field::placeholder,
      .n8n-chat textarea,
      .n8n-chat input,
      .n8n-chat__footer textarea,
      .n8n-chat__footer input {
        color: black !important;
        background-color: white !important;
        caret-color: black !important;
        -webkit-text-fill-color: black !important;
      }
      
      /* Force any potential parent elements to not override text color */
      .n8n-chat__footer * {
        color: inherit;
      }
      
      /* Add a border to make the input area more visible */
      .n8n-chat__input-container {
        border: 1px solid #ccc !important;
        background-color: white !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyle = document.getElementById('chat-input-fix');
      if (existingStyle) document.head.removeChild(existingStyle);
    };
  }, []);

  // Load the chat when it becomes visible
  useEffect(() => {
    // Clean up any existing chat elements
    const existingChats = document.querySelectorAll('.n8n-chat');
    existingChats.forEach(el => el.remove());

    if (!isChatVisible) return; // No chat to show

    const webhookUrl = 'https://brantford-tech.ca/webhook/f14d0a7a-a9a7-48a4-8bdf-164a16454cdb/chat';

    // Initial messages
    const initialMessages = [
      "Welcome to our customer support!",
      "I'm here to help with any questions or issues you might have. What can I assist you with today?"
    ];

    // Create chat with proper options
    const chatInstance = createChat({
      webhookUrl: webhookUrl,
      initialMessages: initialMessages,
      i18n: {
        en: {
          title: 'Customer Support',
          subtitle: "I'm here to help with your customer service needs.",
          inputPlaceholder: 'Type your question...',
        },
      }
    });

    // Apply direct fixes to ensure input field is visible (after a short delay to let the chat render)
    setTimeout(() => {
      const inputField = document.querySelector('.n8n-chat__input-field');
      const footer = document.querySelector('.n8n-chat__footer');

      if (inputField) {
        inputField.style.color = 'black';
        inputField.style.backgroundColor = 'white';
        inputField.style.display = 'block';
        inputField.style.visibility = 'visible';
      }

      if (footer) {
        footer.style.display = 'flex';
        footer.style.visibility = 'visible';
        footer.style.backgroundColor = '#f9f9f9';
      }
    }, 500);

  }, [isChatVisible]);

  return (
    <div className="portfolio-container">
      {/* Profile Section */}
      <section className="profile-section">
        <div className="profile-image-container">
          <img
            src={profileImage}
            alt="Esha Sherry"
            className="profile-image"
            onError={(e) => {
              console.error("Image failed to load");
              e.target.src = "https://via.placeholder.com/180";
            }}
          />
        </div>

        <div className="profile-content">
          <h1>Esha Sherry</h1>
          <h2>AI Agentic Solutions Architect</h2>
          <p>
            I build intelligent agentic workflows that solve real-world problems.
            With expertise in LLMs, prompt engineering, and workflow automation,
            I create AI solutions that help businesses streamline operations and
            extract insights from their data.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2>AI Workflow Projects</h2>

        <div className="project-list">
          {projects.map(project => (
            <div
              key={project.id}
              className={`project-card ${expandedProjects[project.id] ? 'expanded' : ''}`}
              onClick={() => toggleProject(project.id)}
            >
              <h3>{project.title}</h3>

              {expandedProjects[project.id] && (
                <div className="project-description">
                  <p>{project.description}</p>
                  {project.id === 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent toggling the card
                        showChat();
                      }}
                      className="try-button"
                    >
                      Try it out
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Esha Sherry | AI Agentic Solutions Architect</p>
      </footer>
    </div>
  )
}

export default App