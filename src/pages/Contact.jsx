"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import StarBorderButton from "../components/ui/StarBorderButton";

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
        "avXs7VXEgLNiq87CR",
      )
      .then(
        (result) => {
          showPopup("success", "we received your message!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          showPopup("error", "Something went wrong!");
        },
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
        className="relative bg-white dark:bg-[#131313] min-h-screen"
      >
        <div className="max-w-4xl mx-auto relative z-10 py-20 px-6">
          <div className="text-center mb-12">
            <h2 className="bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white/20 dark:via-white/80 dark:to-white text-4xl font-bold mb-4 bg-clip-text text-transparent">
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
                    urdevup@gmail.com
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
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-black dark:text-white"
                    >
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
                      className="block text-sm font-medium mb-2 text-black dark:text-white"
                    >
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
                      className="block text-sm font-medium mb-2 text-black dark:text-white"
                    >
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

                  <StarBorderButton
                    type="submit"
                    color="#ffffff"
                    speed="6s"
                    thickness={1}
                    className="star-border-button--double star-border-button--glass w-full px-6 py-3 !text-white font-medium"
                  >
                    {t("sendMessage")}
                  </StarBorderButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
