import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users,
  Sparkles,
  BookOpen,
  AlertCircle,
  Trash2,
  X,
  MapPin,
  CalendarCheck,
} from 'lucide-react';

export interface ScheduleTask {
  id: string;
  dayId: string; // 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
  kidId: string;
  kidName: string;
  subject: string;
  title: string;
  time: string;
  duration?: string;
  type: 'live_session' | 'homework' | 'exam' | 'review';
  typeLabel: string;
  teacher?: string;
  details?: string;
  isCompleted: boolean;
  priority?: 'normal' | 'high';
}

export interface DayInfo {
  id: string;
  name: string;
  dateStr: string;
  fullDate: string;
  isToday: boolean;
  isWeekend?: boolean;
}

export const ACADEMIC_DAYS: DayInfo[] = [
  { id: 'sun', name: 'الأحد', dateStr: '20 سبتمبر', fullDate: 'الأحد، 20 سبتمبر 2026', isToday: false },
  { id: 'mon', name: 'الإثنين', dateStr: '21 سبتمبر', fullDate: 'الإثنين، 21 سبتمبر 2026', isToday: false },
  { id: 'tue', name: 'الثلاثاء', dateStr: '22 سبتمبر', fullDate: 'الثلاثاء، 22 سبتمبر 2026', isToday: true },
  { id: 'wed', name: 'الأربعاء', dateStr: '23 سبتمبر', fullDate: 'الأربعاء، 23 سبتمبر 2026', isToday: false },
  { id: 'thu', name: 'الخميس', dateStr: '24 سبتمبر', fullDate: 'الخميس، 24 سبتمبر 2026', isToday: false },
  { id: 'fri', name: 'الجمعة', dateStr: '25 سبتمبر', fullDate: 'الجمعة، 25 سبتمبر 2026', isToday: false, isWeekend: true },
  { id: 'sat', name: 'السبت', dateStr: '26 سبتمبر', fullDate: 'السبت، 26 سبتمبر 2026', isToday: false, isWeekend: true },
];

