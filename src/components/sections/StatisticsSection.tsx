// // import { Star, Inbox, MousePointerClick, MessageSquare } from "lucide-react";

// // export default function StatisticsSection() {
// //   return (
// //     <>
// //       {/* Statistics Section */}
// //       <section className="py-16 bg-white">
// //         <div className="container mx-auto px-4">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
// //             {/* User Satisfaction */}
// //             <div className="flex flex-col items-center text-center">
// //               <div className="mb-4 h-8 w-full flex items-center justify-center">
// //                 <div className="flex items-center justify-center gap-1">
// //                   <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
// //                   <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
// //                   <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
// //                   <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
// //                 </div>
// //               </div>
// //               <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 leading-tight">
// //                 40,000+
// //               </p>
// //               <p className="text-sm md:text-base text-gray-600">
// //                 Happy LinkDM Users
// //               </p>
// //             </div>

// //             {/* Instagram DMs Sent */}
// //             <div className="flex flex-col items-center text-center">
// //               <div className="mb-4 h-8 w-full flex items-center justify-center">
// //                 <Inbox className="h-8 w-8 text-primary stroke-[2.5]" />
// //               </div>
// //               <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 leading-tight">
// //                 250 Million+
// //               </p>
// //               <p className="text-sm md:text-base text-gray-600">
// //                 Instagram DM's Sent
// //               </p>
// //             </div>

// //             {/* Link Clicks Monthly */}
// //             <div className="flex flex-col items-center text-center">
// //               <div className="mb-4 h-8 w-full flex items-center justify-center">
// //                 <MousePointerClick className="h-8 w-8 text-primary stroke-[2.5]" />
// //               </div>
// //               <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 leading-tight">
// //                 25 Million+
// //               </p>
// //               <p className="text-sm md:text-base text-gray-600">
// //                 Link Clicks Monthly
// //               </p>
// //             </div>

// //             {/* Comments Sent Monthly */}
// //             <div className="flex flex-col items-center text-center">
// //               <div className="mb-4 h-8 w-full flex items-center justify-center">
// //                 <MessageSquare className="h-8 w-8 text-primary stroke-[2.5]" />
// //               </div>
// //               <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 leading-tight">
// //                 15 Million+
// //               </p>
// //               <p className="text-sm md:text-base text-gray-600">
// //                 Comments Sent Monthly
// //               </p>
// //             </div>

// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // }
// import { Star, Inbox, MousePointerClick, MessageSquare } from "lucide-react";

// export default function StatisticsSection() {
//   return (
//     <section className="py-12 sm:py-16 lg:py-20 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

//           {/* User Satisfaction */}
//           <div className="flex flex-col items-center text-center space-y-2">
//             <div className="h-10 flex items-center justify-center">
//               <div className="flex gap-1">
//                 {[...Array(4)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className="h-5 w-5 sm:h-6 sm:w-6 fill-yellow-400 text-yellow-400"
//                   />
//                 ))}
//               </div>
//             </div>

//             <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
//               40,000+
//             </p>
//             <p className="text-xs sm:text-sm lg:text-base text-gray-600">
//               Happy LinkDM Users
//             </p>
//           </div>

//           {/* Instagram DMs Sent */}
//           <div className="flex flex-col items-center text-center space-y-2">
//             <div className="h-10 flex items-center justify-center">
//               <Inbox className="h-7 w-7 sm:h-8 sm:w-8 text-primary stroke-[2.5]" />
//             </div>

//             <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
//               250M+
//             </p>
//             <p className="text-xs sm:text-sm lg:text-base text-gray-600">
//               Instagram DMs Sent
//             </p>
//           </div>

//           {/* Link Clicks Monthly */}
//           <div className="flex flex-col items-center text-center space-y-2">
//             <div className="h-10 flex items-center justify-center">
//               <MousePointerClick className="h-7 w-7 sm:h-8 sm:w-8 text-primary stroke-[2.5]" />
//             </div>

//             <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
//               25M+
//             </p>
//             <p className="text-xs sm:text-sm lg:text-base text-gray-600">
//               Link Clicks Monthly
//             </p>
//           </div>

//           {/* Comments Sent Monthly */}
//           <div className="flex flex-col items-center text-center space-y-2">
//             <div className="h-10 flex items-center justify-center">
//               <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8 text-primary stroke-[2.5]" />
//             </div>

//             <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
//               15M+
//             </p>
//             <p className="text-xs sm:text-sm lg:text-base text-gray-600">
//               Comments Sent Monthly
//             </p>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Inbox, MousePointerClick, MessageSquare } from "lucide-react";

/* ---------------- COUNT UP COMPONENT ---------------- */
function CountUp({
  end,
  duration = 1500,
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const startTime = performance.now();

          const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const value = Math.floor(progress * end);
            setCount(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ---------------- STATISTICS SECTION ---------------- */
export default function StatisticsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Happy Users */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="h-10 flex items-center justify-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 sm:h-6 sm:w-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              <CountUp end={40000} />+
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              Happy LinkDM Users
            </p>
          </div>

          {/* Instagram DMs */}
          <div className="flex flex-col items-center text-center space-y-2">
            <Inbox className="h-7 w-7 sm:h-8 sm:w-8 text-primary stroke-[2.5]" />

            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              <CountUp end={250} />M+
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              Instagram DMs Sent
            </p>
          </div>

          {/* Link Clicks */}
          <div className="flex flex-col items-center text-center space-y-2">
            <MousePointerClick className="h-7 w-7 sm:h-8 sm:w-8 text-primary stroke-[2.5]" />

            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              <CountUp end={25} />M+
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              Link Clicks Monthly
            </p>
          </div>

          {/* Comments */}
          <div className="flex flex-col items-center text-center space-y-2">
            <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8 text-primary stroke-[2.5]" />

            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              <CountUp end={15} />M+
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              Comments Sent Monthly
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
