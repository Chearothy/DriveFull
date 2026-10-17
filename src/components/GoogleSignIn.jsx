
import React from "react";

const API_URL = "http://localhost:5173";

export default function GoogleSignIn() {
  const signIn = () => {
    window.location.href = `${API_URL}/api/auth/login`;
  };

  return (
    <button
      onClick={signIn}
      className="flex items-center gap-3 rounded-full
                 border border-gray-300 bg-white px-5 py-3
                 text-gray-800 shadow-sm hover:bg-gray-50"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="h-5 w-5"
      />

      <span>Sign in with Google</span>
    </button>
  );
}
