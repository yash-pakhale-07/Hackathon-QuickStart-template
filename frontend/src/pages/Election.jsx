import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Election() {
    const navigate = useNavigate();

    const candidates = ["Aditi Sharma", "Rahul Patil", "Sneha Kulkarni"];

    const [votes, setVotes] = useState(() => {
        const saved = localStorage.getItem("votes");
        return saved
            ? JSON.parse(saved)
            : {
                "Aditi Sharma": 0,
                "Rahul Patil": 0,
                "Sneha Kulkarni": 0,
            };
    });

    const [hasVoted, setHasVoted] = useState(
        localStorage.getItem("hasVoted") === "true"
    );

    const handleVote = (name) => {
        if (hasVoted) {
            alert("You have already voted!");
            return;
        }

        const updatedVotes = { ...votes, [name]: votes[name] + 1 };
        setVotes(updatedVotes);
        localStorage.setItem("votes", JSON.stringify(updatedVotes));
        localStorage.setItem("hasVoted", "true");
        setHasVoted(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10">

            <h2 className="text-3xl mb-6 text-center">
                Vote for College Representative
            </h2>

            {candidates.map((name) => (
                <div
                    key={name}
                    className="mb-4 flex justify-between bg-gray-800 p-4 rounded-xl"
                >
                    <span>{name}</span>
                    <button
                        onClick={() => handleVote(name)}
                        className="bg-indigo-600 px-4 py-2 rounded"
                    >
                        Vote
                    </button>
                </div>
            ))}

            <div className="text-center mt-8">
                <button
                    onClick={() => navigate("/results", { state: votes })}
                    className="bg-green-600 px-6 py-3 rounded-xl"
                >
                    View Results
                </button>
            </div>

        </div>
    );
}
