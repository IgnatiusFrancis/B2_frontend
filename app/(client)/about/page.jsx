"use client";
import React from "react";
import Image from "next/image";
import NoContentDesign from "@/components/NoContent";

const About = () => {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "200+", label: "Content Plays" },
    { value: "500+", label: "Happy Users" },
    { value: "10", label: "Awards Won" },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-200">
            About Us
          </h1>
          <div className="w-20 h-1 bg-blue-600 mb-8"></div>
          <p className="text-white max-w-2xl">
            We create meaningful experiences through innovative content and
            technology, bringing the best entertainment to our users worldwide.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-12 mb-20">
          <div className="md:w-1/2">
            <NoContentDesign />
          </div>

          <div className="md:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-200">
              We Bring You the Best Content
            </h2>

            <p className="text-white">
              Our platform combines cutting-edge technology with creative
              excellence to deliver exceptional entertainment experiences.
              We&#39;re passionate about connecting artists with audiences and
              creating moments that inspire.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="border-l-2 border-blue-600 pl-4">
                  <div className="text-3xl font-bold text-gray-200">
                    {stat.value}
                  </div>
                  <div className="text-white text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-200">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t-2 border-blue-600 pt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-200">
                Trending Videos
              </h3>
              <p className="text-white">
                Curated selection of viral and trending content across various
                genres.
              </p>
            </div>
            <div className="border-t-2 border-blue-600 pt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-200">
                Music
              </h3>
              <p className="text-white">
                Extensive library of tracks from emerging artists to
                chart-topping hits.
              </p>
            </div>
            <div className="border-t-2 border-blue-600 pt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-200">
                Events
              </h3>
              <p className="text-white">
                Exclusive access to live performances, virtual concerts, and
                special events.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-200">
              Our Vision
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
            <p className="text-white">
              To revolutionize digital entertainment by creating a global
              platform that empowers creators and delivers exceptional content
              experiences to audiences worldwide.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-200">
              Our Mission
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
            <p className="text-white">
              To connect, inspire, and entertain through innovative technology
              and compelling content, while fostering a community of creativity
              and engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
