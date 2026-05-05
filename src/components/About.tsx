export default function About() {
  const techStack = [
    { label: 'Compute Engine', value: 'PySpark', color: 'bg-blue-100 text-blue-700' },
    { label: 'ML Algorithms', value: 'XGBoost | CatBoost', color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Deep Learning', value: 'TensorFlow (LSTM)', color: 'bg-amber-100 text-amber-700' },
    { label: 'Persistence', value: 'MongoDB', color: 'bg-teal-100 text-teal-700' },
    { label: 'Web Layer', value: 'Flask', color: 'bg-gray-100 text-gray-700' },
    { label: 'Frontend UI', value: 'Bootstrap 5', color: 'bg-slate-100 text-slate-700' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-[#007AFF] text-white py-24 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About the Intelligence Framework</h1>
        <p className="text-xl md:text-2xl text-blue-50/80 max-w-3xl mx-auto">
          A Hybrid AI and Big Data Ecosystem for Modern Retail Analytics
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#007AFF] mb-6">Project Mission</h2>
              <p className="text-gray-600 leading-relaxed italic font-medium">
                This framework was engineered to bridge the gap between complex Big Data processing and actionable retail intelligence. 
                By leveraging distributed computing and advanced ensemble learning, the system provides high-fidelity sales forecasts 
                that empower businesses to optimize inventory, reduce waste, and maximize revenue growth.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#007AFF] mb-6">Core Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl shadow-sm border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-2">Big Data ETL</h3>
                  <p className="text-sm text-gray-500">Distributed processing of 1M+ sales records using Apache Spark.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border-l-4 border-emerald-500">
                  <h3 className="font-bold text-gray-900 mb-2">Hybrid AI</h3>
                  <p className="text-sm text-gray-500">Ensemble of Gradient Boosting (XGBoost) and Deep Learning (LSTM).</p>
                </div>
              </div>
            </section>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#007AFF] mb-6">Technical Stack</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="space-y-6">
                {techStack.map((tech) => (
                  <div key={tech.label} className="flex items-center justify-between group">
                    <span className="text-sm font-medium text-gray-500">{tech.label}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tech.color}`}>
                      {tech.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 text-[#007AFF]">
                    {/* Brain Icon Placeholder */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
