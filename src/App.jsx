import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import WebCamPage from "./components/WebCamPage";
import Results from "./components/Results";
import MainLayout from "./components/MainLayout";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/webcam" element={<WebCamPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
