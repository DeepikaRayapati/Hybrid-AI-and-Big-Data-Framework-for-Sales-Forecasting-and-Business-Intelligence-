export default function Feedback() {
  const recentPredictions = [
    { id: '69b4f0b5e61e10d3c1ce2cac', date: '2026-03-14 10:53', store: 7, item: 3 },
    { id: '69b428b152aeaf3c1185c057', date: '2026-03-13 20:39', store: 3, item: 33 },
    { id: '69b421da52aeaf3c1185c056', date: '2026-03-13 20:10', store: 3, item: 33 },
    { id: '69b421b752aeaf3c1185c055', date: '2026-03-13 20:09', store: 3, item: 33 },
  ];

  const comparisons = [
    { key: 'S: 1 | I: 50', predicted: 420, actual: 430.0, diff: 10.0, status: 'Variance' },
    { key: 'S: 1 | I: 50', predicted: 420, actual: 422.0, diff: 2.0, status: 'Accurate' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#007AFF] mb-2">Prediction Feedback</h1>
          <p className="text-[#64748B] text-lg">Submit actual sales data to improve our forecasting models.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Submit Feedback Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Feedback</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Prediction ID</label>
                <input 
                  type="text" 
                  placeholder="Enter 24-character ID"
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Copy this from your prediction results.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Actual Sales</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Notes (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. holiday impact"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#007AFF] text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg">
                Submit Feedback
              </button>
            </form>
          </div>

          {/* Recent Predictions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Recent Predictions</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-100">
                {recentPredictions.map((pred) => (
                  <div key={pred.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-gray-900">ID: {pred.id}</span>
                      <span className="text-[10px] font-medium text-gray-400">{pred.date}</span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-900 mb-2 uppercase">
                      Store: {pred.store} | Item: {pred.item}
                    </div>
                    <button className="text-[10px] font-bold text-[#007AFF] border border-blue-500 px-3 py-1 rounded hover:bg-[#007AFF] hover:text-white transition-all">
                      Use this ID
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global Feedback Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Global Feedback Comparison (All Users)</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-y border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-900">Store/Item</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-900">Predicted</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-900">Actual</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-900">Difference</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold">
              {comparisons.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-xs text-gray-600">{item.key}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.predicted}</td>
                  <td className="px-6 py-4 text-sm text-blue-600">{item.actual.toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      item.status === 'Variance' ? 'bg-[#FFC107]/20 text-[#856404]' : 'bg-[#28A745]/20 text-[#155724]'
                    }`}>
                      {item.diff.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] ${
                      item.status === 'Variance' ? 'text-gray-400' : 'text-[#28A745]'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
