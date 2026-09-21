import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserPlus,
  Plus,
  ChevronLeft,
  Share2,
  Calendar,
  CreditCard,
  TrendingUp,
  X,
  Bell,
  Heart,
  Search,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Kid, AttentionItem } from '../types';

interface MotherDesktopDashboardProps {
  onBackToRoleSelect?: () => void;
}

const initialKids: Kid[] = [
  {
    id: '1',
    name: 'سارة',
    grade: 'الصف الخامس',
    initial: 'س',
    avatarBg: '#B04A7C',
    status: {
      label: 'يحتاج انتباهًا',
      type: 'warn',
    },
    note: 'سارة تتقدّم بثبات، لكنها تحتاج دعمًا لطيفًا في الكسور هذا الأسبوع.',
    todayTasks: {
      done: 1,
      total: 3,
      percentage: 33,
      nextSchedule: 'التالي: 4:30 م، الكسور العشرية',
    },
    subscription: {
      daysLeft: 4,
      isAlert: true,
    },
  },
  {
    id: '2',
    name: 'عمر',
    grade: 'الصف السادس',
    initial: 'ع',
    avatarBg: '#2F7FA8',
    status: {
      label: 'بخير',
      type: 'good',
    },
    note: 'عمر ملتزم ومتحمّس، وأنهى كل مهام الأسبوع الماضي.',
    todayTasks: {
      done: 2,
      total: 2,
      percentage: 100,
      nextSchedule: 'اكتملت مهام اليوم',
    },
    subscription: {
      daysLeft: 21,
      isAlert: false,
    },
  },
  {
    id: '3',
    name: 'نورة',
    grade: 'الصف الثالث',
    initial: 'ن',
    avatarBg: '#6F55A3',
    status: {
      label: 'يحتاج تدخّلًا',
      type: 'bad',
    },
    note: 'فاتت نورة مهمتان هذا الأسبوع، وربما يناسبها وقت أبكر قليلًا.',
    todayTasks: {
      done: 0,
      total: 2,
      percentage: 0,
      nextSchedule: 'التالي: 5:00 م، الهمزة المتوسطة',
    },
    subscription: {
      daysLeft: 12,
      isAlert: false,
    },
  },
];

const initialAttentions: AttentionItem[] = [
  {
    id: 'att-1',
    title: 'اشتراك سارة ينتهي بعد 4 أيام',
    actionLabel: 'تجديد',
    actionType: 'renew',
    kidId: '1',
    isUrgent: true,
  },
  {
    id: 'att-2',
    title: 'أداء نورة يستحق نظرة منكِ',
    actionLabel: 'عرض',
    actionType: 'openperf',
    kidId: '3',
    isUrgent: true,
  },
  {
    id: 'att-3',
    title: 'ملاحظة صغيرة على أداء سارة',
    actionLabel: 'عرض',
    actionType: 'openperf',
    kidId: '1',
    isUrgent: false,
  },
];

