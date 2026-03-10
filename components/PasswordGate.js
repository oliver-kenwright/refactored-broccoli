"use client";

import { useState, useEffect } from "react";

const PASSWORD = "pizza";

export default function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("authenticated") === "true") {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem("authenticated", "true");
      setAuthenticated(true);
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 600);
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-bg" />;
  }

  if (authenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <span className="font-display text-4xl text-text">OK.</span>

        <form onSubmit={handleSubmit} className="mt-10">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className={`w-full px-4 py-3 rounded-lg border text-base font-sans text-text bg-white
              outline-none transition-all placeholder:text-text-muted/50
              ${error
                ? "border-red-400 animate-[shake_0.3s_ease-in-out]"
                : "border-border focus:border-primary"
              }`}
          />

          {error && (
            <p className="mt-3 text-sm text-red-500 font-sans">
              Wrong password. Try again.
            </p>
          )}

          <button
            type="submit"
            className="mt-4 w-full px-6 py-3 bg-primary text-white font-sans font-semibold text-sm rounded-lg hover:bg-primary-dark transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
