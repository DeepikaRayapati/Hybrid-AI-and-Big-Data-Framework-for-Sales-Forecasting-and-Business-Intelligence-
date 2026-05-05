export default function ModelMetrics() {
  const phase2Data = [
    { algo: 'LinearRegression', r2: '0.9265', mae: '6.0085', rmse: '7.7985' },
    { algo: 'DecisionTreeRegressor', r2: '0.8998', mae: '6.5338', rmse: '9.1002' },
    { algo: 'RandomForestRegressor', r2: '0.9517', mae: '4.7369', rmse: '6.3187' },
    { algo: 'XGBRegressor', r2: '0.9492', mae: '4.987', rmse: '6.481' },
    { algo: 'CatBoostRegressor', r2: '0.9461', mae: '5.1669', rmse: '6.6776' },
  ];

  const phase4Data = [
    { layer: 'Tuned XGBRegressor', r2: '0.955', mae: '4.6152', rmse: '6.0969', advantage: 'Tuned Base Learner' },
    { layer: 'Tuned CatBoost', r2: '0.9507', mae: '4.9149', rmse: '6.3848', advantage: 'Tuned Base Learner' },
    { layer: 'LSTM', r2: '0.8901', mae: '8.8765', rmse: '11.7049', advantage: 'Tuned Base Learner' },
    { layer: 'Stacking Ensemble', r2: '0.939', mae: '4.4132', rmse: '5.8224', advantage: 'Best Overall Performer' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#007AFF] mb-2 uppercase tracking-tight">Model Performance Comparison</h1>
          <p className="text-[#64748B] text-lg">Comparing individual tuned models vs. the Stacking Ensemble meta-learner.</p>
        </header>

        {/* Phase 2 Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-[#007AFF] py-3 px-6">
            <h2 className="text-lg font-bold text-white">Phase 2: Baseline Model Performance (RMSE)</h2>
          </div>
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">Algorithm</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">R2</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">MAE</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 text-rose-600">RMSE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 italic font-medium">
              {phase2Data.map((row) => (
                <tr key={row.algo} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-900 font-bold">{row.algo}</td>
                  <td className="px-6 py-4 text-gray-600">{row.r2}</td>
                  <td className="px-6 py-4 text-gray-600">{row.mae}</td>
                  <td className="px-6 py-4 text-rose-600 font-bold">{row.rmse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phase 4 Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#2E7D32] py-3 px-6">
            <h2 className="text-lg font-bold text-white">Phase 4: Advanced Hybrid Stacking Performance (RMSE, MAE, R2)</h2>
          </div>
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">Model Layer</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">R2 Score</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">MAE</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 text-rose-600">RMSE</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium italic">
              {phase4Data.map((row) => (
                <tr key={row.layer} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-900 font-bold">{row.layer}</td>
                  <td className="px-6 py-4 text-gray-600">{row.r2}</td>
                  <td className="px-6 py-4 text-gray-600">{row.mae}</td>
                  <td className="px-6 py-4 text-rose-600 font-bold">{row.rmse}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase italic text-white ${
                      row.advantage === 'Best Overall Performer' ? 'bg-[#2E7D32]' : 'bg-[#00B8D9]'
                    }`}>
                      {row.advantage}
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