export const INITIAL_SCHEDULE_TASKS: ScheduleTask[] = [
  // الأحد
  {
    id: 'task-sun-1',
    dayId: 'sun',
    kidId: '1',
    kidName: 'سارة',
    subject: 'الرياضيات',
    title: 'حصة الكسور وتطبيقاتها الحياتية',
    time: '04:30 م',
    duration: '45 دقيقة',
    type: 'live_session',
    typeLabel: 'حصة مباشرة',
    teacher: 'أ. منى الشهري',
    details: 'مراجعة المفاهيم الأساسية وحل الأسئلة التفاعلية',
    isCompleted: true,
  },
  {
    id: 'task-sun-2',
    dayId: 'sun',
    kidId: '2',
    kidName: 'عمر',
    subject: 'العلوم',
    title: 'مراجعة درس الخلية الوراثية',
    time: '06:00 م',
    duration: '40 دقيقة',
    type: 'review',
    typeLabel: 'مراجعة ذاتية',
    details: 'تلخيص النقاط الرئيسية في دفتر المادة',
    isCompleted: true,
  },

  // الإثنين
  {
    id: 'task-mon-1',
    dayId: 'mon',
    kidId: '2',
    kidName: 'عمر',
    subject: 'لغتي الخالدة',
    title: 'حل تدريبات المشتقات واسم الفاعل',
    time: '03:30 م',
    duration: '35 دقيقة',
    type: 'homework',
    typeLabel: 'واجب منزلي',
    details: 'حل أسئلة الكتاب صفحة 45 إلى 48',
    isCompleted: true,
  },
  {
    id: 'task-mon-2',
    dayId: 'mon',
    kidId: '3',
    kidName: 'نورة',
    subject: 'القرآن الكريم',
    title: 'تسميع سورة الفجر وتجويد الآيات',
    time: '05:15 م',
    duration: '30 دقيقة',
    type: 'live_session',
    typeLabel: 'حصة مباشرة',
    teacher: 'أ. هدى الغامدي',
    details: 'التركيز على أحكام النون الساكنة والتنوين',
    isCompleted: true,
  },

  // الثلاثاء (اليوم الحالي)
  {
    id: 'task-tue-1',
    dayId: 'tue',
    kidId: '2',
    kidName: 'عمر',
    subject: 'لغتي الجميلة',
    title: 'حصة مراجعة النصوص الشعرية',
    time: '03:30 م',
    duration: '45 دقيقة',
    type: 'live_session',
    typeLabel: 'حصة مباشرة',
    teacher: 'أ. فهد العتيبي',
    details: 'جلسة تدريبية تفاعلية مع المعلم وحل التمارين',
    isCompleted: true,
  },
  {
    id: 'task-tue-2',
    dayId: 'tue',
    kidId: '1',
    kidName: 'سارة',
    subject: 'الرياضيات',
    title: 'جلسة تقوية: الكسور العشرية والنسبة المئوية',
    time: '04:30 م',
    duration: '45 دقيقة',
    type: 'live_session',
    typeLabel: 'حصة مباشرة',
    teacher: 'أ. منى الشهري',
    details: 'التركيز على مهارات التحويل بين الكسور العادية والعشرية',
    isCompleted: false,
    priority: 'high',
  },
  {
    id: 'task-tue-3',
    dayId: 'tue',
    kidId: '3',
    kidName: 'نورة',
    subject: 'لغتي',
    title: 'واجب رسم الهمزة المتوسطة على الياء',
    time: '06:30 م',
    duration: '30 دقيقة',
    type: 'homework',
    typeLabel: 'واجب منزلي',
    details: 'حل تمارين كتاب النشاط صفحة 34 وتسليمه للمعلمة',
    isCompleted: false,
    priority: 'high',
  },
  {
    id: 'task-tue-4',
    dayId: 'tue',
    kidId: '1',
    kidName: 'سارة',
    subject: 'اللغة الإنجليزية',
    title: 'واجب كتابة 5 جمل في زمن الماضي البسيط',
    time: '07:30 م',
    duration: '25 دقيقة',
    type: 'homework',
    typeLabel: 'واجب منزلي',
    details: 'Unit 3: Past Simple exercise in workbook',
    isCompleted: false,
  },

  // الأربعاء
  {
    id: 'task-wed-1',
    dayId: 'wed',
    kidId: '1',
    kidName: 'سارة',
    subject: 'العلوم',
    title: 'تجربة دورة المياه في الطبيعة والتبخر',
    time: '04:00 م',
    duration: '45 دقيقة',
    type: 'live_session',
    typeLabel: 'حصة تفاعلية',
    teacher: 'أ. فهد العتيبي',
    details: 'مشاهدة التجربة المعملية وتدوين الاستنتاجات',
    isCompleted: false,
  },
  {
    id: 'task-wed-2',
    dayId: 'wed',
    kidId: '2',
    kidName: 'عمر',
    subject: 'الرياضيات',
    title: 'اختبار قصير تقويمي في الهندسة والمثلثات',
    time: '05:30 م',
    duration: '30 دقيقة',
    type: 'exam',
    typeLabel: 'اختبار قصير',
    details: 'اختبار تجريبي عبر منصة المدرسة لتقييم استيعاب الوحدة',
    isCompleted: false,
    priority: 'high',
  },
  {
    id: 'task-wed-3',
    dayId: 'wed',
    kidId: '3',
    kidName: 'نورة',
    subject: 'التربية الفنية',
    title: 'إكمال اللوحة التشكيلية لألوان الطبيعة',
    time: '06:30 م',
    duration: '40 دقيقة',
    type: 'homework',
    typeLabel: 'نشاط إثرائي',
    details: 'استخدام الألوان المائية وتجهيز اللوحة لمعرض المدرسة',
    isCompleted: false,
  },

  // الخميس
  {
    id: 'task-thu-1',
    dayId: 'thu',
    kidId: '1',
    kidName: 'سارة',
    subject: 'لغتي الجميلة',
    title: 'حفظ أبيات قصيدة موطني والمفردات',
    time: '04:00 م',
    duration: '30 دقيقة',
    type: 'homework',
    typeLabel: 'واجب منزلي',
    details: 'قراءة النص بصوت واضح والتدرب على الإلقاء',
    isCompleted: false,
  },
  {
    id: 'task-thu-2',
    dayId: 'thu',
    kidId: '2',
    kidName: 'عمر',
    subject: 'المهارات الرقمية',
    title: 'مشروع البرمجة بلغة بايثون: الحلقات التكرارية',
    time: '05:00 م',
    duration: '50 دقيقة',
    type: 'live_session',
    typeLabel: 'حصة عملية',
    teacher: 'أ. صالح المحمود',
    details: 'تطبيق عملي على برنامج Replit ومشاركة الكود',
    isCompleted: false,
  },
  {
    id: 'task-thu-3',
    dayId: 'thu',
    kidId: '3',
    kidName: 'نورة',
    subject: 'الرياضيات',
    title: 'تدريبات الجمع والطرح مع إعادة التجميع',
    time: '06:15 م',
    duration: '25 دقيقة',
    type: 'review',
    typeLabel: 'مراجعة خفيفة',
    details: 'ألعاب تعليمية تفاعلية على الآيباد لتثبيت جدول الجمع',
    isCompleted: false,
  },
];

