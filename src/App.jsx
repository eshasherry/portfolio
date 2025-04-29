import { useState, useEffect } from 'react'
import './App.css'
import profileImage from './assets/es.jpg'
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import NavBar from './NavBar';  // Import the NavBar component

function App() {
  // State to track which projects are expanded
  const [expandedProjects, setExpandedProjects] = useState({})
  // State to track if chat is visible
  const [isChatVisible, setIsChatVisible] = useState(false)
  // State to manage active section
  const [activeSection, setActiveSection] = useState('home')

  // Sample projects data
  const projects = [
    {
      id: 2,
      title: "Conversational Customer Support Agent",
      description: "This is an AI powered customer support agent for a Gym. It can answer questions about the gym, provide information about classes, and assist with bookings.",
    }
  ]

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "How to build a Conversational AI Chatbot",
      date: "April 29, 2025",
      summary: "Build your own conversational Chatbot using n8n. This blog post will guide you through the process step by step.",
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
      "I'm here to help with any questions about the gym or your membership. What can I assist you with today?"
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

  // Track scrolling to update active section
  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      const projectsSection = document.getElementById('projects');
      const blogsSection = document.getElementById('blogs');

      const scrollPosition = window.scrollY + 100; // Adding offset for navbar

      if (blogsSection && scrollPosition >= blogsSection.offsetTop) {
        setActiveSection('blogs');
      } else if (projectsSection && scrollPosition >= projectsSection.offsetTop) {
        setActiveSection('projects');
      } else if (homeSection) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio-container">
      {/* Navigation Bar */}
      <NavBar activeSection={activeSection} />

      {/* Profile/Home Section */}
      <section id="home" className="profile-section">
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
          <h2>Tech Enthusiast</h2>
        </div>

        <div className="profile-content">


          <p>
            I have worked on cloud migration and integration projects in the past, but I'm now diving into the world of AI.
            In 2024, I was introduced to the world of AI — and it immediately captured my attention. Since then, I've been on an exciting journey to explore every aspect of it.
            I'll be sharing my experiences and discoveries here as I dive deeper into the ocean.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
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

      {/* Blogs Section */}
      <section id="blogs" className="blogs-section">
        <h2>Blog Posts</h2>

        <div className="blog-list">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <h3>{post.title}</h3>
              <p className="blog-date">{post.date}</p>
              <p>{post.summary}</p>
              <a href="#" className="read-more">Read More</a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Esha Sherry | Tech Enthusiast</p>
      </footer>
    </div>
  )
}

export default App