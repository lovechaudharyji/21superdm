// // export default function Stages() {
// //     return (
// //       <>
// //         {/* stage 1 stage 2 stage 3 */}
// //         <section
// //           className="
// //             w-full py-20
// //             bg-gradient-to-r from-black via-[#E3356F] to-[#FF2D55]
// //             transition-all duration-500 ease-out
// //             hover:bg-gradient-to-r
// //             hover:from-[#F58529]
// //             hover:via-[#DD2A7B]
// //             hover:to-[#8134AF]
// //           "
// //         >
// //           <div className="container mx-auto px-4">
            
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
              
// //               {/* STAT 1 */}
// //               <div>
// //                 <h3 className="text-5xl font-bold mb-3">92%</h3>
// //                 <p className="text-lg font-medium">Average Open Rates*</p>
// //                 <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
// //               </div>
  
// //               {/* STAT 2 */}
// //               <div>
// //                 <h3 className="text-5xl font-bold mb-3">74%</h3>
// //                 <p className="text-lg font-medium">Average CTR*</p>
// //                 <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
// //               </div>
  
// //               {/* STAT 3 */}
// //               <div>
// //                 <h3 className="text-5xl font-bold mb-3">65%</h3>
// //                 <p className="text-lg font-medium">Increase Engagement*</p>
// //                 <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
// //               </div>
  
// //             </div>
  
// //           </div>
// //         </section>
// //       </>
// //     );
// //   }
//   "use client";
// import { useEffect, useRef, useState } from "react";

// export default function Stages() {
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef(null);

//   // ⬆️ Detect when the section is in viewport
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) setIsVisible(true);
//       },
//       { threshold: 0.5 }
//     );
//     if (ref.current) observer.observe(ref.current);
//   }, []);

//   // ➕ Count-up function
//   const countNumber = (end: number) => {
//     if (!isVisible) return 0;
//     return end;
//   };

//   return (
//     <section
//       ref={ref}
//       className="w-full py-20 text-white bg-gradient-to-r from-[#FF4D7A] via-[#FF6B8A] to-[#FF8FA8]"
//     >
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

//           {/* STAT 1 */}
//           <div>
//             <h3 className="text-5xl font-bold mb-3 transition-all duration-700">
//               {isVisible ? "92%" : "0%"}
//             </h3>
//             <p className="text-lg font-medium">Average Open Rates*</p>
//             <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
//           </div>

//           {/* STAT 2 */}
//           <div>
//             <h3 className="text-5xl font-bold mb-3 transition-all duration-700 delay-200">
//               {isVisible ? "74%" : "0%"}
//             </h3>
//             <p className="text-lg font-medium">Average CTR*</p>
//             <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
//           </div>

//           {/* STAT 3 */}
//           <div>
//             <h3 className="text-5xl font-bold mb-3 transition-all duration-700 delay-300">
//               {isVisible ? "65%" : "0%"}
//             </h3>
//             <p className="text-lg font-medium">Increase Engagement*</p>
//             <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";

const useCountUp = (end: number, trigger: boolean, delay = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1500; // 1.5s animation
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [trigger, end]);

  return count;
};

export default function Stages() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // 📌 Detect when section is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
  }, []);

  // 🎯 Target values
  const openRate = useCountUp(92, isVisible);
  const ctrRate = useCountUp(74, isVisible);
  const engagement = useCountUp(65, isVisible);

  return (
    <section
      ref={ref}
      className="w-full py-20 text-white bg-gradient-to-r from-[#FF4D7A] via-[#FF6B8A] to-[#FF8FA8]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          <div>
            <h3 className="text-6xl font-bold mb-3">{openRate}%</h3>
            <p className="text-lg font-medium">Average Open Rates*</p>
            <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
          </div>

          <div>
            <h3 className="text-6xl font-bold mb-3">{ctrRate}%</h3>
            <p className="text-lg font-medium">Average CTR*</p>
            <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
          </div>

          <div>
            <h3 className="text-6xl font-bold mb-3">{engagement}%</h3>
            <p className="text-lg font-medium">Increase Engagement*</p>
            <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
          </div>

        </div>
      </div>
    </section>
  );
}
