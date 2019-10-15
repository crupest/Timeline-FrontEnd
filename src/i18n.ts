import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const backend: i18n.BackendModule = {
  type: "backend",
  async read(language, namespace, callback) {
    function error(message: string) {
      callback(new Error(message), false as any);
    }

    function success(result: i18n.ResourceKey) {
      callback(null, result);
    }

    if (namespace !== "translation") {
      error("Namespace must be 'translation'.");
    }

    if (language === "en") {
      success(
        await import(
          /* webpackChunkName: "locales-en" */ "./locales/en/translation.json"
        )
      );
    } else if (language === "zh") {
      success(
        await import(
          /* webpackChunkName: "locales-zh" */ "./locales/zh/translation.json"
        )
      );
    } else {
      error(`Language ${language} is not supported.`);
    }
  },
  init() {},
  create() {}
};

export const i18nPromise = i18n
  .use(LanguageDetector)
  .use(backend)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: "en",
    lowerCaseLng: true,

    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false // not needed for react!!
    }

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    /*
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    */
  });

export default i18n;
