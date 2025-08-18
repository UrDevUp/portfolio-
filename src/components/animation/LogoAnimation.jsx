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
        stroke: "url(#paint0_linear_2033_26)",
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
      "-=0.5" // Start this animation 0.5s before the previous one ends
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
      { threshold: 0.5 }
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
        width="413"
        height="600"
        viewBox="0 0 513 762"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[200px] md:w-[300px]">
        <path
          d="M253.393 761.641C396.56 761.641 512.619 641.887 512.619 494.164C512.619 346.44 398.56 228.024 253.393 231.368L252.097 232.705L189.883 302.918H256.633C480.864 302.918 504.842 680.729 257.282 689.034C213.213 690.512 77.7677 689.034 77.7677 689.034L16.2016 761.641C16.2016 761.641 211.176 761.641 253.393 761.641Z"
          fill="url(#paint0_linear_2033_26)"
          data-final-fill="url(#paint0_linear_2033_26)"
        />
        <path
          d="M241.728 236.717L316.255 165.836V0L241.728 88.9362V236.717Z"
          fill="url(#paint1_linear_2033_26)"
          data-final-fill="url(#paint1_linear_2033_26)"
        />
        <path
          d="M312.367 395.866V567.052L236.543 635.927V353.739C253.206 354.842 267.002 353.739 279.964 356.413C299.406 362.771 312.367 378.244 312.367 395.866Z"
          fill="url(#paint2_linear_2033_26)"
          data-final-fill="url(#paint2_linear_2033_26)"
        />
        <path
          d="M3.24032 666.687L77.7677 585.106V92.9483L0 0V670.699L3.24032 666.687Z"
          fill="url(#paint3_linear_2033_26)"
          data-final-fill="url(#paint3_linear_2033_26)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2033_26"
            x1="256.309"
            y1="0"
            x2="256.309"
            y2="761.641"
            gradientUnits="userSpaceOnUse">
            <stop offset="0.0240385" stopColor="#D5C05C" />
            <stop offset="0.950555" stopColor="#47412B" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2033_26"
            x1="256.309"
            y1="0"
            x2="256.309"
            y2="761.641"
            gradientUnits="userSpaceOnUse">
            <stop offset="0.0240385" stopColor="#D5C05C" />
            <stop offset="0.950555" stopColor="#47412B" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2033_26"
            x1="256.309"
            y1="0"
            x2="256.309"
            y2="761.641"
            gradientUnits="userSpaceOnUse">
            <stop offset="0.0240385" stopColor="#D5C05C" />
            <stop offset="0.950555" stopColor="#47412B" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2033_26"
            x1="256.309"
            y1="0"
            x2="256.309"
            y2="761.641"
            gradientUnits="userSpaceOnUse">
            <stop offset="0.0240385" stopColor="#D5C05C" />
            <stop offset="0.950555" stopColor="#47412B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LogoAnimation;
