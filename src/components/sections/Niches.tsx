
export default function NichesSection() {
  const niches = [
    { name: "Mavely Creators", color: "border-purple-400" },
    { name: "Fashion Creators", color: "border-purple-400" },
    { name: "Amazon Creators", color: "border-purple-400" },
    { name: "LTK Creators", color: "border-purple-400" },
    { name: "Food Creators", color: "border-red-400" },
    { name: "Beauty Creators", color: "border-pink-400" },
    { name: "Travel Creators", color: "border-blue-400" },
    { name: "DIY Home Creators", color: "border-green-400" },
    { name: "Designers", color: "border-purple-400" },
    { name: "Musicians", color: "border-purple-400" },
    { name: "Podcasters", color: "border-purple-400" },
    { name: "Photography", color: "border-purple-400" },
    { name: "Health & Fitness Creators", color: "border-purple-400" },
    { name: "Realtors", color: "border-purple-400" },
    { name: "Education Creators", color: "border-purple-400" },
    { name: "Non-Profit Organisations", color: "border-purple-400" },
  ];

  return (
    <section className=" pt-0 pb-24 ">
      <div className="mx-auto max-w-[1400px] px-4">

        {/* Header */}
        <div className="text-center mb-5 pt-18">
          <p className="text-base md:text-lg font-bold text-primary uppercase tracking-wider">
            Niches
          </p>
        </div>

        {/* Niches Pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {niches.map((niche) => (
            <div
              key={niche.name}
              className={`px-5 md:px-6 py-2.5 md:py-3 bg-white rounded-full border-2 ${niche.color}
                text-gray-900 font-medium text-sm
                hover:shadow-md transition-shadow
                whitespace-nowrap`}
            >
              {niche.name}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
