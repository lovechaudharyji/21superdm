export default function Stages() {
    return (
      <>
        {/* stage 1 stage 2 stage 3 */}
        <section
          className="
            w-full py-20
            bg-gradient-to-r from-black via-[#E3356F] to-[#FF2D55]
            transition-all duration-500 ease-out
            hover:bg-gradient-to-r
            hover:from-[#F58529]
            hover:via-[#DD2A7B]
            hover:to-[#8134AF]
          "
        >
          <div className="container mx-auto px-4">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
              
              {/* STAT 1 */}
              <div>
                <h3 className="text-5xl font-bold mb-3">92%</h3>
                <p className="text-lg font-medium">Average Open Rates*</p>
                <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
              </div>
  
              {/* STAT 2 */}
              <div>
                <h3 className="text-5xl font-bold mb-3">74%</h3>
                <p className="text-lg font-medium">Average CTR*</p>
                <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
              </div>
  
              {/* STAT 3 */}
              <div>
                <h3 className="text-5xl font-bold mb-3">65%</h3>
                <p className="text-lg font-medium">Increase Engagement*</p>
                <p className="text-sm mt-2 opacity-90">*As of May 2025</p>
              </div>
  
            </div>
  
          </div>
        </section>
      </>
    );
  }
  