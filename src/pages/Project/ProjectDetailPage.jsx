import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AiOutlineHome } from "react-icons/ai";
import axiosInstance from '../../axiosInstance';
import { ThemeContext } from '../../contexts/ThemeContext';
import LineSkeleton from '../../components/common/LineSkeleton';
import './ProjectDetailPage.css'; // Create this CSS file for styles

const ProjectDetailPage = () => {
    const { theme } = useContext(ThemeContext);
    const { id } = useParams(); // Get project ID from URL params
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjectDetail = async () => {
            try {
                const response = await axiosInstance.get(`/projects/${id}`); // Fetch individual project data
                setProject(response?.data?.data);
            } catch (err) {
                setError('Error fetching project details');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetail();
    }, [id]);

    if (loading) return <LineSkeleton />; // Show skeleton while loading
    if (error) return <div>Error loading project detail</div>;

    return (
        <div className="projectDetailPage" style={{ backgroundColor: theme.secondary, minHeight: '100vh' }}>
            <Helmet>
                <title>{project?.name} | Project Detail</title>
            </Helmet>
            <div className="projectDetailPage--header" style={{ backgroundColor: theme.primary }}>
                <Link to="/" className="homeIcon">
                    <AiOutlineHome style={{ color: theme.secondary }} />
                </Link>
                <h1 style={{ color: theme.secondary }}>{project?.name}</h1>
            </div>

            <div className="projectDetailPage--container">
                <div className="projectDetailPage--content">
                    <img src={project?.imageUrl} alt={project?.name} className="projectDetailImage" />

                    <div className="techStack">
                        {project?.technology.map((tech, index) => (
                            <span key={index} className="techBadge">{tech}</span>
                        ))}
                    </div>

                    <div className="projectDetailBody" style={{ color: theme.tertiary }}>
                        <p className="projectDescription">{project?.description}</p>

                        <div className="projectDetailLinks">
                            <a href={project?.liveLink} target="_blank" rel="noopener noreferrer" className="projectLink">
                                Live Project
                            </a>
                            <a href={project?.clientGitLink} target="_blank" rel="noopener noreferrer" className="projectLink">
                                Client Repository
                            </a>
                            <a href={project?.serverGitLink} target="_blank" rel="noopener noreferrer" className="projectLink">
                                Server Repository
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
