
export default function FeatureBreak() {
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
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed py-24"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.90), rgba(255,182,193,0.20)), url('/assets/bg1.png')",
      }}
    >
      {/* Header */}
      <div className="text-center mb-20">
        <p className="text-sm md:text-base font-bold text-primary uppercase tracking-wider mb-2">
          FEATURE FOCUS
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Feature Breakdown
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Dive into the specifics of each feature to elevate your Instagram strategy.
        </p>
      </div>

      {/* Features */}
      {features.map((feature, index) => (
        <div key={index} className="py-20">
          <div className="container mx-auto px-4 max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
            {feature.imageFirst && (
              <img src={feature.image} className="rounded-3xl " />
            )}

            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-700">{feature.description}</p>
            </div>

            {!feature.imageFirst && (
              <img src={feature.image} className="rounded-3xl " />
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
