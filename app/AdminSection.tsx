'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2,
  RefreshCw
} from 'lucide-react';

interface Code {
  code: string;
  used: boolean;
  usedAt?: string;
}

interface Stats {
  total: number;
  used: number;
  unused: number;
  filteredTotal: number;
}

export default function AdminSection() {
  const [codes, setCodes] = useState<Code[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 4000, used: 0, unused: 4000, filteredTotal: 0 });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<'all' | 'used' | 'unused'>('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const adminSecret = 'BAC-ADMIN-2026';

  const fetchCodes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/admin/codes?secret=${adminSecret}&page=${page}&filter=${filter}&search=${encodeURIComponent(search)}&limit=15`
      );
      const data = await res.json();
      if (data.success) {
        setCodes(data.codes);
        setStats(data.stats);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error('Failed to fetch admin codes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  // Handle search with debounce or manual search button
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCodes();
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExportUnused = async () => {
    setIsExporting(true);
    try {
      // Fetch ALL unused codes by setting a high limit
      const res = await fetch(
        `/api/admin/codes?secret=${adminSecret}&filter=unused&limit=4000`
      );
      const data = await res.json();
      if (data.success && data.codes) {
        const unusedList = data.codes.map((c: Code) => c.code).join('\n');
        
        // Create file download
        const blob = new Blob([unusedList], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `bacline_unused_activation_codes_${new Date().toISOString().split('T')[0]}.txt`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to export codes:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
      style={{ direction: 'rtl' }}
    >
      {/* Cinematic Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-white/5 p-6 sm:p-8 text-right flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl transition-all duration-300 shadow-xs">
        <div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 via-blue-500/5 to-transparent opacity-50 pointer-events-none" />
        <div className="z-10 flex items-center gap-4 flex-row-reverse w-full md:w-auto">
          <div className="p-4 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-purple-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              لوحة تحكم رموز التفعيل
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold leading-relaxed">
              إدارة وتوزيع 4,000 رمز دخول مفعّل للطلاب. عند قيام أي طالب باستخدام رمز، يتم وسمه كمستعمل وتعطيله تلقائياً.
            </p>
          </div>
        </div>
        <div className="z-10 flex gap-2.5 shrink-0">
          <button
            onClick={handleExportUnused}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white text-sm font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-purple-500/10 active:scale-95"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'جاري التصدير...' : 'تصدير الأكواد المتبقية كـ TXT'}
          </button>
          
          <button
            onClick={fetchCodes}
            className="p-3 bg-slate-900/80 border border-white/5 text-slate-300 hover:text-white rounded-xl transition-all hover:bg-slate-800 cursor-pointer"
            title="تحديث البيانات"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col justify-between">
          <span className="text-sm font-bold text-slate-400">إجمالي رموز التفعيل</span>
          <span className="text-3xl font-black text-white mt-2 font-mono">{stats.total}</span>
        </div>
        <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col justify-between">
          <span className="text-sm font-bold text-slate-400">الرموز غير المستخدمة (صالحة)</span>
          <span className="text-3xl font-black text-emerald-400 mt-2 font-mono">{stats.unused}</span>
        </div>
        <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col justify-between">
          <span className="text-sm font-bold text-slate-400">الرموز المستخدمة (مباعة/مفعلة)</span>
          <span className="text-3xl font-black text-purple-400 mt-2 font-mono">{stats.used}</span>
        </div>
      </div>

      {/* Codes Table and Filter Section */}
      <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-white/5 w-full md:w-auto">
            {(['all', 'unused', 'used'] as const).map((t) => {
              const labels = { all: 'الكل', unused: 'غير مستخدمة', used: 'مستخدمة' };
              const isActive = filter === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setFilter(t);
                    setPage(1);
                  }}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {labels[t]}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-72">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ابحث عن رمز تفعيل..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-300 focus:outline-none focus:border-purple-500 text-sm font-mono text-center"
              />
              <Search className="absolute right-3.5 top-3 w-4.5 h-4.5 text-slate-500" />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-300 font-bold rounded-xl text-sm cursor-pointer"
            >
              بحث
            </button>
          </form>
        </div>

        {/* Codes List */}
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/20">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/30 text-slate-400 text-sm font-bold">
                <th className="p-4">الرمز المفعّل</th>
                <th className="p-4">حالة الاستخدام</th>
                <th className="p-4">تاريخ الاستخدام</th>
                <th className="p-4 text-left">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    جاري تحميل الرموز...
                  </td>
                </tr>
              ) : codes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    لا توجد رموز تفعيل تطابق خيارات البحث الحالية.
                  </td>
                </tr>
              ) : (
                codes.map((item) => (
                  <tr key={item.code} className="border-b border-white/5 hover:bg-slate-900/10 text-slate-300 transition-colors">
                    <td className="p-4 font-mono font-bold text-lg select-all text-white tracking-wider">
                      {item.code}
                    </td>
                    <td className="p-4">
                      {item.used ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          مستعملة
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          صالحة / غير مستخدمة
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm font-mono text-slate-400">
                      {item.usedAt ? new Date(item.usedAt).toLocaleString('ar-DZ') : '—'}
                    </td>
                    <td className="p-4 text-left">
                      <button
                        onClick={() => handleCopy(item.code)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          copiedCode === item.code
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/5 hover:text-white'
                        }`}
                      >
                        {copiedCode === item.code ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            تم النسخ
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            نسخ الرمز
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-sm font-bold text-slate-400">
              الصفحة <span className="text-white">{page}</span> من <span className="text-white">{totalPages}</span>
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-white/5 text-slate-300 font-bold rounded-xl text-sm cursor-pointer flex items-center gap-1"
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-white/5 text-slate-300 font-bold rounded-xl text-sm cursor-pointer flex items-center gap-1"
              >
                التالي
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
