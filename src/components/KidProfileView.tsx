import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Plus, 
  Minus, 
  ChevronRight, 
  BookOpen, 
  HelpCircle, 
  TrendingUp, 
  Award, 
  Share2, 
  Zap, 
  FileText,
  RotateCcw
} from 'lucide-react';
import { Kid, ParentRole } from '../types';
import { WeeklyScheduleView } from './WeeklyScheduleView';

interface KidProfileViewProps {
  initialKidId: string;
  kids: Kid[];
  role: ParentRole;
  onBack: () => void;
  onRenewSubscription: (kidId: string) => void;
  showToast: (msg: string) => void;
}

interface TaskItem {
  id: string;
  time: string;
  period: 'ص' | 'م';
  title: string;
  subject: string;
  topic: string;
  duration: number; // in mins
  type: 'deep' | 'hw' | 'review' | 'quiz';
  typeLabel: string;
  status: 'done' | 'pending' | 'in_progress';
  dueInfo?: string;
  paperNotice?: string;
}

export const KidProfileView: React.FC<KidProfileViewProps> = ({
  initialKidId,
  kids,
  role,
  onBack,
  onRenewSubscription,
  showToast,
}) => {
  const [selectedKidId, setSelectedKidId] = useState<string>(initialKidId || '1');
  const [activeTab, setActiveTab] = useState<'today' | 'schedule' | 'perf' | 'exp' | 'sub'>('today');
  
  // Screen time cap state (e.g., 75 min default for Sarah)
  const [screenCap, setScreenCap] = useState<number>(75);
  const [screenUsed, setScreenUsed] = useState<number>(70);

  // Today's tasks state for Sarah
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 'task-2',
      time: '3:30',
      period: 'م',
      title: 'دورة الماء',
      subject: 'العلوم',
      topic: 'الماء والمادة',
      duration: 25,
      type: 'deep',
      typeLabel: 'درس',
      status: 'done',
    },
    {
      id: 'task-3',
      time: '4:30',
      period: 'م',
      title: 'الكسور العشرية',
      subject: 'الرياضيات',
      topic: 'الأعداد والعمليات',
      duration: 30,
      type: 'deep',
      typeLabel: 'درس',
      status: 'pending',
    },
    {
      id: 'task-7',
      time: '5:30',
      period: 'م',
      title: 'حل تمارين الكسور ص 45',
      subject: 'الرياضيات',
      topic: 'حل تمارين كتاب التمارين',
      duration: 25,
      type: 'hw',
      typeLabel: 'واجب',
      status: 'pending',
      dueInfo: 'التسليم غدًا 6:00 م',
      paperNotice: 'على الورق',
    },
    {
      id: 'task-4',
      time: '6:30',
      period: 'م',
      title: 'مراجعة اللغة الإنجليزية',
      subject: 'اللغة الإنجليزية',
      topic: 'المفردات والقراءة',
      duration: 15,
      type: 'review',
      typeLabel: 'مراجعة امتحان',
      status: 'pending',
    },
  ]);

  // AI Suggestion State
  const [aiSessionAdded, setAiSessionAdded] = useState(false);

  const currentKid = kids.find((k) => k.id === selectedKidId) || kids[0] || {
    id: '1',
    name: 'سارة',
    grade: 'الصف الخامس',
    avatarBg: '#B04A7C',
    initial: 'س',
    subscription: { daysLeft: 4, isAlert: true }
  };

  const completedCount = tasks.filter((t) => t.status === 'done').length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / (totalCount || 1)) * 100);
  const screenPercent = Math.min(100, Math.round((screenUsed / (screenCap || 1)) * 100));

  // Stepper handlers
  const handleCapChange = (delta: number) => {
    setScreenCap((prev) => {
      const next = Math.max(30, Math.min(180, prev + delta));
      showToast(`تم تعديل سقف وقت الشاشة إلى ${next} دقيقة`);
      return next;
    });
  };

  // Task actions
  const handleSnoozeHour = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const [hourStr, minStr] = t.time.split(':');
          let hour = parseInt(hourStr, 10);
          hour = hour === 12 ? 1 : hour + 1;
          showToast(`تم تأجيل «${t.title}» ساعة واحدة إلى ${hour}:${minStr} ${t.period}`);
          return { ...t, time: `${hour}:${minStr}` };
        }
        return t;
      })
    );
  };

  const handleMoveTomorrow = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast(`تم نقل «${task?.title || 'المهمة'}» إلى جدول الغد`);
  };

  const handleMarkHwDone = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'done' as const } : t))
    );
    showToast(`✅ تم تأكيد تسليم الواجب بنجاح!`);
  };

  const handleAddAiSession = () => {
    if (aiSessionAdded) return;
    const newSession: TaskItem = {
      id: `ai-${Date.now()}`,
      time: '3:30',
      period: 'م',
      title: 'جلسة تقوية: الكسور العشرية',
      subject: 'الرياضيات',
      topic: 'مفاهيم الكسور والعمليات الأساسية',
      duration: 30,
      type: 'deep',
      typeLabel: 'جلسة تقوية AI',
      status: 'pending',
    };
    setTasks((prev) => [...prev, newSession]);
    setAiSessionAdded(true);
    showToast('✨ تم إضافة الجلسة المقترحة بالذكاء الاصطناعي إلى الجدول!');
  };

  // Dynamic theme colors per kid
  const kidColor = currentKid.avatarBg || '#B04A7C';

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      {/* Main Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        
        {/* Header (khead) with Kid Switcher */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-b from-slate-50/70 to-white">
          
          {/* Right: Kid Identity */}
          <div className="flex items-center gap-3.5">
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-xs text-white shrink-0 select-none font-bold"
              style={{ backgroundColor: kidColor }}
            >
              {currentKid.id === '1' ? '🐰' : currentKid.id === '2' ? '🦁' : '🦋'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currentKid.name}
                </h1>
                {currentKid.id === '1' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80 shadow-2xs">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>تحتاج انتباهًا</span>
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-500 block mt-0.5">
                {currentKid.grade} • مدرسة الرواد النموذجية
              </span>
            </div>
          </div>

          {/* Left: Kid Chips Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="اختيار الابن">
            {kids.map((k) => {
              const isSelected = k.id === selectedKidId;
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setSelectedKidId(k.id)}
                  aria-pressed={isSelected}
                  className={`h-8 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                  style={{ backgroundColor: isSelected ? k.avatarBg : undefined }}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: isSelected ? '#ffffff' : k.avatarBg }} 
                  />
                  <span>{k.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Tabs (أقسام سارة) */}
        <div className="px-3 sm:px-6 border-b border-slate-200/80 bg-slate-50/50 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none" aria-label={`أقسام ${currentKid.name}`}>
          {[
            { id: 'today', label: 'اليوم', icon: Clock },
            { id: 'schedule', label: 'الجدول', icon: Calendar },
            { id: 'perf', label: 'الأداء والدرجات', icon: TrendingUp },
            { id: 'exp', label: 'التجربة والأثر', icon: Award },
            { id: 'sub', label: 'الاشتراك', icon: FileText },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                aria-current={isActive ? 'page' : undefined}
                className={`py-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-b-2 text-slate-900 border-slate-900 bg-white/70 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
                style={{
                  borderBottomColor: isActive ? kidColor : 'transparent',
                  color: isActive ? kidColor : undefined
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT: اليوم (Today) */}
        {activeTab === 'today' && (
          <div className="p-4 sm:p-5 space-y-5">
            
            {/* Top Metrics Row: Day Progress & Screen Time Cap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              
              {/* Box 1: مهام اليوم والإنجاز */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>اليوم، الثلاثاء 22 سبتمبر</span>
                  </span>
                  <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded-lg border border-slate-200/60 shadow-2xs">
                    {completedCount} من {totalCount} مكتملة
                  </span>
                </div>

                {/* Meter Progress */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%`, backgroundColor: kidColor }} 
                  />
                </div>
                
                <div className="flex justify-between items-center text-xs text-slate-600 pt-0.5">
                  <span>نسبة الإنجاز اليومي: <strong className="font-bold text-slate-900">{progressPercent}%</strong></span>
                  <span className="text-emerald-700 font-bold">{totalCount - completedCount} مهام متبقية</span>
                </div>
              </div>

              {/* Box 2: وقت الشاشة اليوم (Screen Time Stepper Cap) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>وقت الشاشة اليوم</span>
                  </span>
                  <span className="font-bold text-amber-800 bg-white px-2 py-0.5 rounded-lg border border-amber-200/60 shadow-2xs">
                    {screenUsed} من {screenCap} دقيقة
                  </span>
                </div>

                {/* Meter Warn */}
                <div className="w-full bg-amber-200/60 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${screenPercent}%` }}
                  />
                </div>

                {/* Stepper Control for Daily Cap */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-700">السقف اليومي:</span>
                  <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => handleCapChange(-10)}
                      aria-label="تخفيض السقف 10 دقائق"
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 active:scale-95 transition-all cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <b className="px-3 text-xs sm:text-sm font-black text-slate-900 min-w-12 text-center">
                      {screenCap} د
                    </b>
                    <button
                      type="button"
                      onClick={() => handleCapChange(10)}
                      aria-label="رفع السقف 10 دقائق"
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Task List (tlist) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>جدول مهام اليوم</span>
                </h3>
                <span className="text-[11px] text-slate-500">مرتبة زمنيًا حسب مواعيد الحصص والواجبات</span>
              </div>

              <div className="space-y-2.5">
                {tasks.map((task) => {
                  const isDone = task.status === 'done';
                  return (
                    <div 
                      key={task.id}
                      className={`p-3 sm:p-3.5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-right ${
                        isDone 
                          ? 'bg-slate-50/70 border-slate-200/70 opacity-90' 
                          : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                      }`}
                    >
                      {/* Main Task Info */}
                      <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                        {/* Time Column */}
                        <div 
                          className="w-12 sm:w-13 h-10 sm:h-11 rounded-lg flex flex-col items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: isDone ? '#f1f5f9' : '#fdf2f8',
                            borderColor: isDone ? '#e2e8f0' : '#fbcfe8',
                            color: isDone ? '#64748b' : kidColor,
                          }}
                        >
                          <b className="text-xs font-black leading-none">{task.time}</b>
                          <small className="text-[10px] font-bold mt-0.5">{task.period}</small>
                        </div>

                        {/* Title, Subject, & Tags */}
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              {task.title}
                            </span>
                            
                            {/* Badges / Tags */}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {task.typeLabel}
                            </span>

                            {isDone ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>مكتملة</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                                <Clock className="w-3 h-3" />
                                <span>قادمة</span>
                              </span>
                            )}

                            {task.dueInfo && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                                <span>{task.dueInfo}</span>
                              </span>
                            )}

                            {task.paperNotice && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                                {task.paperNotice}
                              </span>
                            )}
                          </div>

                          <span className="text-[11px] text-slate-500 block">
                            {task.subject}، {task.topic}، {task.duration} دقيقة
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1.5 self-end md:self-center shrink-0 flex-wrap">
                        {task.type === 'hw' && !isDone && (
                          <button
                            type="button"
                            onClick={() => handleMarkHwDone(task.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-2xs cursor-pointer active:scale-95"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>تم التسليم</span>
                          </button>
                        )}

                        {!isDone && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSnoozeHour(task.id)}
                              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                              title="تأجيل ساعة واحدة"
                            >
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              <span>تأجيل ساعة</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleMoveTomorrow(task.id)}
                              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95"
                              title="نقل المهمة إلى جدول الغد"
                            >
                              إلى الغد
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Suggestion Card (اقتراح الذكاء الاصطناعي) */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-purple-50/80 via-white to-pink-50/60 border border-purple-200/90 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-purple-900 font-extrabold text-sm sm:text-base">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <span>اقتراح الذكاء الاصطناعي</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  توجيه مخصص لسارة
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                مادة «الرياضيات» هي الأدنى عند سارة (58%). جلسة مقترحة: «الكسور العشرية»، 30 د، غدًا 3:30 م.
              </p>

              <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                <button
                  type="button"
                  onClick={handleAddAiSession}
                  disabled={aiSessionAdded}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95 ${
                    aiSessionAdded
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-purple-700 hover:bg-purple-800 text-white'
                  }`}
                >
                  {aiSessionAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تمت إضافة الجلسة بنجاح</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>أضف الجلسة المقترحة</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => showToast('يمكنك تخصيص توقيت ومعلم الجلسة عبر جدول الحصص')}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  تخصيص
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB CONTENT: الجدول (Schedule) */}
        {activeTab === 'schedule' && (
          <div className="p-3 sm:p-5 text-right">
            <WeeklyScheduleView
              role={role}
              kids={kids}
              initialKidFilter={currentKid.id}
              showToast={showToast}
            />
          </div>
        )}

        {/* TAB CONTENT: الأداء والدرجات (Performance) */}
        {activeTab === 'perf' && (
          <div className="p-4 sm:p-6 space-y-5 text-right">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">سجل إتقان المواد والتقييمات</h3>
                <span className="text-xs sm:text-sm text-slate-500">معدل الإتقان العام لسارة: 76%</span>
              </div>
              <button
                type="button"
                onClick={() => showToast('جاري تصدير التقرير الأكاديمي الشامل بصيغة PDF...')}
                className="self-start sm:self-auto px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                تحميل التقرير الكامل PDF
              </button>
            </div>

            <div className="space-y-3.5">
              {[
                { subject: 'الرياضيات', score: 58, level: 'يحتاج تقوية', col: '#ef4444', note: 'ضعف في تحويل الكسور العشرية ومقارنتها' },
                { subject: 'العلوم', score: 85, level: 'ممتاز', col: '#10b981', note: 'فهم ممتاز لدورة الماء وحالات المادة' },
                { subject: 'اللغة الإنجليزية', score: 78, level: 'جيد جدًا', col: '#3b82f6', note: 'حفظ ممتاز للمفردات ويحتاج تدريب على القراءة' },
                { subject: 'لغتي الجميلة', score: 82, level: 'ممتاز', col: '#8b5cf6', note: 'إتقان جيد لقواعد الإملاء' },
              ].map((subj, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <strong className="font-extrabold text-slate-900 text-sm sm:text-base">{subj.subject}</strong>
                    <span className="font-black text-sm sm:text-base" style={{ color: subj.col }}>
                      {subj.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all" 
                      style={{ width: `${subj.score}%`, backgroundColor: subj.col }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{subj.note}</span>
                    <span className="font-bold" style={{ color: subj.col }}>{subj.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: التجربة والأثر (Experience) */}
        {activeTab === 'exp' && (
          <div className="p-4 sm:p-6 space-y-4 text-right">
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">سجل التحفيز والأنشطة الإثرائية</h3>
            <p className="text-xs sm:text-sm text-slate-500">الشارات التي حصلت عليها سارة ومؤشرات الانضباط الدراسي.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200 text-center space-y-2">
                <span className="text-3xl sm:text-4xl block">🏆</span>
                <b className="text-sm font-extrabold text-amber-900 block">شعلة الالتزام</b>
                <span className="text-xs text-amber-700 block">أتمت 5 أيام دراسية متتالية دون انقطاع</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/60 border border-purple-200 text-center space-y-2">
                <span className="text-3xl sm:text-4xl block">🔬</span>
                <b className="text-sm font-extrabold text-purple-900 block">عالمة المستقبل</b>
                <span className="text-xs text-purple-700 block">أعلى درجات في اختبار العلوم العملي</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center space-y-2">
                <span className="text-3xl sm:text-4xl block">⏱️</span>
                <b className="text-sm font-extrabold text-emerald-900 block">انضباط وقت الشاشة</b>
                <span className="text-xs text-emerald-700 block">التزمت بالسقف المحدد طوال الأسبوع الماضي</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: الاشتراك (Subscription) */}
        {activeTab === 'sub' && (
          <div className="p-4 sm:p-6 space-y-4 text-right">
            <div className="p-5 sm:p-6 rounded-3xl bg-pink-50/70 border border-pink-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#B04A7C] block mb-1">حالة الاشتراك الحالي لسارة</span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">الباقة التعليمية المتكاملة (الصف الخامس)</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  متبقي <strong className="text-rose-600 font-extrabold">4 أيام فقط</strong> على موعد التجديد.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRenewSubscription(currentKid.id)}
                className="px-5 py-3 rounded-xl bg-[#B04A7C] hover:bg-[#973b67] text-white text-xs sm:text-sm font-extrabold shadow-xs transition-all cursor-pointer shrink-0"
              >
                تجديد الاشتراك الآن ←
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
