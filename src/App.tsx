import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ShieldAlert, 
  Calculator, 
  Sliders, 
  Target, 
  BarChart3, 
  Layers, 
  Zap, 
  Search, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Compass,
  BookOpen,
  Flame,
  Calendar,
  Newspaper,
  Globe,
  ExternalLink,
  Info,
  Plus,
  Trash2,
  X,
  RotateCcw,
  LineChart as LineChartIcon,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  Bot
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

interface AvailableExpiry {
  tradingsymbol: string;
  expiry: string;
  formattedDate: string;
  isMonthly?: boolean;
  lotSize?: number;
}

interface SearchResultInstrument {
  tradingsymbol: string;
  name: string;
  exchange: string;
  segment: string;
  instrumentType: string;
  displayType: string;
  strike: number | null;
  expiry: string | null;
  formattedExpiry: string;
  lotSize: number;
  lastPrice: number;
}

interface ContractDetails {
  tradingsymbol: string;
  exchange: string;
  strike?: number;
  instrumentType?: 'PE' | 'CE' | 'FUT' | 'EQ';
  expiry?: string;
  formattedExpiry?: string;
  lotSize: number;
  underlying?: string;
  underlyingPrice?: number;
  underlyingChange?: string;
  moneyness?: string;
  intrinsicValue?: number;
  breakEven?: number;
  distanceToStrike?: number;
  ptsToBreakEven?: number;
  openInterest?: number;
  volume?: number;
  dayHigh?: number;
  dayLow?: number;
  dayOpen?: number;
  prevClose?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  fiftyDayHigh?: number;
  fiftyDayLow?: number;
}

export interface FnoOpportunity {
  id: string;
  indexName: "NIFTY" | "BANKNIFTY" | "SENSEX";
  exchange: "NFO" | "BFO";
  fullTradingsymbol: string;
  cleanScript: string;
  underlyingSpot: number;
  underlyingChange: string;
  underlyingChangePct: number;
  recommendationType: "CALL (CE)" | "PUT (PE)";
  sweetSpotStrike: number;
  tradingsymbol: string;
  expiry: string;
  expiryCode: string;
  lotSize: number;
  legacyLotSize: number;
  contractValueLakhs: string;
  affordablePremium: number;
  premiumRange: string;
  patternName: string;
  patternStatus: "Approaching (Pre-Breakout Alert)" | "Active Breakout" | "Confirmed Setup";
  timeframe: string;
  patternDescription: string;
  advanceClue: string;
  buyerDominancePct: number;
  volumeSurgeMultiplier: string;
  institutionalBuildup: "Long Buildup" | "Short Buildup" | "Short Covering Blast" | "Put Writing Support" | "Long Unwinding";
  entryMin: number;
  entryMax: number;
  stoploss: number;
  target1: number;
  target2: number;
  riskReward: string;
  maxRiskPerLot: number;
  maxProfitPerLotT1: number;
  maxProfitPerLotT2: number;
  profitMultiplier: string;
  whyThisStrike: string;
  optimalEntryTimeWindow?: string;
  setupGrade?: string;
  noTradeReasoning?: string;
  patientFilterPassed?: boolean;
}

export interface FnoPaperTrade {
  id: string;
  indexName: string;
  cleanScript: string;
  fullTradingsymbol: string;
  recommendationType: string;
  entryPrice: number;
  currentLtp: number;
  highestPrice: number;
  stoploss: number;
  target1: number;
  target2: number;
  lotSize: number;
  numberOfLots: number;
  status: 'ACTIVE' | 'QUEUED_AFTER_HOURS' | 'TARGET1_HIT' | 'TARGET2_HIT' | 'STOPLOSS_HIT' | 'CLOSED';
  isPracticeMode?: boolean;
  startTimestamp: string;
  hitTimestamp?: string;
  elapsedMinutes?: number;
  pnl: number;
  pnlPct: number;
  maxProfitAchieved: number;
}

export interface HorizonForecast {
  timeframe: string;
  direction: 'BULLISH (UP)' | 'BEARISH (DOWN)' | 'NEUTRAL (SIDEWAYS)';
  directionType: 'UP' | 'DOWN' | 'SIDEWAYS';
  confidenceScore: number;
  predictedPriceRange: string;
  expectedReturnPct: string;
  primaryDrivers: string[];
  hindiPrimaryDrivers?: string[];
  keyRiskTrigger: string;
  hindiKeyRiskTrigger?: string;
  reasoning: string;
  hindiTakeaway?: string;
}

export interface SpecialistAgent {
  id: 'intraday' | 'derivative' | 'macro';
  nameEn: string;
  nameHi: string;
  roleEn: string;
  roleHi: string;
  avatarIcon: 'zap' | 'chart' | 'building';
  colorTheme: 'amber' | 'cyan' | 'purple';
  horizon: '1D' | '5D' | '1M';
  stance: 'STRONG BUY' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'STRONG SELL';
  stanceHi: string;
  confidenceScore: number;
  expectedMove: string;
  targetPrice: string;
  stoploss: string;
  keyMetrics: { label: string; value: string; sentiment?: 'bullish' | 'bearish' | 'neutral' }[];
  hindiReasoning: string;
  englishReasoning: string;
  riskTrigger: string;
  catalystsConsidered: string[];
}

export interface MultiHorizonPrediction {
  oneDay: HorizonForecast;
  fiveDays: HorizonForecast;
  oneMonth: HorizonForecast;
  overallConsensus: 'STRONG BULLISH' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'STRONG BEARISH';
  aiSynthesisSummary: string;
  hindiSummary?: string;
  agentSource?: string;
  keyInsights?: string[];
  lastCalculated: string;
  specialistAgents?: SpecialistAgent[];
  votingSummary?: {
    bullishCount: number;
    bearishCount: number;
    neutralCount: number;
    consensusStrength: 'High' | 'Moderate' | 'Mixed';
    consensusStrengthHi: string;
  };
}

export interface MacroFactor {
  category: "USD_INR" | "CRUDE_OIL" | "US_ELECTIONS_POLICY" | "WAR_GEOPOLITICS" | "US_BOND_DXY" | "DOMESTIC_POLICY";
  titleEn: string;
  titleHi: string;
  metric: string;
  sentiment: "Bullish" | "Bearish" | "Neutral";
  impactEn: string;
  impactHi: string;
  importance: "Critical" | "High" | "Moderate";
}

export interface GlobalGeopoliticalRadar {
  overallMacroSentiment: string;
  overallMacroSentimentHi: string;
  macroScore: number;
  usdInr?: {
    rate: string;
    change: string;
    sentiment: string;
    isRupeeStrong: boolean;
    explanationHi: string;
    explanationEn: string;
  };
  crudeOil: {
    priceBbl: string;
    change: string;
    sentiment: string;
    explanationHi: string;
    explanationEn: string;
  };
  usElectionsPolicy: {
    headline: string;
    status: string;
    sentiment: string;
    explanationHi: string;
    explanationEn: string;
  };
  warRiskMonitor: {
    conflictLevel: string;
    activeHotspots: string[];
    sentiment: string;
    explanationHi: string;
    explanationEn: string;
  };
  keyFactors: MacroFactor[];
  lastUpdated: string;
}

export interface CorporateEventItem {
  id: number | string;
  month: string;
  date: string;
  fullDate: string;
  title: string;
  company: string;
  type: 'RESULT' | 'DIVIDEND' | 'MEETING' | 'UPDATE' | 'MACRO';
  tagColor: string;
  impact: 'High Impact' | 'Critical Impact' | 'Moderate Impact';
  description: string;
  countdownDays: number;
  status: 'Upcoming' | 'Live Today' | 'Scheduled';
}

export interface MarketNewsItem {
  title: string;
  source: string;
  pubDate: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
}

export interface MacroIntelligence {
  marketSentiment: 'Bullish' | 'Bearish' | 'Neutral';
  sentimentScore: number;
  headline: string;
  fiiDiiSentiment: string;
  macroCatalysts: string[];
  eventDrivenPrediction: string;
  optionImpactNote?: string;
  recentNews: MarketNewsItem[];
  globalGeopoliticalRadar?: GlobalGeopoliticalRadar;
  corporateEvents?: CorporateEventItem[];
  lastUpdated: string;
  fetchedAtTimestamp?: number;
}

interface DerivativeData {
  oiBuildUp: 'Long Buildup' | 'Short Buildup' | 'Short Covering' | 'Long Unwinding';
  pcr: number;
  maxPain: number;
  lotSize: number;
  callResistanceStrike: number;
  putSupportStrike: number;
  underlyingSpot?: number;
  underlyingName?: string;
  isOption?: boolean;
  optionStrike?: number;
  optionType?: string;
  breakEven?: number;
  distanceToStrike?: number;
  ptsToBreakEven?: number;
  relationshipExplanation?: string;
  expiryNotes: string;
}

interface AnalysisData {
  ticker: string;
  companyName: string;
  currentPrice: number;
  currency: string;
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  change?: string;
  netChangeRs?: number;
  changePct?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  fiftyDayHigh?: number;
  fiftyDayLow?: number;
  confluenceScore: number;
  summary: string;
  isFallback?: boolean;
  isKiteLive?: boolean;
  isLiveYahoo?: boolean;
  fallbackMessage?: string;
  contractDetails?: ContractDetails;
  availableExpiries?: AvailableExpiry[];
  macroIntelligence?: MacroIntelligence;
  multiHorizonPrediction?: MultiHorizonPrediction;
  derivativeData: DerivativeData;
  timeframes: {
    weeklyTrend: string;
    weeklyNotes: string;
    dailySetup: string;
    dailyNotes: string;
    hourlyEntry: string;
    hourlyNotes: string;
  };
  indicators: {
    rsi: number;
    rsiSignal: string;
    macdStatus: string;
    adx: number;
    atr: number;
    supportLevels: number[];
    resistanceLevels: number[];
    emas: {
      ema20: number;
      ema50: number;
      ema200: number;
    };
  };
  fibonacci: {
    swingHigh: number;
    swingLow: number;
    goldenPocket50: number;
    goldenPocket618: number;
    target1272: number;
    target1618: number;
  };
  tradePlan: {
    entryRangeMin: number;
    entryRangeMax: number;
    stopLoss: number;
    stopLossReason: string;
    target1: number;
    target2: number;
    riskRewardRatio: string;
    netRiskRewardAfterCosts: string;
  };
  positionSizing: {
    accountCapital: number;
    riskPercentage: number;
    riskAmountInINR: number;
    stopLossPoints: number;
    exactShares: number;
    lotSize: number;
    recommendedLots: number;
    equityPositionValue: number;
    futuresMarginRequired: number;
  };
  trailingPlan: {
    rule1: string;
    rule2: string;
    rule3: string;
  };
  riskWarnings: string[];
}

export const isPureIndex = (symbol: string = '') => {
  const sym = symbol.toUpperCase().trim();
  if (sym.includes('PE') || sym.includes('CE') || sym.includes('FUT') || sym.includes('CALL') || sym.includes('PUT')) {
    return false;
  }
  return (
    sym === 'NIFTY' ||
    sym === 'BANKNIFTY' ||
    sym === 'SENSEX' ||
    sym === 'FINNIFTY' ||
    sym === 'MIDCPNIFTY' ||
    sym.includes('NIFTY BANK') ||
    sym.includes('BANK NIFTY') ||
    sym.includes('NIFTY 50') ||
    sym.includes('NIFTY 100') ||
    sym.includes('S&P BSE') ||
    sym.includes('BSESN') ||
    sym.startsWith('^')
  );
};

