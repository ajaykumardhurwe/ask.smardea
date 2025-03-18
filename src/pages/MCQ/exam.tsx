import { Link } from "react-router-dom";
import { useRef } from "react";

export function Exam() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const buttons = [
    { label: "CgPsc", path: "/cgpsc", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "CgVyapam", path: "/settings", color: "bg-red-600 hover:bg-red-700" },
    { label: "SSC", path: "/logout", color: "bg-yellow-600 hover:bg-yellow-700" },
    { label: "Railway", path: "/dashboard", color: "bg-purple-600 hover:bg-purple-700" },
    { label: "Upsc", path: "/contact", color: "bg-pink-600 hover:bg-pink-700" },
    { label: "MpPsc", path: "/help", color: "bg-teal-600 hover:bg-teal-700" },
    { label: "Banking", path: "/faq", color: "bg-indigo-600 hover:bg-indigo-700" },
    { label: "Others", path: "/feedback", color: "bg-green-600 hover:bg-green-700" },
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 50,
        width: "100%",
        padding: "10px",
        backgroundColor: "transparent",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
      }}
    >
      <button
        onClick={scrollLeft}
        className="p-2 bg-gray-300 rounded-full mx-2 shadow-md hover:bg-gray-400"
      >
        ◀
      </button>

      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
          maxWidth: "180px", // Adjust width to show 4 buttons at a time
        }}
      >
        {buttons.map((button, index) => (
          <Link
            key={index}
            to={button.path}
            className={`px-6 py-2 mx-2 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 ${button.color}`}
          >
            {button.label}
          </Link>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="p-2 bg-gray-300 rounded-full mx-2 shadow-md hover:bg-gray-400"
      >
        ▶
      </button>
    </div>
  );
}
