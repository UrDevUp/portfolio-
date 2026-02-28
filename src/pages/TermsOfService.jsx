import React from "react";
import { useNavigate } from "react-router-dom";

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#D5C05C]">
        Terms of Service
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        Welcome to UrDevUp! By accessing or using our website and services, you
        agree to be bound by these Terms of Service. Please read them carefully.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Use of Our Services</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-200">
        <li>
          You must use our services in compliance with all applicable laws and
          regulations.
        </li>
        <li>
          You agree not to misuse or interfere with our services or try to
          access them using a method other than the interface and instructions
          we provide.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Intellectual Property</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        All content, trademarks, and data on this website, including but not
        limited to software, databases, text, graphics, icons, and hyperlinks
        are the property of UrDevUp or its licensors.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">
        Limitation of Liability
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        UrDevUp is not liable for any direct, indirect, incidental, or
        consequential damages arising from your use of our website or services.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Changes to Terms</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        We may update these Terms of Service from time to time. Any changes will
        be posted on this page. Your continued use of our services after changes
        are made constitutes acceptance of those changes.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        If you have any questions about these Terms, please contact us at{" "}
        <a
          href="mailto:urdevupdigital@gmail.com"
          className="text-[#D5C05C] underline"
        >
          urdevup@gmail.com
        </a>
        .
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-2 rounded bg-[#D5C05C] text-black font-semibold hover:bg-[#bfa53f] transition"
      >
        Return Home
      </button>
    </div>
  );
}
