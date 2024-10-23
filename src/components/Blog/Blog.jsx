import  { useContext} from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { HiArrowRight } from "react-icons/hi";

import './Blog.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { blogData } from '../../data/blogData'
import SingleBlog from './SingleBlog/SingleBlog';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'sonner';
import LineSkeleton from '../common/LineSkeleton';


function Blog() {

    const { theme } = useContext(ThemeContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  

    const useStyles = makeStyles(() => ({
        viewAllBtn : {
            color: theme.tertiary, 
            backgroundColor: theme.primary,
            "&:hover": {
                color: theme.secondary, 
                backgroundColor: theme.primary,
            }
        },
        viewArr : {
            color: theme.tertiary, 
            backgroundColor: theme.secondary70,
            width: '40px',
            height: '40px',
            padding: '0.5rem',
            fontSize: '1.05rem',
            borderRadius: '50%',
            cursor: 'pointer',
            "&:hover": {
                color: theme.tertiary, 
                backgroundColor: theme.secondary,
            }
        },
    }));

    const classes = useStyles();

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get('/blogs'); // Replace with your endpoint
            setData(response.data);
          } catch (err) {
            setError('Error fetching data');
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
     
      if (error) return toast.err('Something went wrong')

    return (
        <>
            {data?.data?.length > 0 && (
                <div className="blog" id="blog" style={{backgroundColor: theme.secondary}}>
                    <div className="blog--header">
                        <h1 style={{color: theme.primary}}>Blog</h1>
                    </div>
                    <div className="blog--body">
                        <div className="blog--bodyContainer">
                        {loading ? <>
                      <LineSkeleton/>
                      <LineSkeleton/>
                      <LineSkeleton/>
                    </> : data?.data?.slice(0, 6).map(blog => (
                                <SingleBlog 
                                    theme={theme}
                                    title={blog.title}
                                    desc={blog.slug}
                                    date={blog.content}
                                    image={blog.featuredImage}
                                    url={`blog/${blog?._id}`}
                                    key={blog._id}
                                    id={blog._id}
                                />
                            ))}
                        </div> 

                        {blogData.length > 3 && (
                            <div className="blog--viewAll">
                                <Link to="/blog">
                                    <button className={classes.viewAllBtn}>
                                        View All
                                        <HiArrowRight className={classes.viewArr} />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </>
    )
}

export default Blog
