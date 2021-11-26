import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MyHeader from "./Header";
import Home from "../Routes/Home";

const AppRouter = () => {
  return (
    <Router>
      <MyHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
};

export default AppRouter;
