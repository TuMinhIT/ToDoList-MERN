const StatisticsCards = ({ tasks }) => {
  // // Calculate statistics
  const getStats = () => {
    if (tasks && tasks.length > 0) {
      const stats = {
        total: tasks.length,
        completed: tasks.filter((t) => t.completed).length,
        work: tasks.filter((t) => t.category === "work").length,
        personal: tasks.filter((t) => t.category === "personal").length,
        shopping: tasks.filter((t) => t.category === "shopping").length,
        others: tasks.filter((t) => t.category === "others").length,
      };
      stats.pending = stats.total - stats.completed;
      return stats;
    }
    return [];
  };

  const stats = getStats();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50  p-2 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-500 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-800">
                {stats.pending}
              </h3>
              <p className="text-blue-600 text-sm">Đang Chờ</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-2 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-500 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-green-800">
                {stats.completed}
              </h3>
              <p className="text-green-600 text-sm">Hoàn Thành</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-2 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-purple-800">
                {stats.total}
              </h3>
              <p className="text-purple-600 text-sm">Tổng Cộng</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-2 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-500 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-yellow-800">
                {stats.total > 0
                  ? Math.round((stats.completed / stats.total) * 100)
                  : 0}
                %
              </h3>
              <p className="text-yellow-600 text-sm">Tiến Độ</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsCards;
