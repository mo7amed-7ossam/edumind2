import React, { useState, useId } from 'react';
import {
  X,
  Eye,
  EyeOff,
  Check,
  Clock,
  Sparkles,
  Info,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { Kid } from '../types';

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddKid: (kid: Kid, extraInfo: { subjects: string[]; readingLevel: string; goal: string }) => void;
  primaryBtnClass?: string;
  modalTitle?: string;
}

const AVATAR_OPTIONS = [
  { id: 'lion', emoji: '🦁', label: 'أسد', color: '#F59E0B' },
  { id: 'rabbit', emoji: '🐰', label: 'أرنب', color: '#EC4899' },
  { id: 'fox', emoji: '🦊', label: 'ثعلب', color: '#F97316' },
  { id: 'panda', emoji: '🐼', label: 'باندا', color: '#10B981' },
  { id: 'penguin', emoji: '🐧', label: 'بطريق', color: '#0EA5E9' },
  { id: 'turtle', emoji: '🐢', label: 'سلحفاة', color: '#84CC16' },
];

const CURRICULUM_OPTIONS = ['منهج وزاري', 'منهج دولي (IB)'];

const GRADE_OPTIONS = [
  'KG1',
  'KG2',
  'الصف الأول',
  'الصف الثاني',
  'الصف الثالث',
  'الصف الرابع',
  'الصف الخامس',
  'الصف السادس',
];

const SUBJECT_OPTIONS = [
  { id: 'math', name: 'الرياضيات', icon: '📐' },
  { id: 'science', name: 'العلوم', icon: '🔬' },
  { id: 'chemistry', name: 'الكيمياء', icon: '🧪' },
  { id: 'arabic', name: 'اللغة العربية', icon: '📖' },
  { id: 'english', name: 'اللغة الإنجليزية', icon: '🔤' },
  { id: 'physics', name: 'الفيزياء', icon: '⚛️' },
];

const READING_LEVELS = ['لا يقرأ بعد', 'يقرأ كلمات', 'يقرأ بطلاقة'];
const GOAL_OPTIONS = ['تحسين الدرجات', 'تأسيس المهارات', 'الاستعداد لاختبار'];

