import { BadgeCheck } from "lucide-react";

/* ---------------- DATA ---------------- */

const creators = [
  { name: "@snipestwins", image: "https://i.pravatar.cc/150?img=1" },
  { name: "@danielle.donohue", image: "https://i.pravatar.cc/150?img=2" },
  { name: "@nicoles_outfit_inspirations", image: "https://i.pravatar.cc/150?img=3" },
  { name: "@msgoldgirl", image: "https://i.pravatar.cc/150?img=4" },
  { name: "@withlovechelss", image: "https://i.pravatar.cc/150?img=5" },
  { name: "@justglow011", image: "https://i.pravatar.cc/150?img=6" },
  { name: "@im_lola__", image: "https://i.pravatar.cc/150?img=7" },
  { name: "@yvetteg23", image: "https://i.pravatar.cc/150?img=8" },
  { name: "@bromabakery", image: "https://i.pravatar.cc/150?img=9" },
  { name: "@zee_styledit", image: "https://i.pravatar.cc/150?img=10" },
  { name: "@mytexashouse", image: "https://i.pravatar.cc/150?img=11" },
  { name: "@laurajaneillustrations", image: "https://i.pravatar.cc/150?img=12" },
  { name: "@rachaelsgoodeats", image: "https://i.pravatar.cc/150?img=13" },
  { name: "@just.jacsy", image: "https://i.pravatar.cc/150?img=14" },
  { name: "@the_pastaqueen", image: "https://i.pravatar.cc/150?img=15" },
  { name: "@sammymontgoms", image: "https://i.pravatar.cc/150?img=16" },
  { name: "@getschooledinfashion", image: "https://i.pravatar.cc/150?img=17" },
  { name: "@nutritionbymia", image: "https://i.pravatar.cc/150?img=18" },
  { name: "@interiordesignerella", image: "https://i.pravatar.cc/150?img=19" },
  { name: "@eatingbirdfood", image: "https://i.pravatar.cc/150?img=20" },
  { name: "@just.ingredients", image: "https://i.pravatar.cc/150?img=21" },
  { name: "@monicsutter", image: "https://i.pravatar.cc/150?img=22" },
];

/* ---------------- COMPONENT ---------------- */

export default function LinkDMSection() {
  return (
    <section className="  py-14 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2">
            Who&apos;s Using LinkDM?
          </h2>
          <p className="text-sm font-bold tracking-widest text-primary uppercase">
            Creators
          </p>
        </div>

        {/* ================= CREATORS ================= */}

        {/* Desktop */}
        <div className="hidden xl:flex flex-wrap justify-center gap-x-6 gap-y-5">
          {creators.map((user) => (
            <UserPill key={user.name} user={user} />
          ))}
        </div>

        {/* Laptop */}
        <div className="hidden lg:flex xl:hidden flex-wrap justify-center gap-x-5 gap-y-4">
          {creators.map((user) => (
            <UserPill key={user.name} user={user} />
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex flex-wrap justify-center gap-3">
          {creators.map((user) => (
            <UserPill key={user.name} user={user} />
          ))}
        </div>

      </div>
      
    </section>
  );
}

/* ---------------- USER PILL ---------------- */

function UserPill({ user }: { user: { name: string; image: string } }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F7F7] hover:bg-[#EFEFEF] shadow-sm transition text-sm">

      {/* Instagram gradient ring */}
      <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
        <img
          src={user.image}
          alt={user.name}
          width={36}
          height={36}
          className="block w-9 h-9 rounded-full object-cover bg-white"
        />
      </div>

      {/* Username */}
      <span className="font-medium text-black whitespace-nowrap">
        {user.name}
      </span>

      {/* Verified */}
      <span className="flex items-center justify-center bg-[#1DA1F2] rounded-full p-[2px]">
        <BadgeCheck className="h-4 w-4 text-white" fill="#1DA1F2" />
      </span>
    </div>
  );
}
