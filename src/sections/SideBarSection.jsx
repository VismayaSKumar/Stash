import React, { use } from "react";
import { useNavigate } from "react-router-dom";

function SidebarSection({ isOpen, onClose, isAuthenticated, savedImages, onSignIn, onLogout }) {
  const navigate = useNavigate();
  const goToSignUp=()=>{
    navigate("/signup");
  }
  const goToLogin=()=>{
    navigate("/login")
  }
  return (
    
    <div
      className={`fixed top-0 right-0 h-full my-3 w-110 font-fraunces border-1 border-white bg-primary rounded-l-4xl shadow-lg z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
      <button className="absolute top-4 right-4 text-5xl font-semibold " onClick={onClose}>
        &times;
      </button>

      <div className="p-8 flex flex-col gap-6">
        {isAuthenticated ? (
          <>
            <h2 className="text-xl font-bold">Saved Memories</h2>
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {savedImages.length > 0 ? (
                savedImages.map((img, idx) => (
                  <img key={idx} src={img.src} alt={`Memory ${idx + 1}`} className="w-full h-20 object-cover rounded" />
                ))
              ) : (
                <p>No saved images yet.</p>
              )}
            </div>
            <button
              className="mt-6 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl text-last font-fraunces font-bold m-4">Welcome!</h2>
            <button className="mt-3 mx-2 px-5 py-2 rounded-full bg-secondary text-black hover:bg-white duration-300"
              onClick={goToLogin} >LogIn
            </button>
            <button className="mt-1 mx-2 px-5 py-2 rounded-full bg-secondary text-black hover:bg-white duration-300"
              onClick={goToSignUp} >Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SidebarSection;