export const AddKidModal: React.FC<AddKidModalProps> = ({
  isOpen,
  onClose,
  onAddKid,
  primaryBtnClass = 'bg-[#26374a] hover:bg-[#1d2b3a]',
  modalTitle = 'إضافة ابن',
}) => {
  const modalId = useId();

  // Form State
  const [avatar, setAvatar] = useState('🦁');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('2016-01-01');
  const [nid, setNid] = useState('');
  const [curriculum, setCurriculum] = useState('منهج وزاري');
  const [grade, setGrade] = useState('الصف الرابع');
  const [gender, setGender] = useState<'m' | 'f'>('f');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Academic State
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'الرياضيات',
    'العلوم',
    'اللغة العربية',
  ]);
  const [readingLevel, setReadingLevel] = useState('يقرأ بطلاقة');
  const [goal, setGoal] = useState('تحسين الدرجات');

  // Error State
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Auto-generate suggested username from name
  const suggestedUsername = name.trim()
    ? name
        .trim()
        .replace(/\s+/g, '_')
        .toLowerCase()
        .concat('_', dob.split('-')[0] || '2016')
    : '';

  const handleToggleSubject = (subjectName: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectName)
        ? prev.filter((s) => s !== subjectName)
        : [...prev, subjectName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('يرجى إدخال اسم الابن.');
      return;
    }
    if (!nid.trim()) {
      setErrorMsg('يرجى إدخال رقم الهوية.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('يرجى تعيين كلمة مرور للابن.');
      return;
    }
    if (selectedSubjects.length === 0) {
      setErrorMsg('يرجى اختيار مادة دراسية واحدة على الأقل.');
      return;
    }

    const selectedAvatarObj = AVATAR_OPTIONS.find((a) => a.emoji === avatar);

    const newKid: Kid = {
      id: String(Date.now()),
      name: name.trim(),
      grade,
      initial: name.trim().charAt(0) || 'أ',
      avatarBg: selectedAvatarObj ? selectedAvatarObj.color : '#0D9488',
      status: { label: 'جديد ومتحمس', type: 'good' },
      note: `تم التسجيل بنجاح في ${grade} (${curriculum})، تم اختيار ${selectedSubjects.length} مواد دراسية.`,
      todayTasks: {
        done: 0,
        total: 1,
        percentage: 0,
        nextSchedule: 'حصة تمهيدية استكشافية غداً',
      },
      subscription: {
        daysLeft: 7, // 7 days trial
        isAlert: false,
      },
    };

    onAddKid(newKid, {
      subjects: selectedSubjects,
      readingLevel,
      goal,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${modalId}-title`}
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div className="relative bg-white rounded-3xl p-5 sm:p-7 max-w-4xl w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[92vh] flex flex-col text-right">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">✨</span>
              <h2
                id={`${modalId}-title`}
                className="font-extrabold text-lg sm:text-xl text-slate-900"
              >
                {modalTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              أضف بيانات ابنك الأساسية واختر مواده الدراسية، وسيظهر فورًا في قائمة «أبنائي» مع لوحته الخاصة.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification if any */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium shrink-0">
            {errorMsg}
          </div>
        )}

        {/* Scrollable Form Content */}
        <form id={`${modalId}-form`} onSubmit={handleSubmit} className="overflow-y-auto pr-1 pl-1 flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            
            {/* COLUMN 1: Basic Info */}
            <div className="space-y-4">
              
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                  اختر صورة رمزية للابن
                </label>
                <div
                  role="radiogroup"
                  aria-label="اختر صورة رمزية للابن"
                  className="grid grid-cols-6 gap-2"
                >
                  {AVATAR_OPTIONS.map((opt) => {
                    const isSelected = avatar === opt.emoji;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setAvatar(opt.emoji)}
                        className={`h-12 rounded-2xl flex flex-col items-center justify-center text-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-50 border-slate-800 shadow-xs ring-2 ring-slate-800/10 scale-105'
                            : 'bg-white border-slate-200/80 hover:bg-slate-50/80 hover:border-slate-300'
                        }`}
                        title={opt.label}
                      >
                        <span>{opt.emoji}</span>
                        <span className="sr-only">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 1: Name & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nk-name" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    اسم الابن <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="nk-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="اسم الابن"
                    autoComplete="off"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm sm:text-base font-medium focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 outline-none transition-all bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="nk-dob" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    تاريخ الميلاد <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="nk-dob"
                    type="date"
                    required
                    value={dob}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm sm:text-base font-medium focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 outline-none transition-all bg-white"
                  />
                </div>
              </div>

              {/* Row 2: ID Number & Curriculum */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nk-nid" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    رقم الهوية <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="nk-nid"
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    value={nid}
                    onChange={(e) => setNid(e.target.value.replace(/\D/g, ''))}
                    placeholder="1XXXXXXXXX"
                    autoComplete="off"
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm sm:text-base font-medium text-left focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 outline-none transition-all bg-white font-mono tracking-wider"
                  />
                </div>

                <div>
                  <label htmlFor="nk-cur" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    نظام المنهج <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="nk-cur"
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm sm:text-base font-medium focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 outline-none transition-all bg-white"
                  >
                    {CURRICULUM_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Grade & Suggested Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nk-grade" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    الصف الدراسي <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="nk-grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm sm:text-base font-medium focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 outline-none transition-all bg-white"
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="nk-user" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    اسم المستخدم
                  </label>
                  <input
                    id="nk-user"
                    type="text"
                    readOnly
                    tabIndex={-1}
                    value={suggestedUsername}
                    placeholder="سيُقترح تلقائيًا"
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm sm:text-base font-medium text-left bg-slate-50 text-slate-500 outline-none cursor-not-allowed font-mono"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-normal">
                الخيارات المتاحة تعتمد على أنظمة المنهج المعتمدة لدولتك (مثلًا السعودية): منهج وزاري، منهج دولي (IB).
              </p>

              {/* Gender Radio Pills */}
              <div>
                <span className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                  ولد أم بنت
                </span>
                <div role="radiogroup" aria-label="ولد أم بنت" className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={gender === 'm'}
                    onClick={() => setGender('m')}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                      gender === 'm'
                        ? 'bg-sky-50 text-sky-800 border-sky-300 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50'
                    }`}
                  >
                    <span>👦</span>
                    <span>ولد</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={gender === 'f'}
                    onClick={() => setGender('f')}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                      gender === 'f'
                        ? 'bg-pink-50 text-pink-800 border-pink-300 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50'
                    }`}
                  >
                    <span>👧</span>
                    <span>بنت</span>
                  </button>
                </div>
              </div>

              {/* Password with Eye Toggle */}
              <div>
                <label htmlFor="nk-pass" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                  كلمة مرور الابن <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="nk-pass"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pl-14 rounded-xl border border-slate-200 text-sm sm:text-base font-medium focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 outline-none transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span className="text-xs">إخفاء</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span className="text-xs">إظهار</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

            {/* COLUMN 2: Academic Setup & Subjects */}
            <div className="space-y-4">
              
              {/* Subjects Selection */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="block text-xs sm:text-sm font-bold text-slate-700">
                    اختر المواد <span className="text-rose-500">*</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-500">
                    {selectedSubjects.length} مواد محددة
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2.5">
                  {curriculum}، {grade}، {selectedSubjects.length} مواد محددة
                </p>

                <div
                  id="nk-subs"
                  role="group"
                  aria-label="اختر المواد"
                  className="grid grid-cols-2 gap-2"
                >
                  {SUBJECT_OPTIONS.map((sub) => {
                    const isChecked = selectedSubjects.includes(sub.name);
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => handleToggleSubject(sub.name)}
                        className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isChecked
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">{sub.icon}</span>
                          <span className="text-xs sm:text-sm font-bold truncate">{sub.name}</span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                            isChecked
                              ? 'bg-white text-slate-900 border-white'
                              : 'border-slate-300 bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reading Level */}
              <div>
                <span className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                  مستوى القراءة
                </span>
                <div role="radiogroup" aria-label="مستوى القراءة" className="grid grid-cols-3 gap-2">
                  {READING_LEVELS.map((level) => {
                    const isSelected = readingLevel === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setReadingLevel(level)}
                        className={`py-2 px-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer text-center truncate ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-900 border-indigo-300 shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50'
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  نص واضح مع صوت اختياري.
                </p>
              </div>

              {/* Goal */}
              <div>
                <span className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                  الهدف
                </span>
                <div role="radiogroup" aria-label="الهدف" className="grid grid-cols-3 gap-2">
                  {GOAL_OPTIONS.map((g) => {
                    const isSelected = goal === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setGoal(g)}
                        className={`py-2 px-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer text-center truncate ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trial Subscription Infobox */}
              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-start gap-3 text-amber-950">
                <div className="w-8 h-8 rounded-xl bg-amber-100/90 flex items-center justify-center shrink-0 text-amber-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm leading-relaxed space-y-0.5">
                  <span className="font-bold block text-amber-900">
                    فترة تجريبية مجانية 7 أيام
                  </span>
                  <p className="text-amber-800/90 text-xs">
                    لم تُحدَّد شريحة اشتراك بعد. يبدأ اشتراك تجريبي لمدة 7 أيام، ويمكنك اختيار الشريحة المناسبة لهذا الابن لاحقًا من تبويب «الاشتراك».
                  </p>
                </div>
              </div>

            </div>

          </div>
        </form>

        {/* Footer Buttons */}
        <div className="border-t border-slate-100 pt-4 mt-5 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            form={`${modalId}-form`}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer ${primaryBtnClass}`}
          >
            حفظ الابن
          </button>
        </div>

      </div>
    </div>
  );
};
