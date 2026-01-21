"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Supr DM?",
    answer:
      "LinkDM is an automation platform that helps businesses manage and scale their Instagram and Facebook direct message conversations efficiently.",
  },
  {
    question: "Is Supr DM free to use?",
    answer:
      "Yes, Supr DM offers a free plan with essential features. Paid plans are available for advanced automation and scaling needs.",
  },
  {
    question: "Why is Supr DM free? What’s the catch?",
    answer:
      "There is no catch. Our free plan helps users get started, while premium plans support advanced use cases and business growth.",
  },
  {
    question: "Is Supr DM safe to use?",
    answer:
      "Absolutely. Supr DM is a certified Meta Business Partner and follows strict compliance and security standards.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">
            NEED ANSWERS?
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Frequently Asked Questions
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore common inquiries about our platform and find instant solutions to your questions.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-gray-100 rounded-2xl px-6 py-5 cursor-pointer transition-all"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg md:text-xl font-semibold text-black">
                    {faq.question}
                  </h3>

                  <span
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>

                {isOpen && (
                  <p className="mt-4 text-gray-600 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
