import { useEffect } from "react";

export function TweetSection() {
  // Sample tweet data
  const tweets = [
    {
      id: 1,
      author: "CryptoEnthusiast",
      handle: "@crypto_fan",
      content: "Added more $PEPE to my wallet 🔥",
      likes: 42,
      time: "2h ago",
    },
    {
      id: 2,
      author: "Web3Builder",
      handle: "@web3_dev",
      content: "FOMO $1INCH 🔥🔥🔥",
      likes: 89,
      time: "5h ago",
    },
    {
      id: 3,
      author: "DeFi_Queen",
      handle: "@defi_lover",
      content: "BUY $1INCH 🚀🚀🚀🚀",
      likes: 124,
      time: "1d ago",
    },
    {
      id: 4,
      author: "NFT_Collector",
      handle: "@nft_whale",
      content:
        "Accumulate $MIGGLES CA: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      likes: 56,
      time: "2d ago",
    },
    {
      id: 5,
      author: "DAOGovernor",
      handle: "@dao_gov",
      content: "Next 10x coin  CA: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913!",
      likes: 211,
      time: "3d ago",
    },
    {
      id: 6,
      author: "BlockchainDev",
      handle: "@chain_coder",
      content: "Added more to my bags $DOGE 🐶🐶🐶",
      likes: 78,
      time: "4d ago",
    },
    {
      id: 7,
      author: "CryptoInfluencer",
      handle: "@crypto_voice",
      content: "BUY NOW $1INCH 🔥🔥🔥",
      likes: 342,
      time: "5d ago",
    },
  ];

  // Animation effect for lightning
  useEffect(() => {
    const interval = setInterval(() => {
      const paths = document.querySelectorAll(".lightning-path");
      paths.forEach((path) => {
        // Randomly change opacity to create flickering effect
        (path as HTMLElement).style.opacity = Math.random() > 0.7 ? "1" : "0.5";
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Calculate horizontal positions for tweets
  const calculatePositions = () => {
    const positions = [];
    const tweetCount = tweets.length;

    // Calculate positions to spread tweets evenly across the width
    for (let i = 0; i < tweetCount; i++) {
      // Position each tweet with some spacing between
      const leftPosition = (i / (tweetCount - 1)) * 100;

      // Random vertical offset for thrown effect
      const topOffset = Math.random() * 20 - 10; // -10px to +10px

      // Random rotation for thrown effect
      const rotation = Math.random() * 24 - 12; // -12 to 12 degrees

      positions.push({
        left: leftPosition,
        top: 50 + topOffset, // Center vertically with offset
        rotation: rotation,
        zIndex: Math.floor(Math.random() * 5) + 1,
      });
    }

    return positions;
  };

  const tweetPositions = calculatePositions();

  return (
    <div className="relative h-[400px] w-full overflow-hidden px-4">
      {/* Lightning bolts in background */}
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          className="absolute bg-gradient-to-b from-yellow-400 via-yellow-500/50 to-transparent animate-pulse"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 150 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 60 - 30}deg)`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 2 + 1}s`,
            zIndex: 0,
          }}
        ></div>
      ))}

      {/* Tweets in a single line */}
      <div className="relative w-full h-full z-50" style={{ top: "0px" }}>
        {tweets.map((tweet, index) => {
          const position = tweetPositions[index];

          return (
            <div
              key={tweet.id}
              className="absolute w-56 md:w-64 transition-all duration-500 hover:z-20 hover:scale-105"
              style={{
                top: `${position.top}%`,
                left: `${position.left}%`,
                transform: `translateX(-50%) rotate(${position.rotation}deg)`,
                zIndex: position.zIndex,
              }}
            >
              <TweetCard tweet={tweet} />

              {/* Lightning connecting to next tweet */}
              {index < tweets.length - 1 && (
                <svg
                  className="absolute top-1/2 right-0 w-full h-20 -z-10"
                  style={{
                    overflow: "visible",
                    pointerEvents: "none",
                    transformOrigin: "right center",
                  }}
                >
                  <path
                    d={generateHorizontalLightningPath()}
                    stroke="url(#lightning-gradient)"
                    strokeWidth={Math.random() * 1.5 + 0.5}
                    fill="none"
                    filter="url(#glow)"
                    className="lightning-path"
                    style={{ opacity: Math.random() > 0.5 ? 1 : 0.7 }}
                  />
                </svg>
              )}
            </div>
          );
        })}

        {/* SVG Definitions */}
        <svg
          className="absolute inset-0 w-0 h-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient
              id="lightning-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFD54F" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFC107" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFD54F" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Horizontal lightning connecting all tweets */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <path
          d={generateMainLightningPath()}
          stroke="url(#lightning-gradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          className="lightning-path"
          style={{ opacity: 0.9 }}
        />
      </svg>
    </div>
  );
}

// Helper function to generate horizontal lightning between tweets
function generateHorizontalLightningPath() {
  const startX = 0;
  const startY = 0;

  // End at the right edge with some random vertical offset
  const endX = 200 + Math.random() * 100; // Distance to next tweet
  const endY = Math.random() * 40 - 20; // Random vertical offset

  let path = `M${startX},${startY} `;

  // Create a jagged path with 2-4 points
  const points = Math.floor(Math.random() * 3) + 2;
  let currentX = startX;
  let currentY = startY;

  for (let j = 0; j < points; j++) {
    // Create a zigzag effect
    const progress = j / points;
    const newX =
      currentX +
      ((endX - startX) * progress) / points +
      (Math.random() * 20 - 10);
    const newY =
      currentY +
      ((endY - startY) * progress) / points +
      (Math.random() * 30 - 15);

    path += `L${newX},${newY} `;
    currentX = newX;
    currentY = newY;
  }

  // Final point
  path += `L${endX},${endY}`;

  return path;
}

// Helper function to generate main lightning path across all tweets
function generateMainLightningPath() {
  let path = `M0%,50% `; // Start from left edge

  // Create a jagged path with 10-15 points
  const points = Math.floor(Math.random() * 6) + 10;

  for (let i = 1; i < points; i++) {
    const x = (i / points) * 100; // Percentage across width
    const y = 50 + (Math.random() * 20 - 10); // Random vertical offset around center

    path += `L${x}%,${y}% `;
  }

  // Final point at right edge
  path += `L100%,50%`;

  return path;
}

export function TweetCard({ tweet }: { tweet: any }) {
  // Shortened content for better fit in single line
  const shortenedContent =
    tweet.content.length > 70
      ? tweet.content.substring(0, 70) + "..."
      : tweet.content;

  return (
    <div className="p-4 rounded-xl border border-yellow-500/20 bg-gradient-to-br from-black to-yellow-900/10 hover:from-black hover:to-yellow-900/20 transition-all duration-300 shadow-lg shadow-yellow-500/5 hover:shadow-yellow-500/15 backdrop-blur-sm">
      <div className="flex items-start mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-500/30 flex items-center justify-center text-yellow-400 mr-2">
          {tweet.author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{tweet.author}</div>
          <div className="text-yellow-500/50 text-xs">{tweet.handle}</div>
        </div>
      </div>
      <p className="text-white/80 text-sm mb-3 overflow-hidden">
        {shortenedContent}
      </p>
      <div className="flex justify-between text-xs text-yellow-500/50">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {tweet.likes}
        </div>
        <div>{tweet.time}</div>
      </div>
    </div>
  );
}
