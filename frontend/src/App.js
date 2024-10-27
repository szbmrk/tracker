import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./styles/styles.css";
import "./styles/statspage.css";
import Navbar from "./components/Navbar";
import StatsPage from "./components/stats/StatsPage";

function App() {
    return (
        <BrowserRouter basename="/r6">
            <Routes>
                <Route path="*" element={<Navbar />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Navigate to={"/overall"} />} />
                <Route path="overall" element={<StatsPage seasonal={false} />} />
                <Route path="season/:seasonYear" element={<StatsPage seasonal={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;