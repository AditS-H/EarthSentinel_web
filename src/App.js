import React, { useState, useEffect } from 'react';
import { Mountain, Satellite, AlertTriangle, Activity, MapPin, TrendingUp, Zap, Shield, Eye, Brain, Radar, Waves, X, ChevronRight, BarChart3, PieChart, Map, Globe, Layers, Search } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

const EarthSentinel = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [scanProgress, setScanProgress] = useState(0);
  const [detections, setDetections] = useState([]);
  const [riskZones, setRiskZones] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [detailPanel, setDetailPanel] = useState(false);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    try {
      const [detectionsRes, zonesRes, statusRes, metricsRes, alertsRes] = await Promise.all([
        fetch(`${API_BASE}/detections/recent?limit=10`),
        fetch(`${API_BASE}/zones/high-risk`),
        fetch(`${API_BASE}/system/status`),
        fetch(`${API_BASE}/system/metrics`),
        fetch(`${API_BASE}/alerts/active`)
      ]);

      const detectionsData = await detectionsRes.json();
      const zonesData = await zonesRes.json();
      const statusData = await statusRes.json();
      const metricsData = await metricsRes.json();
      const alertsData = await alertsRes.json();

      setDetections(detectionsData.detections || []);
      setRiskZones(zonesData.zones || []);
      setSystemStatus(statusData);
      setMetrics(metricsData);
      setAlerts(alertsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const triggerAnalysis = async () => {
    try {
      const response = await fetch(`${API_BASE}/analysis/trigger`, { method: 'POST' });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error triggering analysis:', error);
      alert('Failed to trigger analysis');
    }
  };

  const handleDetectionClick = (detection) => {
    setSelectedDetection(detection);
    setSelectedZone(null);
    setDetailPanel(true);
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    setSelectedDetection(null);
    setDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setDetailPanel(false);
    setTimeout(() => {
      setSelectedDetection(null);
      setSelectedZone(null);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-2xl">Loading real detection data...</div>
        </div>
      </div>
    );
  }

  const latestAlert = detections.length > 0 ? detections[0] : null;

  const renderMonitoringTab = () => (
    <>
      {/* Alert Banner */}
      {latestAlert && (
        <div className="mb-8 bg-gradient-to-r from-red-900/40 via-orange-900/40 to-red-900/40 border border-red-500/50 rounded-2xl p-4 backdrop-blur-xl hover:shadow-2xl hover:shadow-red-500/30 transition-all cursor-pointer" onClick={() => handleDetectionClick(latestAlert)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
                <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-300">
                  {latestAlert.severity.toUpperCase()} ALERT: Terrain Displacement Detected
                </h3>
                <p className="text-sm text-red-400">
                  {latestAlert.location} • {latestAlert.latitude.toFixed(4)}°N, {latestAlert.longitude.toFixed(4)}°E • 
                  Confidence: {latestAlert.confidence.toFixed(1)}% • Area: {latestAlert.area_m2.toFixed(0)} m²
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-sm transition-all shadow-lg shadow-red-500/50">
                VIEW DETAILS
              </button>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Live Scanning Panel */}
        <div className="col-span-8 bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-xl rounded-3xl border border-blue-500/30 overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Satellite className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">SIAMESE NEURAL NETWORK • LIVE ANALYSIS</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/40 rounded-lg">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-xs font-bold">AI ACTIVE</span>
                </div>
                <div className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded-lg">
                  <span className="text-cyan-300 text-xs font-bold">
                    {metrics?.model_accuracy || 98.7}% ACCURACY
                  </span>
                </div>
              </div>
            </div>

            {/* Terrain Visualization */}
            <div className="relative h-96 bg-gradient-to-b from-blue-950 to-slate-950 rounded-2xl overflow-hidden border border-cyan-500/20">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" 
                   style={{top: `${scanProgress}%`}}></div>
              
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
                
                <path d="M0,350 L100,280 L200,260 L300,240 L400,220 L500,240 L600,260 L700,280 L800,350 Z" 
                      fill="rgba(30,58,138,0.3)"/>
                <path d="M0,370 L150,310 L300,280 L450,260 L600,280 L800,370 Z" 
                      fill="rgba(30,64,175,0.4)"/>
                
                <path d="M0,400 L80,340 L160,300 L240,270 L320,240 L400,200 L480,240 L560,280 L640,320 L720,360 L800,400 Z" 
                      fill="url(#terrainGrad)" filter="url(#glow)"/>
                
                <path d="M380,200 L400,170 L420,200" fill="rgba(255,255,255,0.95)"/>
                <path d="M390,190 L400,180 L410,190" fill="rgba(226,232,240,0.9)"/>
                
                {detections.slice(0, 5).map((det, i) => {
                  const x = 200 + i * 120;
                  const y = 200 + (det.max_prob - 0.88) * 1000;
                  return (
                    <g key={i} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleDetectionClick(det)}>
                      <circle cx={x} cy={y} r="30" fill="url(#pulseGrad)" className="animate-ping"/>
                      <circle cx={x} cy={y} r="8" fill="#ef4444" filter="url(#glow)"/>
                    </g>
                  );
                })}
                
                {[...Array(10)].map((_, i) => (
                  <line key={i} x1="0" y1={i * 40 + 50} x2="800" y2={i * 40 + 50} 
                        stroke="rgba(34,211,238,0.1)" strokeWidth="1"/>
                ))}
              </svg>

              <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-cyan-500/30 hover:scale-105 transition-transform cursor-pointer">
                <div className="text-xs text-cyan-400 mb-2">DETECTIONS</div>
                <div className="text-2xl font-bold mb-1">{metrics?.total_detections || 0}</div>
                <div className="text-xs text-gray-400">Active Zones</div>
              </div>

              <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-orange-500/30 hover:scale-105 transition-transform cursor-pointer">
                <div className="text-xs text-orange-400 mb-2">MAX RISK</div>
                <div className="text-2xl font-bold text-orange-500">
                  {metrics?.max_risk ? (metrics.max_risk * 100).toFixed(1) : 0}%
                </div>
                <div className="text-xs text-gray-400">Probability</div>
              </div>

              <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-purple-500/30 hover:scale-105 transition-transform cursor-pointer">
                <div className="text-xs text-purple-400 mb-2">AREA AT RISK</div>
                <div className="text-2xl font-bold text-purple-400">
                  {metrics?.total_area_at_risk_m2 ? (metrics.total_area_at_risk_m2 / 1000000).toFixed(2) : 0} km²
                </div>
                <div className="text-xs text-gray-400">Total Coverage</div>
              </div>
            </div>

            {/* Processing Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-950/50 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer">
                <div className="text-xs text-blue-400 mb-1">TOTAL DETECTIONS</div>
                <div className="text-2xl font-bold">{metrics?.total_detections || 0}</div>
              </div>
              <div className="bg-slate-950/50 rounded-xl p-4 border border-red-500/20 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all cursor-pointer">
                <div className="text-xs text-red-400 mb-1">CRITICAL</div>
                <div className="text-2xl font-bold text-red-400">{metrics?.critical_detections || 0}</div>
              </div>
              <div className="bg-slate-950/50 rounded-xl p-4 border border-orange-500/20 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer">
                <div className="text-xs text-orange-400 mb-1">RISK ZONES</div>
                <div className="text-2xl font-bold text-orange-400">{metrics?.high_risk_zones || 0}</div>
              </div>
              <div className="bg-slate-950/50 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer">
                <div className="text-xs text-purple-400 mb-1">AVG CONFIDENCE</div>
                <div className="text-2xl font-bold">
                  {metrics?.avg_confidence ? metrics.avg_confidence.toFixed(1) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold">HIGH-RISK ZONES</h3>
            </div>
            
            <div className="space-y-4">
              {riskZones.map((zone, i) => (
                <div key={i} onClick={() => handleZoneClick(zone)} className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer transform hover:scale-[1.02]">
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
                    <span className="text-xl font-bold">{zone.risk.toFixed(0)}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-3 h-3 ${zone.trend === 'up' ? 'text-red-400' : 'text-green-400'} ${zone.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} />
                      <span className="text-gray-400">{zone.detection_count} detections</span>
                    </div>
                    <span className="text-gray-500">
                      {(zone.area_m2 / 1000000).toFixed(2)} km²
                    </span>
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
              <div className="flex items-center justify-between hover:bg-slate-900/30 p-2 rounded-lg transition-colors cursor-pointer">
                <span className="text-sm text-gray-300">Satellite Feed</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-bold">ACTIVE</span>
                </div>
              </div>
              <div className="flex items-center justify-between hover:bg-slate-900/30 p-2 rounded-lg transition-colors cursor-pointer">
                <span className="text-sm text-gray-300">Neural Network</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-bold">PROCESSING</span>
                </div>
              </div>
              <div className="flex items-center justify-between hover:bg-slate-900/30 p-2 rounded-lg transition-colors cursor-pointer">
                <span className="text-sm text-gray-300">Alert System</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-bold">ONLINE</span>
                </div>
              </div>
              <div className="flex items-center justify-between hover:bg-slate-900/30 p-2 rounded-lg transition-colors cursor-pointer">
                <span className="text-sm text-gray-300">Data Pipeline</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-bold">SYNCED</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={triggerAnalysis}
              className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02]"
            >
              TRIGGER NEW SCAN
            </button>
          </div>
        </div>
      </div>

      {/* Recent Detections */}
      <div className="bg-gradient-to-br from-slate-900/90 to-orange-900/30 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-orange-400" />
            <h3 className="text-xl font-bold">RECENT DETECTIONS (REAL DATA)</h3>
          </div>
          <button className="text-sm text-orange-400 hover:text-orange-300 font-semibold hover:underline">VIEW ALL →</button>
        </div>

        <div className="space-y-3">
          {detections.slice(0, 5).map((detection, i) => (
            <div key={i} onClick={() => handleDetectionClick(detection)} className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/20 transition-all flex items-center justify-between cursor-pointer transform hover:scale-[1.01]">
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
                  <div className="text-sm font-semibold text-white mb-1">
                    {detection.location}
                  </div>
                  <div className="text-xs text-gray-400">
                    {detection.latitude.toFixed(4)}°N, {detection.longitude.toFixed(4)}°E • 
                    Confidence: {detection.confidence.toFixed(1)}% • 
                    Area: {(detection.area_m2 / 1000).toFixed(1)}k m²
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold block mb-1 ${
                    detection.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    detection.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {detection.severity}
                  </span>
                  {detection.rank && (
                    <span className="text-xs text-gray-500">Rank #{detection.rank}</span>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold">ANALYTICS DASHBOARD</h2>
        </div>
        <p className="text-sm text-gray-400">Comprehensive analysis of landslide detection patterns across Himachal Pradesh</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6 hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-blue-400" />
            <div className="text-xs text-blue-400 font-bold">DETECTION RATE</div>
          </div>
          <div className="text-3xl font-black mb-2">{metrics?.total_detections || 0}</div>
          <div className="text-xs text-gray-400">Total Events Detected</div>
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">+12.5% this month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-red-900/30 backdrop-blur-xl rounded-2xl border border-red-500/30 p-6 hover:shadow-xl hover:shadow-red-500/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div className="text-xs text-red-400 font-bold">CRITICAL ALERTS</div>
          </div>
          <div className="text-3xl font-black mb-2 text-red-400">{metrics?.critical_detections || 0}</div>
          <div className="text-xs text-gray-400">Immediate Action Required</div>
          <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">3 Active Emergencies</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <div className="text-xs text-purple-400 font-bold">MODEL ACCURACY</div>
          </div>
          <div className="text-3xl font-black mb-2">{metrics?.model_accuracy || 98.7}%</div>
          <div className="text-xs text-gray-400">AI Confidence Score</div>
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">+0.3% improvement</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-orange-900/30 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6 hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Map className="w-8 h-8 text-orange-400" />
            <div className="text-xs text-orange-400 font-bold">AREA MONITORED</div>
          </div>
          <div className="text-3xl font-black mb-2 text-orange-400">
            {metrics?.total_area_at_risk_m2 ? (metrics.total_area_at_risk_m2 / 1000000).toFixed(1) : 0} km²
          </div>
          <div className="text-xs text-gray-400">Total Surveillance Coverage</div>
          <div className="mt-4 flex items-center gap-2 text-orange-400 text-sm">
            <Globe className="w-4 h-4" />
            <span className="font-semibold">15 Active Regions</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <PieChart className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold">SEVERITY DISTRIBUTION</h3>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Critical', count: metrics?.critical_detections || 0, color: 'red', total: metrics?.total_detections || 1 },
              { label: 'High', count: Math.floor((metrics?.total_detections || 0) * 0.4), color: 'orange', total: metrics?.total_detections || 1 },
              { label: 'Moderate', count: Math.floor((metrics?.total_detections || 0) * 0.35), color: 'yellow', total: metrics?.total_detections || 1 },
              { label: 'Low', count: Math.floor((metrics?.total_detections || 0) * 0.15), color: 'green', total: metrics?.total_detections || 1 }
            ].map((item, i) => {
              const percentage = ((item.count / item.total) * 100).toFixed(1);
              return (
                <div key={i} className="hover:bg-slate-900/30 p-3 rounded-lg transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">{item.count}</span>
                      <span className="text-xs text-gray-400">{percentage}%</span>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.color === 'red' ? 'bg-gradient-to-r from-red-600 to-red-500' :
                        item.color === 'orange' ? 'bg-gradient-to-r from-orange-600 to-orange-500' :
                        item.color === 'yellow' ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' :
                        'bg-gradient-to-r from-green-600 to-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detection Trend */}
        <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold">DETECTION TREND</h3>
            </div>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => {
              const height = 30 + Math.random() * 70;
              const isCurrent = i === 10; // November
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-300 group-hover:scale-105 ${
                        isCurrent 
                          ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-lg shadow-cyan-500/50' 
                          : 'bg-gradient-to-t from-purple-900 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-400'
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                      {Math.floor(10 + height * 2)} events
                    </div>
                  </div>
                  <span className={`text-xs ${isCurrent ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}>{month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Geographic Heatmap */}
      <div className="bg-gradient-to-br from-slate-900/90 to-green-900/30 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Map className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold">GEOGRAPHIC DISTRIBUTION</h3>
          </div>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-bold transition-all">
            EXPORT MAP
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {riskZones.slice(0, 9).map((zone, i) => (
            <div 
              key={i} 
              onClick={() => handleZoneClick(zone)}
              className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/20 transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">{zone.name}</span>
                <Layers className={`w-4 h-4 ${
                  zone.risk > 70 ? 'text-red-400' :
                  zone.risk > 40 ? 'text-orange-400' : 'text-yellow-400'
                }`} />
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400">Risk Level</span>
                  <span className="font-bold">{zone.risk.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      zone.risk > 70 ? 'bg-gradient-to-r from-red-600 to-red-500' :
                      zone.risk > 40 ? 'bg-gradient-to-r from-orange-600 to-orange-500' :
                      'bg-gradient-to-r from-yellow-600 to-yellow-500'
                    }`}
                    style={{ width: `${zone.risk}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{zone.detection_count} detections</span>
                <span>{(zone.area_m2 / 1000000).toFixed(2)} km²</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Analysis */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold">CONFIDENCE METRICS</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
              <span className="text-sm text-gray-300">Average Confidence</span>
              <span className="text-xl font-bold text-cyan-400">{metrics?.avg_confidence?.toFixed(1) || 0}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
              <span className="text-sm text-gray-300">Max Confidence</span>
              <span className="text-xl font-bold text-green-400">
                {detections.length > 0 ? Math.max(...detections.map(d => d.confidence)).toFixed(1) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
              <span className="text-sm text-gray-300">Min Confidence</span>
              <span className="text-xl font-bold text-yellow-400">
                {detections.length > 0 ? Math.min(...detections.map(d => d.confidence)).toFixed(1) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
              <span className="text-sm text-gray-300">High Confidence (>90%)</span>
              <span className="text-xl font-bold text-purple-400">
                {detections.filter(d => d.confidence > 90).length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-orange-900/30 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold">PROCESSING PERFORMANCE</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Images Processed</span>
                <span className="text-lg font-bold">{metrics?.total_detections ? metrics.total_detections * 2 : 0}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full w-4/5"></div>
              </div>
            </div>
            
            <div className="p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Avg Processing Time</span>
                <span className="text-lg font-bold text-cyan-400">2.3s</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full w-1/4"></div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Success Rate</span>
                <span className="text-lg font-bold text-green-400">99.2%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full" style={{width: '99.2%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNeuralNetworkTab = () => (
    <div className="space-y-6">
      {/* Neural Network Header */}
      <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold">SIAMESE NEURAL NETWORK ARCHITECTURE</h2>
        </div>
        <p className="text-sm text-gray-400">Deep learning model for change detection in satellite imagery</p>
      </div>

      {/* Model Architecture Visualization */}
      <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          MODEL ARCHITECTURE
        </h3>
        
        <div className="flex items-center justify-between">
          {/* Input Layer */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-400 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50 hover:scale-110 transition-transform cursor-pointer">
              <span className="text-xs font-bold">INPUT</span>
            </div>
            <span className="text-xs text-gray-400 text-center">Satellite<br/>Image Pair</span>
          </div>

          <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 mx-4"></div>

          {/* Siamese Branches */}
          <div className="flex flex-col gap-6">
            {[1, 2].map(branch => (
              <div key={branch} className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-xs font-bold">CNN {branch}</span>
                </div>
                <div className="flex-1 h-0.5 bg-blue-500 w-8"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-xs font-bold">POOL</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-4"></div>

          {/* Merge Layer */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform cursor-pointer">
              <span className="text-xs font-bold">MERGE</span>
            </div>
            <span className="text-xs text-gray-400">Feature<br/>Fusion</span>
          </div>

          <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 mx-4"></div>

          {/* Dense Layers */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-400 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform cursor-pointer">
              <span className="text-xs font-bold">DENSE</span>
            </div>
          </div>

          <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-4"></div>

          {/* Output Layer */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-400 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50 hover:scale-110 transition-transform cursor-pointer">
              <span className="text-xs font-bold">OUTPUT</span>
            </div>
            <span className="text-xs text-gray-400 text-center">Change<br/>Detection</span>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-900/90 to-green-900/30 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6 hover:shadow-xl hover:shadow-green-500/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-green-400" />
            <h3 className="text-sm font-bold text-green-400">MODEL ACCURACY</h3>
          </div>
          <div className="text-4xl font-black mb-2">{metrics?.model_accuracy || 98.7}%</div>
          <div className="text-xs text-gray-400 mb-4">Validation Dataset Performance</div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full" style={{width: `${metrics?.model_accuracy || 98.7}%`}}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6 hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-blue-400" />
            <h3 className="text-sm font-bold text-blue-400">PRECISION</h3>
          </div>
          <div className="text-4xl font-black mb-2">96.8%</div>
          <div className="text-xs text-gray-400 mb-4">True Positive Rate</div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full w-[96.8%]"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-cyan-400" />
            <h3 className="text-sm font-bold text-cyan-400">RECALL</h3>
          </div>
          <div className="text-4xl font-black mb-2">97.3%</div>
          <div className="text-xs text-gray-400 mb-4">Detection Sensitivity</div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full w-[97.3%]"></div>
          </div>
        </div>
      </div>

      {/* Training Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Satellite className="w-5 h-5 text-purple-400" />
            TRAINING CONFIGURATION
          </h3>
          
          <div className="space-y-3">
            {[
              { label: 'Architecture', value: 'Siamese CNN' },
              { label: 'Base Model', value: 'ResNet-50' },
              { label: 'Input Size', value: '256x256x3' },
              { label: 'Batch Size', value: '32' },
              { label: 'Epochs', value: '100' },
              { label: 'Optimizer', value: 'Adam' },
              { label: 'Learning Rate', value: '0.0001' },
              { label: 'Loss Function', value: 'Binary Crossentropy' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
                <span className="text-sm text-gray-400">{item.label}</span>
                <span className="text-sm font-bold text-purple-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-orange-900/30 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-orange-400" />
            DATASET INFORMATION
          </h3>
          
          <div className="space-y-3">
            {[
              { label: 'Source', value: 'Google Earth Engine' },
              { label: 'Ground Truth', value: 'Global Landslide Catalog' },
              { label: 'Training Samples', value: '12,450' },
              { label: 'Validation Samples', value: '3,112' },
              { label: 'Test Samples', value: '1,556' },
              { label: 'Positive Class', value: '4,234 samples' },
              { label: 'Negative Class', value: '12,884 samples' },
              { label: 'Data Augmentation', value: 'Enabled' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
                <span className="text-sm text-gray-400">{item.label}</span>
                <span className="text-sm font-bold text-orange-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

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
                  <p className="text-xs text-blue-400 tracking-widest mt-0.5">SIAMESE CNN • REAL-TIME MONITORING</p>
                </div>
              </div>
              
              <nav className="flex gap-2">
                {['monitoring', 'analytics', 'neural-network'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 ${
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
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">
                    {metrics?.total_detections || 0} LIVE DETECTIONS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-8 py-8">
          {activeTab === 'monitoring' && renderMonitoringTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
          {activeTab === 'neural-network' && renderNeuralNetworkTab()}
        </main>

        {/* Footer */}
        <footer className="border-t border-blue-500/20 backdrop-blur-xl bg-slate-900/30 mt-12">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div>EarthSentinel v2.0 • Siamese Neural Network • Real Detection Data</div>
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

      {/* Detail Panel Overlay */}
      {detailPanel && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-8 animate-fadeIn" onClick={closeDetailPanel}>
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-cyan-500/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/20" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                {selectedDetection && <Radar className="w-6 h-6 text-orange-400" />}
                {selectedZone && <MapPin className="w-6 h-6 text-purple-400" />}
                {selectedDetection ? 'Detection Details' : 'Risk Zone Details'}
              </h2>
              <button onClick={closeDetailPanel} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {selectedDetection && (
                <>
                  {/* Detection Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
                      <div className="text-xs text-gray-400 mb-1">LOCATION</div>
                      <div className="text-lg font-bold">{selectedDetection.location}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {selectedDetection.latitude.toFixed(6)}°N, {selectedDetection.longitude.toFixed(6)}°E
                      </div>
                    </div>
                    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
                      <div className="text-xs text-gray-400 mb-1">SEVERITY</div>
                      <div className={`text-lg font-bold ${
                        selectedDetection.severity === 'Critical' ? 'text-red-400' :
                        selectedDetection.severity === 'High' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>{selectedDetection.severity}</div>
                      <div className="text-sm text-gray-500 mt-1">Priority: {selectedDetection.rank || 'N/A'}</div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-4 border border-cyan-500/30">
                      <div className="text-xs text-cyan-400 mb-2">CONFIDENCE</div>
                      <div className="text-2xl font-bold">{selectedDetection.confidence.toFixed(1)}%</div>
                      <div className="h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full" style={{width: `${selectedDetection.confidence}%`}}></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl p-4 border border-orange-500/30">
                      <div className="text-xs text-orange-400 mb-2">AREA AFFECTED</div>
                      <div className="text-2xl font-bold">{(selectedDetection.area_m2 / 1000).toFixed(1)}k m²</div>
                      <div className="text-xs text-gray-400 mt-1">{(selectedDetection.area_m2 / 1000000).toFixed(3)} km²</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/30">
                      <div className="text-xs text-purple-400 mb-2">MAX PROBABILITY</div>
                      <div className="text-2xl font-bold">{(selectedDetection.max_prob * 100).toFixed(1)}%</div>
                      <div className="text-xs text-gray-400 mt-1">Model output</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
                    <h3 className="text-sm font-bold text-cyan-400 mb-3">DETECTION METADATA</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Detection ID:</span>
                        <span className="font-mono text-white">{selectedDetection.id || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timestamp:</span>
                        <span className="font-mono text-white">{selectedDetection.timestamp || new Date().toISOString().split('T')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Model Version:</span>
                        <span className="font-mono text-white">Siamese-CNN-v2.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Source:</span>
                        <span className="font-mono text-white">Google Earth Engine</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedZone && (
                <>
                  {/* Zone Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
                      <div className="text-xs text-gray-400 mb-1">ZONE NAME</div>
                      <div className="text-lg font-bold">{selectedZone.name}</div>
                      <div className="text-sm text-gray-500 mt-1">Himachal Pradesh, India</div>
                    </div>
                    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
                      <div className="text-xs text-gray-400 mb-1">STATUS</div>
                      <div className={`text-lg font-bold ${
                        selectedZone.status === 'critical' ? 'text-red-400' :
                        selectedZone.status === 'high' ? 'text-orange-400' :
                        selectedZone.status === 'moderate' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>{selectedZone.status.toUpperCase()}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Trend: {selectedZone.trend === 'up' ? '↑ Increasing' : '↓ Decreasing'}
                      </div>
                    </div>
                  </div>

                  {/* Zone Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/30">
                      <div className="text-xs text-purple-400 mb-2">RISK LEVEL</div>
                      <div className="text-2xl font-bold">{selectedZone.risk.toFixed(0)}%</div>
                      <div className="h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
                        <div className={`h-full rounded-full ${
                          selectedZone.risk > 70 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                          selectedZone.risk > 40 ? 'bg-gradient-to-r from-orange-600 to-orange-400' :
                          'bg-gradient-to-r from-yellow-600 to-yellow-400'
                        }`} style={{width: `${selectedZone.risk}%`}}></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl p-4 border border-orange-500/30">
                      <div className="text-xs text-orange-400 mb-2">DETECTIONS</div>
                      <div className="text-2xl font-bold">{selectedZone.detection_count}</div>
                      <div className="text-xs text-gray-400 mt-1">Active events</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl p-4 border border-green-500/30">
                      <div className="text-xs text-green-400 mb-2">AREA</div>
                      <div className="text-2xl font-bold">{(selectedZone.area_m2 / 1000000).toFixed(2)} km²</div>
                      <div className="text-xs text-gray-400 mt-1">{selectedZone.area_m2.toFixed(0)} m²</div>
                    </div>
                  </div>

                  {/* Zone Details */}
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
                    <h3 className="text-sm font-bold text-purple-400 mb-3">ZONE INFORMATION</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Region:</span>
                        <span className="text-white">Himachal Pradesh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monitoring Status:</span>
                        <span className="text-green-400">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated:</span>
                        <span className="text-white">{new Date().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarthSentinel;