"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6">
              <Image src="/assets/generated_images/suprdm_logo.png" alt="Supr DM" width={32} height={32} className="object-contain brightness-0 invert" />
              <span className="font-display font-bold text-xl text-white">Supr DM</span>
            </a>
            <p className="text-sm leading-relaxed text-slate-400">
              Helping Indian businesses automate Instagram DM conversations and grow revenue.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp Automation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram DM</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook Messenger</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© 2024 Supr DM India Pvt Ltd. Made with ❤️ in Bangalore.</p>
        </div>
      </div>
    </footer>
  );
}
