import React, { useState } from 'react';
import { Mountain, TrendingUp, AlertTriangle, BarChart3, Activity } from 'lucide-react';

const EarthSentinel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-blue-800/30 backdrop-blur-sm bg-slate-900/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mountain className="w-8 h-8 text-orange-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                EarthSentinel
              </h1>
            </div>
            <nav className="flex gap-6">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-blue-600/30 text-white' : 'text-blue-300 hover:text-white'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'analytics' ? 'bg-blue-600/30 text-white' : 'text-blue-300 hover:text-white'}`}
              >
                Analytics
              </button>
              <button 
                onClick={() => setActiveTab('alerts')}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'alerts' ? 'bg-blue-600/30 text-white' : 'text-blue-300 hover:text-white'}`}
              >
                Alerts
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section with Mountain Visualization */}
        <div className="relative mb-8 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900/50 to-slate-900/50 backdrop-blur-sm border border-blue-700/30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="relative p-12">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Risk Card */}
              <div className="col-span-3">
                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-blue-700/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-medium text-blue-300 flex items-center gap-2">
                      <Mountain className="w-4 h-4" />
                      Landslide Risk
                    </h3>
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-5xl font-bold mb-2">4.56<span className="text-3xl">%</span></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-2 bg-yellow-500 rounded-full flex-1"></div>
                      <div className="h-2 bg-blue-500 rounded-full flex-1"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                      <span className="text-sm text-blue-200">Creepy</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-blue-200">Moderate</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-blue-200">S&k</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="h-2 bg-gradient-to-r from-green-500 via-pink-500 to-pink-600 rounded-full w-24"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-blue-200">Red Alert</span>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 transition-all">
                      <TrendingUp className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 transition-all">
                      <AlertTriangle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Mountain Visualization */}
              <div className="col-span-6 flex items-center justify-center">
                <div className="relative w-full h-96">
                  {/* Mountain Silhouette Representation */}
                  <div className="absolute inset-0 flex items-end justify-center">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      {/* Background mountains */}
                      <path d="M0,250 L50,200 L100,180 L150,160 L200,140 L250,160 L300,180 L350,200 L400,250 Z" 
                            fill="url(#grad1)" opacity="0.3"/>
                      <path d="M0,270 L80,220 L150,200 L220,180 L300,200 L400,270 Z" 
                            fill="url(#grad2)" opacity="0.4"/>
                      
                      {/* Main mountain with risk zones */}
                      <path d="M0,300 L50,250 L100,200 L150,180 L200,150 L250,180 L300,220 L350,260 L400,300 Z" 
                            fill="url(#riskGrad)"/>
                      
                      {/* Snow cap */}
                      <path d="M180,150 L200,130 L220,150 Z" fill="rgba(255,255,255,0.9)"/>
                      
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.8}} />
                          <stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 0.6}} />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#2563eb', stopOpacity: 0.7}} />
                          <stop offset="100%" style={{stopColor: '#1e3a8a', stopOpacity: 0.5}} />
                        </linearGradient>
                        <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.8}} />
                          <stop offset="30%" style={{stopColor: '#fbbf24', stopOpacity: 0.8}} />
                          <stop offset="60%" style={{stopColor: '#f97316', stopOpacity: 0.8}} />
                          <stop offset="100%" style={{stopColor: '#ef4444', stopOpacity: 0.8}} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  {/* Floating metric badge */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md rounded-xl px-4 py-2 border border-orange-500/30">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-orange-400">Maps</span>
                      <div className="h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-16"></div>
                      <span className="text-xs text-blue-400">heatzone</span>
                    </div>
                    <div className="mt-1 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs text-blue-300">Creepy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Stats Cards */}
              <div className="col-span-3 space-y-4">
                {/* Risk Percentage Card */}
                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-blue-700/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-blue-300">Landslime</h3>
                    <div className="flex gap-2 text-xs text-blue-400">
                      <span>1 year</span>
                      <span>24-7d</span>
                    </div>
                  </div>
                  
                  <div className="text-4xl font-bold mb-4">66<span className="text-2xl">%</span></div>
                  
                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1 h-24 mb-4">
                    {[40, 60, 45, 70, 55, 80, 65, 90, 75, 85, 70, 95].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-orange-500 via-yellow-500 to-green-500 rounded-t" 
                           style={{height: `${height}%`}}></div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-blue-200">73%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs bg-slate-800/50 px-2 py-1 rounded">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-blue-200">1.17%</span>
                    </div>
                  </div>
                </div>

                {/* Area Chart Card */}
                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-blue-700/30">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="text-sm text-blue-200">196.3km²</span>
                  </div>
                  
                  {/* Area chart representation */}
                  <div className="relative h-32 mb-4">
                    <svg viewBox="0 0 200 80" className="w-full h-full">
                      <defs>
                        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#fbbf24', stopOpacity: 0.6}} />
                          <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0.3}} />
                        </linearGradient>
                      </defs>
                      <path d="M0,60 Q50,40 100,35 T200,30 L200,80 L0,80 Z" fill="url(#areaGrad)"/>
                      <path d="M0,60 Q50,40 100,35 T200,30" stroke="#fbbf24" strokeWidth="2" fill="none"/>
                    </svg>
                    <div className="absolute top-2 right-2 text-xs text-blue-300">week</div>
                  </div>
                  
                  {/* Time labels */}
                  <div className="flex justify-between text-xs text-blue-400 mb-4">
                    {['M', 'Tu', 'W', 'Th', 'Fr', 'S', 'Su'].map((day, i) => (
                      <span key={i}>{day}</span>
                    ))}
                  </div>
                  
                  {/* Trend lines */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="text-xs text-blue-200">June, 2 Nov</span>
                      <span className="ml-auto text-xs font-medium">1.80</span>
                    </div>
                    <div className="h-12">
                      <svg viewBox="0 0 200 40" className="w-full h-full">
                        <path d="M0,35 Q50,30 100,20 T200,10" stroke="#ef4444" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <span className="text-xs text-blue-200">Sep, 7 Fob</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-sm text-blue-300">Active Alerts</span>
            </div>
            <div className="text-3xl font-bold">12</div>
            <div className="text-xs text-green-400 mt-2">↓ 3 from last week</div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm text-blue-300">Monitored Zones</span>
            </div>
            <div className="text-3xl font-bold">847</div>
            <div className="text-xs text-blue-400 mt-2">Across 23 regions</div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-sm text-blue-300">Avg Risk Score</span>
            </div>
            <div className="text-3xl font-bold">6.8</div>
            <div className="text-xs text-yellow-400 mt-2">↑ 0.4 this month</div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-sm text-blue-300">Predictions</span>
            </div>
            <div className="text-3xl font-bold">98.3%</div>
            <div className="text-xs text-green-400 mt-2">Accuracy rate</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EarthSentinel;