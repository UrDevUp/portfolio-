import React , {Suspense} from "react";
import { useIsMdUp } from "@/hooks/useIsMdUp";
import Loading from "@/layouts/Loading";
const About = React.lazy(() => import("@/pages/About"));
const Team = React.lazy(() => import("@/pages/Team"));

function HorizontalSection() {
  const isMdUp = useIsMdUp();

  if (isMdUp) {
    // Render horizontal section only on md and up
    return (
      <section id="horizontal" className="section flex bg-white dark:bg-black">
        <div className="content z-10">
          {/* section 1 */}
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        </div>
        <div className="content">
          {/* section 2 */}
          <Suspense fallback={<Loading />}>
            <Team />
          </Suspense>
        </div>
      </section>
    );
  } else {
    // Render About and Team vertically only on mobile
    return (
      <>
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Team />
        </Suspense>
      </>
    );
  }
}
export default HorizontalSection;
