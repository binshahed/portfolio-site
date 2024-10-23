import  { useContext } from 'react';
import Marquee from "react-fast-marquee";

import './Skills.css'

import { ThemeContext } from '../../contexts/ThemeContext';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useEffect } from 'react';
import { toast } from 'sonner';
import LineSkeleton from '../common/LineSkeleton';

function Skills() {

    const { theme } = useContext(ThemeContext);
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/skills'); // Replace with your endpoint
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

    const skillBoxStyle = {
        backgroundColor: theme.secondary,
        boxShadow: `0px 0px 30px ${theme.primary30}`
    }

    return (
        <div className="skills" style={{backgroundColor: theme.secondary}}>
            <div className="skillsHeader">
                <h2 style={{color: theme.primary}}>Skills</h2>
            </div>
            <div className="skillsContainer">
                <div className="skill--scroll">
                    <Marquee 
                        gradient={false} 
                        speed={80} 
                        pauseOnHover={true}
                        pauseOnClick={true} 
                        delay={0}
                        play={true} 
                        direction="left"
                    >
                       {loading ? <>
                      <LineSkeleton/>
                      <LineSkeleton/>
                      <LineSkeleton/>
                    </> : data?.data?.map((skill) => (
                            <div className="skill--box" key={skill?._id} style={skillBoxStyle}>
                                <img src={skill?.imageUrl} alt={skill?.name} />
                                <h3 style={{color: theme.tertiary}}>
                                    {skill?.name}
                                </h3>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default Skills
