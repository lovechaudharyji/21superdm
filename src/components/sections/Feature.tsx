export default function FeatureBreakdownSection() {
  const features = [
    {
      title: "Auto-Reply to Instagram Reel Comments",
      description:
        "Reply to Instagram reel comments automatically with a DM sent straight to the users inbox. Add trigger keywords or respond to all comments.",
      image: "/assets/1.png",
      imageFirst: true,
    },
    {
      title: "Auto-Reply to Instagram Post Comments",
      description:
        "Reply to Instagram post comments automatically with a DM sent straight to the users inbox. Add trigger keywords or respond to all comments.",
      image: "/assets/2.png",
      imageFirst: false,
    },
    {
      title: "Auto-Respond to Instagram Story Replies",
      description:
        "Automatically respond to story replies with a DM sent directly to the users inbox. Add trigger keywords or respond to all comments.",
      image: "/assets/3.png",
      imageFirst: true,
    },
    {
      title: "Auto-Reply to Instagram Story Mentions",
      description:
        "Automatically respond to story @mentions with a message sent directly to the users inbox.",
      image: "/assets/4.png",
      imageFirst: false,
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-0 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-1">
            <p className="text-sm md:text-base font-bold text-primary uppercase tracking-wider mb-2">
              FEATURE FOCUS
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Feature Breakdown
            </h2>

            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Dive into the specifics of each feature, understanding its functionality and how it can elevate your Instagram strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      {features.map((feature, index) => (
        <section key={index} className="py-2 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {feature.imageFirst && (
                  <div className="relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-auto rounded-2xl"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {!feature.imageFirst && (
                  <div className="relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-auto rounded-2xl"
                    />
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
