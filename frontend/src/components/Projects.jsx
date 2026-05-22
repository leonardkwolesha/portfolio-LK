import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/content';
import useScrollReveal from '../hooks/useScrollReveal';

const Projects = () => {
  const ref = useScrollReveal();

  return (
    <section id="projects" ref={ref} className="reveal">
      <div className="projects-header">
        <p className="section-tag">What I&apos;ve built</p>
        <h2 className="section-heading">Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">

            {/* Thumbnail with hover overlay */}
            <div className="project-thumb" style={{ background: project.gradient }}>
              {/* Dot-grid texture layer */}
              <div className="project-thumb-grid" aria-hidden="true" />
              {/* Icon box */}
              <div
                className="project-thumb-icon-wrap"
                style={{ boxShadow: `0 0 48px ${project.iconColor}30` }}
                aria-hidden="true"
              >
                <project.Icon size={48} color={project.iconColor} />
              </div>
              {/* Overlay: slides up on card hover */}
              <div className="project-thumb-overlay" aria-hidden="true">
                <span className="project-thumb-label">View Project</span>
              </div>
            </div>

            {/* Body */}
            <div className="project-body">
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="p-tag">{tag}</span>
                ))}
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Icon link row */}
              <div className="project-links">
                {project.github && (
                  <a
                    href={project.github}
                    className="project-icon-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <FiGithub size={16} />
                    <span>Code</span>
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="project-icon-link project-icon-link--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                  >
                    <FiExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
