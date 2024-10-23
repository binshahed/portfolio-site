
import {
  BrowserRouter as Router,
  Route,
  Switch,
  
} from "react-router-dom";

import { Main, BlogPage, ProjectPage } from "./pages";
import { BackToTop } from "./components";
import ScrollToTop from "./utils/ScrollToTop";


import "./App.css";
import BlogDetailPage from "./pages/Blog/BlogDetailPage";
import ProjectDetailPage from "./pages/Project/ProjectDetailPage";

function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/blog" exact component={BlogPage} />
          <Route path="/blog/:id" exact component={BlogDetailPage} />
          <Route path="/projects" exact component={ProjectPage} />
          <Route path="/projects/:id" exact component={ProjectDetailPage} />

          <Route path="*" component={() => <h1>No Page Found</h1>} />
        </Switch>
      </Router>
      <BackToTop />
    </div>
  );
}

export default App;
