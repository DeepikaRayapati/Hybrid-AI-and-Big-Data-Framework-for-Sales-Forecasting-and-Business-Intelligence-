import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', sales: 4000, prediction: 4100 },
  { name: 'Feb', sales: 3000, prediction: 3200 },
  { name: 'Mar', sales: 2000, prediction: 2150 },
  { name: 'Apr', sales: 2780, prediction: 2900 },
  { name: 'May', sales: 1890, prediction: 2100 },
  { name: 'Jun', sales: 2390, prediction: 2500 },
  { name: 'Jul', sales: 3490, prediction: 3700 },
];

const cards = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Sales', value: '+2350', change: '+180.1%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Customers', value: '+12,234', change: '+19.2%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'Active Performance', value: '98.2%', change: '+4.5%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
];

export default function Dashboard() {
  return (
    <div className="bg-white py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#007AFF] mb-4">Retail Sales Forecasting</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Welcome to your analytics dashboard. Here you can find real-time KPIs, historical trends, and AI-powered sales predictions.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card) => (
            <div key={card.title} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                  <card.icon size={24} />
                </div>
                <span className={`text-xs font-bold ${card.color}`}>{card.change}</span>
              </div>
              <h3 className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Sales vs Prediction</h3>
                <p className="text-sm text-gray-400">Monthly overview of performance</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007AFF" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="prediction" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Big Data & AI?</h3>
            <div className="space-y-6">
              {[
                { title: 'Increased Accuracy', desc: 'Our hybrid models reduce forecasting error by 35% compared to traditional methods.' },
                { title: 'Real-time Processing', desc: 'Process millions of records in seconds to adapt to shifting market trends instantly.' },
                { title: 'Inventory Optimization', desc: 'Automatically suggest stock levels to prevent both stockouts and overstocking.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
