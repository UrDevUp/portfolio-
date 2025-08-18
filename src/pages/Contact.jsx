"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const LightRays = lazy(() => import("@/components/animation/LightRays"));
const PopupMessage = lazy(() => import("@/components/ui/PopupMessage"));
const Loading = lazy(() => import("@/layouts/Loading"));

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ visible: false, type: "", message: "" });
  const { t } = useTranslation();

  const showPopup = (type, message) => {
    setPopup({ visible: true, type, message });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // send email
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start spinner
    console.log("Form submitted:", formData);
    emailjs
      .sendForm(
        "service_v1quwbk",
        "template_ezmpra9",
        formRef.current,
        "avXs7VXEgLNiq87CR"
      )
      .then(
        (result) => {
          showPopup("success", "we received your message!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          showPopup("error", "Something went wrong!");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Suspense fallback={null}>
        {popup.visible && (
          <PopupMessage
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup({ ...popup, visible: false })}
          />
        )}
      </Suspense>
      <section
        id="contact"
        className="relative bg-[#f5f5f5] dark:bg-black min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <Suspense fallback={null}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#DDBB37"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.5}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="w-full h-full opacity-0 dark:opacity-100 transition-opacity duration-300"
            />
          </Suspense>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 py-20 px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
              {t("getInTouch")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t("contactIntro")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-black dark:text-white">
                {t("contactInformation")}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-black dark:text-white">
                    {t("email")}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    luxydevdigital@gmail.com
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-black dark:text-white">
                    {t("phone")}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    +212 638-686-444
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-black dark:text-white">
                    {t("office")}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Morocco , Errachidia
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="relative min-h-[400px]">
              {loading ? (
                <div className=" inset-0 w-full h-[480px]  flex items-center justify-center z-10">
                  <Suspense fallback={null}>
                    <Loading />
                  </Suspense>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-black dark:text-white">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-black dark:text-white"
                      placeholder={t("yourName")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-black dark:text-white">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-black dark:text-white"
                      placeholder={t("yourEmail")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-black dark:text-white">
                      {t("message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none text-black dark:text-white"
                      placeholder={t("yourMessage")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black bg-gradient-to-r from-[#D5C05C] to-[#47412B] hover:bg-black/90 bg-[linear-gradient(135deg,_#D5C05C,_#47412B)] text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    {t("sendMessage")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
