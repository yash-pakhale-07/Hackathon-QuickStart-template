import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const votes = location.state || {};

    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const winner = sorted[0];

    const resetElection = () => {
        localStorage.removeItem("votes");
        localStorage.removeItem("hasVoted");
        alert("Election reset!");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-black text-white p-10">

            <h2 className="text-3xl mb-6 text-center">Election Results</h2>

            {sorted.map(([name, count]) => (
                <div
                    key={name}
                    className="mb-4 bg-gray-800 p-4 rounded-xl flex justify-between"
                >
                    <span>{name}</span>
                    <span>{count} Votes</span>
                </div>
            ))}

            {winner && (
                <div className="mt-8 text-center text-2xl text-green-400">
                    🏆 Winner: {winner[0]}
                </div>
            )}

            <div className="text-center mt-10 space-x-4">
                <button
                    onClick={() => navigate("/")}
                    className="bg-indigo-600 px-6 py-3 rounded-xl"
                >
                    Back Home
                </button>

                <button
                    onClick={resetElection}
                    className="bg-red-600 px-6 py-3 rounded-xl"
                >
                    Reset Election
                </button>
            </div>

        </div>
    );
}
