import React from "react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#D5C05C]">Privacy Policy</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        At LuxyDev, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-200">
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Usage data and cookies</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-200">
        <li>To provide and maintain our services</li>
        <li>To communicate with you</li>
        <li>To improve our website and services</li>
        <li>To comply with legal obligations</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:luxydevdigital@gmail.com" className="text-[#D5C05C] underline">luxydevdigital@gmail.com</a>.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:luxydevdigital@gmail.com" className="text-[#D5C05C] underline">luxydevdigital@gmail.com</a>.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-2 rounded bg-[#D5C05C] text-black font-semibold hover:bg-[#c4b03c] transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
}