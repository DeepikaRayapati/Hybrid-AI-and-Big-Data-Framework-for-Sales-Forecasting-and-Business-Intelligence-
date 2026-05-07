import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, BrainCircuit, RefreshCw } from 'lucide-react';

export default function Feedback() {
  const [feedbackCount, setFeedbackCount] = useState(() => {
    const saved = localStorage.getItem('feedback_count');
    return saved ? parseInt(saved) : 0;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    predictionId: '',
    actualSales: '',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('feedback_count', feedbackCount.toString());
    if (feedbackCount >= 100) {
      setIsTraining(true);
    }
  }, [feedbackCount]);

  const handleStartTraining = () => {
    setIsTraining(true);
    // Simulate training process
    setTimeout(() => {
      setFeedbackCount(0);
      setIsTraining(false);
      window.location.reload(); // Refresh the app as requested
    }, 3000);
  };

  const [feedbackList, setFeedbackList] = useState<{ key: string; predicted: number; actual: number; diff: number; status: string }[]>(() => {
    const saved = localStorage.getItem('feedback_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentPredictions, setRecentPredictions] = useState<{ id: string; date: string; store: number; item: number }[]>(() => {
    const saved = localStorage.getItem('prediction_history');
    const history = saved ? JSON.parse(saved) : [];
    return history.map((item: any) => ({
      id: item.id,
      date: item.date,
      store: item.context.s,
      item: item.context.i
    }));
  });

  useEffect(() => {
    localStorage.setItem('feedback_data', JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.predictionId || !formData.actualSales) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const actual = parseFloat(formData.actualSales);
      
      // Find the prediction in history to get context and predicted value
      const savedHistory = localStorage.getItem('prediction_history');
      const history = savedHistory ? JSON.parse(savedHistory) : [];
      const prediction = history.find((p: any) => p.id === formData.predictionId);
      
      const predicted = prediction ? prediction.value : 0;
      const diff = Math.abs(predicted - actual);
      const status = diff < 5 ? 'Accurate' : 'Variance';
      const key = prediction ? `S: ${prediction.context.s} | I: ${prediction.context.i}` : 'Unknown';

      const newFeedback = { key, predicted, actual, diff, status };
      
      setFeedbackList(prev => [newFeedback, ...prev]);
      setFeedbackCount(prev => prev + 1);
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ predictionId: '', actualSales: '', notes: '' });
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  if (isTraining) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center border border-blue-100">
          <div className="mb-6 relative h-24 w-24 mx-auto">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25" />
            <div className="relative z-10 bg-blue-600 rounded-full h-full w-full flex items-center justify-center text-white">
              <BrainCircuit size={48} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Retraining AI Models</h2>
          <p className="text-gray-500 mb-8 font-medium">Training with 100 new data points to maximize prediction accuracy...</p>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-6">
            <div className="bg-blue-600 h-full animate-[loading_3s_ease-in-out]" style={{ width: '100%' }} />
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
            <Loader2 className="animate-spin" size={20} />
            <span>Processing Intelligence Matrix...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#007AFF] mb-2">Prediction Feedback</h1>
            <p className="text-[#64748B] text-lg">Submit actual sales data to improve our forecasting models.</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-xl border border-blue-100 shadow-sm flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Training Progress</p>
              <p className="text-2xl font-black text-gray-900">{feedbackCount} / 100</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-blue-100 border-t-blue-600 flex items-center justify-center font-bold text-xs text-blue-600">
              {Math.min(feedbackCount, 100)}%
            </div>
          </div>
        </header>

        {feedbackCount >= 100 && (
          <div className="bg-blue-600 rounded-xl p-6 text-white mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-500/30 animate-pulse">
            <div className="flex items-center gap-4">
              <BrainCircuit className="shrink-0" size={32} />
              <div>
                <h3 className="font-bold text-lg">100 Data Points Reached!</h3>
                <p className="text-blue-100 text-sm">System is ready for a model retrain to enhance accuracy.</p>
              </div>
            </div>
            <button 
              onClick={handleStartTraining}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <RefreshCw size={20} />
              Start Automated Retrain
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Submit Feedback Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
            {showSuccess && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-center flex-col items-center justify-center p-8 text-center">
                <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Feedback Received</h3>
                <p className="text-gray-500 mb-6">Thank you for contributing to model intelligence. Your data has been stored.</p>
              </div>
            )}
            
            <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Prediction ID</label>
                <input 
                  type="text" 
                  placeholder="Enter 24-character ID"
                  value={formData.predictionId}
                  onChange={(e) => setFormData({ ...formData, predictionId: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] transition-all"
                  required
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Copy this from your prediction results.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Actual Sales</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={formData.actualSales}
                    onChange={(e) => setFormData({ ...formData, actualSales: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Notes (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. holiday impact"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] transition-all"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#007AFF] text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Storing Data...
                  </>
                ) : 'Submit Feedback'}
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
                    <button 
                      onClick={() => setFormData({ ...formData, predictionId: pred.id })}
                      className="text-[10px] font-bold text-[#007AFF] border border-blue-500 px-3 py-1 rounded hover:bg-[#007AFF] hover:text-white transition-all"
                    >
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
            <h2 className="text-xl font-bold text-gray-900">Your Feedback History</h2>
            <p className="text-sm text-gray-400">Analysis of your submitted sales data vs predictions</p>
          </div>
          {feedbackList.length > 0 ? (
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
                {feedbackList.map((item, idx) => (
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
          ) : (
            <div className="p-12 text-center text-gray-400">
              No feedback submitted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
