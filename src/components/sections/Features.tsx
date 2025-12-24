// "use client";

// import {
//   MessageCircle,
//   ShoppingBag,
//   Zap,
//   Users,
//   BarChart3,
//   Globe2,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const features = [
//   {
//     icon: MessageCircle,
//     title: "WhatsApp Automation",
//     description:
//       "Officially verify your business. Send broadcasts, recover abandoned carts, and automate support replies instantly.",
//     color: "text-green-600",
//     bg: "bg-green-50",
//   },
//   {
//     icon: ShoppingBag,
//     title: "Instagram Shop",
//     description:
//       "Turn comments into sales. When someone comments 'Price', automatically DM them the link to buy.",
//     color: "text-pink-600",
//     bg: "bg-pink-50",
//   },
//   {
//     icon: Zap,
//     title: "Instant Replies",
//     description:
//       "Never miss a customer. Reply to queries about price, shipping, and availability 24/7 without lifting a finger.",
//     color: "text-amber-600",
//     bg: "bg-amber-50",
//   },
//   {
//     icon: Users,
//     title: "Lead Generation",
//     description:
//       "Collect emails and phone numbers automatically. Build your customer database while you sleep.",
//     color: "text-blue-600",
//     bg: "bg-blue-50",
//   },
//   {
//     icon: BarChart3,
//     title: "Desi Analytics",
//     description:
//       "Simple dashboards to track your sales in Rupees. Understand what your customers want.",
//     color: "text-purple-600",
//     bg: "bg-purple-50",
//   },
//   {
//     icon: Globe2,
//     title: "Hinglish Support",
//     description:
//       "Our AI understands Hinglish (Hindi + English) mix, perfect for Indian customer conversations.",
//     color: "text-orange-600",
//     bg: "bg-orange-50",
//   },
// ];

// export default function Features() {
//   return (
//     <section id="features" className="py-24 bg-white">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
//             Designed for Indian Growth 🚀
//           </h2>
//           <p className="text-xl text-gray-600">
//             Everything you need to scale your business on social media, tailored
//             for the Indian market dynamics.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Card className="h-full bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow rounded-2xl">
//                 <CardHeader>
//                   <div
//                     className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-4`}
//                   >
//                     <feature.icon
//                       className={`h-7 w-7 ${feature.color}`}
//                     />
//                   </div>

//                   <CardTitle className="text-xl font-bold text-gray-900">
//                     {feature.title}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent>
//                   <p className="leading-relaxed text-gray-600">
//                     {feature.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import {
  MessageCircle,
  ShoppingBag,
  Zap,
  Users,
  BarChart3,
  Globe2,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    description:
      "Officially verify your business. Send broadcasts, recover abandoned carts, and automate support replies instantly.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: ShoppingBag,
    title: "Instagram Shop",
    description:
      "Turn comments into sales. When someone comments 'Price', automatically DM them the link to buy.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Zap,
    title: "Instant Replies",
    description:
      "Never miss a customer. Reply to queries about price, shipping, and availability 24/7 without lifting a finger.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "Lead Generation",
    description:
      "Collect emails and phone numbers automatically. Build your customer database while you sleep.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Desi Analytics",
    description:
      "Simple dashboards to track your sales in Rupees. Understand what your customers want.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Globe2,
    title: "Hinglish Support",
    description:
      "Our AI understands Hinglish (Hindi + English) mix, perfect for Indian customer conversations.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Designed for Indian Growth 🚀
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to scale your business on social media, tailored
            for the Indian market dynamics.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card
                className="
                  h-full rounded-3xl border border-primary/10
                  bg-gradient-to-br from-white via-primary/5 to-primary/10
                  shadow-md hover:shadow-xl transition-all
                "
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-4`}
                  >
                    <feature.icon
                      className={`h-7 w-7 ${feature.color}`}
                    />
                  </div>

                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
