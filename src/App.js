import React, { useState, useEffect } from 'react';
import { Mountain, Satellite, AlertTriangle, Activity, MapPin, TrendingUp, Zap, Shield, Eye, Brain, Radar, Waves } from 'lucide-react';

const EarthSentinel = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [scanProgress, setScanProgress] = useState(0);
  const [pulseActive, setPulseActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const riskZones = [
    { name: 'Shimla District', risk: 87, trend: 'up', status: 'critical' },
    { name: 'Kinnaur Valley', risk: 72, trend: 'stable', status: 'high' },
    { name: 'Kullu Manali', risk: 45, trend: 'down', status: 'moderate' },
    { name: 'Mandi Region', risk: 28, trend: 'down', status: 'low' }
  ];

  const recentDetections = [
    { time: '2m ago', location: 'Shimla-32.1N, 77.2E', severity: 'High', confidence: 94 },
    { time: '15m ago', location: 'Kinnaur-31.5N, 78.3E', severity: 'Critical', confidence: 97 },
    { time: '1h ago', location: 'Kullu-31.9N, 77.1E', severity: 'Medium', confidence: 89 }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-blue-500/20 backdrop-blur-xl bg-slate-900/30">
          <div className="container mx-auto px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Mountain className="w-10 h-10 text-orange-500" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-500 bg-clip-text text-transparent">
                      EARTH
                    </span>
                    <span className="text-white">SENTINEL</span>
                  </h1>
                  <p className="text-xs text-blue-400 tracking-widest mt-0.5">TERRAIN INTELLIGENCE SYSTEM</p>
                </div>
              </div>
              
              <nav className="flex gap-2">
                {['monitoring', 'analytics', 'neural-network'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
                        : 'text-blue-300 hover:bg-blue-900/30 hover:text-white'
                    }`}
                  >
                    {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="container mx-auto px-8 py-8">
          {/* Alert Banner */}
          <div className="mb-8 bg-gradient-to-r from-red-900/40 via-orange-900/40 to-red-900/40 border border-red-500/50 rounded-2xl p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
                  <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-300">CRITICAL ALERT: Active Terrain Displacement Detected</h3>
                  <p className="text-sm text-red-400">Shimla District - 32.1°N, 77.2°E • Confidence: 97.3% • Immediate Action Required</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-sm transition-all shadow-lg shadow-red-500/50">
                VIEW DETAILS
              </button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Live Scanning Panel */}
            <div className="col-span-8 bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-xl rounded-3xl border border-blue-500/30 overflow-hidden shadow-2xl shadow-blue-500/20">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Satellite className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-xl font-bold text-white">SIAMESE NEURAL NETWORK • LIVE SCAN</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/40 rounded-lg">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 text-xs font-bold">AI ACTIVE</span>
                    </div>
                    <div className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded-lg">
                      <span className="text-cyan-300 text-xs font-bold">{scanProgress}% PROCESSED</span>
                    </div>
                  </div>
                </div>

                {/* Terrain Visualization */}
                <div className="relative h-96 bg-gradient-to-b from-blue-950 to-slate-950 rounded-2xl overflow-hidden border border-cyan-500/20">
                  {/* Scanning line effect */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" 
                       style={{top: `${scanProgress}%`}}></div>
                  
                  {/* 3D Mountain Terrain */}
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="terrainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.8}} />
                        <stop offset="25%" style={{stopColor: '#3b82f6', stopOpacity: 0.8}} />
                        <stop offset="50%" style={{stopColor: '#fbbf24', stopOpacity: 0.9}} />
                        <stop offset="75%" style={{stopColor: '#f97316', stopOpacity: 0.9}} />
                        <stop offset="100%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                      </linearGradient>
                      <radialGradient id="pulseGrad">
                        <stop offset="0%" style={{stopColor: '#ef4444', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#ef4444', stopOpacity: 0}} />
                      </radialGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Background mountains */}
                    <path d="M0,350 L100,280 L200,260 L300,240 L400,220 L500,240 L600,260 L700,280 L800,350 Z" 
                          fill="rgba(30,58,138,0.3)"/>
                    <path d="M0,370 L150,310 L300,280 L450,260 L600,280 L800,370 Z" 
                          fill="rgba(30,64,175,0.4)"/>
                    
                    {/* Main terrain with risk gradient */}
                    <path d="M0,400 L80,340 L160,300 L240,270 L320,240 L400,200 L480,240 L560,280 L640,320 L720,360 L800,400 Z" 
                          fill="url(#terrainGrad)" filter="url(#glow)"/>
                    
                    {/* Snow peaks */}
                    <path d="M380,200 L400,170 L420,200" fill="rgba(255,255,255,0.95)"/>
                    <path d="M390,190 L400,180 L410,190" fill="rgba(226,232,240,0.9)"/>
                    
                    {/* Risk zone markers */}
                    <circle cx="400" cy="200" r="30" fill="url(#pulseGrad)" className="animate-ping"/>
                    <circle cx="400" cy="200" r="8" fill="#ef4444" filter="url(#glow)"/>
                    
                    <circle cx="250" cy="270" r="20" fill="url(#pulseGrad)" className="animate-ping" style={{animationDelay: '0.5s'}}/>
                    <circle cx="250" cy="270" r="6" fill="#f97316" filter="url(#glow)"/>
                    
                    {/* Scan lines */}
                    {[...Array(10)].map((_, i) => (
                      <line key={i} x1="0" y1={i * 40 + 50} x2="800" y2={i * 40 + 50} 
                            stroke="rgba(34,211,238,0.1)" strokeWidth="1"/>
                    ))}
                  </svg>

                  {/* Overlay stats */}
                  <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-cyan-500/30">
                    <div className="text-xs text-cyan-400 mb-2">TEMPORAL ANALYSIS</div>
                    <div className="text-2xl font-bold mb-1">14 <span className="text-sm text-gray-400">WEEKS</span></div>
                    <div className="text-xs text-gray-400">Multi-temporal Detection</div>
                  </div>

                  <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-orange-500/30">
                    <div className="text-xs text-orange-400 mb-2">RISK LEVEL</div>
                    <div className="text-2xl font-bold text-orange-500">HIGH</div>
                    <div className="text-xs text-gray-400">Displacement: 4.2cm/week</div>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-purple-500/30">
                    <div className="text-xs text-purple-400 mb-2">MODEL ACCURACY</div>
                    <div className="text-2xl font-bold text-purple-400">98.7%</div>
                    <div className="text-xs text-gray-400">Siamese CNN Performance</div>
                  </div>
                </div>

                {/* Processing Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-blue-500/20">
                    <div className="text-xs text-blue-400 mb-1">PATCHES PROCESSED</div>
                    <div className="text-2xl font-bold">8,432</div>
                  </div>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-cyan-500/20">
                    <div className="text-xs text-cyan-400 mb-1">EMBEDDINGS</div>
                    <div className="text-2xl font-bold">512D</div>
                  </div>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-orange-500/20">
                    <div className="text-xs text-orange-400 mb-1">DETECTIONS</div>
                    <div className="text-2xl font-bold text-orange-400">23</div>
                  </div>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-purple-500/20">
                    <div className="text-xs text-purple-400 mb-1">PROCESSING</div>
                    <div className="text-2xl font-bold">Real-time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Risk Zones */}
              <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold">HIGH-RISK ZONES</h3>
                </div>
                
                <div className="space-y-4">
                  {riskZones.map((zone, i) => (
                    <div key={i} className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-white">{zone.name}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          zone.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                          zone.status === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          zone.status === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {zone.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${
                            zone.risk > 70 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                            zone.risk > 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                            'bg-gradient-to-r from-green-500 to-yellow-500'
                          }`} style={{width: `${zone.risk}%`}}></div>
                        </div>
                        <span className="text-xl font-bold">{zone.risk}%</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <TrendingUp className={`w-3 h-3 ${zone.trend === 'up' ? 'text-red-400' : 'text-green-400'} ${zone.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} />
                        <span className="text-gray-400">{zone.trend === 'up' ? 'Increasing' : 'Decreasing'} risk</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-gradient-to-br from-slate-900/90 to-green-900/30 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold">SYSTEM STATUS</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Satellite Feed</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-bold">ACTIVE</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Neural Network</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-bold">PROCESSING</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Alert System</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-bold">ONLINE</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Data Pipeline</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-bold">SYNCED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Detections */}
          <div className="bg-gradient-to-br from-slate-900/90 to-orange-900/30 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold">RECENT DETECTIONS</h3>
              </div>
              <button className="text-sm text-orange-400 hover:text-orange-300 font-semibold">VIEW ALL →</button>
            </div>

            <div className="space-y-3">
              {recentDetections.map((detection, i) => (
                <div key={i} className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50 hover:border-orange-500/50 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      detection.severity === 'Critical' ? 'bg-red-500/20' :
                      detection.severity === 'High' ? 'bg-orange-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      <Radar className={`w-6 h-6 ${
                        detection.severity === 'Critical' ? 'text-red-400' :
                        detection.severity === 'High' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">{detection.location}</div>
                      <div className="text-xs text-gray-400">{detection.time} • Confidence: {detection.confidence}%</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    detection.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    detection.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {detection.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-blue-500/20 backdrop-blur-xl bg-slate-900/30 mt-12">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div>EarthSentinel v2.0 • Powered by Siamese Neural Networks</div>
              <div className="flex items-center gap-6">
                <span>Data Source: Google Earth Engine</span>
                <span>•</span>
                <span>Ground Truth: Global Landslide Catalog</span>
                <span>•</span>
                <span>Region: Himachal Pradesh, India</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EarthSentinel;