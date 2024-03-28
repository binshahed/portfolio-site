/* eslint-disable react/prop-types */
import { useContext } from "react";
import Fade from "react-reveal/Fade";

import { ThemeContext } from "../../../contexts/ThemeContext";

import "./SingleService.css";

function SingleService({ id, title, icon }) {
  const { theme } = useContext(ThemeContext);
  console.log(icon);
  return (
    <Fade bottom>
      <div
        key={id}
        className="single-service"
        style={{ backgroundColor: theme.primary30 }}
      >
        
        <div className="service-content" style={{ color: theme.tertiary }}>
        <img src={icon} alt="" style={{width: '70px', height: '70px', marginBottom:'50px'}} />
          <h4 style={{ color: theme.tertiary }}>{title} </h4>
        </div>
      </div>
    </Fade>
  );
}

export default SingleService;
