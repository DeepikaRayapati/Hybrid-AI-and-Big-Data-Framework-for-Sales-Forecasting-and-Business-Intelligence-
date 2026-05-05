import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';

export default function Inventory() {
  const stores = [
    { name: 'Store 1', revenue: 4.3 },
    { name: 'Store 2', revenue: 6.1 },
    { name: 'Store 3', revenue: 5.4 },
    { name: 'Store 4', revenue: 5.0 },
    { name: 'Store 5', revenue: 3.6 },
    { name: 'Store 6', revenue: 3.6 },
    { name: 'Store 7', revenue: 3.3 },
    { name: 'Store 8', revenue: 5.8 },
    { name: 'Store 9', revenue: 5.0 },
    { name: 'Store 10', revenue: 5.3 },
  ];

  const seasonalityData = [
    { month: 'Jan', sales: 40 },
    { month: 'Feb', sales: 35 },
    { month: 'Mar', sales: 50 },
    { month: 'Apr', sales: 45 },
    { month: 'May', sales: 60 },
    { month: 'Jun', sales: 55 },
    { month: 'Jul', sales: 70 },
    { month: 'Aug', sales: 65 },
    { month: 'Sep', sales: 50 },
    { month: 'Oct', sales: 45 },
    { month: 'Nov', sales: 80 },
    { month: 'Dec', sales: 95 },
  ];

  const salesSummary = [
    { month: '2023-01', sales: '1,240,500', active: 10 },
    { month: '2023-02', sales: '1,180,200', active: 10 },
    { month: '2023-03', sales: '1,450,000', active: 10 },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#007AFF] mb-2">Inventory & Business Analytics</h1>
          <p className="text-[#64748B] text-lg">Visualizing store performance and seasonal sales patterns.</p>
        </header>

        {/* Bar Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8 px-4">Total Revenue by Store</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stores}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  tickFormatter={(val) => `${val}M`}
                />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#4285F4" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Sales Summary Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">Monthly Sales Summary</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-y border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900">Month (Year-Month)</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900">Total Sales</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900">Stores Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {salesSummary.map((item) => (
                  <tr key={item.month} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.month}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.sales}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.active}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Seasonal Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Average Sales by Month (Seasonality)</h2>
            <div className="flex-1 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={seasonalityData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748B' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748B' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

