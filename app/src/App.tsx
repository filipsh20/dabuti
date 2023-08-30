import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./secure/PrivateRoute";
import PublicRoute from "./secure/PublicRoute";

import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PublicRoute element={<Navigate to="/" />} />} />
        <Route path="/" element={<PublicRoute element={<Auth />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
