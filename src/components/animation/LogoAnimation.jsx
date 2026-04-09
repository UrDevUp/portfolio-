import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const LogoAnimation = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path");

    // Set the initial state of the logo using GSAP for reliability
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: path.getAttribute("data-final-fill") || path.getAttribute("fill"),
        fillOpacity: 0, // Fill is initially transparent
        stroke: "#ffffff",
        strokeOpacity: 1, // Stroke is initially visible
        strokeWidth: 3,
      });
    });

    // Create the timeline once
    const tl = gsap.timeline({
      paused: true,
      repeat: -1, // Loop forever
      repeatDelay: 1, // 1-second pause between each loop
    });

    // 1. Draw the strokes
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power1.inOut",
      stagger: 0.5, // Use GSAP's stagger for cleaner code
    });

    // 2. Cross-fade: Fade in the fill while fading out the stroke
    tl.to(
      paths,
      {
        fillOpacity: 1, // Fade in fill
        strokeOpacity: 0, // Fade out stroke
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5", // Start this animation 0.5s before the previous one ends
    );

    // --- No manual reset is needed! GSAP's repeat handles it. ---

    // Use the observer to play or pause the timeline
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
          } else {
            tl.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(svg);

    // Cleanup function
    return () => {
      observer.disconnect();
      tl.kill(); // Important: stop and kill the timeline on unmount
    };
  }, []);

  // The returned JSX is unchanged
  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center">
      {/* ... your full SVG code here ... */}
      <svg
        ref={svgRef}
        width="270"
        height="357"
        viewBox="0 0 150 197"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[200px] md:w-[300px]"
      >
        <path
          d="M20.6082 34.2888C20.6622 29.7579 15.8669 26.8046 11.845 28.8917L4.73637 32.5805C2.74797 33.6124 1.5 35.666 1.5 37.9062V115.207C1.5 117.386 2.68166 119.394 4.58685 120.452L48.28 144.718C52.2792 146.939 57.1931 144.048 57.1931 139.473V28.482C57.1931 26.6753 58.0423 24.9738 59.4859 23.8875C61.3146 22.5115 63.7852 22.351 65.7765 23.4788L100.561 43.1793C102.442 44.2445 103.604 46.2388 103.604 48.4002V104.211C103.604 106.401 102.411 108.417 100.491 109.471L94.9215 112.529C90.9229 114.724 86.0342 111.83 86.0342 107.269V50.127C86.0342 47.9317 84.8353 45.9116 82.9081 44.8601L76.0122 41.0974C72.0139 38.9158 67.1384 41.8097 67.1384 46.3644V139.443C67.1384 144.025 72.0654 146.916 76.0648 144.681L119.426 120.455C121.324 119.395 122.5 117.391 122.5 115.217V37.7773C122.5 35.6053 121.326 33.6028 119.431 32.5418L65.3483 2.26459C63.5709 1.26951 61.4099 1.24423 59.6097 2.19747L41.8211 11.6165C39.8571 12.6565 38.6288 14.6968 38.6288 16.9191V107.608C38.6288 112.09 33.8931 114.99 29.901 112.952L23.049 109.455C21.0179 108.418 19.7501 106.32 19.7772 104.039L20.6082 34.2888Z"
          fill="#ffffff"
          stroke="#ffffff"
          stroke-width="0.5"
        />

        <defs>
          <linearGradient
            id="paint0_linear_2033_26"
            x1="256.309"
            y1="0"
            x2="256.309"
            y2="761.641"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0240385" stopColor="#D5C05C" />
            <stop offset="0.950555" stopColor="#47412B" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2033_26"
            x1="256.309"
            y1="0"
            x2="256.309"
            y2="761.641"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0240385" stopColor="#D5C05C" />
            <stop offset="0.950555" stopColor="#47412B" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2033_26"
            x1="256.309"
            y1="0"
            x2="256.309"
            y2="761.641"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0240385" stopColor="#D5C05C" />
            <stop offset="0.950555" stopColor="#47412B" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2033_26"
            x1="256.309"
            y1="0"
            x2="256.309"
            y2="761.641"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0240385" stopColor="#D5C05C" />
            <stop offset="0.950555" stopColor="#47412B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LogoAnimation;
