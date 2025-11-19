import { BarChart3, Newspaper, TrendingUp, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Welcome back, manage your news platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Newspaper className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-gray-800">24</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Total News</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-800">156</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Total Views</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-gray-800">89</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Active Users</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <span className="text-3xl font-bold text-gray-800">+12%</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Growth Rate</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="/news"
              className="flex items-center space-x-4 p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Newspaper className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Manage News</h3>
                <p className="text-gray-600 text-sm">
                  Create, edit, or delete news articles
                </p>
              </div>
            </a>

            <a
              href="/analytics"
              className="flex items-center space-x-4 p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">View Analytics</h3>
                <p className="text-gray-600 text-sm">
                  Check platform performance metrics
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
