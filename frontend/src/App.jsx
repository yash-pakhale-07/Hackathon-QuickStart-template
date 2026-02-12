import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Election from "./pages/Election";
import Results from "./pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/election" element={<Election />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
