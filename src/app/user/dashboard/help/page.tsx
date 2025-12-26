"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components";
import { Button } from "@/components";

const faqs = [
  {
    question: "How do I apply for a property?",
    answer: "Browse properties, click on 'View Details', and then click 'Apply' to submit your application.",
  },
  {
    question: "How do I schedule a viewing?",
    answer: "Once your application is approved, you'll receive a message to schedule a viewing.",
  },
  {
    question: "Can I save properties for later?",
    answer: "Yes! Click the star icon on any property to save it to your favorites.",
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
      return;
    }
    setUserEmail(email);
  }, [router]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardLayout userEmail={userEmail}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Help & Support
        </h1>
        <p className="text-gray-600">
          Get help with using Estospaces
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Contact Support
        </h3>
        <p className="text-gray-600 mb-4">
          Need more help? Contact our support team.
        </p>
        <Button variant="primary">Contact Support</Button>
      </div>
    </DashboardLayout>
  );
}


