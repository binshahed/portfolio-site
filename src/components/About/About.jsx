/* eslint-disable react/prop-types */
import   { useContext } from 'react';

import './About.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { aboutData } from '../../data/aboutData'
import LineSkeleton from '../common/LineSkeleton';



function About({personalData, isLoading}) {

    const { theme } = useContext(ThemeContext);
    return (
        <div className="about" id="about" style={{backgroundColor: theme.secondary}}>
            <div className="line-styling">
              <div className="style-circle" style={{backgroundColor: theme.primary}}></div>
              <div className="style-circle" style={{backgroundColor: theme.primary}}></div>
              <div className="style-line" style={{backgroundColor: theme.primary}}></div>
            </div>
             <div className="about-body">
                <div className="about-description">
                {isLoading ? <LineSkeleton/> :
                <>
                <h2 style={{color: theme.primary}}>{aboutData.title}</h2>
                <p style={{color:theme.tertiary80}}>{personalData?.aboutMe}</p>
                </>
}
                </div>
                <div className="about-img">
                    <img 
                        src={aboutData.image === 1 ? theme.aboutimg1 : theme.aboutimg2}  
                        alt="" 
                    />
                </div>
            </div>
        </div>

    )
}

export default About
