import React, { useState } from "react";
import { useNavigate } from "react-router";

const EmailOtp = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const handleSendOtp = async () => {
        if (!email) return alert("Enter email first");

        try {
            const response = await fetch("http://localhost:3001/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            console.log(result);

            // ✅ move to OTP tab
            setActiveTab("otp");

            // ❌ don't clear email (needed for verify)
            // setEmail("");

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) return alert("Enter OTP");

        try {
            const response = await fetch("http://localhost:3001/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            const result = await response.json();
            console.log(result);

            alert("OTP Verified ✅");
            navigate("/")

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            style={{
                width: "320px",
                margin: "50px auto",
                fontFamily: "Arial",
            }}
        >
            {/* Tabs */}
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <button
                    onClick={() => setActiveTab("email")}
                    style={{
                        flex: 1,
                        padding: "10px",
                        border: "none",
                        background: activeTab === "email" ? "#007bff" : "#eee",
                        color: activeTab === "email" ? "#fff" : "#000",
                    }}
                >
                    Email
                </button>

                <button
                    disabled={!email}
                    onClick={() => setActiveTab("otp")}
                    style={{
                        flex: 1,
                        padding: "10px",
                        border: "none",
                        background: activeTab === "otp" ? "#007bff" : "#eee",
                        color: activeTab === "otp" ? "#fff" : "#000",
                        opacity: !email ? 0.6 : 1,
                    }}
                >
                    OTP
                </button>
            </div>

            {/* Email */}
            {activeTab === "email" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: "10px", border: "1px solid #ccc" }}
                    />
                    <button
                        onClick={handleSendOtp}
                        style={{
                            padding: "10px",
                            background: "#007bff",
                            color: "#fff",
                            border: "none",
                        }}
                    >
                        Send OTP
                    </button>
                </div>
            )}

            {/* OTP */}
            {activeTab === "otp" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ padding: "10px", border: "1px solid #ccc" }}
                    />
                    <button
                        onClick={handleVerifyOtp}
                        style={{
                            padding: "10px",
                            background: "#28a745",
                            color: "#fff",
                            border: "none",
                        }}
                    >
                        Verify OTP
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmailOtp;