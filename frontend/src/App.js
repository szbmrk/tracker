import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./styles/styles.css";
import "./styles/main.css";
import Navbar from "./components/Navbar";
import Overall from "./components/stats/Overall";
import Seasonal from "./components/stats/Seasonal";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navbar />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Navigate to={"/overall"} />} />
                <Route path="overall" element={<Overall />} />
                <Route path="season/:seasonYear" element={<Seasonal />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;