interface WeeklyScheduleViewProps {
  role?: 'mother' | 'father';
  kids?: Array<{ id: string; name: string; avatarBg: string; initial: string; grade: string }>;
  onBackToHome?: () => void;
  showToast: (msg: string) => void;
  initialKidFilter?: string; // 'all' or kidId
}

export const WeeklyScheduleView: React.FC<WeeklyScheduleViewProps> = ({
  role = 'mother',
  kids = [
    { id: '1', name: 'سارة', avatarBg: '#B04A7C', initial: 'س', grade: 'الصف الخامس الابتدائي' },
    { id: '2', name: 'عمر', avatarBg: '#2F7FA8', initial: 'ع', grade: 'الصف الثالث المتوسط' },
    { id: '3', name: 'نورة', avatarBg: '#6F55A3', initial: 'ن', grade: 'الصف الثاني الابتدائي' },
  ],
  onBackToHome,
  showToast,
  initialKidFilter = 'all',
}) => {
  // Active selected day (default: Tuesday - today)
  const [selectedDayId, setSelectedDayId] = useState<string>('tue');
  const [selectedKidFilter, setSelectedKidFilter] = useState<string>(initialKidFilter);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [tasks, setTasks] = useState<ScheduleTask[]>(INITIAL_SCHEDULE_TASKS);

  // Modal State for adding new task
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('الرياضيات');
  const [newTaskKidId, setNewTaskKidId] = useState<string>('1');
  const [newTaskDayId, setNewTaskDayId] = useState<string>('tue');
  const [newTaskTime, setNewTaskTime] = useState('05:00 م');
  const [newTaskDuration, setNewTaskDuration] = useState('45 دقيقة');
  const [newTaskType, setNewTaskType] = useState<'live_session' | 'homework' | 'exam' | 'review'>('live_session');
  const [newTaskTeacher, setNewTaskTeacher] = useState('');
  const [newTaskDetails, setNewTaskDetails] = useState('');

  // Find active day info
  const selectedDay = ACADEMIC_DAYS.find((d) => d.id === selectedDayId) || ACADEMIC_DAYS[2];
  const todayDay = ACADEMIC_DAYS.find((d) => d.isToday) || ACADEMIC_DAYS[2];

  // Filter tasks for the selected day
  const dayTasks = tasks.filter((t) => t.dayId === selectedDayId);
  const filteredTasks = dayTasks.filter((t) => {
    if (selectedKidFilter !== 'all' && t.kidId !== selectedKidFilter) return false;
    if (selectedTypeFilter !== 'all' && t.type !== selectedTypeFilter) return false;
    return true;
  });

  // Calculate stats for selected day
  const completedCount = filteredTasks.filter((t) => t.isCompleted).length;
  const totalCount = filteredTasks.length;

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = !t.isCompleted;
          showToast(updated ? `✓ تم إنجاز: ${t.title}` : `تم إلغاء إنجاز: ${t.title}`);
          return { ...t, isCompleted: updated };
        }
        return t;
      })
    );
  };

  // Delete task
  const handleDeleteTask = (taskId: string, title: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast(`تم حذف المهمة: ${title}`);
  };

  // Postpone task (+1 hour)
  const handlePostponeHour = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            time: '06:00 م',
            details: `${t.details || ''} (تم تأخير الموعد ساعة واحدة)`.trim(),
          };
        }
        return t;
      })
    );
    showToast('تم تأجيل موعد الحصة ساعة واحدة ⏰');
  };

  // Open modal and pre-fill day with active selected day
  const handleOpenAddModal = (dayId?: string) => {
    setNewTaskDayId(dayId || selectedDayId);
    setIsAddModalOpen(true);
  };

  // Handle Add New Task Submit
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      showToast('يرجى إدخال عنوان المهمة أو الدرس');
      return;
    }

    const assignedKid = kids.find((k) => k.id === newTaskKidId) || kids[0];

    let typeLabel = 'حصة مباشرة';
    if (newTaskType === 'homework') typeLabel = 'واجب منزلي';
    else if (newTaskType === 'exam') typeLabel = 'اختبار قصير';
    else if (newTaskType === 'review') typeLabel = 'مراجعة ذاتية';

    const newTask: ScheduleTask = {
      id: `task-custom-${Date.now()}`,
      dayId: newTaskDayId,
      kidId: assignedKid.id,
      kidName: assignedKid.name,
      subject: newTaskSubject.trim() || 'الرياضيات',
      title: newTaskTitle.trim(),
      time: newTaskTime.trim() || '05:00 م',
      duration: newTaskDuration.trim() || '45 دقيقة',
      type: newTaskType,
      typeLabel,
      teacher: newTaskTeacher.trim() || undefined,
      details: newTaskDetails.trim() || undefined,
      isCompleted: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    // Switch to that day if not already there
    setSelectedDayId(newTaskDayId);

    // Reset Form
    setNewTaskTitle('');
    setNewTaskDetails('');
    setNewTaskTeacher('');
    setIsAddModalOpen(false);

    const dayName = ACADEMIC_DAYS.find((d) => d.id === newTaskDayId)?.name || 'اليوم المحدد';
    showToast(`🎉 تم بنجاح إضافة "${newTask.title}" لجدول يوم ${dayName} لـ ${assignedKid.name}!`);
  };

  const themePrimary = role === 'mother' ? 'bg-[#B04A7C] hover:bg-[#963c68]' : 'bg-[#1D638D] hover:bg-[#165174]';
  const themeBorder = role === 'mother' ? 'border-pink-200' : 'border-sky-200';
  const themeActiveTab = role === 'mother' ? 'border-[#B04A7C] text-[#B04A7C] bg-pink-50/60' : 'border-[#1D638D] text-[#1D638D] bg-sky-50/60';

  return (
    <div id="weekly-schedule-screen" className="space-y-4 sm:space-y-6 text-right pb-10">
      
      {/* 1. Header Banner & Current Day Indicator */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-700" />
                <span>الجدول الدراسي الأسبوعي</span>
              </h1>

              {/* CURRENT DAY HIGHLIGHT BADGE */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>اليوم الحالي: {todayDay.name} ({todayDay.dateStr})</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              استعراض مواعيد الحصص والواجبات الموزعة على مدار الأسبوع الدراسي مع إمكانية إضافة وتعديل المهام لأي يوم.
            </p>
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-2">
            {!selectedDay.isToday && (
              <button
                type="button"
                onClick={() => setSelectedDayId(todayDay.id)}
                className="h-9 px-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100/70 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                title="القفز مباشرة لجدول اليوم الحالي"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span>الذهاب لليوم الحالي (الثلاثاء)</span>
              </button>
            )}

            <button
              type="button"
              id="schedule-add-task-btn"
              onClick={() => handleOpenAddModal()}
              className={`h-9 px-3.5 rounded-xl ${themePrimary} text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95`}
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>إضافة مهمة جديدة</span>
            </button>
          </div>
        </div>

        {/* 2. Days of the Academic Week Selector (أيام الأسبوع الدراسي بالتواريخ) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <span>أيام الأسبوع الدراسي:</span>
              <span className="text-[11px] font-normal text-slate-400">انقر على أي يوم لاستعراض مهامه المجدولة</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {ACADEMIC_DAYS.map((day) => {
              const isSelected = selectedDayId === day.id;
              const dayTasksCount = tasks.filter((t) => t.dayId === day.id).length;
              const dayDoneCount = tasks.filter((t) => t.dayId === day.id && t.isCompleted).length;

              return (
                <button
                  key={day.id}
                  type="button"
                  id={`day-tab-${day.id}`}
                  onClick={() => setSelectedDayId(day.id)}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between relative group ${
                    isSelected
                      ? `${themeActiveTab} shadow-xs ring-2 ring-current/20 font-bold`
                      : day.isToday
                      ? 'bg-emerald-50/40 border-emerald-300/80 hover:bg-emerald-50 text-slate-800'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {/* Top indicator: Day name & Today badge */}
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {day.name}
                    </span>
                    {day.isToday && (
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-emerald-600 text-white shadow-2xs">
                        اليوم
                      </span>
                    )}
                  </div>

                  {/* Date String */}
                  <div className="text-[11px] text-slate-500 font-medium mb-2">
                    {day.dateStr}
                  </div>

                  {/* Bottom Counter Pill */}
                  <div className="flex items-center justify-between w-full text-[10px] pt-1.5 border-t border-slate-200/60">
                    <span className="text-slate-500">المهام:</span>
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded-md ${
                        dayTasksCount === 0
                          ? 'bg-slate-200/60 text-slate-500'
                          : dayDoneCount === dayTasksCount
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-white text-slate-800 border border-slate-200'
                      }`}
                    >
                      {dayDoneCount}/{dayTasksCount}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Filter Row + Selected Day Status */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Active Day Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm">
            📅
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                مهام يوم {selectedDay.fullDate}
              </h2>
              {selectedDay.isToday && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  اليوم الحالي 📍
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              إجمالي {totalCount} مهمة ({completedCount} مكتملة، {totalCount - completedCount} قيد الإنجاز)
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Kid Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSelectedKidFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedKidFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الجميع ({dayTasks.length})
            </button>
            {kids.map((kid) => {
              const kidTasksCount = dayTasks.filter((t) => t.kidId === kid.id).length;
              return (
                <button
                  key={kid.id}
                  type="button"
                  onClick={() => setSelectedKidFilter(kid.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    selectedKidFilter === kid.id
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: kid.avatarBg }} />
                  <span>{kid.name}</span>
                  <span className="text-[10px] text-slate-400">({kidTasksCount})</span>
                </button>
              );
            })}
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={() => handleOpenAddModal(selectedDayId)}
            className="h-8 px-2.5 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span>+ مهمة لـ {selectedDay.name}</span>
          </button>
        </div>
      </div>

      {/* 4. Tasks List for Selected Day */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xs text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-2xl text-slate-400">
            📝
          </div>
          <h3 className="font-bold text-base text-slate-800">
            لا توجد مهام مسجلة ليوم {selectedDay.name}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            يمكنكِ إضافة مواعيد الحصص التفاعلية، الواجبات المنزلية، أو جلسات المراجعة بسهولة لتنظيم جدول الأبناء.
          </p>
          <button
            type="button"
            onClick={() => handleOpenAddModal(selectedDayId)}
            className={`h-9 px-4 rounded-xl ${themePrimary} text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer`}
          >
            <Plus className="w-4 h-4" />
            <span>إضافة أول مهمة ليوم {selectedDay.name}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredTasks.map((task) => {
            const kid = kids.find((k) => k.id === task.kidId) || kids[0];

            return (
              <div
                key={task.id}
                id={`schedule-task-card-${task.id}`}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  task.isCompleted
                    ? 'bg-slate-50/80 border-slate-200/70 opacity-80'
                    : task.priority === 'high'
                    ? 'bg-amber-50/30 border-amber-200/80 hover:shadow-2xs'
                    : 'bg-white border-slate-200/90 hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Card Header: Checkbox + Subject & Type Badge + Kid Tag */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <button
                        type="button"
                        onClick={() => handleToggleTask(task.id)}
                        className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer shrink-0"
                        title={task.isCompleted ? 'تحديد كغير منجز' : 'تحديد كمنجز'}
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black text-slate-800">
                            {task.subject}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                              task.type === 'live_session'
                                ? 'bg-sky-100 text-sky-800'
                                : task.type === 'homework'
                                ? 'bg-amber-100 text-amber-800'
                                : task.type === 'exam'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {task.typeLabel}
                          </span>
                        </div>

                        <h3
                          className={`text-sm font-bold mt-1 text-slate-900 leading-snug ${
                            task.isCompleted ? 'line-through text-slate-400' : ''
                          }`}
                        >
                          {task.title}
                        </h3>
                      </div>
                    </div>

                    {/* Kid Avatar Badge */}
                    <div className="flex items-center gap-1.5 bg-slate-100/80 px-2 py-1 rounded-xl shrink-0">
                      <div
                        className="w-5 h-5 rounded-md text-white font-bold text-[10px] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: kid.avatarBg }}
                      >
                        {kid.initial}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{kid.name}</span>
                    </div>
                  </div>

                  {/* Details / Description */}
                  {task.details && (
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/60 p-2 rounded-xl border border-slate-100/90 mb-3 mr-7">
                      {task.details}
                    </p>
                  )}

                  {/* Meta: Time, Duration & Teacher */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 mr-7 flex-wrap mb-3">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.time}</span>
                    </span>
                    {task.duration && (
                      <span className="text-slate-400">• {task.duration}</span>
                    )}
                    {task.teacher && (
                      <span className="text-slate-600 font-medium">
                        • {task.teacher}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto mr-7">
                  <div className="flex items-center gap-1.5">
                    {!task.isCompleted && (
                      <button
                        type="button"
                        onClick={() => handlePostponeHour(task.id)}
                        className="h-7 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="تأجيل الموعد ساعة واحدة"
                      >
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>تأجيل ساعة</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleToggleTask(task.id)}
                      className={`h-7 px-2.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                        task.isCompleted
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <span>{task.isCompleted ? 'تعليم كغير مكتمل' : '✓ تم الإنجاز'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id, task.title)}
                    className="h-7 w-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                    title="حذف المهمة من الجدول"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. MODAL: إضافة مهمة جديدة للجدول (Add Task Modal) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 text-right">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl ${themePrimary} text-white flex items-center justify-center text-sm font-bold shadow-2xs`}>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    إضافة مهمة جديدة للجدول
                  </h3>
                  <span className="text-[11px] text-slate-500 font-normal">
                    جدولة حصة، واجب منزلي، أو اختبار لأحد الأبناء
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateTask} className="space-y-3.5">
              
              {/* Field 1: الابن المخصص */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  الابن / الابنة:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {kids.map((kid) => (
                    <button
                      key={kid.id}
                      type="button"
                      onClick={() => setNewTaskKidId(kid.id)}
                      className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                        newTaskKidId === kid.id
                          ? 'border-slate-800 bg-slate-900 text-white shadow-2xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: kid.avatarBg }} />
                      <span>{kid.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 2: اليوم الدراسي المخصص */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  اليوم في الجدول:
                </label>
                <select
                  value={newTaskDayId}
                  onChange={(e) => setNewTaskDayId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  {ACADEMIC_DAYS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.dateStr}) {d.isToday ? '★ اليوم الحالي' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 3: المادة ونوع المهمة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    المادة الدراسية:
                  </label>
                  <select
                    value={newTaskSubject}
                    onChange={(e) => setNewTaskSubject(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  >
                    <option value="الرياضيات">الرياضيات</option>
                    <option value="العلوم">العلوم</option>
                    <option value="لغتي الجميلة">لغتي الجميلة</option>
                    <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                    <option value="القرآن والدراسات الإسلامية">القرآن والدراسات الإسلامية</option>
                    <option value="المهارات الرقمية">المهارات الرقمية</option>
                    <option value="الاجتماعيات">الاجتماعيات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نوع المهمة:
                  </label>
                  <select
                    value={newTaskType}
                    onChange={(e) => setNewTaskType(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  >
                    <option value="live_session">حصة تفاعلية مباشرة</option>
                    <option value="homework">واجب منزلي</option>
                    <option value="exam">اختبار تقويمي / تجريبي</option>
                    <option value="review">مراجعة وتلخيص</option>
                  </select>
                </div>
              </div>

              {/* Field 4: عنوان المهمة */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  عنوان المهمة أو موضوع الدرس: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: حل تدريبات الكسور العشرية صفحة 42"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Field 5: الوقت والمدة */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    وقت البدء:
                  </label>
                  <input
                    type="text"
                    value={newTaskTime}
                    placeholder="مثال: 04:30 م"
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    المدة المتوقعة:
                  </label>
                  <input
                    type="text"
                    value={newTaskDuration}
                    placeholder="مثال: 45 دقيقة"
                    onChange={(e) => setNewTaskDuration(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              {/* Field 6: المعلم / المنصة */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  اسم المعلم أو المنصة (اختياري):
                </label>
                <input
                  type="text"
                  value={newTaskTeacher}
                  placeholder="مثال: أ. منى الشهري / منصة مدرستي"
                  onChange={(e) => setNewTaskTeacher(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Field 7: تفاصيل وملاحظات إضافية */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  تفاصيل وملاحظات إضافية:
                </label>
                <textarea
                  rows={2}
                  value={newTaskDetails}
                  placeholder="أي ملاحظات، روابط، أو صفحات الواجب..."
                  onChange={(e) => setNewTaskDetails(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold ${themePrimary} text-white shadow-xs cursor-pointer active:scale-95`}
                >
                  حفظ وإضافة إلى الجدول
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