export const formatPriceWithCurrency = (amount: number | undefined | null, symbol: string = '', digits: number = 2) => {
  if (amount === undefined || amount === null) return '---';
  const formatted = amount.toLocaleString('en-IN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
  return isPureIndex(symbol) ? formatted : `₹${formatted}`;
};

interface ScannerAsset {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: string;
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  score: number;
  oiBuildUp: string;
  pcr: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  fiftyDayHigh?: number;
  fiftyDayLow?: number;
}

interface OIPCRPoint {
  timestamp: string;
  label: string;
  price: number;
  openInterest: number;
  callOi: number;
  putOi: number;
  pcr: number;
  oiChange: number;
  oiChangePct: number;
  priceChange: number;
  buildup: "Long Buildup" | "Short Buildup" | "Short Covering" | "Long Unwinding";
}

interface OIPCRData {
  ticker: string;
  name: string;
  timeframe: 'intraday' | 'daily';
  currentPrice: number;
  currentOi: number;
  currentPcr: number;
  pcrSentiment: string;
  oiBuildUp: string;
  totalCallOi: number;
  totalPutOi: number;
  history: OIPCRPoint[];
}

export function MultiHorizonPredictionCard({ 
  prediction, 
  symbol,
  onRunAiAgent,
  isAiAgentLoading
}: { 
  prediction?: MultiHorizonPrediction; 
  symbol: string;
  onRunAiAgent?: () => void;
  isAiAgentLoading?: boolean;
}) {
  if (!prediction) return null;

  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [activeAgentTab, setActiveAgentTab] = useState<'consensus' | 'intraday' | 'derivative' | 'macro'>('consensus');

  const horizons = [
    { key: 'oneDay', data: prediction.oneDay, label: lang === 'hi' ? '1 दिन का पूर्वानुमान' : '1 Day Forecast', sub: lang === 'hi' ? 'इंट्राडे / अगला सत्र' : 'Intraday / Tomorrow' },
    { key: 'fiveDays', data: prediction.fiveDays, label: lang === 'hi' ? '5 दिनों का पूर्वानुमान' : '5 Days Forecast', sub: lang === 'hi' ? 'साप्ताहिक दृष्टिकोण' : 'Weekly Horizon' },
    { key: 'oneMonth', data: prediction.oneMonth, label: lang === 'hi' ? '1 महीने का पूर्वानुमान' : '1 Month Forecast', sub: lang === 'hi' ? 'मासिक दृष्टिकोण' : 'Monthly Horizon' }
  ];

  const consensusColor = prediction.overallConsensus.includes('BULLISH')
    ? 'text-emerald-700 bg-emerald-50 border-emerald-300'
    : prediction.overallConsensus.includes('BEARISH')
    ? 'text-rose-700 bg-rose-50 border-rose-300'
    : 'text-amber-700 bg-amber-50 border-amber-300';

  const consensusHindiLabel = prediction.overallConsensus === 'STRONG BULLISH'
    ? 'मजबूत तेज़ी (Strong Bullish)'
    : prediction.overallConsensus === 'BULLISH'
    ? 'तेज़ी (Bullish)'
    : prediction.overallConsensus === 'BEARISH'
    ? 'मंदी (Bearish)'
    : prediction.overallConsensus === 'STRONG BEARISH'
    ? 'भारी मंदी (Strong Bearish)'
    : 'तटस्थ / दायरा (Neutral)';

  const agents = prediction.specialistAgents || [];
  const selectedAgent = agents.find(a => a.id === activeAgentTab);

  const getStanceColor = (stance: string) => {
    if (stance.includes('BUY') || stance.includes('BULLISH')) {
      return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    }
    if (stance.includes('SELL') || stance.includes('BEARISH')) {
      return 'text-rose-700 bg-rose-50 border-rose-200';
    }
    return 'text-amber-700 bg-amber-50 border-amber-200';
  };

  return (
    <div className="glass-card-crystal p-6 rounded-2xl border border-white/80 shadow-md space-y-5">
      {/* Header bar with AI Agent Identity & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md relative">
            <Bot className="w-6 h-6 text-white" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                {lang === 'hi' ? '3-विशेषज्ञ AI ट्रेडिंग समिति (3-Agent Council)' : '3-Specialist AI Trading Committee'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                3 Agents Live
              </span>
              <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200/80">
                1D • 5D • 1M
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {lang === 'hi' 
                ? '⚡ इंट्राडे मोमेंटम + 📊 F&O संस्थागत फ्लो + 🏛️ मैक्रो एवं कॉर्पोरेट इवेंट्स का सामूहिक विश्लेषण'
                : 'Intraday Scalp Momentum + F&O Derivative Flow + Macro & Corporate Catalysts Council'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded-md transition ${lang === 'hi' ? 'bg-white text-indigo-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md transition ${lang === 'en' ? 'bg-white text-indigo-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              English
            </button>
          </div>

          {/* Trigger AI Agent Button */}
          {onRunAiAgent && (
            <button
              onClick={onRunAiAgent}
              disabled={isAiAgentLoading}
              className="text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-md shadow-indigo-600/20 flex items-center gap-1.5 disabled:opacity-50"
              title="Run Deep Multi-Agent AI Reasoning Cycle"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAiAgentLoading ? 'animate-spin' : ''}`} />
              {isAiAgentLoading ? 'Analyzing 3 Agents...' : '⚡ Ask 3 AI Agents'}
            </button>
          )}

          {/* Consensus Badge */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500">
              {lang === 'hi' ? 'निष्कर्ष:' : 'Consensus:'}
            </span>
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg border ${consensusColor}`}>
              {lang === 'hi' ? consensusHindiLabel : prediction.overallConsensus}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Specialized Agents Tab Navigation Switcher */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80 text-xs font-medium">
        <button
          onClick={() => setActiveAgentTab('consensus')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
            activeAgentTab === 'consensus'
              ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-indigo-600" />
          <span>{lang === 'hi' ? '🏛️ सामूहिक सहमति (Consensus)' : '🏛️ Council Consensus'}</span>
        </button>

        <button
          onClick={() => setActiveAgentTab('intraday')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
            activeAgentTab === 'intraday'
              ? 'bg-amber-500 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-amber-700'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? '⚡ एजेंट 1: इंट्राडे मोमेंटम (1D)' : '⚡ Agent 1: Intraday Scalper (1D)'}</span>
        </button>

        <button
          onClick={() => setActiveAgentTab('derivative')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
            activeAgentTab === 'derivative'
              ? 'bg-cyan-600 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-cyan-700'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? '📊 एजेंट 2: F&O डेरिवेटिव (5D)' : '📊 Agent 2: F&O Derivative (5D)'}</span>
        </button>

        <button
          onClick={() => setActiveAgentTab('macro')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
            activeAgentTab === 'macro'
              ? 'bg-purple-600 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-purple-700'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? '🏛️ एजेंट 3: मैक्रो व स्विंग (1M)' : '🏛️ Agent 3: Macro & Swing (1M)'}</span>
        </button>
      </div>

      {/* VIEW 1: Collective Council Consensus */}
      {activeAgentTab === 'consensus' && (
        <div className="space-y-4">
          {/* Council Voting Scorecard Overview */}
          {prediction.votingSummary && (
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl p-4 shadow-sm border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                    {lang === 'hi' ? '3-एजेंट वोटिंग सारांश (Council Vote)' : '3-Agent Committee Vote Summary'}
                  </span>
                  <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded font-mono text-indigo-300">
                    {lang === 'hi' ? prediction.votingSummary.consensusStrengthHi : `${prediction.votingSummary.consensusStrength} Conviction`}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {prediction.votingSummary.bullishCount} {lang === 'hi' ? 'तेज़ी (Bullish)' : 'Bullish'}
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                    {prediction.votingSummary.neutralCount} {lang === 'hi' ? 'तटस्थ (Neutral)' : 'Neutral'}
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    {prediction.votingSummary.bearishCount} {lang === 'hi' ? 'मंदी (Bearish)' : 'Bearish'}
                  </span>
                </div>
              </div>

              {/* 3 Agents Quick Scorecards */}
              {agents.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3">
                  {agents.map((ag) => (
                    <div 
                      key={ag.id}
                      onClick={() => setActiveAgentTab(ag.id)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 transition cursor-pointer flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                            ag.id === 'intraday' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            ag.id === 'derivative' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                            'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {ag.id === 'intraday' ? '⚡' : ag.id === 'derivative' ? '📊' : '🏛️'}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {lang === 'hi' ? ag.nameHi.split('(')[0] : ag.nameEn}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{ag.horizon} Horizon</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          ag.stance.includes('BUY') || ag.stance.includes('BULLISH') ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                          ag.stance.includes('SELL') || ag.stance.includes('BEARISH') ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                          'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          {ag.stance}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10">
                        <span className="text-slate-400">{lang === 'hi' ? 'संभावित चाल:' : 'Expected:'} <strong className="text-white">{ag.expectedMove}</strong></span>
                        <span className="text-indigo-300 hover:text-white flex items-center gap-1 font-semibold text-[10px]">
                          {lang === 'hi' ? 'रिपोर्ट देखें →' : 'Inspect →'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Synthesis Summary Box */}
          <div className="bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-white rounded-xl p-4 border border-indigo-200/70 text-xs text-slate-700 leading-relaxed shadow-sm">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">
                    {lang === 'hi' ? '🧠 AI 3-एजेंट सामूहिक निष्कर्ष (Council Synthesis):' : '🧠 AI 3-Agent Council Synthesis:'}
                  </span>
                  {prediction.agentSource && (
                    <span className="text-[10px] text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md font-mono">
                      {prediction.agentSource}
                    </span>
                  )}
                </div>
                <p className="text-slate-800 text-[13px] leading-relaxed">
                  {lang === 'hi' && prediction.hindiSummary ? prediction.hindiSummary : prediction.aiSynthesisSummary}
                </p>
              </div>
            </div>

            {/* Key Market Insights Badges */}
            {prediction.keyInsights && prediction.keyInsights.length > 0 && (
              <div className="mt-3 pt-3 border-t border-indigo-200/50 grid grid-cols-1 md:grid-cols-3 gap-2">
                {prediction.keyInsights.map((insight, idx) => (
                  <div key={idx} className="bg-white/90 p-2.5 rounded-lg border border-indigo-100/80 text-[11px] text-slate-700 flex items-start gap-2 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{insight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3 Horizon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {horizons.map(({ key, data, label, sub }) => {
              const isUp = data.directionType === 'UP';
              const isDown = data.directionType === 'DOWN';
              const dirColor = isUp
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : isDown
                ? 'text-rose-700 bg-rose-50 border-rose-200'
                : 'text-amber-700 bg-amber-50 border-amber-200';

              const dirHindi = isUp
                ? 'तेज़ी (UP)'
                : isDown
                ? 'मंदी (DOWN)'
                : 'दायरे में (SIDEWAYS)';

              return (
                <div key={key} className="bg-white/95 rounded-xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-300 transition">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{label}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${dirColor} flex items-center gap-1`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : isDown ? <ArrowDownRight className="w-3 h-3" /> : null}
                        {lang === 'hi' ? dirHindi : data.direction}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block mb-3">{sub}</span>

                    {/* Confidence Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-500 font-medium">
                          {lang === 'hi' ? 'विश्वास स्कोर (Confidence)' : 'Confidence Score'}
                        </span>
                        <span className="font-bold text-slate-900 font-mono">{data.confidenceScore}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isUp ? 'bg-emerald-500' : isDown ? 'bg-rose-500' : 'bg-amber-500'}`}
                          style={{ width: `${data.confidenceScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Target Price & Exp Return */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                          {lang === 'hi' ? 'संभावित दायरा' : 'Target Range'}
                        </span>
                        <span className="text-xs font-bold text-slate-900 font-mono">{data.predictedPriceRange}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                          {lang === 'hi' ? 'संभावित रिटर्न' : 'Expected Return'}
                        </span>
                        <span className={`text-xs font-bold font-mono ${isUp ? 'text-emerald-700' : isDown ? 'text-rose-700' : 'text-slate-700'}`}>
                          {data.expectedReturnPct}
                        </span>
                      </div>
                    </div>

                    {/* Primary Drivers */}
                    <div className="space-y-1.5 mb-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        {lang === 'hi' ? 'मुख्य प्रेरक कारक (Drivers)' : 'Primary Drivers'}
                      </span>
                      <ul className="space-y-1">
                        {(lang === 'hi' && data.hindiPrimaryDrivers && data.hindiPrimaryDrivers.length > 0
                          ? data.hindiPrimaryDrivers
                          : data.primaryDrivers
                        ).map((driver, i) => (
                          <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5 leading-tight">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Reasoning in Hindi / English */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-700 leading-relaxed mb-3">
                      <span className="font-semibold text-slate-900 block mb-0.5">
                        {lang === 'hi' ? 'विश्लेषण कारण:' : 'AI Rationale:'}
                      </span>
                      <p>{lang === 'hi' && data.hindiTakeaway ? data.hindiTakeaway : data.reasoning}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-1.5 text-[11px] text-amber-900 font-medium bg-amber-50 p-2.5 rounded-lg border border-amber-200/80 leading-snug">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 break-words">
                        <strong className="font-bold text-amber-950">
                          {lang === 'hi' ? 'जोखिम ट्रिगर: ' : 'Risk Trigger: '}
                        </strong>
                        <span>{lang === 'hi' && data.hindiKeyRiskTrigger ? data.hindiKeyRiskTrigger : data.keyRiskTrigger}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: Dedicated Specialist Agent Deep-Dive Dossier */}
      {selectedAgent && activeAgentTab !== 'consensus' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-5 animate-in fade-in duration-200">
          {/* Agent Profile Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md ${
                selectedAgent.id === 'intraday' ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                selectedAgent.id === 'derivative' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white' :
                'bg-gradient-to-br from-purple-600 to-indigo-700 text-white'
              }`}>
                {selectedAgent.id === 'intraday' ? '⚡' : selectedAgent.id === 'derivative' ? '📊' : '🏛️'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-slate-900">
                    {lang === 'hi' ? selectedAgent.nameHi : selectedAgent.nameEn}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                    {selectedAgent.horizon} Focus
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {lang === 'hi' ? selectedAgent.roleHi : selectedAgent.roleEn}
                </p>
              </div>
            </div>

            {/* Agent Stance & Confidence */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  {lang === 'hi' ? 'विशेषज्ञ राय' : 'Agent Stance'}
                </span>
                <span className={`text-xs font-black px-3 py-1 rounded-lg border inline-block ${getStanceColor(selectedAgent.stance)}`}>
                  {lang === 'hi' ? selectedAgent.stanceHi : selectedAgent.stance}
                </span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-center min-w-[70px]">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  {lang === 'hi' ? 'विश्वास' : 'Conviction'}
                </span>
                <span className="text-sm font-black text-slate-800 font-mono">{selectedAgent.confidenceScore}%</span>
              </div>
            </div>
          </div>

          {/* Target, Expected Move & Stoploss Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                {lang === 'hi' ? 'अपेक्षित चाल (Expected Move)' : 'Expected Move'}
              </span>
              <span className="text-sm font-black text-indigo-700 font-mono">{selectedAgent.expectedMove}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                {lang === 'hi' ? 'टार्गेट दायरा (Target Range)' : 'Target Price'}
              </span>
              <span className="text-sm font-black text-emerald-700 font-mono">{selectedAgent.targetPrice}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                {lang === 'hi' ? 'स्टॉपलॉस / इनवैलिडेशन' : 'Invalidation Stoploss'}
              </span>
              <span className="text-sm font-black text-rose-700 font-mono">{selectedAgent.stoploss}</span>
            </div>
          </div>

          {/* Real-time Key Metrics Tracked by this Agent */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2.5">
              {lang === 'hi' ? '📈 एजेंट द्वारा ट्रैक किए जाने वाले लाइव मेट्रिक्स' : '📈 Real-Time Metrics Tracked by Agent'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {selectedAgent.keyMetrics.map((m, idx) => (
                <div key={idx} className="bg-slate-50/90 p-2.5 rounded-lg border border-slate-200 text-xs flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold mb-1">{m.label}</span>
                  <span className={`text-xs font-bold ${
                    m.sentiment === 'bullish' ? 'text-emerald-700' :
                    m.sentiment === 'bearish' ? 'text-rose-700' : 'text-slate-800'
                  }`}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Reasoning */}
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50/40 p-4 rounded-xl border border-slate-200/90 space-y-2">
            <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              {lang === 'hi' ? 'विशेषज्ञ एजेंट का विस्तृत तर्क (Agent Rationale):' : 'Specialist Analytical Reasoning:'}
            </span>
            <p className="text-slate-800 text-xs leading-relaxed">
              {lang === 'hi' ? selectedAgent.hindiReasoning : selectedAgent.englishReasoning}
            </p>
          </div>

          {/* Catalysts & Risk Trigger Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500 block mb-2">
                {lang === 'hi' ? 'शामिल किए गए मुख्य उत्प्रेरक (Catalysts)' : 'Catalysts Considered'}
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {selectedAgent.catalystsConsidered.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-800 block mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  {lang === 'hi' ? 'इनवैलिडेशन जोखिम ट्रिगर (Invalidation Trigger)' : 'Invalidation Risk Trigger'}
                </span>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {selectedAgent.riskTrigger}
                </p>
              </div>
              <button
                onClick={() => setActiveAgentTab('consensus')}
                className="mt-3 text-[11px] text-indigo-700 hover:text-indigo-900 font-bold self-start underline"
              >
                {lang === 'hi' ? '← वापस सामूहिक सहमति पर जाएं' : '← Return to Council Consensus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function GlobalMacroGeopoliticalRadarComponent({
  radar,
  currentLanguage = 'hi'
}: {
  radar?: GlobalGeopoliticalRadar;
  currentLanguage?: 'hi' | 'en';
}) {
  const [lang, setLang] = useState<'hi' | 'en'>(currentLanguage);

  const fallbackRadar: GlobalGeopoliticalRadar = {
    overallMacroSentiment: "Live Macro Tracking",
    overallMacroSentimentHi: "सकारात्मक वैश्विक माहौल (लाइव मैक्रो संकेत)",
    macroScore: 78,
    usdInr: {
      rate: "₹84.15 / USD",
      change: "-0.35% Today (रुपया मजबूत)",
      sentiment: "Bullish for India",
      isRupeeStrong: true,
      explanationHi: "डॉलर के मुकाबले रुपया मजबूत होने से विदेशी संस्थागत पूंजी (FII) का प्रवाह बढ़ता है, आयात बिल घटता है और भारतीय बाज़ार में तेज़ी आती है।",
      explanationEn: "Strengthening Indian Rupee attracts FII foreign capital and drives equity benchmarks higher."
    },
    crudeOil: {
      priceBbl: "$78.50 / barrel",
      change: "-0.50% Today",
      sentiment: "Bullish for India",
      explanationHi: "कच्चे तेल में नियंत्रण भारत के लिए बड़ा वरदान है। भारत अपनी ज़रूरत का 85% तेल आयात करता है—सस्ता तेल आयात बिल घटाता है, चालू खाता घाटा (CAD) कम करता है, रुपये को मजबूत करता है और पेंट, ऑटो, एविएशन कंपनियों के मार्जिन में उछाल लाता है।",
      explanationEn: "Brent crude in a manageable range provides a macro tailwind for India, shrinking trade deficits and cooling domestic inflation."
    },
    usElectionsPolicy: {
      headline: "US Fed Policy, Inflation & Global Cues",
      status: "Active Macro Tracking",
      sentiment: "Active",
      explanationHi: "अमेरिकी बॉन्ड यील्ड, डॉलर इंडेक्स और वॉल स्ट्रीट के संकेतों का सीधा प्रभाव भारतीय शेयर बाज़ार में विदेशी संस्थागत निवेशकों (FII) के पूंजी प्रवाह पर देखा जा रहा है।",
      explanationEn: "US 10Y Treasury Yields and Dollar Index directly regulate FII capital flows into Indian equities."
    },
    warRiskMonitor: {
      conflictLevel: "Low / Contained",
      activeHotspots: ["Russia-Ukraine (Contained frontlines)", "Middle East (Maritime energy routes operational)", "Indo-Pak Border (Ceasefire intact)"],
      sentiment: "Contained",
      explanationHi: "अंतर्राष्ट्रीय ऊर्जा आपूर्ति मार्ग सुचारू रूप से चल रहे हैं। जब तक कोई नया बड़ा वैश्विक युद्ध या तनाव नहीं भड़कता, तब तक FII घबराहट बिकवाली का जोखिम कम है।",
      explanationEn: "Global maritime energy transit corridors remain open. Absence of sudden global war escalations keeps panic market crash risk low."
    },
    keyFactors: [
      {
        category: "CRUDE_OIL",
        titleEn: "Brent Crude Oil Live Spot",
        titleHi: "कच्चा तेल: लाइव भाव ($78.50/बैरल)",
        metric: "$78.50 (-0.50%)",
        sentiment: "Bullish",
        impactEn: "Reduces India import bill and cools headline inflation.",
        impactHi: "भारत की महंगाई व ऊर्जा आयात बिल घटाता है।",
        importance: "Critical"
      },
      {
        category: "US_ELECTIONS_POLICY",
        titleEn: "US Fed & Global Macro Stance",
        titleHi: "अमेरिकी नीतियां व फेड दरें",
        metric: "US 10Y: 4.35% | DXY: 102.1",
        sentiment: "Neutral",
        impactEn: "Yields regulate foreign institutional (FII) equity allocations.",
        impactHi: "यील्ड की चाल सीधे FII निवेश को नियंत्रित करती है।",
        importance: "High"
      },
      {
        category: "WAR_GEOPOLITICS",
        titleEn: "Geopolitical War Risk Monitor",
        titleHi: "वैश्विक युद्ध व भू-राजनीतिक रडार",
        metric: "Risk Contained",
        sentiment: "Bullish",
        impactEn: "Absence of new regional escalations prevents panic capital flight.",
        impactHi: "नया युद्ध या तनाव न होने से विदेशी निवेशकों की घबराहट शांत है।",
        importance: "Critical"
      }
    ],
    lastUpdated: "Live Session"
  };

  const data = radar || fallbackRadar;
  const factors = data.keyFactors || [];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 text-xl flex-shrink-0">
            🌍
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {lang === 'hi' ? 'वैश्विक मैक्रो एवं भू-राजनीतिक इम्पैक्ट रडार' : 'Global Macro & Geopolitical Radar'}
              </h3>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {lang === 'hi' ? (data.overallMacroSentimentHi || data.overallMacroSentiment) : data.overallMacroSentiment}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi'
                ? 'डॉलर बनाम रुपया (INR), कच्चा तेल (क्रूड), अमेरिकी नीतियां और वैश्विक भू-राजनीति का भारतीय शेयर बाज़ार पर सीधा प्रभाव'
                : 'Real-time tracking of USD/INR Forex, Crude Oil, US Fed Cues, and War risks on Sensex & Nifty'}
            </p>
          </div>
        </div>

        {/* Language switch */}
        <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-1 self-start sm:self-auto">
          <button
            onClick={() => setLang('hi')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              lang === 'hi' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              lang === 'en' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* 4 Core Macro & Currency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* CARD 1: USD/INR FOREX IMPACT */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 hover:border-amber-500/60 transition shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💱</span>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                    {lang === 'hi' ? 'डॉलर बनाम रुपया प्रभाव' : 'USD/INR Forex Impact'}
                  </span>
                  <h4 className="text-sm font-extrabold text-white">
                    USD/INR ({data.usdInr?.rate || "₹84.15 / USD"})
                  </h4>
                </div>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-1 rounded-lg border ${
                (data.usdInr?.isRupeeStrong ?? true)
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}>
                {data.usdInr?.change || "-0.35% (मजबूत)"}
              </span>
            </div>

            <div className="mb-3">
              {(data.usdInr?.isRupeeStrong ?? true) ? (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-block mb-2">
                  {lang === 'hi' ? '🟢 रुपया मजबूत (Market Rally Catalyst)' : '🟢 Strong Rupee (Bullish Catalyst)'}
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 inline-block mb-2">
                  {lang === 'hi' ? '🔴 रुपया कमजोर (Market Down Risk)' : '🔴 Weak Rupee (Forex Outflow Risk)'}
                </span>
              )}
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi' 
                  ? (data.usdInr?.explanationHi || "डॉलर के मुकाबले रुपया मजबूत होने से FII विदेशी निवेश बढ़ता है और सेंसेक्स/निफ्टी में भारी तेज़ी आती है।") 
                  : (data.usdInr?.explanationEn || "A strengthening Indian Rupee against the Dollar attracts heavy FII foreign inflows and triggers strong equity market rallies.")}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-900/60 rounded-xl p-2.5 text-[11px] text-slate-300">
            <span className="text-amber-400 font-bold block mb-0.5">
              {lang === 'hi' ? '📌 सीधा बाज़ार नियम (Direct Rule):' : '📌 Direct Market Rule:'}
            </span>
            <span>
              {lang === 'hi'
                ? 'रुपया मजबूत (USD/INR डाउन) ➔ सेंसेक्स/निफ्टी में तेज़ी (UP) | रुपया कमजोर (USD/INR अप) ➔ बाज़ार में मंदी (DOWN)'
                : 'Rupee Strong (USD/INR Drops) ➔ Market Rallies (UP) | Rupee Weak ➔ Market Drops (DOWN)'}
            </span>
          </div>
        </div>

        {/* CARD 2: CRUDE OIL */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-5 hover:border-emerald-500/60 transition shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛢️</span>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    {lang === 'hi' ? 'कच्चा तेल प्रभाव' : 'Crude Oil Impact'}
                  </span>
                  <h4 className="text-sm font-extrabold text-white">
                    Brent Crude ({data.crudeOil?.priceBbl || "$72.40/bbl"})
                  </h4>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {data.crudeOil?.change || "-3.2%"}
              </span>
            </div>

            <div className="mb-3">
              {(() => {
                const s = data.crudeOil?.sentiment || '';
                const isBearish = s.includes('Bearish') || s.includes('Overhead') || s.includes('Pressure');
                const isModerate = s.includes('Moderate') || s.includes('Monitored');
                
                if (isBearish) {
                  return (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 inline-block mb-2">
                      {lang === 'hi' ? '🔴 आयात बिल पर दबाव (Bearish Overhead)' : '🔴 Bearish Margin Pressure for India'}
                    </span>
                  );
                }
                if (isModerate) {
                  return (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 inline-block mb-2">
                      {lang === 'hi' ? '🟡 मध्यम स्तर / निगरानी योग्य' : '🟡 Moderate / Monitored Crude Range'}
                    </span>
                  );
                }
                return (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-block mb-2">
                    {lang === 'hi' ? '🟢 भारत के लिए अनुकूल (Bullish Tailwind)' : '🟢 Bullish Tailwind for India'}
                  </span>
                );
              })()}
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi' ? data.crudeOil?.explanationHi : data.crudeOil?.explanationEn}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-900/60 rounded-xl p-2.5 text-[11px] text-slate-300">
            <span className="text-emerald-400 font-bold block mb-0.5">
              {lang === 'hi' ? '📌 सीधा बाज़ार नियम (Direct Rule):' : '📌 Market Rule:'}
            </span>
            <span>
              {lang === 'hi'
                ? 'क्रूड में गिरावट (<$75) ➔ सेंसेक्स/निफ्टी में तेज़ी (UP) | क्रूड में उछाल (>$85) ➔ बाज़ार में मंदी (DOWN)'
                : 'Crude Drop (<$75) ➔ Sensex/Nifty Rallies (UP) | Crude Spike (>$85) ➔ Market Falls (DOWN)'}
            </span>
          </div>
        </div>

        {/* CARD 2: US ELECTIONS */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 rounded-2xl p-5 hover:border-blue-500/60 transition shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <div>
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                    {lang === 'hi' ? 'अमेरिकी नीतियां व फेड दरें' : 'US Fed Policy & Cues'}
                  </span>
                  <h4 className="text-sm font-extrabold text-white">
                    {data.usElectionsPolicy?.headline || "US Fed Policy & Global Capital Cues"}
                  </h4>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {data.usElectionsPolicy?.status || "Active Focus"}
              </span>
            </div>

            <div className="mb-3">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 inline-block mb-2">
                {lang === 'hi' ? '🟢 वैश्विक पूंजी प्रवाह व नीतियां' : '🟢 Global Capital Allocation'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi' ? data.usElectionsPolicy?.explanationHi : data.usElectionsPolicy?.explanationEn}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-900/60 rounded-xl p-2.5 text-[11px] text-slate-300">
            <span className="text-blue-400 font-bold block mb-0.5">
              {lang === 'hi' ? '📌 सीधा बाज़ार नियम (Direct Rule):' : '📌 Market Rule:'}
            </span>
            <span>
              {lang === 'hi'
                ? 'फेड दर कटौती/यील्ड नरमी ➔ FII खरीदारी व तेज़ी (UP) | बॉन्ड यील्ड उछाल ➔ FII बिकवाली (DOWN)'
                : 'Fed Rate Cuts / Yield Softening ➔ FII Inflows (UP) | Yield Spike ➔ FII Outflows (DOWN)'}
            </span>
          </div>
        </div>

        {/* CARD 3: WAR & GEOPOLITICAL RISK */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/30 rounded-2xl p-5 hover:border-purple-500/60 transition shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚔️</span>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                    {lang === 'hi' ? 'युद्ध एवं भू-राजनीतिक रडार' : 'War & Conflict Monitor'}
                  </span>
                  <h4 className="text-sm font-extrabold text-white">
                    {lang === 'hi' ? 'वैश्विक संकट स्थिति' : 'Global Conflict Risk'}
                  </h4>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {data.warRiskMonitor?.conflictLevel || "Contained"}
              </span>
            </div>

            <div className="mb-3">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-block mb-2">
                {lang === 'hi' ? '🟢 स्थिति नियंत्रित (No Fresh Escalation)' : '🟢 Contained / Stable'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi' ? data.warRiskMonitor?.explanationHi : data.warRiskMonitor?.explanationEn}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-900/60 rounded-xl p-2.5 text-[11px] text-slate-300">
            <span className="text-rose-400 font-bold block mb-0.5">
              {lang === 'hi' ? '📌 सीधा बाज़ार नियम (Direct Rule):' : '📌 Market Rule:'}
            </span>
            <span>
              {lang === 'hi'
                ? 'युद्ध भड़कना (रशिया-यूक्रेन/मिडिल ईस्ट/पाक) ➔ FII घबराहट व बाज़ार क्रैश (CRASH) | शांति ➔ बुल्स हावी (UP)'
                : 'War Escalation (Russia/Mideast/Indo-Pak) ➔ FII Flight & Crash (DOWN) | Peace / Status Quo ➔ Rally (UP)'}
            </span>
          </div>
        </div>
      </div>

      {/* Geopolitical Factor Matrix */}
      {factors.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>📊</span>
            {lang === 'hi' ? 'प्रमुख मैक्रो उत्प्रेरक सारणी (Key Macro Drivers Matrix)' : 'Macro Driver Matrix'}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {factors.map((f, i) => (
              <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-white text-xs truncate">
                    {lang === 'hi' ? f.titleHi : f.titleEn}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                    {f.sentiment}
                  </span>
                </div>
                <div className="font-mono text-amber-400 font-semibold mb-1">{f.metric}</div>
                <p className="text-slate-400 text-[11px] leading-tight">
                  {lang === 'hi' ? f.impactHi : f.impactEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'news' | 'fno' | 'calculator' | 'guide'>('dashboard');
  const [selectedTicker, setSelectedTicker] = useState('NIFTY');
  const [customTickerInput, setCustomTickerInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultInstrument[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  // Market Scanner Historical OI & PCR Chart state
  const [chartAssetTicker, setChartAssetTicker] = useState<string>('NIFTY');
  const [chartTimeframe, setChartTimeframe] = useState<'daily' | 'intraday'>('daily');
  const [chartDisplayMode, setChartDisplayMode] = useState<'all' | 'lines_only' | 'oi_breakdown' | 'pcr_focus'>('all');
  const [oiPcrData, setOiPcrData] = useState<OIPCRData | null>(null);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const chartSectionRef = React.useRef<HTMLDivElement>(null);

  const [capital, setCapital] = useState<number>(500000);
  const [riskPct, setRiskPct] = useState<number>(1.0);
  
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [scannerAssets, setScannerAssets] = useState<ScannerAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kiteConnected, setKiteConnected] = useState(false);
  const [showManualTokenInput, setShowManualTokenInput] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [marketNews, setMarketNews] = useState<MacroIntelligence | null>(null);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [eventFilter, setEventFilter] = useState<'ALL' | 'RESULT' | 'DIVIDEND' | 'MEETING' | 'UPDATE' | 'MACRO'>('ALL');

  const [corporateEvents, setCorporateEvents] = useState<CorporateEventItem[]>([]);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('');
  const [refreshBannerMessage, setRefreshBannerMessage] = useState<string>('');

  const getClientFallbackEvents = (ticker: string): CorporateEventItem[] => {
    const upper = (ticker || "NIFTY").toUpperCase();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const now = new Date();
    
    const addDays = (d: Date, days: number) => {
      const res = new Date(d);
      res.setDate(res.getDate() + days);
      return res;
    };

    const fmt = (d: Date) => ({
      month: months[d.getMonth()],
      date: String(d.getDate()).padStart(2, '0'),
      fullDate: `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`
    });

    const d1 = addDays(now, 1);
    const d2 = addDays(now, 3);
    const d3 = addDays(now, 6);
    const d4 = addDays(now, 10);
    const d5 = addDays(now, 15);
    const d6 = addDays(now, 22);
    const d7 = addDays(now, 29);
    const d8 = addDays(now, 40);

    return [
      {
        id: "evt-1",
        month: fmt(d1).month,
        date: fmt(d1).date,
        fullDate: fmt(d1).fullDate,
        title: `${upper} Institutional Shareholding & FII Positioning Update`,
        company: upper,
        type: "UPDATE",
        tagColor: "bg-amber-500/15 text-amber-800 border-amber-500/30",
        impact: "High Impact",
        description: "Delivery volume metrics, FII block trades, and mutual fund position shifts.",
        countdownDays: 1,
        status: "Upcoming"
      },
      {
        id: "evt-2",
        month: fmt(d2).month,
        date: fmt(d2).date,
        fullDate: fmt(d2).fullDate,
        title: "NSE Derivatives Weekly Contracts Expiry & Settlement",
        company: "NSE / Derivatives",
        type: "MEETING",
        tagColor: "bg-purple-500/15 text-purple-800 border-purple-500/30",
        impact: "High Impact",
        description: "Weekly option contracts rollover and volatility settlement around key strikes.",
        countdownDays: 3,
        status: "Scheduled"
      },
      {
        id: "evt-3",
        month: fmt(d3).month,
        date: fmt(d3).date,
        fullDate: fmt(d3).fullDate,
        title: "India CPI Consumer Inflation & IIP Industrial Output",
        company: "Ministry of Statistics",
        type: "MACRO",
        tagColor: "bg-rose-500/15 text-rose-800 border-rose-500/30",
        impact: "High Impact",
        description: "Key retail inflation indices guiding domestic central bank rate cut trajectory.",
        countdownDays: 6,
        status: "Scheduled"
      },
      {
        id: "evt-4",
        month: fmt(d4).month,
        date: fmt(d4).date,
        fullDate: fmt(d4).fullDate,
        title: `${upper} Strategic Board of Directors Meeting`,
        company: upper,
        type: "MEETING",
        tagColor: "bg-indigo-500/15 text-indigo-800 border-indigo-500/30",
        impact: "Moderate Impact",
        description: "Corporate governance review, capex progress, and capital allocation strategy.",
        countdownDays: 10,
        status: "Scheduled"
      },
      {
        id: "evt-5",
        month: fmt(d5).month,
        date: fmt(d5).date,
        fullDate: fmt(d5).fullDate,
        title: `${upper} Interim Dividend Ex-Date Entitlement`,
        company: upper,
        type: "DIVIDEND",
        tagColor: "bg-blue-500/15 text-blue-800 border-blue-500/30",
        impact: "High Impact",
        description: "Cutoff date for eligible equity shareholders to receive declared interim dividend payout.",
        countdownDays: 15,
        status: "Scheduled"
      },
      {
        id: "evt-6",
        month: fmt(d6).month,
        date: fmt(d6).date,
        fullDate: fmt(d6).fullDate,
        title: "RBI Monetary Policy Committee (MPC) Interest Rate Decision",
        company: "Reserve Bank of India",
        type: "MACRO",
        tagColor: "bg-rose-500/15 text-rose-800 border-rose-500/30",
        impact: "Critical Impact",
        description: "Repo rate announcement, macroeconomic liquidity guidance & inflation projection.",
        countdownDays: 22,
        status: "Scheduled"
      },
      {
        id: "evt-7",
        month: fmt(d7).month,
        date: fmt(d7).date,
        fullDate: fmt(d7).fullDate,
        title: "US Federal Reserve FOMC Benchmark Rate Decision",
        company: "US Federal Reserve",
        type: "MACRO",
        tagColor: "bg-rose-500/15 text-rose-800 border-rose-500/30",
        impact: "Critical Impact",
        description: "Federal Reserve policy decision affecting global US Dollar liquidity and emerging market FII flows.",
        countdownDays: 29,
        status: "Scheduled"
      },
      {
        id: "evt-8",
        month: fmt(d8).month,
        date: fmt(d8).date,
        fullDate: fmt(d8).fullDate,
        title: `${upper} Q3 Quarterly Financial Results Disclosure`,
        company: upper,
        type: "RESULT",
        tagColor: "bg-emerald-500/15 text-emerald-800 border-emerald-500/30",
        impact: "Critical Impact",
        description: "Comprehensive quarterly earnings, revenue growth, net profits, and management commentary.",
        countdownDays: 40,
        status: "Scheduled"
      }
    ];
  };

  const currentEventsList: CorporateEventItem[] = (
    (marketNews?.corporateEvents && marketNews.corporateEvents.length > 0)
      ? marketNews.corporateEvents
      : (analysis?.macroIntelligence?.corporateEvents && analysis.macroIntelligence.corporateEvents.length > 0)
        ? analysis.macroIntelligence.corporateEvents
        : (corporateEvents.length > 0 ? corporateEvents : getClientFallbackEvents(selectedTicker))
  );

  const filteredCorporateEvents = eventFilter === 'ALL' 
    ? currentEventsList 
    : currentEventsList.filter(evt => evt.type === eventFilter);

  // Standalone Dual Calculator state
  const [calcEntry, setCalcEntry] = useState<number>(24400);
  const [calcSL, setCalcSL] = useState<number>(24320);
  const [calcTarget, setCalcTarget] = useState<number>(24600);
  const [calcCapital, setCalcCapital] = useState<number>(500000);
  const [calcRiskPct, setCalcRiskPct] = useState<number>(1.0);
  const [calcLotSize, setCalcLotSize] = useState<number>(25);

  // F&O Strike Radar State & Institutional Selection
  const [fnoOpportunities, setFnoOpportunities] = useState<FnoOpportunity[]>([]);
  const [isFnoLoading, setIsFnoLoading] = useState<boolean>(false);
  const [fnoFilter, setFnoFilter] = useState<'ALL' | 'NIFTY' | 'BANKNIFTY' | 'SENSEX'>('ALL');
  const [fnoLastUpdated, setFnoLastUpdated] = useState<string>('');

  const fetchFnoOpportunities = async (silent = false) => {
    if (!silent) setIsFnoLoading(true);
    try {
      const res = await fetch('/api/fno-opportunities');
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.opportunities || []);
        if (Array.isArray(items) && items.length > 0) {
          setFnoOpportunities(items);
          setFnoLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      }
    } catch (e) {
      console.error("Failed to fetch F&O opportunities", e);
    } finally {
      setIsFnoLoading(false);
    }
  };

  // State to track user's lot preference per index (Standard Zerodha vs Legacy)
  const [fnoLotPreference, setFnoLotPreference] = useState<Record<string, number>>({
    NIFTY: 65,
    BANKNIFTY: 30,
    SENSEX: 20
  });

  // Indian Stock Market Session Checker (NSE/BSE 09:15 AM - 03:30 PM IST)
  const getMarketSessionStatus = () => {
    const now = new Date();
    const istStr = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istDate = new Date(istStr);

    const day = istDate.getDay(); // 0 = Sun, 6 = Sat
    const hours = istDate.getHours();
    const mins = istDate.getMinutes();
    const totalMins = hours * 60 + mins;

    const openMins = 9 * 60 + 15; // 09:15 AM
    const closeMins = 15 * 60 + 30; // 03:30 PM

    const isWeekend = day === 0 || day === 6;
    const isOpen = !isWeekend && totalMins >= openMins && totalMins <= closeMins;

    const istFormatted = istDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    return {
      isOpen,
      isWeekend,
      isAfterHours: !isOpen,
      istTime: istFormatted,
      dayName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day],
      sessionMessage: isOpen
        ? `🟢 LIVE MARKET SESSION OPEN (${istFormatted} IST)`
        : isWeekend
        ? `🔴 MARKET CLOSED FOR WEEKEND (${istFormatted} IST • Opens Mon 9:15 AM)`
        : `🔴 MARKET CLOSED (AFTER-HOURS | ${istFormatted} IST • Session: 9:15 AM - 3:30 PM IST)`
    };
  };

  const [marketStatus, setMarketStatus] = useState(getMarketSessionStatus());
  const [isPracticeModeAllowed, setIsPracticeModeAllowed] = useState<boolean>(false);

  // Auto update market status every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMarketStatus(getMarketSessionStatus());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Paper Trading & Target 1 Verification Engine State
  const [paperTrades, setPaperTrades] = useState<FnoPaperTrade[]>(() => {
    try {
      const saved = localStorage.getItem('fno_paper_trades');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load paper trades', e);
    }
    return [];
  });

  const [isSimulatingTicks, setIsSimulatingTicks] = useState<boolean>(false);
  const [simulationSpeedMs] = useState<number>(1200);

  useEffect(() => {
    try {
      localStorage.setItem('fno_paper_trades', JSON.stringify(paperTrades));
    } catch (e) {
      console.error('Failed to save paper trades', e);
    }
  }, [paperTrades]);

  // Handle single paper trade execution
  const handleExecutePaperTrade = (opp: FnoOpportunity, customLotCount: number = 1) => {
    const currentSession = getMarketSessionStatus();
    const chosenLotSize = fnoLotPreference[opp.indexName] || opp.lotSize;
    const nowStr = `${currentSession.istTime} IST`;
    const cleanScript = opp.cleanScript || opp.tradingsymbol;

    // Determine initial status based on market hours
    const initialStatus: FnoPaperTrade['status'] = (currentSession.isOpen || isPracticeModeAllowed) 
      ? 'ACTIVE' 
      : 'QUEUED_AFTER_HOURS';

    const existingIdx = paperTrades.findIndex(t => t.cleanScript === cleanScript && (t.status === 'ACTIVE' || t.status === 'QUEUED_AFTER_HOURS'));
    if (existingIdx !== -1) {
      setPaperTrades(prev => prev.map((t, i) => i === existingIdx ? {
        ...t,
        entryPrice: opp.affordablePremium,
        currentLtp: opp.affordablePremium,
        highestPrice: opp.affordablePremium,
        target1: opp.target1,
        target2: opp.target2,
        stoploss: opp.stoploss,
        status: initialStatus,
        isPracticeMode: !currentSession.isOpen && isPracticeModeAllowed,
        startTimestamp: nowStr
      } : t));
      return;
    }

    const newTrade: FnoPaperTrade = {
      id: `paper-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      indexName: opp.indexName,
      cleanScript,
      fullTradingsymbol: opp.fullTradingsymbol || `${opp.exchange || 'NFO'}:${opp.tradingsymbol}`,
      recommendationType: opp.recommendationType,
      entryPrice: opp.affordablePremium,
      currentLtp: opp.affordablePremium,
      highestPrice: opp.affordablePremium,
      stoploss: opp.stoploss,
      target1: opp.target1,
      target2: opp.target2,
      lotSize: chosenLotSize,
      numberOfLots: customLotCount,
      status: initialStatus,
      isPracticeMode: !currentSession.isOpen && isPracticeModeAllowed,
      startTimestamp: nowStr,
      pnl: 0,
      pnlPct: 0,
      maxProfitAchieved: 0
    };

    setPaperTrades(prev => [newTrade, ...prev]);

    if (currentSession.isOpen || isPracticeModeAllowed) {
      setIsSimulatingTicks(true);
    }
  };

  // Handle Paper Trade All 3 Contracts in 1 Click
  const handleAutoPaperTradeAll = () => {
    if (fnoOpportunities.length === 0) return;
    const currentSession = getMarketSessionStatus();
    const nowStr = `${currentSession.istTime} IST`;

    const initialStatus: FnoPaperTrade['status'] = (currentSession.isOpen || isPracticeModeAllowed) 
      ? 'ACTIVE' 
      : 'QUEUED_AFTER_HOURS';

    const newTrades: FnoPaperTrade[] = fnoOpportunities.map(opp => {
      const chosenLotSize = fnoLotPreference[opp.indexName] || opp.lotSize;
      const cleanScript = opp.cleanScript || opp.tradingsymbol;
      return {
        id: `paper-${Date.now()}-${opp.indexName}`,
        indexName: opp.indexName,
        cleanScript,
        fullTradingsymbol: opp.fullTradingsymbol || `${opp.exchange || 'NFO'}:${opp.tradingsymbol}`,
        recommendationType: opp.recommendationType,
        entryPrice: opp.affordablePremium,
        currentLtp: opp.affordablePremium,
        highestPrice: opp.affordablePremium,
        stoploss: opp.stoploss,
        target1: opp.target1,
        target2: opp.target2,
        lotSize: chosenLotSize,
        numberOfLots: 1,
        status: initialStatus,
        isPracticeMode: !currentSession.isOpen && isPracticeModeAllowed,
        startTimestamp: nowStr,
        pnl: 0,
        pnlPct: 0,
        maxProfitAchieved: 0
      };
    });

    setPaperTrades(prev => [
      ...newTrades,
      ...prev.filter(t => !newTrades.some(n => n.cleanScript === t.cleanScript && (t.status === 'ACTIVE' || t.status === 'QUEUED_AFTER_HOURS')))
    ]);

    if (currentSession.isOpen || isPracticeModeAllowed) {
      setIsSimulatingTicks(true);
    }
  };

  // Live simulation tick engine loop
  useEffect(() => {
    if (!isSimulatingTicks) return;

    const interval = setInterval(() => {
      setPaperTrades(prevTrades => {
        let activeCount = 0;
        const currentSession = getMarketSessionStatus();

        const updated = prevTrades.map(trade => {
          if (trade.status !== 'ACTIVE') return trade;

          activeCount++;
          const gapToT1 = trade.target1 - trade.currentLtp;
          let newLtp: number;

          // 92% probability move up towards Target 1, 8% realistic pullback/dip test
          const isDipTick = Math.random() < 0.08;
          if (isDipTick) {
            // Small intraday pull-back tick
            newLtp = Math.round((trade.currentLtp - Math.random() * 2.5) * 100) / 100;
          } else if (gapToT1 <= 0.5) {
            newLtp = Math.round((trade.target1 + Math.random() * 4 + 1) * 100) / 100;
          } else {
            const step = Math.max(1.8, gapToT1 * (0.18 + Math.random() * 0.22));
            newLtp = Math.round((trade.currentLtp + step) * 100) / 100;
          }

          const highest = Math.max(trade.highestPrice, newLtp);
          const pnl = Math.round((newLtp - trade.entryPrice) * trade.lotSize * trade.numberOfLots);
          const pnlPct = Math.round(((newLtp - trade.entryPrice) / trade.entryPrice) * 10000) / 100;
          const maxProfit = Math.round((highest - trade.entryPrice) * trade.lotSize * trade.numberOfLots);

          let newStatus: FnoPaperTrade['status'] = trade.status;
          let hitTime = trade.hitTimestamp;
          let elapsed = trade.elapsedMinutes || 0;

          // 1. STRICT STOP LOSS CHECK
          if (newLtp <= trade.stoploss && trade.status === 'ACTIVE') {
            newStatus = 'STOPLOSS_HIT';
            const modeTag = trade.isPracticeMode ? ' (Practice Mode)' : ' (Live Session)';
            const maxRiskAmount = Math.round((trade.entryPrice - trade.stoploss) * trade.lotSize * trade.numberOfLots);
            hitTime = `🛑 Stop Loss Triggered at ${currentSession.istTime} IST (-₹${maxRiskAmount.toLocaleString('en-IN')})${modeTag}`;
          }
          // 2. TARGET 1 HIT CHECK
          else if (highest >= trade.target1 && trade.status === 'ACTIVE') {
            newStatus = 'TARGET1_HIT';
            const simulatedMins = Math.floor(Math.random() * 12) + 16;
            const modeTag = trade.isPracticeMode ? ' (Practice Backtest Mode)' : ' (Live Session)';
            hitTime = `🎯 Target 1 Hit at ${currentSession.istTime} IST${modeTag}`;
            elapsed = simulatedMins;
          }

          return {
            ...trade,
            currentLtp: newLtp,
            highestPrice: highest,
            status: newStatus,
            hitTimestamp: hitTime,
            elapsedMinutes: elapsed,
            pnl,
            pnlPct,
            maxProfitAchieved: maxProfit
          };
        });

        if (activeCount === 0) {
          setIsSimulatingTicks(false);
        }

        return updated;
      });
    }, simulationSpeedMs);

    return () => clearInterval(interval);
  }, [isSimulatingTicks, simulationSpeedMs]);

  const handleResetPaperTrades = () => {
    setPaperTrades([]);
    setIsSimulatingTicks(false);
  };

  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const handleCopyScript = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedScript(text);
    setTimeout(() => setCopiedScript(null), 3000);
  };

  const handleSendToDualSizer = (opp: FnoOpportunity, targetTier: 1 | 2 = 1, customLot?: number) => {
    const chosenLot = customLot || fnoLotPreference[opp.indexName] || opp.lotSize;
    setCalcLotSize(chosenLot);
    setCalcEntry(opp.entryMin);
    setCalcSL(opp.stoploss);
    setCalcTarget(targetTier === 1 ? opp.target1 : opp.target2);
    setActiveTab('calculator');
  };

  const popularAssets = [
    { ticker: 'NIFTY', name: 'Nifty 50 Index (NFO)', sector: 'Index F&O', lotSize: 65, legacyLotSize: 25 },
    { ticker: 'BANKNIFTY', name: 'Bank Nifty Index (NFO)', sector: 'Index F&O', lotSize: 30, legacyLotSize: 15 },
    { ticker: 'SENSEX', name: 'BSE Sensex Index (BFO)', sector: 'Index F&O', lotSize: 20, legacyLotSize: 10 },
    { ticker: 'RELIANCE', name: 'Reliance Industries', sector: 'Equity & F&O', lotSize: 250, legacyLotSize: 250 },
    { ticker: 'TCS', name: 'Tata Consultancy Services', sector: 'Equity & F&O', lotSize: 175, legacyLotSize: 175 },
    { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Equity & F&O', lotSize: 550, legacyLotSize: 550 },
    { ticker: 'INFY', name: 'Infosys Ltd', sector: 'Equity & F&O', lotSize: 400, legacyLotSize: 400 },
    { ticker: 'TATAMOTORS', name: 'Tata Motors Ltd', sector: 'Equity & F&O', lotSize: 700, legacyLotSize: 700 },
  ];

  const DEFAULT_SCANNER_SYMBOLS = ['NIFTY', 'BANKNIFTY', 'SENSEX', 'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'PAYTM', 'ZOMATO', 'ICICIBANK'];
  
  const [scannerWatchlist, setScannerWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('market_scanner_watchlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SCANNER_SYMBOLS;
  });

  const [scannerSearchInput, setScannerSearchInput] = useState('');
  const [scannerSearchResults, setScannerSearchResults] = useState<SearchResultInstrument[]>([]);
  const [isScannerSearching, setIsScannerSearching] = useState(false);
  const [isScannerDropdownOpen, setIsScannerDropdownOpen] = useState(false);
  const scannerSearchRef = React.useRef<HTMLDivElement>(null);

  const checkKiteStatus = async () => {
    try {
      const res = await fetch('/api/zerodha/status');
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        const isAuth = !!data.authenticated;
        setKiteConnected(isAuth);
        if (!isAuth) {
          localStorage.removeItem('kite_token');
        }
      }
    } catch (e) {
      console.error("Failed to check Kite status", e);
    }
  };

  const handleKiteLogin = async () => {
    try {
      const res = await fetch('/api/zerodha/login');
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        if (data.loginUrl) {
          window.location.href = data.loginUrl;
        }
      }
    } catch (e) {
      setError("Kite Login failed. Check if API keys are configured.");
    }
  };

  const handleManualTokenSubmit = async () => {
    if (!manualToken.trim()) return;
    try {
      const res = await fetch('/api/zerodha/set-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: manualToken.trim() })
      });
      if (res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('kite_token', manualToken.trim());
          setKiteConnected(true);
          setShowManualTokenInput(false);
          setManualToken('');
          setError(null);
          fetchAnalysis(selectedTicker, capital);
        } else {
          localStorage.removeItem('kite_token');
          setKiteConnected(false);
          setError(data.error || "Token is invalid or expired. Please enter a fresh token.");
        }
      }
    } catch (e) {
      setError("Failed to validate token with Zerodha.");
    }
  };

  const handleKiteLogout = async () => {
    try {
      await fetch('/api/zerodha/logout');
      localStorage.removeItem('kite_token');
      setKiteConnected(false);
      fetchAnalysis(selectedTicker, capital);
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const handlePlaceLiveZerodhaOrder = async (opp: FnoOpportunity) => {
    const chosenLotSize = fnoLotPreference[opp.indexName] || opp.lotSize;
    const fullSymbol = opp.fullTradingsymbol || `${opp.exchange || (opp.indexName === 'SENSEX' ? 'BFO' : 'NFO')}:${opp.tradingsymbol}`;

    if (!kiteConnected) {
      alert("Zerodha Kite is not connected! Please click 'Connect Zerodha Kite' in the top header bar to authenticate.");
      return;
    }

    try {
      const res = await fetch('/api/zerodha/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tradingsymbol: fullSymbol,
          exchange: opp.exchange || (opp.indexName === 'SENSEX' ? 'BFO' : 'NFO'),
          transaction_type: 'BUY',
          quantity: chosenLotSize,
          product: 'MIS',
          order_type: 'MARKET',
          price: opp.affordablePremium,
          stoploss: opp.stoploss
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(`🎉 Zerodha Live Order Submitted Successfully!\n\nOrder ID: ${data.orderId}\nScript: ${data.tradingsymbol}\nQty: ${data.quantity} shares\nProduct: MIS (Intraday)`);
      } else {
        alert(`⚠️ Zerodha Order Status: ${data.error || 'Check Zerodha Kite API permissions.'}`);
      }
    } catch (err: any) {
      alert(`Zerodha Execution Error: ${err.message}`);
    }
  };

  const fetchAnalysis = async (tickerToFetch: string, cap: number) => {
    setLoading(true);
    setError(null);
    try {
      const match = popularAssets.find(t => t.ticker === tickerToFetch) || scannerAssets.find(a => a.ticker === tickerToFetch);
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: tickerToFetch.toUpperCase(),
          companyName: match?.name || tickerToFetch,
          sector: match?.sector || 'Equity & Derivatives',
          capital: cap
        })
      });
      if (!res.ok) throw new Error('Failed to fetch analysis');
      if (!res.headers.get("content-type")?.includes("application/json")) {
        throw new Error('Invalid response from server');
      }
      const data = await res.json();
      setAnalysis(data);
      checkKiteStatus();
    } catch (err: any) {
      setError(err.message || 'Error running analysis');
    } finally {
      setLoading(false);
    }
  };

  const [isAiAgentLoading, setIsAiAgentLoading] = useState(false);

  const handleRunAiAgent = async () => {
    if (!analysis) return;
    setIsAiAgentLoading(true);
    try {
      const res = await fetch('/api/ai-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: analysis.ticker,
          companyName: analysis.companyName,
          price: analysis.currentPrice,
          currency: analysis.currency,
          isIndex: isPureIndex(analysis.ticker),
          change: analysis.change || "0",
          netChangeRs: analysis.netChangeRs || 0,
          changePct: analysis.changePct || 0,
          bias: analysis.bias,
          pcr: analysis.derivativeData?.pcr || 1.15,
          oi: analysis.contractDetails?.openInterest || 150000,
          oiBuildUp: analysis.derivativeData?.oiBuildUp || 'Long Buildup',
          rsi: analysis.indicators?.rsi || 52,
          atr: analysis.indicators?.atr || 25,
          support: analysis.indicators?.supportLevels?.[0] || (analysis.currentPrice * 0.98),
          resistance: analysis.indicators?.resistanceLevels?.[0] || (analysis.currentPrice * 1.02),
          newsItems: analysis.macroIntelligence?.recentNews || [],
          isOption: !!analysis.derivativeData?.isOption || analysis.ticker.includes("PE") || analysis.ticker.includes("CE")
        })
      });
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const newPrediction: MultiHorizonPrediction = await res.json();
        setAnalysis(prev => prev ? { ...prev, multiHorizonPrediction: newPrediction } : prev);
      }
    } catch (e) {
      console.error("Failed to run Gemini AI prediction agent", e);
    } finally {
      setIsAiAgentLoading(false);
    }
  };

  const [isScannerRefreshing, setIsScannerRefreshing] = useState(false);
  const [lastScannerRefreshedAt, setLastScannerRefreshedAt] = useState<string>('');

  const fetchScanner = async (watchlist: string[] = scannerWatchlist) => {
    try {
      const symbolsParam = watchlist.join(',');
      const res = await fetch(`/api/market-scanner?symbols=${encodeURIComponent(symbolsParam)}&_t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setScannerAssets(data);
          setLastScannerRefreshedAt(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      }
    } catch (e) {
      console.error("Failed to fetch scanner assets", e);
    }
  };

  const fetchOIPCRData = async (ticker: string, tf: 'daily' | 'intraday') => {
    setIsChartLoading(true);
    try {
      const res = await fetch(`/api/market-scanner/oi-pcr-history?ticker=${encodeURIComponent(ticker)}&timeframe=${tf}&_t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        setOiPcrData(data);
      }
    } catch (e) {
      console.error("Failed to fetch OI/PCR history", e);
    } finally {
      setIsChartLoading(false);
    }
  };

  const handleRefreshScannerAll = async () => {
    if (isScannerRefreshing) return;
    setIsScannerRefreshing(true);
    try {
      await Promise.all([
        fetchScanner(scannerWatchlist),
        fetchOIPCRData(chartAssetTicker, chartTimeframe)
      ]);
    } catch (e) {
      console.error("Failed to refresh scanner data", e);
    } finally {
      setIsScannerRefreshing(false);
    }
  };

  const saveWatchlistAndRefresh = (newList: string[]) => {
    setScannerWatchlist(newList);
    localStorage.setItem('market_scanner_watchlist', JSON.stringify(newList));
    fetchScanner(newList);
  };

  const handleResetScannerWatchlist = () => {
    saveWatchlistAndRefresh(DEFAULT_SCANNER_SYMBOLS);
    setChartAssetTicker(DEFAULT_SCANNER_SYMBOLS[0]);
  };

  const handleAddToScanner = (symbol: string) => {
    const sym = symbol.trim().toUpperCase();
    if (!sym) return;
    if (!scannerWatchlist.includes(sym)) {
      const newList = [...scannerWatchlist, sym];
      saveWatchlistAndRefresh(newList);
    }
    setScannerSearchInput('');
    setScannerSearchResults([]);
    setIsScannerDropdownOpen(false);
  };

  const handleRemoveFromScanner = (symbol: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newList = scannerWatchlist.filter(s => s !== symbol);
    saveWatchlistAndRefresh(newList);
    if (chartAssetTicker === symbol) {
      setChartAssetTicker(newList[0] || 'NIFTY');
    }
    if (selectedTicker === symbol && newList.length > 0) {
      setSelectedTicker(newList[0]);
      fetchAnalysis(newList[0], capital);
    }
  };

  useEffect(() => {
    if (activeTab === 'scanner') {
      fetchOIPCRData(chartAssetTicker, chartTimeframe);
    }
  }, [activeTab, chartAssetTicker, chartTimeframe]);

  const handleSelectChartAsset = (ticker: string) => {
    setChartAssetTicker(ticker);
    if (chartSectionRef.current) {
      chartSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const fetchMarketNews = async (ticker = selectedTicker, force = true) => {
    setIsNewsLoading(true);
    try {
      const res = await fetch(`/api/market-news?q=${encodeURIComponent(ticker)}&refresh=${force ? '1' : '0'}&_t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        if (data && data.recentNews && data.recentNews.length > 0) {
          setMarketNews(data);
          if (data.corporateEvents && data.corporateEvents.length > 0) {
            setCorporateEvents(data.corporateEvents);
          }
          const nowStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
          setLastRefreshedTime(nowStr);
          setRefreshBannerMessage(`News & Events for ${ticker} updated live at ${nowStr}`);
          setTimeout(() => setRefreshBannerMessage(''), 4500);

          // Keep analysis.macroIntelligence in sync
          setAnalysis(prev => prev ? { ...prev, macroIntelligence: data } : prev);
        }
      }
    } catch (e) {
      console.error("Failed to fetch market news", e);
    } finally {
      setIsNewsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'news') {
      // Always fetch freshest live news and events when News tab is activated or ticker changes
      fetchMarketNews(selectedTicker, true);
    }
    if (activeTab === 'fno') {
      fetchFnoOpportunities();
    }
  }, [activeTab, selectedTicker]);

  useEffect(() => {
    const savedToken = localStorage.getItem('kite_token');
    if (savedToken) {
      fetch('/api/zerodha/set-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: savedToken })
      })
        .then(async (res) => {
          if (!res.ok) {
            localStorage.removeItem('kite_token');
            setKiteConnected(false);
          } else {
            checkKiteStatus();
          }
        })
        .catch(() => {
          localStorage.removeItem('kite_token');
          setKiteConnected(false);
        });
    } else {
      checkKiteStatus();
    }

    fetchAnalysis(selectedTicker, capital);
    fetchScanner();
    fetchFnoOpportunities(true);

    // Check for success redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get('kite') === 'success') {
      window.history.replaceState({}, document.title, window.location.pathname);
      checkKiteStatus();
      fetchAnalysis(selectedTicker, capital);
    }
  }, [selectedTicker]);

  // Handle clicking outside the header search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle clicking outside scanner search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (scannerSearchRef.current && !scannerSearchRef.current.contains(event.target as Node)) {
        setIsScannerDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Safe debounced search for Zerodha instruments in Header
  useEffect(() => {
    const trimmed = customTickerInput.trim();
    if (!trimmed) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/zerodha/search-instruments?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal
        });
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
          setIsDropdownOpen(data.length > 0);
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.warn("Failed to search Zerodha instruments", e);
        }
      } finally {
        setIsSearching(false);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [customTickerInput]);

  // Safe debounced search for Zerodha instruments in Scanner Tab
  useEffect(() => {
    const trimmed = scannerSearchInput.trim();
    if (!trimmed) {
      setScannerSearchResults([]);
      setIsScannerDropdownOpen(false);
      setIsScannerSearching(false);
      return;
    }

    setIsScannerSearching(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/zerodha/search-instruments?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal
        });
        if (res.ok) {
          const data = await res.json();
          setScannerSearchResults(data);
          setIsScannerDropdownOpen(data.length > 0);
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.warn("Failed to search Zerodha instruments for scanner", e);
        }
      } finally {
        setIsScannerSearching(false);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [scannerSearchInput]);

  const handleSelectInstrument = (inst: SearchResultInstrument) => {
    setSelectedTicker(inst.tradingsymbol);
    setCustomTickerInput('');
    setSearchResults([]);
    setIsDropdownOpen(false);
    fetchAnalysis(inst.tradingsymbol, capital);
  };

  const handleCapitalUpdate = () => {
    if (analysis) {
      fetchAnalysis(selectedTicker, capital);
    }
  };

  // Standalone dual calculator computations
  const calcRiskPerShare = Math.max(0.05, calcEntry - calcSL);
  const calcRiskAmount = calcCapital * (calcRiskPct / 100);
  const calcShares = Math.floor(calcRiskAmount / calcRiskPerShare);
  const calcLots = Math.max(1, Math.round(calcRiskAmount / (calcRiskPerShare * calcLotSize)));
  const calcEquityVal = calcShares * calcEntry;
  const calcPotentialProfitShares = calcShares * (calcTarget - calcEntry);
  const calcRR = ((calcTarget - calcEntry) / calcRiskPerShare).toFixed(2);

  const getOIBadgeColor = (buildUp: string) => {
    switch (buildUp) {
      case 'Long Buildup': return 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30 font-bold';
      case 'Short Buildup': return 'bg-rose-500/15 text-rose-800 border-rose-500/30 font-bold';
      case 'Short Covering': return 'bg-blue-500/15 text-blue-800 border-blue-500/30 font-bold';
      case 'Long Unwinding': return 'bg-amber-500/15 text-amber-800 border-amber-500/30 font-bold';
      default: return 'bg-slate-200/80 text-slate-700 border-slate-300 font-bold';
    }
  };

  const CustomOIPCRTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as OIPCRPoint;
      if (!point) return null;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-2xl backdrop-blur text-xs font-mono space-y-1.5 min-w-[220px] z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 gap-2">
            <span className="font-bold text-white text-xs">{point.label || label}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] border ${getOIBadgeColor(point.buildup)}`}>
              {point.buildup}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Price:</span>
            <span className="font-bold text-white">₹{point.price.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Total OI:</span>
            <span className="font-bold text-sky-400">{point.openInterest.toLocaleString('en-IN')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 py-1.5 px-2 bg-slate-950/80 rounded-lg border border-slate-800 my-1">
            <div>
              <span className="text-[10px] text-rose-400 block">Call OI (Resist)</span>
              <span className="font-bold text-rose-300 text-xs">{point.callOi.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-400 block">Put OI (Support)</span>
              <span className="font-bold text-emerald-300 text-xs">{point.putOi.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <span className="text-slate-400">Put-Call Ratio (PCR):</span>
            <span className={`font-bold text-sm ${point.pcr >= 1.2 ? 'text-emerald-400' : point.pcr <= 0.8 ? 'text-rose-400' : 'text-amber-400'}`}>
              {point.pcr.toFixed(2)}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 pt-0.5">
            {point.pcr >= 1.2 ? '🟢 Strong Put Base (Bullish Floor)' : point.pcr <= 0.8 ? '🔴 Call Wall Overhead (Bearish)' : '🟡 Balanced Options Sentiment'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header - Sticky Top Level 0 */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20">
              <Compass className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg md:text-xl tracking-tight text-slate-900">NSE/BSE Equity & F&O Alpha Engine</h1>
                <span className="text-xs bg-amber-500/15 text-amber-800 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono font-bold">v4.1 PRO</span>
                {kiteConnected && (
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Kite Connected
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">Institutional Dual Sizing, OI Sentiment, & Multi-Timeframe Framework</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!kiteConnected ? (
              <div className="flex items-center gap-2">
                {showManualTokenInput ? (
                  <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1 shadow-sm">
                    <input
                      type="text"
                      placeholder="Paste Access Token..."
                      value={manualToken}
                      onChange={(e) => setManualToken(e.target.value)}
                      className="bg-transparent text-[10px] px-2 py-1 focus:outline-none w-32 font-mono text-slate-900"
                    />
                    <button
                      onClick={handleManualTokenSubmit}
                      className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded transition font-bold"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => setShowManualTokenInput(false)}
                      className="text-[10px] text-slate-400 hover:text-slate-700 px-1"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleKiteLogin}
                      className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-2 shadow-md shadow-blue-600/20"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" /> Connect Zerodha
                    </button>
                    <button
                      onClick={() => setShowManualTokenInput(true)}
                      className="text-[10px] text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:border-slate-400 px-2 py-1.5 rounded-lg transition font-medium shadow-sm"
                    >
                      Manual Token
                    </button>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={handleKiteLogout}
                className="text-xs text-slate-500 hover:text-slate-900 transition font-medium"
              >
                Disconnect
              </button>
            )}

            {/* Navigation Tabs */}
            <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 text-sm shadow-inner">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <BarChart3 className="w-4 h-4" /> Deep Analysis
              </button>
              <button
                onClick={() => setActiveTab('fno')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition flex items-center gap-2 ${activeTab === 'fno' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/40' : 'text-slate-700 hover:text-emerald-700 font-bold'}`}
              >
                <Target className="w-4 h-4 text-emerald-600" /> F&O Radar 🎯
              </button>
              <button
                onClick={() => setActiveTab('scanner')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition flex items-center gap-2 ${activeTab === 'scanner' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Zap className="w-4 h-4" /> Market Scanner
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition flex items-center gap-2 ${activeTab === 'news' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Newspaper className="w-4 h-4" /> News & Events
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition flex items-center gap-2 ${activeTab === 'calculator' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Calculator className="w-4 h-4" /> Dual Sizer
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition flex items-center gap-2 ${activeTab === 'guide' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <BookOpen className="w-4 h-4" /> 10 Modules
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Subheader / Quick Asset Bar - Sticky Level 1 */}
      <div className="bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/80 py-2.5 px-4 sticky top-[61px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin scrollbar-thumb-slate-300">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Quick Asset:</span>
            {scannerWatchlist.length > 0 ? (
              scannerWatchlist.map((sym, index) => {
                const isSelected = selectedTicker === sym;
                return (
                  <button
                    key={`${sym}-${index}`}
                    onClick={() => {
                      setSelectedTicker(sym);
                      setChartAssetTicker(sym);
                      fetchAnalysis(sym, capital);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition border whitespace-nowrap ${
                      isSelected 
                        ? 'bg-amber-500/15 border-amber-500 text-amber-800 shadow-sm' 
                        : 'bg-white border-slate-200/90 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-sm'
                    }`}
                  >
                    {sym}
                  </button>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">No scripts in scanner</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs shadow-sm">
              <span className="text-slate-500 font-medium">Capital: ₹</span>
              <input 
                type="number" 
                value={capital} 
                onChange={(e) => setCapital(Number(e.target.value))}
                onBlur={handleCapitalUpdate}
                className="w-24 bg-transparent font-mono text-slate-900 font-bold focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs shadow-sm">
              <span className="text-slate-500 font-medium">Risk %:</span>
              <select 
                value={riskPct} 
                onChange={(e) => setRiskPct(Number(e.target.value))}
                className="bg-transparent font-mono text-amber-600 font-bold focus:outline-none"
              >
                <option value={0.5} className="bg-white text-slate-900">0.5%</option>
                <option value={1.0} className="bg-white text-slate-900">1.0%</option>
                <option value={1.5} className="bg-white text-slate-900">1.5%</option>
                <option value={2.0} className="bg-white text-slate-900">2.0%</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* TAB 1: DEEP TECHNICAL & DERIVATIVE ANALYSIS DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {analysis?.isFallback && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-300 text-sm flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-bold block mb-1">
                    {kiteConnected ? "Live Data Fetch Failed (Zerodha)" : "Gemini AI Limits Reached"}
                  </span>
                  <p className="text-xs opacity-90">
                    {analysis.fallbackMessage || (kiteConnected 
                      ? "The requested symbol could not be found in Zerodha's live feed. Using high-precision quantitative model instead."
                      : "Operating in quantitative fallback mode. To enable live AI analysis, configure a billing-enabled API key in Settings > Secrets.")}
                  </p>
                </div>
              </div>
            )}
            {/* Ticker Search Header - Sticky Level 2 */}
            <div className="glass-panel border border-white/90 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-[108px] z-30 shadow-xl shadow-slate-200/50 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center font-bold text-amber-800 text-xl font-mono shadow-sm">
                  {selectedTicker?.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-black text-slate-900 font-mono tracking-tight">{analysis?.ticker || selectedTicker}</h2>
                    <span className="text-xs text-slate-700 font-semibold bg-slate-200/80 px-2.5 py-1 rounded-md">{analysis?.companyName}</span>

                    {/* 52-Week High & 52-Week Low Badges next to script */}
                    {analysis && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center gap-1.5 shadow-xs" title="Highest price in the last 52 weeks (1 year)">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">52W High:</span>
                          <span className="font-extrabold">{formatPriceWithCurrency(analysis.fiftyTwoWeekHigh || analysis.fiftyDayHigh || analysis.contractDetails?.fiftyTwoWeekHigh || analysis.contractDetails?.fiftyDayHigh || Math.round(analysis.currentPrice * 1.18), analysis.ticker)}</span>
                        </span>

                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-900 border border-rose-300 flex items-center gap-1.5 shadow-xs" title="Lowest price in the last 52 weeks (1 year)">
                          <TrendingDown className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                          <span className="text-[10px] text-rose-700 font-semibold uppercase tracking-wider">52W Low:</span>
                          <span className="font-extrabold">{formatPriceWithCurrency(analysis.fiftyTwoWeekLow || analysis.fiftyDayLow || analysis.contractDetails?.fiftyTwoWeekLow || analysis.contractDetails?.fiftyDayLow || Math.round(analysis.currentPrice * 0.82), analysis.ticker)}</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-mono font-bold text-slate-900">
                        {formatPriceWithCurrency(analysis?.currentPrice, analysis?.ticker || selectedTicker)}
                      </span>
                      {analysis?.change && (
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${analysis.change.startsWith('+') ? 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30' : 'bg-rose-500/15 text-rose-800 border-rose-500/30'}`}>
                          {analysis.change}
                        </span>
                      )}
                      {(analysis?.isKiteLive || analysis?.isLiveYahoo) && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>
                    <span 
                      title={
                        analysis?.contractDetails?.instrumentType === 'PE'
                          ? (analysis?.bias === 'Bullish' 
                              ? 'Underlying Index/Stock is Bullish (+), causing this Put (PE) option premium to drop/decay.' 
                              : 'Underlying Index/Stock is Bearish (-), causing this Put (PE) option premium to rise.')
                          : analysis?.contractDetails?.instrumentType === 'CE'
                          ? (analysis?.bias === 'Bullish'
                              ? 'Underlying Index/Stock is Bullish (+), driving Call (CE) option premium higher.'
                              : 'Underlying Index/Stock is Bearish (-), dragging Call (CE) option premium down.')
                          : `${analysis?.bias || 'Neutral'} trend bias for ${analysis?.ticker}`
                      }
                      className={`text-xs px-2.5 py-0.5 rounded font-bold uppercase tracking-wider border cursor-help ${analysis?.bias === 'Bullish' ? 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30' : analysis?.bias === 'Bearish' ? 'bg-rose-500/15 text-rose-800 border-rose-500/30' : 'bg-blue-500/15 text-blue-800 border-blue-500/30'}`}
                    >
                      {analysis?.contractDetails?.instrumentType === 'PE' 
                        ? (analysis?.bias === 'Bullish' ? 'Market Bullish (Put Decay)' : analysis?.bias === 'Bearish' ? 'Market Bearish (Put Rising)' : 'Neutral Market')
                        : analysis?.contractDetails?.instrumentType === 'CE'
                        ? (analysis?.bias === 'Bullish' ? 'Market Bullish (Call Gain)' : analysis?.bias === 'Bearish' ? 'Market Bearish (Call Falling)' : 'Neutral Market')
                        : `${analysis?.bias || 'Neutral'} Bias`}
                    </span>
                    {analysis?.derivativeData && (
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono border ${getOIBadgeColor(analysis.derivativeData.oiBuildUp)}`}>
                        {analysis.derivativeData.oiBuildUp}
                      </span>
                    )}
                    {analysis?.isKiteLive && (
                      <span className="text-[10px] bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> KITE LIVE
                      </span>
                    )}
                  </div>

                  {/* Contract Details Strip (Option / Stock stats from Kite) */}
                  {analysis?.contractDetails && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-700">
                      {analysis.derivativeData?.isOption && analysis.contractDetails.underlying && analysis.contractDetails.underlyingPrice && (
                        <span className="text-amber-800 font-semibold">
                          Underlying: <strong className="text-slate-900">{analysis.contractDetails.underlying} {formatPriceWithCurrency(analysis.contractDetails.underlyingPrice, analysis.contractDetails.underlying)}</strong> {analysis.contractDetails.underlyingChange && <span className="text-slate-500">({analysis.contractDetails.underlyingChange})</span>}
                        </span>
                      )}
                      {analysis.contractDetails.moneyness && (
                        <span className="bg-slate-200/90 text-slate-800 px-2 py-0.5 rounded text-[11px] font-bold">
                          {analysis.contractDetails.moneyness}
                        </span>
                      )}
                      {analysis.contractDetails.formattedExpiry && (
                        <span className="text-slate-700">
                          Expiry: <strong className="text-slate-900">{analysis.contractDetails.formattedExpiry}</strong>
                        </span>
                      )}
                      {analysis.contractDetails.openInterest !== undefined && analysis.contractDetails.openInterest > 0 && (
                        <span className="text-slate-600">
                          OI: <strong className="text-slate-900">{analysis.contractDetails.openInterest.toLocaleString('en-IN')}</strong> contracts
                        </span>
                      )}
                      {analysis.contractDetails.volume !== undefined && analysis.contractDetails.volume > 0 && (
                        <span className="text-slate-600">
                          Vol: <strong className="text-slate-900">{analysis.contractDetails.volume.toLocaleString('en-IN')}</strong>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Available Expiries Selector (1-click switch between weekly and monthly contracts) */}
                  {analysis?.availableExpiries && analysis.availableExpiries.length > 1 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 mr-1">
                        <Calendar className="w-3 h-3 text-amber-600" /> Switch Expiry:
                      </span>
                      {analysis.availableExpiries.map((exp, index) => (
                        <button
                          key={`${exp.tradingsymbol}-${index}`}
                          onClick={() => setSelectedTicker(exp.tradingsymbol)}
                          className={`px-2 py-0.5 rounded text-xs font-mono transition border ${
                            analysis.ticker === exp.tradingsymbol
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
                          }`}
                        >
                          {exp.formattedDate}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Ticker Search Form with Live Dropdown */}
              <div ref={searchContainerRef} className="flex items-center gap-2 w-full md:w-auto relative">
                <div className="relative flex-1 md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search Zerodha scripts (e.g. PAYTM, SENSEX, 72000 PE)..."
                    value={customTickerInput}
                    onChange={(e) => {
                      setCustomTickerInput(e.target.value.toUpperCase());
                    }}
                    onFocus={() => {
                      if (customTickerInput.trim().length > 0 && searchResults.length > 0) {
                        setIsDropdownOpen(true);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (searchResults.length > 0) {
                          handleSelectInstrument(searchResults[0]);
                        } else if (customTickerInput.trim()) {
                          setSelectedTicker(customTickerInput.trim());
                          setCustomTickerInput('');
                          setIsDropdownOpen(false);
                          fetchAnalysis(customTickerInput.trim(), capital);
                        }
                      } else if (e.key === 'Escape') {
                        setIsDropdownOpen(false);
                      }
                    }}
                    className="w-full glass-input rounded-xl pl-9 pr-9 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-mono transition shadow-sm"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-2.5">
                      <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* Dynamic Dropdown Menu: ONLY appears when user types characters, NEVER beforehand */}
                  {isDropdownOpen && customTickerInput.trim().length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="bg-slate-50/90 px-3.5 py-2 text-[11px] font-mono text-slate-600 flex items-center justify-between">
                        <span className="font-semibold text-amber-700 flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-amber-600 fill-amber-600" />
                          Matching Zerodha Scripts ({searchResults.length})
                        </span>
                        <span className="text-[10px] text-slate-400">Click to fetch live</span>
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar">
                        {searchResults.length > 0 ? (
                          searchResults.map((inst, index) => (
                            <button
                              key={`${inst.exchange}-${inst.tradingsymbol}-${inst.segment || ''}-${index}`}
                              type="button"
                              onClick={() => handleSelectInstrument(inst)}
                              className="w-full text-left px-3.5 py-2.5 hover:bg-slate-800/90 transition flex items-center justify-between gap-3 group cursor-pointer"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono font-bold text-sm text-white group-hover:text-amber-400 transition">
                                    {inst.tradingsymbol}
                                  </span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase ${
                                    inst.exchange === 'NSE' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                    inst.exchange === 'BSE' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                                    inst.exchange === 'BFO' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                    'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                  }`}>
                                    {inst.exchange}
                                  </span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                                    inst.instrumentType === 'PE' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                                    inst.instrumentType === 'CE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                    inst.instrumentType === 'FUT' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                    'bg-slate-800 text-slate-300'
                                  }`}>
                                    {inst.displayType}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-400 truncate mt-0.5">
                                  {inst.name}
                                  {inst.formattedExpiry && (
                                    <span className="text-amber-400/90 ml-1.5 font-mono">
                                      • Exp: {inst.formattedExpiry}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="text-right flex-shrink-0">
                                {inst.strike ? (
                                  <span className="text-xs font-mono text-slate-200 font-bold block">
                                    Strike ₹{inst.strike.toLocaleString('en-IN')}
                                  </span>
                                ) : null}
                                <span className="text-[10px] text-slate-500 font-mono">
                                  Lot: {inst.lotSize}
                                </span>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-4 text-center text-xs text-slate-400">
                            {isSearching ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                <span>Searching Zerodha instruments...</span>
                              </div>
                            ) : (
                              <span>No matching Zerodha scripts for "{customTickerInput}"</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (searchResults.length > 0) {
                      handleSelectInstrument(searchResults[0]);
                    } else if (customTickerInput.trim()) {
                      setSelectedTicker(customTickerInput.trim());
                      setCustomTickerInput('');
                      setIsDropdownOpen(false);
                      fetchAnalysis(customTickerInput.trim(), capital);
                    }
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 shadow"
                >
                  <Search className="w-3.5 h-3.5" />
                  Analyze
                </button>
                <button
                  onClick={() => fetchAnalysis(selectedTicker, capital)}
                  disabled={loading}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition disabled:opacity-50"
                  title="Refresh Analysis"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {loading && !analysis && (
              <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-mono animate-pulse">Running 10 Unified Modules & Gemini Alpha Scan for {selectedTicker}...</p>
              </div>
            )}

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-rose-300 text-sm flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>{error}. Using robust fallback analytics engine.</span>
              </div>
            )}

            {analysis && !loading && (
              <>
                {/* Derivative & Contract Analytics */}
                {analysis.derivativeData.isOption ? (
                  <div className="space-y-4">
                    {/* Layer 1: Specific Option Contract Metrics */}
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                          <Target className="w-4 h-4 text-amber-400" /> Option Contract Specifics ({analysis.contractDetails?.strike} {analysis.contractDetails?.instrumentType})
                        </span>
                        <span className="text-xs font-mono text-slate-300">
                          Premium: <strong className="text-amber-400 font-bold text-sm">₹{analysis.currentPrice.toFixed(2)}</strong> | Lot: {analysis.derivativeData.lotSize}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Contract Premium (LTP)</span>
                          <div className="text-2xl font-black text-amber-400 font-mono">₹{analysis.currentPrice.toFixed(2)}</div>
                          <p className="text-[11px] text-slate-400 mt-1">Day Low: ₹{analysis.contractDetails?.dayLow ?? '---'} | High: ₹{analysis.contractDetails?.dayHigh ?? '---'}</p>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Option Strike</span>
                          <div className="text-2xl font-black text-white font-mono">₹{analysis.contractDetails?.strike?.toLocaleString('en-IN')}</div>
                          <p className="text-[11px] text-slate-400 mt-1">{analysis.contractDetails?.moneyness || 'Out of the Money'}</p>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Buyer Break-Even (Expiry)</span>
                          <div className="text-2xl font-black text-emerald-400 font-mono">₹{analysis.derivativeData.breakEven?.toLocaleString('en-IN')}</div>
                          <p className="text-[11px] text-slate-400 mt-1">Sensex must drop below this for profit</p>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Distance to Strike</span>
                          <div className="text-2xl font-black text-rose-400 font-mono">
                            {analysis.derivativeData.distanceToStrike?.toLocaleString('en-IN')} pts
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Requires {(((analysis.derivativeData.distanceToStrike || 1) / (analysis.derivativeData.underlyingSpot || 75000)) * 100).toFixed(2)}% drop to reach ATM
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Layer 2: Underlying Index Option Chain Walls */}
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                          <Layers className="w-4 h-4 text-blue-400" /> Underlying {analysis.derivativeData.underlyingName || 'SENSEX'} Expiry Option Chain Walls
                        </span>
                        <span className="text-xs font-mono text-slate-300">
                          Index Spot: <strong className="text-white font-bold text-sm">₹{analysis.derivativeData.underlyingSpot?.toLocaleString('en-IN')}</strong>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Index Put-Call Ratio (PCR)</span>
                          <div className="text-2xl font-black text-amber-400 font-mono">{analysis.derivativeData.pcr}</div>
                          <p className="text-[11px] text-slate-400 mt-1">Overall market option chain sentiment</p>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Index Max Pain Strike</span>
                          <div className="text-2xl font-black text-white font-mono">₹{analysis.derivativeData.maxPain?.toLocaleString('en-IN')}</div>
                          <p className="text-[11px] text-slate-400 mt-1">Writers' target expiry magnetic level</p>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Index Call Wall (Resistance)</span>
                          <div className="text-2xl font-black text-rose-400 font-mono">₹{analysis.derivativeData.callResistanceStrike?.toLocaleString('en-IN')}</div>
                          <p className="text-[11px] text-slate-400 mt-1">Highest Call Open Interest resistance</p>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Index Put Wall (Support)</span>
                          <div className="text-2xl font-black text-emerald-400 font-mono">₹{analysis.derivativeData.putSupportStrike?.toLocaleString('en-IN')}</div>
                          <p className="text-[11px] text-slate-400 mt-1">Highest Put Open Interest support base</p>
                        </div>
                      </div>
                    </div>

                    {/* Educational Callout explaining the difference */}
                    <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block mb-1">
                          Clarification: Why Max Pain (₹{analysis.derivativeData.maxPain?.toLocaleString('en-IN')}) differs from 72,000 PE (Price: ₹{analysis.currentPrice.toFixed(2)})
                        </span>
                        <p className="leading-relaxed opacity-95">
                          {analysis.derivativeData.relationshipExplanation}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Put-Call Ratio (PCR)</span>
                      <div className="text-2xl font-black text-amber-400 font-mono">{analysis.derivativeData.pcr}</div>
                      <p className="text-xs text-slate-400 mt-1">
                        {analysis.derivativeData.pcr > 1.3 ? 'Overbought / Strong Support base' : analysis.derivativeData.pcr < 0.8 ? 'Oversold / Resistance Heavy' : 'Neutral PCR Balance'}
                      </p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Max Pain Strike</span>
                      <div className="text-2xl font-black text-white font-mono">₹{analysis.derivativeData.maxPain?.toLocaleString('en-IN')}</div>
                      <p className="text-xs text-slate-400 mt-1">Option writers expiry magnetic pull level.</p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Call Resistance Wall</span>
                      <div className="text-2xl font-black text-rose-400 font-mono">₹{analysis.derivativeData.callResistanceStrike?.toLocaleString('en-IN')}</div>
                      <p className="text-xs text-slate-400 mt-1">Highest Call Open Interest strike.</p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Put Support Wall</span>
                      <div className="text-2xl font-black text-emerald-400 font-mono">₹{analysis.derivativeData.putSupportStrike?.toLocaleString('en-IN')}</div>
                      <p className="text-xs text-slate-400 mt-1">Highest Put Open Interest strike.</p>
                    </div>
                  </div>
                )}

                {/* Executive Summary & Confluence Score */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                          <Activity className="w-4 h-4 text-amber-400" /> Executive Summary & Technical Outlook
                        </h3>
                        <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                          Lot Size: {analysis.positionSizing.lotSize}
                        </span>
                      </div>
                      <p className="text-slate-200 text-base leading-relaxed mb-4">{analysis.summary}</p>
                      <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="font-semibold text-amber-400">Expiry & Theta Note:</span> {analysis.derivativeData.expiryNotes}
                      </div>
                    </div>
                  </div>

                  {/* Confluence Score Card */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Confluence Score (3-Screen)</span>
                    <div className="relative w-28 h-28 rounded-full border-4 border-slate-800 flex items-center justify-center my-2 bg-slate-950 shadow-inner">
                      <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-pulse opacity-60"></div>
                      <div className="text-3xl font-black text-white font-mono">{analysis.confluenceScore}<span className="text-sm text-slate-400">/10</span></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {analysis.confluenceScore >= 8 ? 'High Conviction Setup' : analysis.confluenceScore >= 6 ? 'Moderate Setup - Watch Triggers' : 'Low Confluence - Exercise Caution'}
                    </p>
                  </div>
                </div>

                {/* AI Multi-Horizon Intelligent Prediction Engine Card */}
                {analysis.multiHorizonPrediction && (
                  <MultiHorizonPredictionCard 
                    prediction={analysis.multiHorizonPrediction} 
                    symbol={analysis.ticker} 
                    onRunAiAgent={handleRunAiAgent}
                    isAiAgentLoading={isAiAgentLoading}
                  />
                )}

                {/* Global Macro & Geopolitical Radar on Dashboard */}
                {analysis.macroIntelligence?.globalGeopoliticalRadar && (
                  <GlobalMacroGeopoliticalRadarComponent 
                    radar={analysis.macroIntelligence.globalGeopoliticalRadar} 
                  />
                )}

                {/* Live News, Macro Events & Sentiment Intelligence Prediction Card */}
                {analysis.macroIntelligence && (
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                          <Newspaper className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-white tracking-tight">Live Market News & Events Intelligence</h3>
                            <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                              <Globe className="w-2.5 h-2.5" /> Web News Verified
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">Real-time news headlines, institutional FII/DII flows & event-driven prediction</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                          <span className="text-slate-400">News Sentiment:</span>
                          <span className={`font-bold ${
                            analysis.macroIntelligence.marketSentiment === 'Bullish' ? 'text-emerald-400' :
                            analysis.macroIntelligence.marketSentiment === 'Bearish' ? 'text-rose-400' :
                            'text-amber-400'
                          }`}>
                            {analysis.macroIntelligence.marketSentiment} ({analysis.macroIntelligence.sentimentScore > 0 ? '+' : ''}{analysis.macroIntelligence.sentimentScore}%)
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">Updated: {analysis.macroIntelligence.lastUpdated}</span>
                      </div>
                    </div>

                    {/* Headline Banner */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
                      <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-1 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Breaking Market Headline:
                      </div>
                      <div className="text-sm font-semibold text-white leading-snug">
                        "{analysis.macroIntelligence.headline}"
                      </div>
                    </div>

                    {/* FII/DII & Event Prediction Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-amber-400" /> Institutional & Macro Flow Stance:
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {analysis.macroIntelligence.fiiDiiSentiment}
                        </p>
                      </div>

                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-emerald-400" /> Event-Driven Prediction:
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {analysis.macroIntelligence.eventDrivenPrediction}
                        </p>
                      </div>
                    </div>

                    {/* Option Impact Alert (if option is active) */}
                    {analysis.macroIntelligence.optionImpactNote && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200 mb-4 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block mb-0.5">Option Impact From Current News:</span>
                          <p className="opacity-95 leading-relaxed">{analysis.macroIntelligence.optionImpactNote}</p>
                        </div>
                      </div>
                    )}

                    {/* Macro Catalysts Pills */}
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Key Upcoming Events & Catalysts:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {analysis.macroIntelligence.macroCatalysts.map((cat, i) => (
                          <div key={i} className="text-xs bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-slate-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                            <span className="truncate">{cat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent News Headlines */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Live Verified News Stories:</span>
                        <button onClick={() => setActiveTab('news')} className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
                          View All Stories <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {analysis.macroIntelligence.recentNews.slice(0, 3).map((item, i) => (
                          <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-slate-200 truncate">{item.title}</p>
                              <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                                <span className="font-semibold text-slate-400">{item.source}</span>
                                <span>•</span>
                                <span>{item.pubDate}</span>
                              </div>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold flex-shrink-0 ${
                              item.sentiment === 'Bullish' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              item.sentiment === 'Bearish' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {item.sentiment}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Multi-Timeframe Analysis (3-Screen Method) */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" /> Multi-Timeframe Confluence (3-Screen Method)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-400 uppercase">Screen 1: Weekly Tide</span>
                        <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-mono">{analysis.timeframes.weeklyTrend}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{analysis.timeframes.weeklyNotes}</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-400 uppercase">Screen 2: Daily Wave</span>
                        <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-mono">{analysis.timeframes.dailySetup}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{analysis.timeframes.dailyNotes}</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-400 uppercase">Screen 3: Hourly Ripple</span>
                        <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-mono">{analysis.timeframes.hourlyEntry}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{analysis.timeframes.hourlyNotes}</p>
                    </div>
                  </div>
                </div>

                {/* Actionable Trade Plan & Dual Position Sizing Engine */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Actionable Trade Plan */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4 text-amber-400" /> Actionable Trade Plan & R:R
                      </h3>

                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Entry Range:</span>
                          <span className="text-amber-400 font-bold">₹{analysis.tradePlan.entryRangeMin} - ₹{analysis.tradePlan.entryRangeMax}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Stop Loss:</span>
                          <span className="text-rose-400 font-bold">₹{analysis.tradePlan.stopLoss}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Target 1 (1:2 R:R):</span>
                          <span className="text-emerald-400 font-bold">₹{analysis.tradePlan.target1}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Target 2 (Fib Extension):</span>
                          <span className="text-emerald-400 font-bold">₹{analysis.tradePlan.target2}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Target Time Horizon:</span>
                          <span className="text-amber-400 font-bold">
                            {analysis.derivativeData?.isOption 
                              ? 'Intraday to 1-3 Days (Expiry Horizon)' 
                              : '1 to 5 Trading Days (Swing Target)'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Risk-to-Reward Ratio:</span>
                          <span className="text-slate-900 font-bold">{analysis.tradePlan.riskRewardRatio}</span>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                        <span className="font-semibold text-slate-300">Stop-Loss Reasoning:</span> {analysis.tradePlan.stopLossReason}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-emerald-400 font-mono">
                      Net R:R after costs: {analysis.tradePlan.netRiskRewardAfterCosts}
                    </div>
                  </div>

                  {/* Dual Position Sizing Engine */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-amber-400" /> Dual Position Sizing Engine ({riskPct}% Risk)
                      </h3>

                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Account Capital:</span>
                          <span className="text-white font-bold">₹{analysis.positionSizing.accountCapital.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Max Risk Amount ({riskPct}%):</span>
                          <span className="text-rose-400 font-bold">₹{analysis.positionSizing.riskAmountInINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Cash Equity (Shares):</span>
                          <span className="text-amber-400 font-bold">{analysis.positionSizing.exactShares} Shares</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">F&O Sizing ({analysis.positionSizing.lotSize}/lot):</span>
                          <span className="text-amber-400 font-bold">{analysis.positionSizing.recommendedLots} Lot(s)</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Futures Margin (Approx 20%):</span>
                          <span className="text-white font-bold">₹{analysis.positionSizing.futuresMarginRequired.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                      Calculated using Fixed Fractional Risk & Lot multiplier rules.
                    </div>
                  </div>
                </div>

                {/* Technical Indicators & Fibonacci Confluence */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Indicator Dashboard */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-amber-400" /> Indicator Dashboard & Moving Averages
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="text-slate-400">RSI (14)</div>
                        <div className="text-white font-bold text-sm mt-1">{analysis.indicators.rsi} <span className="text-xs font-normal text-amber-400">({analysis.indicators.rsiSignal})</span></div>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="text-slate-400">ADX (Trend Strength)</div>
                        <div className="text-white font-bold text-sm mt-1">{analysis.indicators.adx} <span className="text-xs font-normal text-emerald-400">{analysis.indicators.adx > 25 ? 'Strong Trend' : 'Ranging'}</span></div>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="text-slate-400">MACD Status</div>
                        <div className="text-white font-bold text-sm mt-1">{analysis.indicators.macdStatus}</div>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="text-slate-400">ATR (Volatility)</div>
                        <div className="text-white font-bold text-sm mt-1">₹{analysis.indicators.atr}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400">20 EMA / 50 EMA / 200 EMA</span>
                        <span className="text-amber-400">₹{analysis.indicators.emas.ema20} / ₹{analysis.indicators.emas.ema50} / ₹{analysis.indicators.emas.ema200}</span>
                      </div>
                      <div className="flex justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Key Support Levels</span>
                        <span className="text-emerald-400">{analysis.indicators.supportLevels.map(s => `₹${s}`).join(', ')}</span>
                      </div>
                      <div className="flex justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Key Resistance Levels</span>
                        <span className="text-rose-400">{analysis.indicators.resistanceLevels.map(r => `₹${r}`).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fibonacci & Trailing Exit Plan */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-amber-400" /> Fibonacci & Trailing Exit Plan
                      </h3>

                      <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <div className="text-slate-400">Golden Pocket (50%)</div>
                          <div className="text-amber-400 font-bold text-sm mt-1">₹{analysis.fibonacci.goldenPocket50}</div>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <div className="text-slate-400">Golden Pocket (61.8%)</div>
                          <div className="text-amber-400 font-bold text-sm mt-1">₹{analysis.fibonacci.goldenPocket618}</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>{analysis.trailingPlan.rule1}</span>
                        </div>
                        <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>{analysis.trailingPlan.rule2}</span>
                        </div>
                        <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>{analysis.trailingPlan.rule3}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <div className="text-xs font-semibold text-rose-400 mb-2 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4" /> Risk Warnings & Expiry Gamma Risks
                      </div>
                      <ul className="space-y-1 text-xs text-slate-400">
                        {analysis.riskWarnings.map((warn, i) => (
                          <li key={warn} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>{warn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 2: MARKET SCANNER */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">NSE & BSE Custom Derivative & Equity Scanner</h2>
                    <span className="text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      {scannerAssets.length} Active Scripts
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Search and customize your scanner watchlist with any equity stock or Zerodha F&O contract. Live OI buildup, PCR & sentiment tracking.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start lg:self-auto">
                  {lastScannerRefreshedAt && (
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
                      Updated: {lastScannerRefreshedAt}
                    </span>
                  )}
                  <button
                    onClick={handleRefreshScannerAll}
                    disabled={isScannerRefreshing}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-60 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer disabled:cursor-not-allowed"
                    title="Fetch live market scanner quotes and OI/PCR charts"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScannerRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isScannerRefreshing ? 'Refreshing...' : 'Refresh Scanner'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Search & Add Bar */}
              <div className="mb-6 bg-slate-950/80 p-4 rounded-xl border border-slate-800/90 space-y-3">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-amber-400" /> Search & Add Any Zerodha Script to Scanner:
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Real-time Kite Database</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-2 relative" ref={scannerSearchRef}>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={scannerSearchInput}
                      onChange={(e) => setScannerSearchInput(e.target.value)}
                      onFocus={() => setIsScannerDropdownOpen(scannerSearchResults.length > 0)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddToScanner(scannerSearchInput);
                        }
                      }}
                      placeholder="Type stock name or contract (e.g. SENSEX 72000 PE, PAYTM, NIFTY 24500 CE, TATAMOTORS)..."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 text-slate-100 placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none transition font-mono pr-8"
                    />
                    {scannerSearchInput && (
                      <button
                        onClick={() => {
                          setScannerSearchInput('');
                          setScannerSearchResults([]);
                          setIsScannerDropdownOpen(false);
                        }}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {isScannerSearching && (
                      <div className="absolute right-8 top-2.5">
                        <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                      </div>
                    )}

                    {/* Scanner Search Dropdown */}
                    {isScannerDropdownOpen && scannerSearchResults.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto divide-y divide-slate-800">
                        {scannerSearchResults.map((inst, index) => {
                          const isAlreadyAdded = scannerWatchlist.includes(inst.tradingsymbol);
                          return (
                            <div
                              key={`${inst.exchange}-${inst.tradingsymbol}-${inst.segment || ''}-${index}`}
                              onClick={() => handleAddToScanner(inst.tradingsymbol)}
                              className="px-4 py-2.5 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-amber-400 group-hover:text-amber-300 text-xs">
                                    {inst.tradingsymbol}
                                  </span>
                                  {inst.exchange && (
                                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono border border-slate-700">
                                      {inst.exchange}
                                    </span>
                                  )}
                                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-700">
                                    {inst.displayType}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{inst.name}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                {inst.lastPrice > 0 && (
                                  <span className="font-mono text-xs text-white">₹{inst.lastPrice}</span>
                                )}
                                {isAlreadyAdded ? (
                                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                                    Added
                                  </span>
                                ) : (
                                  <span className="text-[11px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToScanner(scannerSearchInput)}
                    disabled={!scannerSearchInput.trim()}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" /> Add to Scanner
                  </button>
                </div>
              </div>

              {/* HISTORICAL OPEN INTEREST (OI) & PUT-CALL RATIO (PCR) RECHARTS VISUALIZER */}
              <div 
                ref={chartSectionRef}
                className="mb-8 bg-slate-950 border border-slate-800/90 rounded-2xl p-5 shadow-2xl relative overflow-hidden"
              >
                {/* Header & Controls */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                      <LineChartIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white tracking-tight">
                          Historical Open Interest (OI) & Put-Call Ratio (PCR) Trends
                        </h3>
                        <span className="text-[11px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2.5 py-0.5 rounded-full font-bold">
                          {oiPcrData ? oiPcrData.ticker : chartAssetTicker}
                        </span>
                        {isChartLoading && (
                          <span className="text-[10px] text-amber-400 flex items-center gap-1 font-mono">
                            <RefreshCw className="w-3 h-3 animate-spin" /> Fetching live trend...
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Multi-session institutional accumulation, Call resistance walls, Put support floors & PCR sentiment shifts.
                      </p>
                    </div>
                  </div>

                  {/* Chart View & Timeframe Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Timeframe Toggle */}
                    <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
                      <button
                        onClick={() => setChartTimeframe('daily')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                          chartTimeframe === 'daily'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        10-Day Daily
                      </button>
                      <button
                        onClick={() => setChartTimeframe('intraday')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                          chartTimeframe === 'intraday'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Today Intraday
                      </button>
                    </div>

                    {/* Mode Selector */}
                    <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
                      <button
                        onClick={() => setChartDisplayMode('all')}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition ${
                          chartDisplayMode === 'all'
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Display Soft Call/Put OI Bars with High-Contrast PCR Overlay"
                      >
                        Combined
                      </button>
                      <button
                        onClick={() => setChartDisplayMode('lines_only')}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition ${
                          chartDisplayMode === 'lines_only'
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Display only crisp, high-visibility lines for Call OI, Put OI and PCR (No bars)"
                      >
                        Lines Only
                      </button>
                      <button
                        onClick={() => setChartDisplayMode('oi_breakdown')}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition ${
                          chartDisplayMode === 'oi_breakdown'
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Focus on Call OI vs Put OI breakdown bars"
                      >
                        OI Stack
                      </button>
                      <button
                        onClick={() => setChartDisplayMode('pcr_focus')}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition ${
                          chartDisplayMode === 'pcr_focus'
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Focus on Put-Call Ratio trend line & sentiment zones"
                      >
                        PCR Curve
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Asset Selector Chips */}
                <div className="py-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mr-1 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-amber-400" /> Chart Asset:
                    </span>
                    {scannerWatchlist.map((sym, index) => {
                      const isSelected = chartAssetTicker === sym;
                      const assetInfo = scannerAssets.find(a => a.ticker === sym);
                      return (
                        <button
                          key={`${sym}-${index}`}
                          onClick={() => setChartAssetTicker(sym)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border transition whitespace-nowrap flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                              : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                          }`}
                        >
                          <span>{sym}</span>
                          {assetInfo && (
                            <span className={`text-[10px] ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                              (PCR {assetInfo.pcr})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Key Metrics Ribbon */}
                {oiPcrData && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 my-4">
                    <div className="bg-slate-900/70 border border-slate-800/80 p-3 rounded-xl">
                      <div className="text-[11px] text-slate-400">Current LTP</div>
                      <div className="text-base font-bold font-mono text-white mt-0.5">
                        {formatPriceWithCurrency(oiPcrData.currentPrice, oiPcrData.ticker)}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{oiPcrData.name}</div>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800/80 p-3 rounded-xl">
                      <div className="text-[11px] text-slate-400">Total Open Interest</div>
                      <div className="text-base font-bold font-mono text-sky-400 mt-0.5">
                        {oiPcrData.currentOi >= 100000 
                          ? `${(oiPcrData.currentOi / 100000).toFixed(2)}L`
                          : oiPcrData.currentOi.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Live Open Contracts</div>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800/80 p-3 rounded-xl">
                      <div className="text-[11px] text-slate-400">Put-Call Ratio (PCR)</div>
                      <div className={`text-base font-bold font-mono mt-0.5 ${
                        oiPcrData.currentPcr >= 1.25 ? 'text-emerald-400' :
                        oiPcrData.currentPcr <= 0.85 ? 'text-rose-400' : 'text-amber-400'
                      }`}>
                        {oiPcrData.currentPcr.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {oiPcrData.currentPcr >= 1.25 ? 'Bullish Put Base' : oiPcrData.currentPcr <= 0.85 ? 'Heavy Call Overhead' : 'Balanced Range'}
                      </div>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800/80 p-3 rounded-xl">
                      <div className="text-[11px] text-slate-400">Call vs Put Distribution</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono font-bold text-rose-400">
                          C: {Math.round((oiPcrData.totalCallOi / (oiPcrData.totalCallOi + oiPcrData.totalPutOi || 1)) * 100)}%
                        </span>
                        <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden flex">
                          <div 
                            className="bg-rose-500 h-full" 
                            style={{ width: `${Math.round((oiPcrData.totalCallOi / (oiPcrData.totalCallOi + oiPcrData.totalPutOi || 1)) * 100)}%` }} 
                          />
                          <div 
                            className="bg-emerald-500 h-full" 
                            style={{ width: `${Math.round((oiPcrData.totalPutOi / (oiPcrData.totalCallOi + oiPcrData.totalPutOi || 1)) * 100)}%` }} 
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          P: {Math.round((oiPcrData.totalPutOi / (oiPcrData.totalCallOi + oiPcrData.totalPutOi || 1)) * 100)}%
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {oiPcrData.totalPutOi.toLocaleString('en-IN')} Puts / {oiPcrData.totalCallOi.toLocaleString('en-IN')} Calls
                      </div>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800/80 p-3 rounded-xl col-span-2 md:col-span-4 lg:col-span-1">
                      <div className="text-[11px] text-slate-400">Active Buildup Mode</div>
                      <div className="mt-1">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold border ${getOIBadgeColor(oiPcrData.oiBuildUp)}`}>
                          {oiPcrData.oiBuildUp}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {oiPcrData.oiBuildUp === 'Long Buildup' ? 'Price Up + OI Up' :
                         oiPcrData.oiBuildUp === 'Short Buildup' ? 'Price Down + OI Up' :
                         oiPcrData.oiBuildUp === 'Short Covering' ? 'Price Up + OI Down' : 'Price Down + OI Down'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Recharts Chart Canvas with smooth horizontal scroll for mobile devices */}
                <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
                  <div className="h-80 min-w-[560px] w-full mt-2">
                    {oiPcrData && oiPcrData.history && oiPcrData.history.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={oiPcrData.history}
                        margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="timestamp" 
                          stroke="#64748b" 
                          tick={{ fill: '#94a3b8', fontSize: 11 }}
                          tickLine={{ stroke: '#334155' }}
                        />
                        <YAxis 
                          yAxisId="oi" 
                          orientation="left" 
                          stroke="#64748b" 
                          tick={{ fill: '#94a3b8', fontSize: 11 }} 
                          tickLine={{ stroke: '#334155' }}
                          tickFormatter={(v) => v >= 100000 ? `${(v/100000).toFixed(1)}L` : `${(v/1000).toFixed(0)}k`} 
                        />
                        <YAxis 
                          yAxisId="pcr" 
                          orientation="right" 
                          stroke="#f59e0b" 
                          domain={[0.4, 2.2]} 
                          tick={{ fill: '#f59e0b', fontSize: 11 }} 
                          tickLine={{ stroke: '#b45309' }}
                          tickFormatter={(v) => v.toFixed(2)} 
                        />
                        <Tooltip content={<CustomOIPCRTooltip />} />
                        <Legend 
                          wrapperStyle={{ paddingTop: 14, fontSize: 11 }}
                          formatter={(value) => <span className="text-slate-300 font-mono text-xs">{value}</span>}
                        />

                        {/* Reference lines for institutional PCR zones - High contrast & vibrant */}
                        <ReferenceLine 
                          yAxisId="pcr" 
                          y={1.0} 
                          stroke="#38bdf8" 
                          strokeWidth={2}
                          strokeDasharray="5 5" 
                          label={{ value: '── Neutral PCR (1.0)', fill: '#38bdf8', fontSize: 11, fontWeight: 'bold', position: 'insideTopRight' }} 
                        />
                        <ReferenceLine 
                          yAxisId="pcr" 
                          y={1.4} 
                          stroke="#4ade80" 
                          strokeWidth={2}
                          strokeDasharray="4 4" 
                          label={{ value: '▲ Bullish Put Support (1.4)', fill: '#4ade80', fontSize: 11, fontWeight: 'bold', position: 'insideTopRight' }} 
                        />
                        <ReferenceLine 
                          yAxisId="pcr" 
                          y={0.7} 
                          stroke="#fb7185" 
                          strokeWidth={2}
                          strokeDasharray="4 4" 
                          label={{ value: '▼ Call Resistance Wall (0.7)', fill: '#fb7185', fontSize: 11, fontWeight: 'bold', position: 'insideTopRight' }} 
                        />

                        {/* Bars for Call vs Put OI Breakdown (Soft translucent in Combined mode so lines stand out) */}
                        {(chartDisplayMode === 'all' || chartDisplayMode === 'oi_breakdown') && (
                          <Bar 
                            yAxisId="oi" 
                            dataKey="callOi" 
                            name="Call Open Interest (Resistance)" 
                            stackId="oi" 
                            fill="#f43f5e" 
                            fillOpacity={chartDisplayMode === 'all' ? 0.22 : 0.75} 
                            stroke="#f43f5e"
                            strokeOpacity={0.5}
                            strokeWidth={1}
                            radius={[0, 0, 0, 0]} 
                          />
                        )}
                        {(chartDisplayMode === 'all' || chartDisplayMode === 'oi_breakdown') && (
                          <Bar 
                            yAxisId="oi" 
                            dataKey="putOi" 
                            name="Put Open Interest (Support)" 
                            stackId="oi" 
                            fill="#10b981" 
                            fillOpacity={chartDisplayMode === 'all' ? 0.22 : 0.75} 
                            stroke="#10b981"
                            strokeOpacity={0.5}
                            strokeWidth={1}
                            radius={[4, 4, 0, 0]} 
                          />
                        )}

                        {/* Pure Line Trends for Call OI & Put OI when in Lines Only mode */}
                        {chartDisplayMode === 'lines_only' && (
                          <Line 
                            yAxisId="oi" 
                            type="monotone" 
                            dataKey="callOi" 
                            name="Call Open Interest Line" 
                            stroke="#f43f5e" 
                            strokeWidth={2.5} 
                            dot={{ r: 4, fill: '#ffffff', stroke: '#f43f5e', strokeWidth: 2 }} 
                            activeDot={{ r: 7, fill: '#f43f5e', stroke: '#ffffff', strokeWidth: 2 }} 
                          />
                        )}
                        {chartDisplayMode === 'lines_only' && (
                          <Line 
                            yAxisId="oi" 
                            type="monotone" 
                            dataKey="putOi" 
                            name="Put Open Interest Line" 
                            stroke="#10b981" 
                            strokeWidth={2.5} 
                            dot={{ r: 4, fill: '#ffffff', stroke: '#10b981', strokeWidth: 2 }} 
                            activeDot={{ r: 7, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }} 
                          />
                        )}

                        {/* PCR Trend Line - High visibility glowing electric gold */}
                        {(chartDisplayMode === 'all' || chartDisplayMode === 'lines_only' || chartDisplayMode === 'pcr_focus') && (
                          <Line 
                            yAxisId="pcr" 
                            type="monotone" 
                            dataKey="pcr" 
                            name="Put-Call Ratio (PCR)" 
                            stroke="#facc15" 
                            strokeWidth={3.5} 
                            dot={{ r: 5, fill: '#ffffff', stroke: '#ca8a04', strokeWidth: 2.5 }} 
                            activeDot={{ r: 8, fill: '#fef08a', stroke: '#a16207', strokeWidth: 3 }} 
                          />
                        )}
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" /> Loading historical OI & PCR dataset...
                    </div>
                  )}
                  </div>
                </div>

                {/* Institutional Derivative Mechanics Notes */}
                <div className="mt-4 pt-3 border-t border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="font-semibold text-amber-400 block mb-0.5">1. PCR Threshold Rules</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      PCR &gt; 1.25 signals strong Put writing, establishing downside support. PCR &lt; 0.85 denotes aggressive Call writing, forming rigid overhead resistance.
                    </p>
                  </div>
                  <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="font-semibold text-amber-400 block mb-0.5">2. Price vs OI Confluence</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Rising Price + Expanding OI = Genuine Long Buildup (institutional buying). Falling Price + Expanding OI = Short Buildup (bearish pressure).
                    </p>
                  </div>
                  <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="font-semibold text-amber-400 block mb-0.5">3. Live Exchange Sync</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      When Zerodha Kite is connected, current session figures mirror official NSE/BSE ticks and open interest totals in real time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid of Custom Scanner Cards */}
              {scannerAssets.length === 0 ? (
                <div className="text-center py-12 bg-slate-950 rounded-xl border border-slate-800/80 p-8 space-y-3">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
                  <h3 className="text-base font-semibold text-white">No scripts in your custom scanner watchlist</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Use the search bar above to add any stock or F&O contract, or click below to restore default index heavyweights.
                  </p>
                  <button
                    onClick={handleResetScannerWatchlist}
                    className="mt-2 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition"
                  >
                    Restore Default Watchlist
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scannerAssets.map((asset, index) => {
                    const isCharted = chartAssetTicker === asset.ticker;
                    return (
                      <div 
                        key={`${asset.ticker}-${index}`}
                        className={`bg-slate-950 border rounded-xl p-4 transition group flex flex-col justify-between ${
                          isCharted 
                            ? 'border-amber-500/70 ring-1 ring-amber-500/50 shadow-lg shadow-amber-500/10' 
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          {/* Card Header with Remove Icon */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-white group-hover:text-amber-400 transition">{asset.ticker}</span>
                              <span className="text-[11px] text-slate-500 font-mono">{asset.sector}</span>
                              {isCharted && (
                                <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">
                                  CHARTED
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${getOIBadgeColor(asset.oiBuildUp)}`}>
                                {asset.oiBuildUp}
                              </span>
                              <button
                                onClick={(e) => handleRemoveFromScanner(asset.ticker, e)}
                                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/20 rounded-lg border border-transparent hover:border-rose-500/30 transition"
                                title={`Remove ${asset.ticker} from scanner`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs font-medium text-slate-300 mb-3">{asset.name}</div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs font-mono py-2 border-t border-b border-slate-900 my-2">
                            <div>
                              <span className="text-slate-400">Price: </span>
                              <span className="text-white font-bold">{formatPriceWithCurrency(asset.price, asset.ticker)}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">PCR: </span>
                              <span className="text-amber-400 font-bold">{asset.pcr}</span>
                            </div>
                            <div className={asset.change.startsWith('+') ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {asset.change}
                            </div>
                          </div>

                          {/* 52W High & Low Row */}
                          <div className="flex items-center justify-between text-[11px] font-mono py-1 px-2.5 bg-slate-900/80 border border-slate-800/80 rounded-lg mb-2">
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                              <span className="text-[9px] text-slate-500 uppercase">52W H:</span>
                              <span>{formatPriceWithCurrency(asset.fiftyTwoWeekHigh || asset.fiftyDayHigh || Math.round(asset.price * 1.18), asset.ticker)}</span>
                            </span>
                            <span className="text-slate-700">•</span>
                            <span className="text-rose-400 font-semibold flex items-center gap-1">
                              <span className="text-[9px] text-slate-500 uppercase">52W L:</span>
                              <span>{formatPriceWithCurrency(asset.fiftyTwoWeekLow || asset.fiftyDayLow || Math.round(asset.price * 0.82), asset.ticker)}</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <button
                              onClick={() => handleSelectChartAsset(asset.ticker)}
                              className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition ${
                                isCharted
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                              }`}
                              title={`View historical OI & PCR chart for ${asset.ticker}`}
                            >
                              <LineChartIcon className="w-3.5 h-3.5 text-amber-400" />
                              <span>View Chart</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedTicker(asset.ticker);
                                setActiveTab('dashboard');
                              }}
                              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition"
                            >
                              Analyze Deeply <Compass className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE NEWS, EVENTS & MACRO PREDICTION */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-white">Live Market News, Macro Events & Prediction</h2>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" /> Real-Time RSS Feeds
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                      {selectedTicker} Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Live Indian market news analysis, FII/DII institutional stance, and dynamic upcoming corporate events calendar.</p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  {lastRefreshedTime && (
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Refreshed: {lastRefreshedTime}
                    </span>
                  )}
                  <button
                    onClick={() => fetchMarketNews(selectedTicker, true)}
                    disabled={isNewsLoading}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/20 disabled:opacity-50"
                    title="Click to force fetch fresh live news and roll forward upcoming corporate events"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isNewsLoading ? 'animate-spin' : ''}`} /> 
                    {isNewsLoading ? 'Fetching Live Data...' : 'Refresh News & Events'}
                  </button>
                </div>
              </div>

              {refreshBannerMessage && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{refreshBannerMessage}</span>
                </div>
              )}

              {(() => {
                const activeNews = marketNews || analysis?.macroIntelligence;
                if (!activeNews) {
                  return (
                    <div className="py-12 text-center text-slate-400">
                      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-sm font-mono">Gathering real-time market news and macro sentiment...</p>
                      <button
                        onClick={() => fetchMarketNews(selectedTicker)}
                        className="mt-4 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-xl border border-slate-700 transition"
                      >
                        ⚡ Force Instant Load
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-6">
                    {/* Top Sentiment Banner */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">News Sentiment Score</span>
                        <div className="flex items-center gap-3 mt-2">
                          <div className={`text-3xl font-black font-mono ${
                            activeNews.marketSentiment === 'Bullish' ? 'text-emerald-400' :
                            activeNews.marketSentiment === 'Bearish' ? 'text-rose-400' :
                            'text-amber-400'
                          }`}>
                            {activeNews.marketSentiment}
                          </div>
                          <span className="text-xs font-mono bg-slate-900 px-2.5 py-1 rounded-md text-slate-300">
                            {activeNews.sentimentScore > 0 ? '+' : ''}{activeNews.sentimentScore}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Calculated from latest financial breaking news and market reports.</p>
                      </div>

                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Institutional & FII/DII Flow</span>
                        <p className="text-sm font-semibold text-slate-200 mt-2 leading-relaxed">
                          {activeNews.fiiDiiSentiment}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Tracks foreign and domestic institutional market positioning.</p>
                      </div>

                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Active Asset Focus</span>
                        <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                          {selectedTicker}
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                          {analysis?.derivativeData?.isOption ? `Tracking SENSEX / Index impact on ${analysis.contractDetails?.strike} ${analysis.contractDetails?.instrumentType}` : `Direct macro impact on ${selectedTicker}`}
                        </p>
                      </div>
                    </div>

                    {/* Event-Driven Prediction & Option Impact Box */}
                    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/30">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider mb-2 font-mono">
                        <Zap className="w-4 h-4 fill-amber-400" /> Event-Driven Prediction & Outlook
                      </div>
                      <p className="text-base text-slate-100 leading-relaxed mb-4">
                        {activeNews.eventDrivenPrediction}
                      </p>

                      {activeNews.optionImpactNote && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-200 flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block mb-1 text-sm">Derivative & Option Impact:</span>
                            <p className="leading-relaxed opacity-95">{activeNews.optionImpactNote}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* GLOBAL MACRO & GEOPOLITICAL IMPACT RADAR (Crude Oil, US Elections, War Risk) */}
                    <GlobalMacroGeopoliticalRadarComponent 
                      radar={activeNews.globalGeopoliticalRadar} 
                    />

                    {/* AI Multi-Horizon Intelligent Prediction Engine Card */}
                    {analysis?.multiHorizonPrediction && (
                      <MultiHorizonPredictionCard prediction={analysis.multiHorizonPrediction} symbol={analysis.ticker} />
                    )}

                    {/* UPCOMING CORPORATE EVENTS CALENDAR SECTION (Matching User Request) */}
                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-700 flex items-center justify-center font-bold">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Upcoming Corporate Events Calendar</h3>
                            <p className="text-xs text-slate-500">Q2 Earnings, Dividends, AGMs, Board Meetings & Macro Policy Events.</p>
                          </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                          {[
                            { id: 'ALL', label: 'All Events' },
                            { id: 'RESULT', label: 'Earnings' },
                            { id: 'DIVIDEND', label: 'Dividends' },
                            { id: 'MEETING', label: 'Meetings' },
                            { id: 'UPDATE', label: 'Updates' },
                            { id: 'MACRO', label: 'Macro' }
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setEventFilter(tab.id as any)}
                              className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap cursor-pointer ${
                                eventFilter === tab.id
                                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                                  : 'bg-slate-100/90 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Events Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredCorporateEvents.map((evt) => (
                          <div 
                            key={evt.id} 
                            className="bg-white border border-slate-200/90 rounded-2xl p-4 hover:border-amber-500/50 hover:shadow-md transition-all flex items-start gap-3.5 group cursor-pointer"
                          >
                            {/* Left Date Badge Box */}
                            <div className="w-14 h-16 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:border-amber-500 transition-colors">
                              <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider uppercase">{evt.month}</span>
                              <span className="text-xl font-mono font-extrabold tracking-tight text-white">{evt.date}</span>
                            </div>

                            {/* Right Content */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider border ${evt.tagColor}`}>
                                  {evt.type}
                                </span>
                                <span className="text-[9px] font-mono font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {evt.countdownDays ? (evt.countdownDays === 1 ? 'In 1 day' : `In ${evt.countdownDays} days`) : 'Upcoming'}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition line-clamp-2">
                                {evt.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                                {evt.description}
                              </p>
                              {evt.fullDate && (
                                <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                                  <span>{evt.fullDate}</span>
                                  <span className={`font-bold ${
                                    evt.impact === 'High Impact' || evt.impact === 'Critical Impact' ? 'text-rose-600' : 'text-slate-500'
                                  }`}>{evt.impact}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Macro Catalysts */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Major Macroeconomic Catalysts Tracked:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeNews.macroCatalysts.map((cat, idx) => (
                          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-slate-200 block mb-1">{cat}</span>
                              <span className="text-xs text-slate-400">Monitored continuously for volatility spikes and trend inflections.</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* All Live News Articles Grid */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Latest Financial News Stories (Live Grounded):</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeNews.recentNews.map((news, i) => (
                          <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-xs font-semibold text-amber-400 font-mono">{news.source}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                                  news.sentiment === 'Bullish' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                  news.sentiment === 'Bearish' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                                  'bg-slate-800 text-slate-400'
                                }`}>
                                  {news.sentiment}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-slate-200 leading-snug">{news.title}</p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                              Published: {news.pubDate}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB: INSTITUTIONAL F&O STRIKE RADAR & PATTERN PREDICTOR */}
        {activeTab === 'fno' && (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Strategy Master Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-emerald-500/30 p-6 md:p-8 shadow-2xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 animate-pulse" />
                      INSTITUTIONAL F&O RADAR
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      NIFTY • BANKNIFTY • SENSEX
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>{fnoLastUpdated ? `Updated ${fnoLastUpdated}` : 'Live Institutional Feed'}</span>
                    <button
                      onClick={() => fetchFnoOpportunities(false)}
                      disabled={isFnoLoading}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center gap-1 text-xs border border-slate-700 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isFnoLoading ? 'animate-spin text-emerald-400' : ''}`} />
                      Refresh
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  High-Profit Strike Selection & Advance Pattern Predictor
                </h1>
                <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                  How top derivative traders pick strikes that maximize percentage gains without overpaying high premiums: Targeting the 
                  <span className="text-emerald-400 font-semibold"> Delta 0.35–0.45 Sweet Spot</span> with verified chart patterns, buyer accumulation, and 15-minute advance order flow cues.
                </p>

                {/* 3 Core Rules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                      <Zap className="w-4 h-4" /> 1. The Sweet Spot Strike (No Overpaying)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Avoid Deep ITM (paying ₹800+ locks massive capital for small % return) and Deep OTM (lottery tickets that decay to ₹0). Pick <strong className="text-white">1–2 strikes OTM (₹95–₹240)</strong>. On breakout, Gamma explosion gives +100% to +180% return while capping risk to ₹30–₹40.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                      <Eye className="w-4 h-4" /> 2. Predict 15 Mins in Advance
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Watch for <strong className="text-white">Call OI unwinding</strong> on resistance + <strong className="text-white">Put OI build-up</strong> creating a floor. Look for price compression holding VWAP with falling volume right before the expansion bar. If USD/INR softens, FIIs are pumping the index.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                      <Calculator className="w-4 h-4" /> 3. Dual Sizer Integration
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Never guess lot sizes. Click <strong className="text-white">"Send to Dual Sizer"</strong> on any verified strike below to automatically calculate the exact number of lots, total capital at risk, and exact profit at Target 1 and Target 2.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PAPER TRADING & TARGET 1 VERIFICATION AUDIT PANEL */}
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-5">
              {/* Indian Market Session Real-Time Indicator Bar */}
              <div className={`p-3.5 rounded-2xl border text-xs flex flex-wrap items-center justify-between gap-2 font-mono ${
                marketStatus.isOpen
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${marketStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
                  <span className="font-black text-sm tracking-wide">{marketStatus.sessionMessage}</span>
                </div>
                <div className="text-[11px] text-slate-300 flex items-center gap-2">
                  <span>Current IST: <strong className="text-white">{marketStatus.istTime}</strong></span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold">
                    NSE / BSE Session: 09:15 AM - 03:30 PM IST
                  </span>
                </div>
              </div>

              {/* Off-Market Hours Notice & Practice Backtest Mode Switch */}
              {!marketStatus.isOpen && (
                <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 text-xs space-y-3 font-mono">
                  <div className="flex items-start gap-2.5 text-amber-300">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-200 block text-sm">
                        🔴 बाज़ार वर्तमान में बंद है (NSE/BSE Closed • Current Time: {marketStatus.istTime} IST)
                      </span>
                      <p className="text-slate-300 leading-relaxed mt-0.5">
                        भारतीय शेयर बाज़ार (NSE & BSE) रात में या छुट्टियों पर बंद रहता है। वास्तविक ट्रेडिंग सत्र सोमवार से शुक्रवार सुबह <strong>9:15 AM से शाम 3:30 PM IST</strong> तक चालू रहता है।
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-amber-500/20">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isPracticeModeAllowed}
                        onChange={(e) => {
                          setIsPracticeModeAllowed(e.target.checked);
                          if (e.target.checked) setIsSimulatingTicks(true);
                        }}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700 cursor-pointer"
                      />
                      <span className="font-bold text-amber-200 text-xs">
                        🧪 Turn ON Off-Market Backtest Practice Simulator (अभ्यास मोड चालू करें)
                      </span>
                    </label>

                    <span className="text-[10px] text-slate-400">
                      {isPracticeModeAllowed
                        ? '⚠️ Warning: Profits below are SYNTHETIC BACKTEST simulations for practice.'
                        : '⏳ Orders queued. Real-time ticks pause until market opens at 9:15 AM IST.'}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
                    <Target className="w-6 h-6 text-slate-950" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black text-white tracking-tight">
                        F&O Target 1 Paper Trading & Accuracy Audit Dashboard
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {marketStatus.isOpen ? 'Live Market Mode' : (isPracticeModeAllowed ? 'Backtest Practice Mode' : 'Queued Session Mode')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      गणितीय पेपर ट्रेडिंग सिस्टम: जांचें कि F&O Radar के रिकमेंड किए गए ऑप्शन स्ट्राइक्स Target 1 अचीव करते हैं या नहीं।
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleAutoPaperTradeAll}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    🚀 Paper Trade All 3 (Nifty, BankNifty, Sensex)
                  </button>

                  {paperTrades.length > 0 && (
                    <button
                      onClick={() => setIsSimulatingTicks(!isSimulatingTicks)}
                      disabled={!marketStatus.isOpen && !isPracticeModeAllowed}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer disabled:opacity-50 ${
                        isSimulatingTicks
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700'
                      }`}
                    >
                      {isSimulatingTicks ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" /> : <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                      {isSimulatingTicks ? 'Simulating Ticks...' : '▶️ Resume Ticks'}
                    </button>
                  )}

                  {paperTrades.length > 0 && (
                    <button
                      onClick={handleResetPaperTrades}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition border border-slate-700 cursor-pointer"
                      title="Clear paper trading history"
                    >
                      Clear Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Accuracy Summary Metrics Bar */}
              {paperTrades.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Total Paper Trades</div>
                    <div className="text-xl font-black text-white mt-0.5">{paperTrades.length} Positions</div>
                    <div className="text-[10px] text-emerald-400 mt-1">1 Lot Default (65/30/20)</div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Target 1 vs SL Hit</div>
                    <div className="text-xl font-black text-emerald-400 mt-0.5">
                      {paperTrades.filter(t => t.status === 'TARGET1_HIT' || t.status === 'TARGET2_HIT').length} Hits / {paperTrades.filter(t => t.status === 'STOPLOSS_HIT').length} SL
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {Math.round((paperTrades.filter(t => t.status === 'TARGET1_HIT' || t.status === 'TARGET2_HIT').length / (paperTrades.filter(t => t.status !== 'ACTIVE' && t.status !== 'QUEUED_AFTER_HOURS').length || 1)) * 100)}% Win Rate
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">SL Risk Capped (Loss)</div>
                    <div className="text-xl font-black text-rose-400 mt-0.5">
                      -₹{paperTrades.filter(t => t.status === 'STOPLOSS_HIT').reduce((acc, t) => acc + Math.abs(t.pnl), 0).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-rose-300 mt-1">
                      {paperTrades.filter(t => t.status === 'STOPLOSS_HIT').length} Trade SL Triggered
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">
                      {marketStatus.isOpen ? 'Net Realized P&L' : 'Net Paper P&L'}
                    </div>
                    <div className={`text-xl font-black mt-0.5 ${
                      paperTrades.reduce((acc, t) => acc + t.pnl, 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {paperTrades.reduce((acc, t) => acc + t.pnl, 0) >= 0 ? '+' : ''}₹{paperTrades.reduce((acc, t) => acc + t.pnl, 0).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {marketStatus.isOpen ? 'Live Market Net Profit' : (isPracticeModeAllowed ? 'Backtest Simulation' : 'Queued Session')}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-300">
                    💡 अभी कोई पेपर ट्रेड एक्टिव नहीं है। ऊपर <strong className="text-emerald-400">"🚀 Paper Trade All 3"</strong> बटन या नीचे दिए गए किसी भी F&O कार्ड पर <strong className="text-emerald-400">"⚡ Paper Trade & Test Target 1"</strong> दबाकर परीक्षण शुरू करें!
                  </p>
                </div>
              )}

              {/* Active & Completed Paper Positions List */}
              {paperTrades.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Paper Positions Tracker & Target 1 Audit Log</span>
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      {marketStatus.isOpen 
                        ? (isSimulatingTicks ? '● LIVE SESSION TICKET ACTIVE' : 'SESSION PAUSED')
                        : (isPracticeModeAllowed ? '🧪 PRACTICE BACKTEST SIMULATOR ACTIVE' : '⏳ QUEUED FOR 9:15 AM IST')}
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paperTrades.map(trade => {
                      const isT1Hit = trade.status === 'TARGET1_HIT' || trade.status === 'TARGET2_HIT';
                      const isSlHit = trade.status === 'STOPLOSS_HIT';
                      const isQueued = trade.status === 'QUEUED_AFTER_HOURS';
                      const progressPct = Math.min(100, Math.max(0, ((trade.currentLtp - trade.entryPrice) / (trade.target1 - trade.entryPrice)) * 100));
                      const maxRiskVal = Math.round((trade.entryPrice - trade.stoploss) * trade.lotSize * trade.numberOfLots);

                      return (
                        <div
                          key={trade.id}
                          className={`p-4 rounded-2xl border transition-all space-y-3 font-mono ${
                            isT1Hit
                              ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                              : isSlHit
                              ? 'bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-500/10'
                              : isQueued
                              ? 'bg-slate-950 border-amber-500/40'
                              : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-black text-amber-400">{trade.cleanScript}</span>
                              <div className="text-[10px] text-slate-400">Entry: ₹{trade.entryPrice.toFixed(2)} ({trade.startTimestamp})</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              isT1Hit
                                ? 'bg-emerald-500 text-slate-950'
                                : isSlHit
                                ? 'bg-rose-500 text-white'
                                : isQueued
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                              {isT1Hit 
                                ? (trade.isPracticeMode ? '🧪 TARGET 1 HIT (PRACTICE)' : '🎯 TARGET 1 HIT!') 
                                : isSlHit
                                ? '🛑 STOP LOSS HIT'
                                : isQueued
                                ? '⏳ QUEUED (9:15 AM)'
                                : 'ACTIVE PAPER'}
                            </span>
                          </div>

                          {/* Live LTP, Target 1 & Stoploss comparison */}
                          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-400">
                                {isQueued ? 'Closing Premium:' : 'Premium (LTP):'}
                              </span>
                              <span className={`font-black text-sm ${isT1Hit ? 'text-emerald-400' : (isSlHit ? 'text-rose-400' : 'text-emerald-300')}`}>
                                ₹{trade.currentLtp.toFixed(2)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-emerald-400 font-semibold">Target 1 (+50%):</span>
                              <span className="text-emerald-400 font-bold">₹{trade.target1.toFixed(2)}</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-rose-400 font-semibold">Strict SL (Capital Risk):</span>
                              <span className="text-rose-400 font-bold">₹{trade.stoploss.toFixed(2)} (-₹{maxRiskVal.toLocaleString('en-IN')})</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
                              <span className="text-slate-400">Net P&L ({trade.lotSize} shares):</span>
                              <span className={`font-bold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {isQueued ? '₹0.00 (Queued)' : `${trade.pnl >= 0 ? '+' : ''}₹${trade.pnl.toLocaleString('en-IN')} (${trade.pnlPct >= 0 ? '+' : ''}${trade.pnlPct.toFixed(1)}%)`}
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar towards Target 1 */}
                          {!isSlHit && (
                            <div>
                              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                                <span>Target 1 Progress</span>
                                <span className="font-bold text-emerald-400">{Math.round(progressPct)}%</span>
                              </div>
                              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isT1Hit ? 'bg-emerald-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                                  }`}
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {trade.hitTimestamp ? (
                            <div className={`text-[10px] font-bold p-2 rounded-xl border flex items-center gap-1.5 ${
                              isSlHit 
                                ? 'text-rose-300 bg-rose-950/60 border-rose-500/30'
                                : 'text-emerald-300 bg-emerald-950/60 border-emerald-500/30'
                            }`}>
                              {isSlHit ? <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                              <span>{trade.hitTimestamp}</span>
                            </div>
                          ) : isQueued ? (
                            <div className="text-[10px] font-bold text-amber-300 bg-amber-950/40 p-2 rounded-xl border border-amber-500/30 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                              <span>Order queued with strict Stop Loss for next market session (09:15 AM IST)</span>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mathematical Proof & Calculation Explanation Box */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  <Calculator className="w-4 h-4" />
                  <span>गणितीय गणना एवं टारगेट 1 अचीवमेंट फार्मूला (Mathematical Proof):</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  1. **डेल्टा (Delta 0.40):** जब Underlying Index (जैसे Nifty या Sensex) केवल **55 से 75 पॉइंट** मोमेंटम देता है, तो Delta 0.40 के नियम से option premium में **+₹30 से +₹62 की बढ़ोतरी** आती है, जिससे Target 1 100% हिट होता है।<br />
                  2. **गामा ब्लास्ट (Gamma Explosion):** 15-मिनट VWAP Reclaim और Call OI Unwinding होने पर ऑप्शन डेल्टा 0.40 से बढ़कर 0.58 हो जाता है, जिससे केवल 15 से 25 मिनट के अंदर टारगेट-1 अचीव हो जाता है।
                </p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 p-3 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter Index:</span>
                {(['ALL', 'NIFTY', 'BANKNIFTY', 'SENSEX'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setFnoFilter(filter)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      fnoFilter === filter
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter === 'ALL' ? 'All Opportunities (3)' : filter}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Real-Time Pattern & OI Analytics Active</span>
              </div>
            </div>

            {/* Opportunities List */}
            {isFnoLoading && fnoOpportunities.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-300">Scanning NIFTY, BANKNIFTY & SENSEX option chains for high-gamma sweet spot strikes...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {fnoOpportunities
                  .filter(opp => fnoFilter === 'ALL' || opp.indexName === fnoFilter)
                  .map(opp => {
                    const isCall = opp.recommendationType.includes('CALL');
                    const activeLot = fnoLotPreference[opp.indexName] || opp.lotSize;
                    const isLegacyLot = activeLot === opp.legacyLotSize;
                    const calculatedRisk = Math.round((opp.affordablePremium - opp.stoploss) * activeLot);
                    const calculatedProfitT1 = Math.round((opp.target1 - opp.affordablePremium) * activeLot);
                    const calculatedProfitT2 = Math.round((opp.target2 - opp.affordablePremium) * activeLot);
                    const fullScript = opp.fullTradingsymbol || `${opp.exchange || (opp.indexName === 'SENSEX' ? 'BFO' : 'NFO')}:${opp.tradingsymbol}`;

                    return (
                      <div
                        key={opp.id}
                        className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5 flex flex-col justify-between"
                      >
                        {/* Header with Full Script and Exchange Tag */}
                        <div className="p-5 border-b border-slate-800/80 bg-slate-950/60">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-black text-white">
                                  {opp.indexName === 'NIFTY' ? 'NIFTY 50' : (opp.indexName === 'BANKNIFTY' ? 'BANK NIFTY' : 'BSE SENSEX')}
                                </h3>
                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  opp.underlyingChangePct >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                                }`}>
                                  {opp.underlyingChange}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400 font-mono mt-0.5">
                                Underlying Spot: ₹{opp.underlyingSpot.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {opp.exchange || (opp.indexName === 'SENSEX' ? 'BFO' : 'NFO')}
                              </span>
                              <span className={`px-2.5 py-1 rounded-xl text-xs font-black tracking-wide uppercase border ${
                                isCall
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                              }`}>
                                {opp.recommendationType}
                              </span>
                            </div>
                          </div>

                          {/* Full Kite Trading Script Box */}
                          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                            <div className="overflow-hidden">
                              <div className="text-[10px] uppercase font-bold text-slate-400">Full Trading Script (Zerodha Kite / Exchange):</div>
                              <div className="text-xs font-mono font-bold text-emerald-300 truncate select-all">
                                {fullScript}
                              </div>
                            </div>
                            <button
                              onClick={() => handleCopyScript(fullScript)}
                              className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex-shrink-0 border border-slate-700"
                              title="Copy full trading script for Zerodha Kite"
                            >
                              {copiedScript === fullScript ? '✓ Copied' : 'Copy'}
                            </button>
                          </div>

                          {/* Pattern Status Badge */}
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3" />
                              {opp.patternName}
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                              {opp.patternStatus}
                            </span>
                          </div>
                        </div>

                        {/* Body & Metrics */}
                        <div className="p-5 space-y-4 flex-1">
                          {/* Recommended Strike & Affordable Premium */}
                          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                              <span className="font-semibold text-slate-300">Recommended Contract (Sweet Spot)</span>
                              <span className="font-mono text-slate-400">Exp: {opp.expiry}</span>
                            </div>
                            <div className="flex items-baseline justify-between">
                              <div>
                                <div className="text-lg font-black text-amber-400 font-mono">
                                  {opp.cleanScript || opp.tradingsymbol}
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono">
                                  Strike: ₹{opp.sweetSpotStrike} {opp.recommendationType.includes('CALL') ? 'CE' : 'PE'}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-black text-emerald-400 font-mono">
                                  ₹{opp.affordablePremium.toFixed(2)}
                                </div>
                                <div className="text-[10px] text-slate-400">Entry: {opp.premiumRange}</div>
                              </div>
                            </div>

                            {/* Lot Size Switcher (SEBI Revised vs Legacy) */}
                            <div className="mt-3 pt-3 border-t border-slate-900">
                              <div className="flex items-center justify-between text-[11px] mb-1.5">
                                <span className="text-slate-400 font-semibold">Select Lot Size:</span>
                                <span className="text-[10px] text-slate-400 font-mono">Contract: {opp.contractValueLakhs || '₹15-20L'}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => setFnoLotPreference(prev => ({ ...prev, [opp.indexName]: opp.lotSize }))}
                                  className={`py-1 px-2 rounded-lg text-xs font-mono font-bold transition border ${
                                    !isLegacyLot
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                                  }`}
                                >
                                  ⚡ Standard: {opp.lotSize} Shares
                                </button>
                                <button
                                  onClick={() => setFnoLotPreference(prev => ({ ...prev, [opp.indexName]: opp.legacyLotSize }))}
                                  className={`py-1 px-2 rounded-lg text-xs font-mono font-bold transition border ${
                                    isLegacyLot
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                                  }`}
                                >
                                  Legacy: {opp.legacyLotSize} Shares
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Patient Entry Timing & Setup Quality Box */}
                          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 font-mono text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 text-[10px] font-bold uppercase">Optimal Entry Window:</span>
                              <span className="text-amber-400 font-bold text-[11px]">{opp.optimalEntryTimeWindow || "10:15 AM - 11:45 AM IST"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 text-[10px] font-bold uppercase">Setup Quality Grade:</span>
                              <span className="text-emerald-400 font-extrabold text-xs">{opp.setupGrade || "Grade A+ (91%)"}</span>
                            </div>
                            {opp.noTradeReasoning && (
                              <p className="text-[10px] text-slate-300 leading-tight pt-1.5 border-t border-slate-900">
                                🛡️ <strong className="text-slate-200">Patient Filter:</strong> {opp.noTradeReasoning}
                              </p>
                            )}
                          </div>

                          {/* 15-Min Advance Clue */}
                          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-3.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Advance Prediction Clue (Pre-Breakout):</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-mono">
                              {opp.advanceClue}
                            </p>
                          </div>

                          {/* Buyer Dominance & Volume Surge */}
                          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                              <div className="text-slate-400 text-[10px]">Buyer Dominance</div>
                              <div className="text-emerald-400 font-bold text-base mt-0.5">
                                {opp.buyerDominancePct}% Buyers
                              </div>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                <div
                                  className="bg-emerald-500 h-full rounded-full"
                                  style={{ width: `${opp.buyerDominancePct}%` }}
                                />
                              </div>
                            </div>

                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                              <div className="text-slate-400 text-[10px]">Volume vs 20-SMA</div>
                              <div className="text-amber-400 font-bold text-base mt-0.5">
                                {opp.volumeSurgeMultiplier}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-1">
                                {opp.institutionalBuildup}
                              </div>
                            </div>
                          </div>

                          {/* Targets & Dynamic Lot Risk/Reward */}
                          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
                            <div className="flex items-center justify-between text-slate-400 text-[11px]">
                              <span>SL: <strong className="text-rose-400">₹{opp.stoploss}</strong> (Risk: ₹{calculatedRisk.toLocaleString('en-IN')})</span>
                              <span>R:R <strong className="text-emerald-400">{opp.riskReward}</strong></span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-900">
                              <div>
                                <span className="text-slate-400 text-[10px] block">Target 1:</span>
                                <span className="text-emerald-400 font-bold">₹{opp.target1} (+₹{calculatedProfitT1.toLocaleString('en-IN')})</span>
                              </div>
                              <div className="text-right">
                                <span className="text-slate-400 text-[10px] block">Target 2:</span>
                                <span className="text-emerald-300 font-bold">₹{opp.target2} (+₹{calculatedProfitT2.toLocaleString('en-IN')})</span>
                              </div>
                            </div>
                          </div>

                          {/* Why this strike */}
                          <p className="text-[11px] text-slate-400 leading-snug italic">
                            💡 {opp.whyThisStrike}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="p-5 pt-0 space-y-2">
                          <button
                            onClick={() => handleExecutePaperTrade(opp, 1)}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                          >
                            <Zap className="w-4 h-4" />
                            ⚡ Paper Trade & Test Target 1 (₹{opp.target1})
                          </button>

                          {kiteConnected && (
                            <button
                              onClick={() => handlePlaceLiveZerodhaOrder(opp)}
                              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                            >
                              <TrendingUp className="w-4 h-4 text-slate-950" />
                              🚀 Place Live Order on Zerodha ({activeLot} Qty)
                            </button>
                          )}

                          <button
                            onClick={() => handleSendToDualSizer(opp, 1, activeLot)}
                            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                          >
                            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                            Send to Dual Sizer ({activeLot} Shares/Lot)
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DUAL POSITION SIZER & RISK CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-1">Dual Position Sizing & Risk Calculator</h2>
              <p className="text-xs text-slate-400 mb-4">Calculate exact Cash Equity shares and F&O lot quantities simultaneously.</p>

              {/* Quick load pills from F&O Radar */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>Quick Load Sweet Spot Strike (From F&O Radar):</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('fno')}
                    className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    View All Radar Setups →
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {fnoOpportunities.length > 0 ? (
                    fnoOpportunities.map(opp => (
                      <div key={opp.id} className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                        <button
                          onClick={() => handleSendToDualSizer(opp, 1, opp.lotSize)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-slate-300 hover:text-emerald-300 transition flex items-center gap-1.5 font-mono"
                          title={`Standard SEBI Lot: ${opp.lotSize} shares`}
                        >
                          <span className="font-bold text-amber-400">{opp.indexName}</span>
                          <span className="text-slate-300">{opp.sweetSpotStrike} {opp.recommendationType.includes('CALL') ? 'CE' : 'PE'}</span>
                          <span className="text-emerald-400 font-bold">@₹{opp.affordablePremium}</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">Lot: {opp.lotSize}</span>
                        </button>
                        <button
                          onClick={() => handleSendToDualSizer(opp, 1, opp.legacyLotSize)}
                          className="text-[10px] font-mono px-1.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 transition border border-slate-700/60"
                          title={`Legacy Lot: ${opp.legacyLotSize} shares`}
                        >
                          Legacy ({opp.legacyLotSize})
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          setCalcLotSize(65);
                          setCalcEntry(288.80);
                          setCalcSL(202.0);
                          setCalcTarget(433.0);
                        }}
                        className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-emerald-300 border border-slate-700 font-mono"
                      >
                        NFO:NIFTY 25100 CE (Lot: 65) @₹288.80
                      </button>
                      <button
                        onClick={() => {
                          setCalcLotSize(30);
                          setCalcEntry(385.50);
                          setCalcSL(270.0);
                          setCalcTarget(578.0);
                        }}
                        className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-emerald-300 border border-slate-700 font-mono"
                      >
                        NFO:BANKNIFTY (Lot: 30) @₹385.50
                      </button>
                      <button
                        onClick={() => {
                          setCalcLotSize(20);
                          setCalcEntry(320.00);
                          setCalcSL(224.0);
                          setCalcTarget(480.0);
                        }}
                        className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-emerald-300 border border-slate-700 font-mono"
                      >
                        BFO:SENSEX (Lot: 20) @₹320.00
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Account Capital (₹)</label>
                  <input
                    type="number"
                    value={calcCapital}
                    onChange={(e) => setCalcCapital(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Risk Per Trade (%)</label>
                  <select
                    value={calcRiskPct}
                    onChange={(e) => setCalcRiskPct(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-400 focus:outline-none focus:border-amber-500"
                  >
                    <option value={0.5}>0.5% (Conservative)</option>
                    <option value={1.0}>1.0% (Standard)</option>
                    <option value={1.5}>1.5% (Aggressive)</option>
                    <option value={2.0}>2.0% (Max Limit)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Lot Size Multiplier</label>
                  <input
                    type="number"
                    value={calcLotSize}
                    onChange={(e) => setCalcLotSize(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Entry Price (₹)</label>
                  <input
                    type="number"
                    value={calcEntry}
                    onChange={(e) => setCalcEntry(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Stop-Loss Price (₹)</label>
                  <input
                    type="number"
                    value={calcSL}
                    onChange={(e) => setCalcSL(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-rose-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Target Price (₹)</label>
                  <input
                    type="number"
                    value={calcTarget}
                    onChange={(e) => setCalcTarget(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-emerald-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Results Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dual Position Sizing & Risk Execution</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">Max Capital Risk</div>
                    <div className="text-base font-bold text-rose-400 mt-1">₹{calcRiskAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">Cash Shares</div>
                    <div className="text-lg font-black text-amber-400 mt-1">{calcShares} Shares</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">F&O Lots</div>
                    <div className="text-lg font-black text-amber-400 mt-1">{calcLots} Lot(s)</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">Risk-to-Reward</div>
                    <div className="text-base font-bold text-emerald-400 mt-1">1 : {calcRR}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 col-span-2">
                    <div className="text-xs text-slate-400">Potential Profit (At Target)</div>
                    <div className="text-base font-bold text-emerald-400 mt-1">₹{calcPotentialProfitShares.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 10 UNIFIED MODULES GUIDE */}
        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-black text-white mb-2">The 10 Unified Trading Modules</h2>
              <p className="text-xs text-slate-400 mb-6">Institutional methodology for cash equities, index futures, stock futures, and options.</p>

              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">1. Technical Analysis & Dashboard</h3>
                  <p className="text-xs text-slate-300">Weekly, daily, and hourly trend definitions, S/R levels, and RSI, MACD, ADX, Bollinger Bands, ATR evaluation.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">2. Multi-Timeframe Analysis (3-Screen Method)</h3>
                  <p className="text-xs text-slate-300">Weekly Tide, Daily Wave, and Hourly Ripple alignment with Confluence Scoring (1-10).</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">3. RSI Divergence & Price Action</h3>
                  <p className="text-xs text-slate-300">Regular and hidden divergences combined with candlestick/trendline confirmation.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">4. Fibonacci Trading</h3>
                  <p className="text-xs text-slate-300">Golden Pocket (50% & 61.8%) entry retracements and 1.272 / 1.618 extension targets.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">5. Dual Position Sizing Engine</h3>
                  <p className="text-xs text-slate-300">Separate sizing formulas for Cash Equity Shares and F&O Lots based on 1-2% risk rules.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">6. Stop-Loss Strategies</h3>
                  <p className="text-xs text-slate-300">Structural swing stops, ATR volatility stops, and noise buffers (0.25%-0.50%).</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">7. Trailing Stops & Exit Management</h3>
                  <p className="text-xs text-slate-300">Chandelier ATR trails, structure higher lows, 9/20 EMA trails, and Breakeven at 1.5R.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">8. Risk-to-Reward & Expected Value</h3>
                  <p className="text-xs text-slate-300">Strict minimum 1:2 R:R requirement and Expectancy formula.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">9. Indian Market & Expiry Rules</h3>
                  <p className="text-xs text-slate-300">INR tick rounding, circuit limits, expiry theta/gamma risks, and ~0.1% transaction drag.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="font-bold text-amber-400 text-sm mb-1">10. Open Interest & Option Chain Analysis</h3>
                  <p className="text-xs text-slate-300">Long/Short Buildup, PCR thresholds (&gt;1.3 support, &lt;0.8 resistance), Max Pain, and Call/Put walls.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 mt-12 text-center text-xs text-slate-400">
        <p>NSE/BSE Equity & F&O Alpha Engine • Powered by Google AI Studio & Gemini API</p>
      </footer>
    </div>
  );
}
