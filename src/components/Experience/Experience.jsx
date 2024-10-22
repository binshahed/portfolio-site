import  {useContext, useEffect, useState} from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Experience.css';

import ExperienceCard from './ExperienceCard';
import axiosInstance from '../../axiosInstance';
import LineSkeleton from '../common/LineSkeleton';

function Experience() {
    const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/experience'); // Replace with your endpoint
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  if (error) return <div>{error}</div>

  console.log(data?.data);
  

  
    return (
        <div className="experience" id="experience" style={{backgroundColor: theme.secondary}}> 
             <div className="experience-body">
                 <div className="experience-image">
                     <img src={theme.expimg} alt="" />
                 </div>
                 <div className="experience-description">
                    <h1 style={{color:theme.primary}}>Experience</h1>
                    {loading ? <>
                      <LineSkeleton/>
                      <LineSkeleton/>
                      <LineSkeleton/>
                    </> : data?.data?.map(exp =>(
                        <ExperienceCard 
                            key={exp._id}
                            id={exp._id}
                            jobtitle={exp.designation}
                            company={exp.companyName}
                            startYear={exp.startDate}
                            endYear={exp.endDate}/>
                    ))}
                 </div>
             </div>
        </div>
    )
}

export default Experience
