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

function Main() {
  return (
    <div>
      <Helmet>
        <title>{headerData.name} - Portfolio</title>
      </Helmet>

      <Navbar />
      <Landing />
      <About />
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
