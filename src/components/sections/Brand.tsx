
// import { BadgeCheck } from "lucide-react";

// /* ---------------- BRANDS DATA ---------------- */

// const brands = [
//   ["@dkbooksus", "@inspire_me_home_decor", "@einsider", "@randomhouse", "@shop.ltk", "@allure", "@bhgaus"],
//   ["@shoptoday", "@ltk.home", "@homebeautiful", "@focalelite", "@solidstarts", "@fandango", "@enews"],
//   ["@kinedu", "@patpat_clothing", "@elleaus", "@hauste", "@bondisands", "@sellit", "@food52"],
//   ["@recetasnestlecl", "@delta", "@chatbooks", "@nbcselect", "@dillards"],
// ];

// /* ---------------- COMPONENT ---------------- */

// export default function Brand() {
//   return (
//     <section className="bg-white">
//       <div className="text-center mt- mb-8">
//         <p className="text-sm font-bold tracking-widest text-primary uppercase">
//           Brands
//         </p>
//       </div>

//       <div className="space-y-4">
//         {brands.map((row, i) => (
//           <div
//             key={i}
//             className="flex flex-wrap justify-center gap-x-4 gap-y-3"
//           >
//             {row.map((name) => (
//               <UserPill
//                 key={name}
//                 user={{
//                   name,
//                   image: `https://ui-avatars.com/api/?name=${name.replace(
//                     "@",
//                     ""
//                   )}&background=ffffff&color=000&size=150`,
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------------- USER PILL ---------------- */

// function UserPill({ user }: { user: { name: string; image: string } }) {
//   return (
//     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F7F7] hover:bg-[#EFEFEF] shadow-sm transition text-sm">

//       {/* Instagram-style gradient ring */}
//       <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
//         <img
//           src={user.image}
//           alt={user.name}
//           width={36}
//           height={36}
//           className="block w-9 h-9 rounded-full object-cover bg-white"
//         />
//       </div>

//       {/* Brand Name */}
//       <span className="font-medium text-black whitespace-nowrap">
//         {user.name}
//       </span>

//       {/* Verified Badge */}
//       <span className="flex items-center justify-center bg-[#1DA1F2] rounded-full p-[2px]">
//         <BadgeCheck className="h-4 w-4 text-white" fill="#1DA1F2" />
//       </span>
//     </div>
//   );
// }
import { BadgeCheck } from "lucide-react";

/* ---------------- DATA ---------------- */

const brands = [
  { name: "@dkbooksus" },
  { name: "@inspire_me_home_decor" },
  { name: "@einsider" },
  { name: "@randomhouse" },
  { name: "@shop.ltk" },
  { name: "@allure" },
  { name: "@bhgaus" },
  { name: "@shoptoday" },
  { name: "@ltk.home" },
  { name: "@homebeautiful" },
  { name: "@focalelite" },
  { name: "@solidstarts" },
  { name: "@fandango" },
  { name: "@enews" },
  { name: "@kinedu" },
  { name: "@patpat_clothing" },
  { name: "@elleaus" },
  { name: "@hauste" },
  { name: "@bondisands" },
  { name: "@sellit" },
  { name: "@food52" },
  { name: "@recetasnestlecl" },
  { name: "@delta" },
  { name: "@chatbooks" },
  { name: "@nbcselect" },
  { name: "@dillards" },
];

/* ---------------- COMPONENT ---------------- */

export default function BrandSection() {
  return (
    <section className="py- lg:py-">
      <div className="mx-auto max-w-[1600px] px-4">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-8">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">
            Brands
          </p>
        </div>

        {/* ================= BRANDS ================= */}

        {/* Desktop */}
        <div className="hidden xl:flex flex-wrap justify-center gap-x-6 gap-y-5">
          {brands.map((brand) => (
            <UserPill key={brand.name} user={brand} />
          ))}
        </div>

        {/* Laptop */}
        <div className="hidden lg:flex xl:hidden flex-wrap justify-center gap-x-5 gap-y-4">
          {brands.map((brand) => (
            <UserPill key={brand.name} user={brand} />
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex flex-wrap justify-center gap-3">
          {brands.map((brand) => (
            <UserPill key={brand.name} user={brand} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------------- USER PILL ---------------- */

function UserPill({ user }: { user: { name: string } }) {
  const image = `https://ui-avatars.com/api/?name=${user.name.replace(
    "@",
    ""
  )}&background=ffffff&color=000&size=150`;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F7F7] hover:bg-[#EFEFEF] shadow-sm transition text-sm">

      {/* Gradient Ring */}
      <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
        <img
          src={image}
          alt={user.name}
          width={36}
          height={36}
          className="block w-9 h-9 rounded-full object-cover bg-white"
        />
      </div>

      {/* Brand Name */}
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
