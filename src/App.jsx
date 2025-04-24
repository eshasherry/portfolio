import { useState, useEffect } from 'react'
import './App.css'
import profileImage from './assets/es.jpg'
function App() {
  // State to track which projects are expanded
  const [expandedProjects, setExpandedProjects] = useState({})

  // Sample projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "AI Document Analysis Workflow",
      description: "An automated system that uses NLP to extract key information from legal documents, categorize content, and generate executive summaries. Built with LangChain and GPT-4."
    },
    {
      id: 2,
      title: "Conversational Data Assistant",
      description: "A specialized agent that helps non-technical users explore and visualize complex datasets through natural language queries. Integrates Python data science tools with LLM reasoning capabilities."
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

  useEffect(() => {
    // Load n8n chat styles
    const link = document.createElement('link')
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Load and initialize n8n chat
    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then(module => {
        const { createChat } = module
        createChat({
          webhookUrl: 'https://brantford-tech.ca/webhook/be583ba0-a598-4cd6-b0d2-11c3daecb9bc/chat'
        })
      })
      .catch(error => console.error('Error loading n8n chat:', error))

    // Clean up function
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link)
      }
    }
  }, [])

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
          <h2>AI Solutions Architect</h2>
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
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Esha Sherry | AI Solutions Architect</p>
      </footer>
    </div>
  )
}

export default App