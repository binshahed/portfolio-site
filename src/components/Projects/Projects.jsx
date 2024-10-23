import  { useContext} from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { ThemeContext } from '../../contexts/ThemeContext';
import { projectsData } from '../../data/projectsData'
import { HiArrowRight } from "react-icons/hi";

import './Projects.css'
import SingleProject from './SingleProject/SingleProject';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'sonner';
import LineSkeleton from '../common/LineSkeleton';

function Projects() {

    const { theme } = useContext(ThemeContext);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
   

    
    const useStyles = makeStyles(() => ({
        viewAllBtn : {
            color: theme.tertiary, 
            backgroundColor: theme.primary,
            transition: 'color 0.2s',
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
            transition: 'background-color 0.2s',
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
            const response = await axiosInstance.get('/projects'); // Replace with your endpoint
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
            {projectsData.length > 0 && (
                <div className="projects" id="projects" style={{backgroundColor: theme.secondary}}>
                    <div className="projects--header">
                        <h1 style={{color: theme.primary}}>Projects</h1>
                    </div>
                    <div className="projects--body">
                        <div className="projects--bodyContainer">
                        {loading ? <>
                      <LineSkeleton/>
                      <LineSkeleton/>
                      <LineSkeleton/>
                    </> : data?.data?.slice(0, 6).map(project => (
                                <SingleProject
                                    theme={theme}
                                    key={project._id}
                                    id={project._id}
                                    name={project.name}
                                    desc={project.description}
                                    tags={project.technology}
                                    code={project.clientGitLink}
                                    demo={project.liveLink}
                                    image={project.imageUrl}
                                />
                            ))}
                        </div> 

                        {projectsData.length > 3 && (
                            <div className="projects--viewAll">
                                <Link to="/projects">
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

export default Projects
