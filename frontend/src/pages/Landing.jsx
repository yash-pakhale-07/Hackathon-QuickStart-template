import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { connectWallet } from "../algorand";

export default function Landing() {
    const navigate = useNavigate();
    const [wallet, setWallet] = useState(null);

    // Load wallet if already connected
    useEffect(() => {
        const savedWallet = localStorage.getItem("wallet");
        if (savedWallet) {
            setWallet(savedWallet);
        }
    }, []);

    const handleConnect = async () => {
        try {
            const account = await connectWallet();
            setWallet(account);
            localStorage.setItem("wallet", account);
        } catch (err) {
            alert("Wallet connection failed. Make sure Pera Wallet is installed.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 to-black text-white">

            <h1 className="text-4xl font-bold mb-6">
                Campus Election 2026 🗳️
            </h1>

            <button
                onClick={handleConnect}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl mb-4 transition"
            >
                {wallet
                    ? `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                    : "Connect Pera Wallet"}
            </button>

            <button
                onClick={() => navigate("/election")}
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl transition"
            >
                Enter Election
            </button>

        </div>
    );
}
