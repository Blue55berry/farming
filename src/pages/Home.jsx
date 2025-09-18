import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/guides"
              className="bg-white text-green-700 py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t("home.hero.startLearning")}
            </Link>
            <Link
              to="/crops"
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-700 transition-colors"
            >
              {t("home.hero.exploreCrops")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {t("home.features.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-leaf-green"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {t("home.features.guides.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("home.features.guides.description")}
              </p>
              <Link
                to="/guides"
                className="text-leaf-green hover:underline font-medium"
              >
                {t("home.features.guides.cta")} →
              </Link>
            </div>

            <div className="card text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-leaf-green"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {t("home.features.diagnosis.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("home.features.diagnosis.description")}
              </p>
              <Link
                to="/diagnosis"
                className="text-leaf-green hover:underline font-medium"
              >
                {t("home.features.diagnosis.cta")} →
              </Link>
            </div>

            <div className="card text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-leaf-green"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {t("home.features.games.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("home.features.games.description")}
              </p>
              <Link
                to="/learning"
                className="text-leaf-green hover:underline font-medium"
              >
                {t("home.features.games.cta")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {t("home.learningPaths.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-soil-brown flex items-center justify-center">
                <img
                  src="/images/traditional-farming.jpg"
                  alt="Traditional Farming"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {t("home.learningPaths.traditional.title")}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t("home.learningPaths.traditional.description")}
                </p>
                <Link
                  to="/guides?type=traditional"
                  className="btn-primary inline-block"
                >
                  {t("home.learningPaths.traditional.cta")}
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-sky-blue flex items-center justify-center">
                <img
                  src="/images/modern-farming.jpg"
                  alt="Modern Farming"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {t("home.learningPaths.modern.title")}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t("home.learningPaths.modern.description")}
                </p>
                <Link
                  to="/guides?type=modern"
                  className="btn-primary inline-block"
                >
                  {t("home.learningPaths.modern.cta")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {t("home.testimonials.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/images/testimonials/user1.jpg"
                  alt="User"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">
                    {t("home.testimonials.user1.name")}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t("home.testimonials.user1.location")}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                {t("home.testimonials.user1.quote")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/images/testimonials/user2.jpg"
                  alt="User"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">
                    {t("home.testimonials.user2.name")}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t("home.testimonials.user2.location")}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                {t("home.testimonials.user2.quote")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://via.placeholder.com/48x48?text=User3"
                  alt="User"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">
                    {t("home.testimonials.user3.name")}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t("home.testimonials.user3.location")}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                {t("home.testimonials.user3.quote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-leaf-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("home.cta.title")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t("home.cta.description")}
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-leaf-green py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            {t("home.cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
