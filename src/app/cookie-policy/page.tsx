"use client";

import React from "react";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <Link href="/" className="text-[#FF7700] hover:text-[#FF6600] mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Session Cookies</h3>
                <p className="mb-4">Temporary cookies that are deleted when you close your browser.</p>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Persistent Cookies</h3>
                <p className="mb-4">Cookies that remain on your device for a set period or until you delete them.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="mb-4">
                We may also use third-party cookies from trusted partners to help us analyze website usage and improve our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Cookies</h2>
              <p className="mb-4">
                You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
              <p className="mb-4">
                If you have questions about our use of cookies, please contact us at privacy@estospaces.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

