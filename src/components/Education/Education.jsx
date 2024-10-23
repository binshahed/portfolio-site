import   { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Education.css'
import EducationCard from './EducationCard';


import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'sonner';
import LineSkeleton from '../common/LineSkeleton';

function Education() {
    const { theme } = useContext(ThemeContext);

    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/education'); // Replace with your endpoint
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
        <div className="education" id="resume" style={{backgroundColor: theme.secondary}}>
           
            <div className="education-body">
                <div className="education-description">
                <h1 style={{color:theme.primary}}>Education</h1>
                {loading ? <>
                      <LineSkeleton/>
                      <LineSkeleton/>
                      <LineSkeleton/>
                    </> : data?.data?.map(edu => (
                        <EducationCard 
                            key={edu._id}
                            id={edu._id}
                            institution={edu.institute}
                            degree={edu.degree}
                            course={edu.department}
                            startYear={edu.startYear}
                            endYear={edu.endYear}
                        />
                    ))}
                </div>
                <div className="education-image">
                    <img src={theme.eduimg} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Education
