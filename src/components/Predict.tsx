import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Hash, ChevronDown, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Predict({ currentUser }: { currentUser: { email: string; name: string } | null }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    store: '',
    item: '',
    month: '-- No Month --',
    startDate: '',
    endDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ id: string; value: number } | null>(null);

  const [history, setHistory] = useState<{ id: string; context: { s: number; i: number; month: string }; value: number; date: string }[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  React.useEffect(() => {
    if (!currentUser) {
      setIsInitialLoading(false);
      return;
    }

    fetch(`/api/predictions?email=${encodeURIComponent(currentUser.email)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch predictions');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setHistory(data.map((item: any) => ({
            id: item.predictionId || item._id,
            context: item.context || { s: 0, i: 0, month: 'Unknown' },
            value: item.value || 0,
            date: new Date(item.date).toLocaleString()
          })));
        }
      })
      .catch(err => console.error('Failed to fetch history:', err))
      .finally(() => setIsInitialLoading(false));
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to make a prediction");
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Simulate AI model inference
    setTimeout(async () => {
      const storeNum = parseInt(formData.store) || 1;
      const itemNum = parseInt(formData.item) || 1;
      
      const baseValue = (storeNum * 13 + itemNum * 7) % 500 + 200;
      const seasonalMultiplier = formData.month !== '-- No Month --' ? 1.2 : 1.0;
      const newValue = Math.floor(baseValue * seasonalMultiplier);
      
      const newId = Math.random().toString(16).substring(2, 26);
      const predictionData = { 
        email: currentUser.email,
        predictionId: newId, 
        context: { 
          s: parseInt(formData.store) || 1, 
          i: parseInt(formData.item) || 1, 
          month: formData.month === '-- No Month --' ? 'Any' : formData.month 
        }, 
        value: newValue 
      };

      try {
        await fetch('/api/predictions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(predictionData)
        });
        
        setResult({ id: newId, value: newValue });
        setHistory(prev => [
          { 
            id: newId, 
            context: predictionData.context, 
            value: newValue,
            date: new Date().toLocaleString()
          },
          ...prev
        ]);
      } catch (err) {
        console.error('Failed to save prediction:', err);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#007AFF] mb-2">Intelligent Sales Forecasting</h1>
            <p className="text-gray-500">Enter any combination of Store, Item, Month, or Date Range</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Store Number</label>
                <input 
                  type="text" 
                  placeholder="e.g., 3" 
                  value={formData.store}
                  onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Item Number</label>
                <input 
                  type="text" 
                  placeholder="e.g., 12" 
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Target Month (Optional)</label>
                <div className="relative">
                  <select 
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-[#007AFF] transition-all"
                  >
                    <option>-- No Month --</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Start Date (For Range Only)</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] transition-all" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">End Date (For Range Only)</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#007AFF] transition-all" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#007AFF] text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Processing Intelligence...
                </>
              ) : (
                'Generate Intelligence Report'
              )}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#007AFF]" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-2 text-[#007AFF] mb-2">
                    <CheckCircle2 size={20} />
                    <span className="font-bold uppercase tracking-wider text-xs">Analysis Complete</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Prediction Successfully Generated</h2>
                  <p className="text-sm text-gray-400">ID: <span className="font-mono text-gray-600">{result.id}</span></p>
                </div>
                
                <div className="text-center px-8 py-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs font-bold text-[#007AFF] uppercase tracking-widest mb-1">Predicted Value</p>
                  <p className="text-5xl font-black text-[#007AFF]">{result.value}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">My Private Prediction History</h2>
              <p className="text-sm text-gray-400">Your personal history of forecasts and intelligence reports</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Prediction ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Context</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Predicted Value</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-center">
                        <span className="text-blue-500 text-xs font-medium hover:underline cursor-pointer">{item.id}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold mb-1">S: {item.context.s} | I: {item.context.i}</span>
                          <span className="text-[10px] text-gray-500">Month: {item.context.month}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-bold text-[#007AFF]">{item.value}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => navigate('/feedback')}
                          className="text-[10px] font-bold border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors"
                        >
                          Feedback
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
