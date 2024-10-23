import  { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AiOutlineHome } from "react-icons/ai";
import axiosInstance from '../../axiosInstance';
import { ThemeContext } from '../../contexts/ThemeContext';
import LineSkeleton from '../../components/common/LineSkeleton';
import './BlogDetailPage.css'; // Create this CSS file for styles

const BlogDetailPage = () => {
    const { theme } = useContext(ThemeContext);
    const { id } = useParams(); // Get blog ID from URL params
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/${id}`); // Fetch individual blog data
                setBlog(response?.data?.data);
            } catch (err) {
                setError('Error fetching blog details');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [id]);

    if (loading) return <LineSkeleton />; // Show skeleton while loading
    if (error) return <div>Error loading blog detail</div>;

    return (
        <div className="blogDetailPage" style={{ backgroundColor: theme.secondary, minHeight:'100vh' }}>
            <Helmet>
                <title>{blog?.title} | Blog Detail</title>
            </Helmet>
            <div className="blogDetailPage--header" style={{ backgroundColor: theme.primary }}>
                <Link to="/">
                    <AiOutlineHome className="homeIcon" style={{ color: theme.secondary }} />
                </Link>
              <div>
              <h1 style={{ color: theme.secondary }}>{blog?.title}</h1>
              <h2 style={{ color: theme.secondary,  fontFamily:'cursive' }}>{blog?.slug}</h2>
              </div>
            </div>
            <div className="blogDetailPage--container">
                <div className="blogDetailPage--content">
                    <img src={blog?.featuredImage} alt={blog?.title} className="blogDetailImage" />
                    <p className="blogDetailDate" style={{ color: theme.tertiary }}>
                        Published on: {new Date(blog?.createdAt).toLocaleDateString()}
                    </p>
                    
                    <div
                    className="blogDetailBody" style={{ color: theme.tertiary }}
                    dangerouslySetInnerHTML={{__html: blog?.content}}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
