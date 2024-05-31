import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MyPage from "./my-page/MyPage";
import MyCampingList from "./my-page/MyCampingList";
import MyCampingReservationList from "./my-page/MyCampingReservationList";
import MyCampingResister from "./my-page/MyCampingRegister";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/my-page">My Page</Link>
            </li>
            <li>
              <Link to="/my-camping-list">My Camping List</Link>
            </li>
            <li>
              <Link to="/my-camping-reservation-list">
                My Camping reservation List
              </Link>
            </li>
            <li>
              <Link to="/my-camping-register">My Camping register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/my-camping-list" element={<MyCampingList />} />
          <Route
            path="/my-camping-reservation-list"
            element={<MyCampingReservationList />}
          />
          <Route path="/my-camping-register" element={<MyCampingResister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