export const MotherDesktopDashboard: React.FC<MotherDesktopDashboardProps> = () => {
  const [kids, setKids] = useState<Kid[]>(initialKids);
  const [attentions, setAttentions] = useState<AttentionItem[]>(initialAttentions);
  const [activeModal, setActiveModal] = useState<
    | { type: 'renew'; kid: Kid }
    | { type: 'perf'; kid: Kid; title: string }
    | { type: 'addKid' }
    | { type: 'invite' }
    | { type: 'kidDetail'; kid: Kid }
    | null
  >(null);

  const [encouragementSent, setEncouragementSent] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  // Quick handler for actions
  const handleAttentionAction = (att: AttentionItem) => {
    const targetKid = kids.find((k) => k.id === att.kidId) || kids[0];
    if (att.actionType === 'renew') {
      setActiveModal({ type: 'renew', kid: targetKid });
    } else {
      setActiveModal({ type: 'perf', kid: targetKid, title: att.title });
    }
  };

  const handleRenewSuccess = (kidId: string) => {
    setKids((prev) =>
      prev.map((k) =>
        k.id === kidId
          ? {
              ...k,
              subscription: {
                daysLeft: k.subscription.daysLeft + 30,
                isAlert: false,
              },
            }
          : k
      )
    );
    setAttentions((prev) => prev.filter((a) => !(a.kidId === kidId && a.actionType === 'renew')));
    setActiveModal(null);
  };

  return (
    <div
      id="mother-desktop-container"
      className="min-h-screen bg-[#f7f9fb] text-slate-800 font-['Cairo',sans-serif] flex flex-col selection:bg-rose-100"
    >
      {/* Main Container - Fully responsive padding and sizing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10 flex-1 w-full space-y-5 sm:space-y-7">
        
        {/* Responsive Hero Section */}
        <section
          id="hero-banner"
          className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute left-0 top-0 w-80 h-full bg-gradient-to-r from-pink-50/40 to-transparent pointer-events-none" />

          {/* Right Avatar & Welcome */}
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 relative z-10">
            {/* "أم" Avatar styled cleanly and responsively */}
            <div
              id="hero-avatar"
              className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-[#f7edf3] text-[#B04A7C] font-black text-xl sm:text-2xl lg:text-3xl flex items-center justify-center shadow-xs border border-pink-200/60 shrink-0"
            >
              أم
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-1.5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#192533] tracking-tight">
                  أهلًا بأمّ عمر
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  3 أمور للمتابعة
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-normal max-w-xl leading-relaxed">
                أبناؤكِ بخير في الغالب، وهناك 3 أمور صغيرة تحتاج لمستكِ.
              </p>
            </div>
          </div>

          {/* Action Buttons: Stack on mobile, inline on tablet/desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 relative z-10 pt-1 sm:pt-0">
            <button
              id="hero-invite-father-btn"
              onClick={() => setActiveModal({ type: 'invite' })}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4 text-slate-500 shrink-0" />
              <span>دعوة الأب لمشاركة المتابعة</span>
            </button>
            <button
              id="hero-add-kid-btn"
              onClick={() => setActiveModal({ type: 'addKid' })}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#26374a] hover:bg-[#1d2b3a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>إضافة ابن جديد</span>
            </button>
          </div>
        </section>

        {/* Responsive Grid: Stacks on mobile/tablet (<lg), 2-Columns on Desktop (lg+) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7">
          
          {/* Main Column: Kids Section (12 cols on mobile/tablet, 8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#172533]">
                  أبنائي
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {kids.length} أبناء
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500">
                انقري على أي بطاقة لعرض التفاصيل الكاملة
              </span>
            </div>

            {/* Kids Cards Grid: 1 col on mobile, 2 cols on tablet, 3 cols on wide desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {kids.map((kid) => (
                <article
                  key={kid.id}
                  id={`kid-card-${kid.id}`}
                  onClick={() => setActiveModal({ type: 'kidDetail', kid })}
                  tabIndex={0}
                  role="button"
                  className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-right outline-none active:scale-[0.99]"
                >
                  {/* Top: Avatar, Name, Grade, Status Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-2.5 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-white font-bold text-lg sm:text-xl flex items-center justify-center shadow-xs shrink-0 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: kid.avatarBg }}
                        >
                          {kid.initial}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#26374a] transition-colors">
                            {kid.name}
                          </h3>
                          <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                            {kid.grade}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ${
                          kid.status.type === 'warn'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                            : kid.status.type === 'good'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                            : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                        }`}
                      >
                        {kid.status.label}
                      </span>
                    </div>

                    {/* Educational / Pedagogical Note */}
                    <p className="text-xs text-slate-600 font-normal leading-relaxed bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100 mb-3.5 min-h-[52px]">
                      {kid.note}
                    </p>
                  </div>

                  {/* Metrics Box (اليوم + الاشتراك) */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-3 border-t border-slate-100">
                    {/* Cell 1: Today's Tasks & Progress */}
                    <div className="bg-[#f9fafc] p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>اليوم</span>
                        <span className="font-bold text-slate-800 text-xs">
                          {kid.todayTasks.done} من {kid.todayTasks.total}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            kid.todayTasks.percentage === 100
                              ? 'bg-emerald-500'
                              : kid.todayTasks.percentage > 0
                              ? 'bg-amber-500'
                              : 'bg-slate-300'
                          }`}
                          style={{ width: `${kid.todayTasks.percentage}%` }}
                        />
                      </div>

                      <span className="text-[10px] text-slate-500 leading-tight line-clamp-1" title={kid.todayTasks.nextSchedule}>
                        {kid.todayTasks.nextSchedule}
                      </span>
                    </div>

                    {/* Cell 2: Subscription & Action */}
                    <div
                      className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                        kid.subscription.isAlert
                          ? 'bg-rose-50/50 border-rose-200 text-rose-900'
                          : 'bg-[#f9fafc] border-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={kid.subscription.isAlert ? 'text-rose-600 font-medium text-[11px]' : 'text-slate-500 text-[11px]'}>
                          الاشتراك
                        </span>
                        <span className={`font-bold text-xs ${kid.subscription.isAlert ? 'text-rose-700' : 'text-slate-900'}`}>
                          {kid.subscription.daysLeft} {kid.subscription.daysLeft <= 10 ? 'أيام' : 'يومًا'}
                        </span>
                      </div>

                      {kid.subscription.isAlert ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModal({ type: 'renew', kid });
                          }}
                          className="w-full mt-1 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-[11px] sm:text-xs font-bold shadow-xs transition-colors cursor-pointer"
                        >
                          تجديد
                        </button>
                      ) : (
                        <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">
                          متبقية سارية
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Quick Banner for Adding Kid */}
            <div
              onClick={() => setActiveModal({ type: 'addKid' })}
              className="border-2 border-dashed border-slate-200 hover:border-slate-300 hover:bg-white rounded-2xl p-3.5 sm:p-4 text-center cursor-pointer transition-colors flex items-center justify-center gap-2 text-slate-600 font-bold text-xs sm:text-sm active:scale-[0.99]"
            >
              <Plus className="w-4 h-4 text-slate-500" />
              <span>+ إضافة ابن جديد للمنصة</span>
            </div>
          </div>

          {/* Sidebar Column: Maternal Insights & Attentions (12 cols on mobile/tablet, 4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">
            
            {/* Tip of the Day (لمسة اليوم) */}
            <div
              id="tip-of-the-day-card"
              className="bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 rounded-2xl p-5 border border-amber-200/80 shadow-xs relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm mb-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>لمسة اليوم</span>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-3">
                عمر أنهى مهامه بإتقان. كلمة تشجيع منكِ الليلة تصنع فرقًا.
              </p>

              <button
                type="button"
                onClick={() => setEncouragementSent(true)}
                disabled={encouragementSent}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  encouragementSent
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-2xs'
                }`}
              >
                {encouragementSent ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تم إرسال وسام التشجيع لعمر!</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3.5 h-3.5" />
                    <span>إرسال كلمة تشجيع لعمر</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Attentions List (تحتاج لمستكِ) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">
                    أمور تحتاج لمستكِ
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {attentions.length}
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                {attentions.map((att) => (
                  <div
                    key={att.id}
                    className="p-3 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 transition-colors"
                  >
                    <span className="text-xs text-slate-800 font-medium leading-tight">
                      {att.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAttentionAction(att)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold shrink-0 transition-colors shadow-2xs cursor-pointer"
                    >
                      {att.actionLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Invite Father Card (دعوة الأب لمشاركة المتابعة) */}
            <div className="bg-[#f3f7fa] rounded-2xl p-5 border border-slate-200/80 space-y-3 text-right">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <UserPlus className="w-4 h-4 text-[#26374a]" />
                <span>مشاركة التربية والمتابعة</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                يمكنكِ دعوة الأب بضغطة زر لمتابعة الواجبات، ومواعيد الحصص، والمشاركة في القرارات.
              </p>
              <button
                type="button"
                onClick={() => setActiveModal({ type: 'invite' })}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>دعوة الأب لمشاركة المتابعة</span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* MODAL 1: Renew Subscription */}
      {activeModal?.type === 'renew' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-rose-600" />
                <span>تجديد اشتراك {activeModal.kid.name}</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              الاشتراك الحالي لـ {activeModal.kid.name} ينتهي بعد {activeModal.kid.subscription.daysLeft} أيام. اختر باقة التجديد المفضلة:
            </p>

            <div className="space-y-2.5 mb-5">
              {[
                { name: 'باقة الفصل الدراسي الثاني (شاملة)', duration: '+ 3 أشهر', price: '320 ر.س', best: true },
                { name: 'التجديد الشهري المرن', duration: '+ 30 يومًا', price: '120 ر.س', best: false },
              ].map((pkg, idx) => (
                <div
                  key={idx}
                  onClick={() => handleRenewSuccess(activeModal.kid.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    pkg.best
                      ? 'border-[#26374a] bg-slate-50/80 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{pkg.name}</span>
                      {pkg.best && (
                        <span className="text-[10px] font-bold bg-[#26374a] text-white px-2 py-0.5 rounded-md">
                          الأوفر
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">{pkg.duration}</span>
                  </div>
                  <span className="font-extrabold text-xs text-slate-900">{pkg.price}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => handleRenewSuccess(activeModal.kid.id)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#26374a] text-white hover:bg-[#1c2937] shadow-xs cursor-pointer"
              >
                تأكيد التجديد الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: View Performance / Note */}
      {activeModal?.type === 'perf' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>{activeModal.title}</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-1 text-xs text-slate-500">
                  <span>الطالبة: </span>
                  <strong className="text-slate-900 font-bold">{activeModal.kid.name}</strong>
                  <span>({activeModal.kid.grade})</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeModal.kid.id === '3'
                    ? 'فاتت نورة مهمتان تفاعليتان في مادة لغتي. يفضل تحديد موعد مبكر لمراجعة الهمزة المتوسطة قبل الاختبار القصير يوم الأربعاء.'
                    : 'سارة حققت درجة 88% في اختبار الكسور، وملاحظة المعلمة تشير إلى حاجتها لحل 3 تدريبات إضافية لترسيخ المفهوم.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200 text-xs text-blue-900">
                <strong>توصية المعلم المباشر:</strong> جلسة مراجعة خفيفة لمدة 15 دقيقة بعد العصر.
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setAttentions((prev) => prev.filter((a) => a.title !== activeModal.title));
                  setActiveModal(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                تحديد كمقروء
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#26374a] text-white hover:bg-[#1c2937] shadow-xs cursor-pointer"
              >
                حسناً، فهمت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Kid Detail Card Click */}
      {activeModal?.type === 'kidDetail' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl text-white font-bold text-lg flex items-center justify-center"
                  style={{ backgroundColor: activeModal.kid.avatarBg }}
                >
                  {activeModal.kid.initial}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{activeModal.kid.name}</h3>
                  <span className="text-xs text-slate-500">{activeModal.kid.grade}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">التقرير التربوي الحالي</span>
                <p className="text-xs text-slate-800">{activeModal.kid.note}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">مهام اليوم</span>
                  <strong className="text-sm text-slate-900 font-extrabold">
                    {activeModal.kid.todayTasks.done} من {activeModal.kid.todayTasks.total}
                  </strong>
                  <p className="text-[10px] text-slate-400 mt-1">{activeModal.kid.todayTasks.nextSchedule}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">الاشتراك التعليمي</span>
                  <strong className="text-sm text-slate-900 font-extrabold">
                    {activeModal.kid.subscription.daysLeft} يومًا متبقية
                  </strong>
                  <p className="text-[10px] text-slate-400 mt-1">تجديد تلقائي قبل الانتهاء</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#26374a] text-white hover:bg-[#1c2937] shadow-xs cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Add Kid */}
      {activeModal?.type === 'addKid' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#26374a]" />
                <span>إضافة ابن جديد إلى حسابكِ</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = (formData.get('name') as string) || 'خالد';
                const grade = (formData.get('grade') as string) || 'الصف الأول الابتدائي';
                const newKid: Kid = {
                  id: String(Date.now()),
                  name,
                  grade,
                  initial: name.charAt(0) || 'خ',
                  avatarBg: '#0D9488',
                  status: { label: 'بخير', type: 'good' },
                  note: 'تمت إضافة الابن حديثاً، جارٍ جدولة الحصص والمهام التفاعلية.',
                  todayTasks: { done: 0, total: 1, percentage: 0, nextSchedule: 'حصة تمهيدية غداً 09:00 ص' },
                  subscription: { daysLeft: 30, isAlert: false },
                };
                setKids((prev) => [...prev, newKid]);
                setActiveModal(null);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الابن أو الابنة</label>
                <input
                  name="name"
                  required
                  placeholder="مثال: خالد فهد"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#26374a] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المرحلة الدراسية</label>
                <select
                  name="grade"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#26374a] outline-none bg-white"
                >
                  <option>الصف الأول الابتدائي</option>
                  <option>الصف الثاني الابتدائي</option>
                  <option>الصف الرابع الابتدائي</option>
                  <option>الصف الأول المتوسط</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#26374a] text-white hover:bg-[#1c2937] shadow-xs cursor-pointer"
                >
                  إضافة الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: Invite Father */}
      {activeModal?.type === 'invite' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#26374a]" />
                <span>دعوة الأب لمشاركة المتابعة</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              شاركي رابط الدعوة مع الأب ليتمكن من تسجيل الدخول والمشاركة في متابعة إنجاز الأبناء والمهام اليومية:
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] text-slate-600 truncate font-mono">
                https://parents.platform.edu/invite?code=MOM-9821
              </span>
              <button
                type="button"
                onClick={() => {
                  setInviteCopied(true);
                  setTimeout(() => setInviteCopied(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#26374a] hover:bg-[#1c2937] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                {inviteCopied ? 'تم النسخ!' : 'نسخ الرابط'}
              </button>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
