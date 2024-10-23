/* eslint-disable react/prop-types */

import Fade from 'react-reveal/Fade';

import placeholder from '../../../assets/png/placeholder.png'
import './SingleBlog.css'
import { Link } from 'react-router-dom';

function SingleBlog({ theme, title,  date, image, url, id }) {

    const maxWords = 30;
const truncatedDate = date.split(" ").slice(0, maxWords).join(" ") + ".....";
const slugData = title.split(" ").slice(0, 10).join(" ") + ".....";



    return (
        <Fade bottom>
            <Link to={url} className="singleBlog" key={id}  style={{backgroundColor: theme.primary400}}>
                <div className="singleBlog--image" style={{backgroundColor: theme.secondary}}>
                    <img src={image ? image : placeholder} alt={title} />
                </div>
                <div className="singleBlog--body">
                    
                    <h3 style={{color: theme.secondary}}>{slugData}</h3>
                    {/* <h6 style={{color: theme.secondary}}>{slugData}</h6> */}
                    {/* <p style={{color: theme.tertiary}}>{date}</p> */}
                    <div
                        dangerouslySetInnerHTML={{__html: truncatedDate}}
                        style={{color: '#000'}}
                        />
                </div>
            </Link>
        </Fade>
    )
}

export default SingleBlog
