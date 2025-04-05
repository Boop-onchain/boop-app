"use client";

import { TweetSection } from "@/components/tweet-card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ThunderLanding() {
  const [activeTab, setActiveTab] = useState("widgets");
  const router = useRouter();

  return (
    <div className=" relative overflow-hidden bg-black">
      {/* Thunder gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent opacity-30"></div>

      {/* Lightning bolt streaks */}
      <div className="absolute top-0 left-1/4 w-[2px] h-[30vh] bg-gradient-to-b from-yellow-400 via-yellow-500/50 to-transparent transform -rotate-12"></div>
      <div className="absolute top-0 right-1/3 w-[1px] h-[25vh] bg-gradient-to-b from-yellow-400 via-yellow-500/30 to-transparent transform rotate-3"></div>
      <div className="absolute top-[10%] right-1/4 w-[3px] h-[20vh] bg-gradient-to-b from-yellow-400 via-yellow-500/40 to-transparent transform -rotate-15"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center  px-4 pt-16 text-center">
        <div className="flex items-center justify-center mb-6 py-10">
          <div className="text-yellow-400 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 md:w-20 md:h-20"
            >
              <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
              BOOP
            </span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-md">
          Embed Onchain Actions Anywhere
        </p>

        <div className="flex space-x-4 mb-16">
          <button
            onClick={() => router.push("/widgets")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "widgets"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                : "bg-black border border-yellow-500/30 text-yellow-400 hover:border-yellow-400"
            }`}
          >
            Widgets
          </button>

          {/* <a
            href="#socials"
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "socials"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                : "bg-black border border-yellow-500/30 text-yellow-400 hover:border-yellow-400"
            }`}
          >
            Socials
          </a> */}
        </div>

        {/* Content based on active tab */}
        <div className="w-full max-w-6xl">
          {activeTab === "widgets" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <FeatureCard
                title="User onboarding"
                description="Create and deploy custom onchain widgets in minutes"
              />
              <FeatureCard
                title="Onchain distribution"
                description="Simple API to integrate with any website or app"
              />
              <FeatureCard
                title="Onchain tipping/checkout"
                description="Get real-time updates for all onchain activities"
              />
              <FeatureCard
                title="Integrating blockchain into everyday content experiences"
                description="Track performance with detailed analytics"
              />
            </div>
          )}

          {activeTab === "socials" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                title="Social Sharing"
                description="Share your onchain actions across social platforms"
              />
              <FeatureCard
                title="Community Building"
                description="Build and grow your community with onchain actions"
              />
              <FeatureCard
                title="Engagement Tools"
                description="Increase engagement with interactive elements"
              />
              <FeatureCard
                title="Rewards System"
                description="Reward your community for their participation"
              />
            </div>
          )}
        </div>
      </div>

      <section style={{ top: "-153px" }} id="socials">
        <TweetSection />
      </section>

      {/* Footer */}
      <footer className="absolute bottom-4 left-4 text-yellow-500/50 text-sm">
        N
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-black to-yellow-900/10 hover:from-black hover:to-yellow-900/20 transition-all duration-300">
      <h3 className="text-xl font-semibold text-yellow-400 mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
}
