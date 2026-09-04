
"use client";


import { useState } from "react";

export default function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>

      <p className="text-lg text-gray-700">
        This about page shares more information about my background and work.
      </p>

      {showMore && (
        <div className="mt-6">
          <p className="text-gray-700 mb-4">
            I am a software development student passionate about building
            useful and modern web applications. I enjoy learning new
            technologies and turning ideas into practical solutions.
          </p>

          <p className="text-gray-700">
            My goal is to continue improving my development skills while
            creating projects that solve real-world problems.
          </p>
        </div>
      )}

      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-6 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        {showMore ? "Show Less" : "Read More"}
      </button>
    </main>
  );
}
