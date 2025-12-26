"use client";

import React from "react";
import Link from "next/link";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <Link href="/" className="text-[#FF7700] hover:text-[#FF6600] mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Estospaces, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily access the materials on Estospaces for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="mb-4">You are responsible for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Uses</h2>
              <p className="mb-4">You may not use our platform to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Engage in fraudulent or deceptive practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Property Listings</h2>
              <p className="mb-4">
                Property listings are provided for informational purposes. We do not guarantee the accuracy, completeness, or availability of any property listing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                Estospaces shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms of Use, please contact us at legal@estospaces.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

