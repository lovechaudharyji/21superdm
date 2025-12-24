// export default function Badges() {
//   return (
//     <section className="py-24 bg-[#FAFAFA]">
//       <div className="container mx-auto px-4">
        
//         <div
//           className="
//             rounded-2xl
//             bg-white
//             shadow-[0_20px_40px_hsl(var(--primary)/0.12)]
//             border border-primary/20
//             p-8 md:p-12
//             max-w-8xl mx-auto
//           "
//         >
//           <div className="grid lg:grid-cols-2 gap-12 items-center">

//             {/* LEFT SIDE */}
//             <div>
//               <p className="text-sm md:text-base font-bold text-primary uppercase tracking-wider mb-4">
//                 BADGED PARTNER
//               </p>

//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
//                 LinkDM is a Meta Business Partner
//               </h2>

//               <p className="text-base md:text-lg text-gray-600 leading-relaxed">
//                 We've been a certified Meta Business Partner since 2021, offering
//                 peace of mind to our 40,000+ users by ensuring complete compliance
//                 with automation standards across both Instagram and Facebook.
//               </p>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex justify-center lg:justify-end">
//               <div
//                 className="
//                   rounded-xl
//                   bg-gradient-to-br from-primary to-primary/80
//                   px-10 py-8
//                   text-center
//                   shadow-lg
//                 "
//               >
//                 <div className="flex items-center gap-2 justify-center">
//                   <span className="text-5xl font-bold text-white">
//                     Meta
//                   </span>
//                 </div>

//                 <span className="block text-3xl font-semibold text-white mt-2">
//                   Business Partners
//                 </span>
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
export default function Badges() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        
        <div
          className="
            rounded-2xl
            bg-white
            shadow-[0_20px_40px_hsl(var(--primary)/0.12)]
            border border-primary/20
            p-8 md:p-12
            max-w-8xl mx-auto
          "
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE */}
            <div>
              <p className="text-sm md:text-base font-bold text-primary uppercase tracking-wider mb-4">
                BADGED PARTNER
              </p>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                LinkDM is a Meta Business Partner
              </h2>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We've been a certified Meta Business Partner since 2021, offering
                peace of mind to our 40,000+ users by ensuring complete compliance
                with automation standards across both Instagram and Facebook.
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="
                  rounded-xl
                  bg-gradient-to-br from-primary to-primary/80
                  px-10 py-8
                  text-center
                  shadow-lg
                "
              >
                <div className="flex items-center gap-2 justify-center">
                  <span
                    className="text-5xl font-bold"
                    style={{ color: "#1877F2" }} // Meta official blue
                  >
                    Meta
                  </span>
                </div>

                <span className="block text-3xl font-semibold text-white mt-2">
                  Business Partners
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
