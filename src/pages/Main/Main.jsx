import { Helmet } from "react-helmet";

import {
  Navbar,
  Footer,
  Landing,
  About,
  Skills,
  Blog,
  Education,
  Experience,
  Contacts,
  Projects,
  Services,
  Achievement,
} from "../../components";
import { headerData } from "../../data/headerData";
import { useEffect, useState } from "react";
import axiosInstance from './../../axiosInstance/index';

function Main() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/personalInfo'); // Replace with your endpoint
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
    <div>
      <Helmet>
        <title>{headerData.name} - Portfolio</title>
      </Helmet>

      <Navbar />
      <Landing personalData={data?.data} isLoading={loading} />
      <About personalData={data?.data} isLoading={loading} />
      <Experience />
      <Education />
      <Skills />
     
      <Projects />
      <Achievement />
      <Services />
      {/* <Testimonials /> */}
      <Blog />
      <Contacts />
      <Footer />
    </div>
  );
}

export default Main;
