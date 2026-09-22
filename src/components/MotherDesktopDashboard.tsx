import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  UserPlus,
  Plus,
  ChevronLeft,
  Calendar,
  CreditCard,
  TrendingUp,
  X,
  Bell,
  Heart,
  Search,
  ExternalLink,
  ShieldCheck,
  Award,
  Users,
  FileText,
  RotateCcw,
  ArrowLeftRight,
  LogOut,
  Home,
  User,
  ChevronDown
} from 'lucide-react';
import { Kid, AttentionItem, AttentionCardItem } from '../types';
import { AddKidModal } from './AddKidModal';
import { SubscriptionsManager } from './SubscriptionsManager';
import { KidProfileView } from './KidProfileView';
import { WeeklyScheduleView } from './WeeklyScheduleView';

interface MotherDesktopDashboardProps {
  initialRole?: 'mother' | 'father';
  onBackToRoleSelect?: () => void;
}

export type ParentRole = 'mother' | 'father';

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

const roleThemes = {
  mother: {
    roleTitle: 'الأُمّ',
    avatarText: 'أم',
    avatarBg: 'bg-[#fcedf5]',
    avatarTextCol: 'text-[#B04A7C]',
    avatarBorder: 'border-pink-200/60',
    welcomeName: 'أهلًا بأمّ عمر',
    welcomeDesc: 'أبناؤكِ بخير في الغالب، وهناك 3 أمور صغيرة تحتاج لمستكِ.',
    heroContainer: 'bg-gradient-to-br from-white via-[#fffbfe] to-[#fbf1f7] border border-pink-100/70 shadow-[0_8px_30px_-6px_rgba(176,74,124,0.06)]',
    heroOrb1: 'bg-pink-200/40',
    heroOrb2: 'bg-rose-100/40',
    heroGradient: 'from-pink-50/60 via-pink-50/15 to-transparent',
    selectionClass: 'selection:bg-rose-100 selection:text-rose-900',
    pillBadge: 'bg-[#fdf2f8] text-[#B04A7C] border-pink-200/60',
    primaryBtn: 'bg-[#26374a] hover:bg-[#1d2b3a]',
    attentionSectionTitle: 'يحتاج انتباهكِ',
    attentionAccentBorder: 'border-r-[#B04A7C]',
    attentionPrimaryBtn: 'bg-[#B04A7C] hover:bg-[#993b69]',
    partnerRole: 'الأب',
    partnerRoleInverted: 'الأُمّ',
    inviteBtnLabel: 'دعوة الأب لمشاركة المتابعة',
    inviteCardDesc: 'يمكنكِ دعوة الأب بضغطة زر لمتابعة الواجبات، ومواعيد الحصص، والمشاركة في القرارات.',
    inviteModalDesc: 'شاركي رابط الدعوة مع الأب ليتمكن من تسجيل الدخول والمشاركة في متابعة إنجاز الأبناء والمهام اليومية:',
    inviteCode: 'MOM-9821',
    tipGradient: 'from-rose-50/70 via-white to-amber-50/30 border-rose-200/80',
    tipBadgeBg: 'bg-rose-100/90 text-rose-800',
    tipText: 'عمر أنهى مهامه بإتقان. كلمة تشجيع منكِ الليلة تصنع فرقًا.',
    tipBtn: 'bg-[#B04A7C] hover:bg-[#9a3e6c]',
    attentionsTitle: 'أمور تحتاج لمستكِ',
    partnerCardBg: 'bg-[#fcf8fa] border-pink-100',
    partnerIconColor: 'text-[#B04A7C]',
    addKidModalTitle: 'إضافة ابن جديد إلى حسابكِ',
    accentColor: '#B04A7C',
    noteForSarah: 'سارة تتقدّم بثبات، لكنها تحتاج دعمًا لطيفًا في الكسور هذا الأسبوع.',
    attentionSarahNote: 'أداء نورة يستحق نظرة منكِ',
  },
  father: {
    roleTitle: 'الأَبْ',
    avatarText: 'أب',
    avatarBg: 'bg-[#eaf4fb]',
    avatarTextCol: 'text-[#1D638D]',
    avatarBorder: 'border-sky-200/70',
    welcomeName: 'أهلًا بأبي عمر',
    welcomeDesc: 'أبناؤك بخير في الغالب، وهناك 3 أمور صغيرة تحتاج لمستك.',
    heroContainer: 'bg-gradient-to-br from-white via-[#fbfdff] to-[#eff6fb] border border-sky-100/70 shadow-[0_8px_30px_-6px_rgba(29,99,141,0.06)]',
    heroOrb1: 'bg-sky-200/40',
    heroOrb2: 'bg-blue-100/40',
    heroGradient: 'from-sky-50/70 via-sky-50/20 to-transparent',
    selectionClass: 'selection:bg-sky-100 selection:text-sky-900',
    pillBadge: 'bg-[#eff6fb] text-[#1D638D] border-sky-200/70',
    primaryBtn: 'bg-[#1a384f] hover:bg-[#132d40]',
    attentionSectionTitle: 'يحتاج انتباهك',
    attentionAccentBorder: 'border-r-[#1D638D]',
    attentionPrimaryBtn: 'bg-[#1D638D] hover:bg-[#154d70]',
    partnerRole: 'الأم',
    partnerRoleInverted: 'الأَبْ',
    inviteBtnLabel: 'دعوة الأم لمشاركة المتابعة',
    inviteCardDesc: 'يمكنك دعوة الأم بضغطة زر لمتابعة الواجبات، ومواعيد الحصص، والمشاركة في القرارات.',
    inviteModalDesc: 'شارك رابط الدعوة مع الأم لتتمكن من تسجيل الدخول والمشاركة في متابعة إنجاز الأبناء والمهام اليومية:',
    inviteCode: 'DAD-5420',
    tipGradient: 'from-sky-50/70 via-white to-amber-50/30 border-sky-200/80',
    tipBadgeBg: 'bg-sky-100/90 text-sky-800',
    tipText: 'عمر أنهى مهامه بإتقان. كلمة تشجيع منك الليلة تصنع فرقًا.',
    tipBtn: 'bg-[#1D638D] hover:bg-[#165074]',
    attentionsTitle: 'أمور تحتاج لمستك',
    partnerCardBg: 'bg-[#f0f6fa] border-sky-100',
    partnerIconColor: 'text-[#1D638D]',
    addKidModalTitle: 'إضافة ابن جديد إلى حسابك',
    accentColor: '#1D638D',
    noteForSarah: 'سارة تتقدّم بثبات، لكنها تحتاج دعمًا ومتابعة في الكسور هذا الأسبوع.',
    attentionSarahNote: 'أداء نورة يستحق نظرة منك',
  },
};

const initialAttentionCards: AttentionCardItem[] = [
  {
    id: 'att-sarah-sub',
    kidId: '1',
    kidName: 'سارة',
    text: 'اشتراك سارة ينتهي بعد 4 أيام.',
    severity: 'danger',
    primaryBtn: {
      label: 'تجديد الاشتراك',
      action: 'quickRenew',
    },
    secondaryBtn: {
      label: 'خيارات أخرى',
      action: 'moreOptions',
    },
  },
  {
    id: 'att-noura-missed',
    kidId: '3',
    kidName: 'نورة',
    text: 'نورة فاتتها جلستان. الأفضل نقلها إلى وقت أنسب.',
    severity: 'danger',
    primaryBtn: {
      label: 'إعادة جدولة',
      action: 'reschedule',
    },
    secondaryBtn: {
      label: 'عرض التفاصيل',
      action: 'viewMissed',
    },
  },
  {
    id: 'att-noura-homework',
    kidId: '3',
    kidName: 'نورة',
    text: 'واجب «تمارين الهمزة المتوسطة» عند نورة متأخر عن موعد التسليم.',
    severity: 'danger',
    primaryBtn: {
      label: 'تسليم الواجب',
      action: 'markSubmittedNoura',
    },
    secondaryBtn: {
      label: 'عرض الواجب',
      action: 'viewHomeworkNoura',
    },
  },
  {
    id: 'att-sarah-math',
    kidId: '1',
    kidName: 'سارة',
    text: '«الرياضيات» عند سارة تراجعت إلى 58%.',
    severity: 'warning',
    primaryBtn: {
      label: 'جلسة تقوية',
      action: 'addRemedy',
    },
    secondaryBtn: {
      label: 'تقرير التشخيص',
      action: 'viewDiagnostic',
    },
  },
  {
    id: 'att-sarah-homework',
    kidId: '1',
    kidName: 'سارة',
    text: 'واجب «حل تمارين الكسور ص 45» عند سارة يُسلَّم غدًا 6:00 م.',
    severity: 'warning',
    primaryBtn: {
      label: 'عرض الواجب',
      action: 'viewHomeworkSarah',
    },
    secondaryBtn: {
      label: 'تسليم الواجب',
      action: 'markSubmittedSarah',
    },
  },
];

interface DailySessionItem {
  id: string;
  kidId: string;
  kidName: string;
  subject: string;
  time: string;
  status: 'completed' | 'upcoming' | 'tonight';
  statusLabel: string;
  isPostponed?: boolean;
}

const initialDailySessions: DailySessionItem[] = [
  {
    id: 'ses-1',
    kidId: '2',
    kidName: 'عمر',
    subject: 'لغتي الجميلة',
    time: '3:30 م',
    status: 'completed',
    statusLabel: 'مكتملة',
  },
  {
    id: 'ses-2',
    kidId: '1',
    kidName: 'سارة',
    subject: 'الرياضيات (الكسور)',
    time: '5:00 م',
    status: 'upcoming',
    statusLabel: 'قادمة',
  },
  {
    id: 'ses-3',
    kidId: '3',
    kidName: 'نورة',
    subject: 'لغتي (الهمزة)',
    time: '6:30 م',
    status: 'tonight',
    statusLabel: 'الليلة',
  },
];

export const MotherDesktopDashboard: React.FC<MotherDesktopDashboardProps> = ({
  initialRole = 'mother',
  onBackToRoleSelect,
}) => {
  const [role, setRole] = useState<ParentRole>(initialRole);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  const theme = roleThemes[role];

  const [kids, setKids] = useState<Kid[]>(initialKids);
  const [attentionCards, setAttentionCards] = useState<AttentionCardItem[]>(initialAttentionCards);
  const [dailySessions, setDailySessions] = useState<DailySessionItem[]>(initialDailySessions);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [activeModal, setActiveModal] = useState<
    | { type: 'renew'; kid: Kid }
    | { type: 'reschedule'; kidName: string }
    | { type: 'remedy'; kidName: string }
    | { type: 'homework'; title: string; kidName: string; details: string; deadline: string; cardId: string }
    | { type: 'diagnostic'; title: string; kidName: string; details: string }
    | { type: 'missedSessions'; kidName: string }
    | { type: 'perf'; kid: Kid; title: string }
    | { type: 'addKid' }
    | { type: 'invite' }
    | { type: 'kidDetail'; kid: Kid }
    | null
  >(null);

  const [encouragementSent, setEncouragementSent] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [attentionFilter, setAttentionFilter] = useState<'all' | '1' | '3'>('all');

  // Top Nav State
  const [activeNav, setActiveNav] = useState<'home' | 'kids' | 'subscriptions' | 'schedule'>('home');
  const [selectedKidForProfile, setSelectedKidForProfile] = useState<string>('1');
  const [openDropdown, setOpenDropdown] = useState<'kids' | 'subscriptions' | 'notifications' | 'profile' | null>(null);
  const [subscriptionSelectedKidId, setSubscriptionSelectedKidId] = useState<string | null>(null);

  // Dynamic notifications state with read tracking
  const [navNotifications, setNavNotifications] = useState([
    {
      id: 'notif-1',
      title: 'تجديد اشتراك سارة',
      time: 'منذ 15د',
      desc: 'باقي 4 أيام على انتهاء اشتراك سارة في الباقة التعليمية.',
      icon: '💳',
      badgeBg: 'bg-pink-100 text-[#B04A7C]',
      cardBg: 'bg-pink-50/70 border-pink-100/90',
      actionText: 'تجديد الآن ←',
      isRead: false,
      type: 'renewSarah' as const,
    },
    {
      id: 'notif-2',
      title: 'واجب متأخر لنورة',
      time: 'منذ ساعة',
      desc: 'واجب تمارين الهمزة المتوسطة لم يُسلّم في موعده.',
      icon: '⚠️',
      badgeBg: 'bg-purple-100 text-[#6F55A3]',
      cardBg: 'bg-purple-50/70 border-purple-100/90',
      actionText: 'عرض تفاصيل الواجب ←',
      isRead: false,
      type: 'homeworkNoura' as const,
    },
    {
      id: 'notif-3',
      title: 'متابعة مستوى سارة',
      time: 'منذ ساعتين',
      desc: 'تراجع طفيف في اختبار الرياضيات (58%) تحتاج جلسة تقوية.',
      icon: '📉',
      badgeBg: 'bg-amber-100 text-amber-800',
      cardBg: 'bg-amber-50/70 border-amber-100/90',
      actionText: 'جدولة جلسة تقوية ←',
      isRead: false,
      type: 'remedySarah' as const,
    },
    {
      id: 'notif-4',
      title: 'إنجاز رائع لعمر!',
      time: 'اليوم',
      desc: 'أتم عمر جميع مهام اليوم بنسبة 100% بإتقان.',
      icon: '🌟',
      badgeBg: 'bg-emerald-100 text-emerald-700',
      cardBg: 'bg-emerald-50/70 border-emerald-100/90',
      actionText: 'عرض الإنجاز ✨',
      isRead: false,
      type: 'achievementOmar' as const,
    },
    {
      id: 'notif-5',
      title: 'موعد حصة الرياضيات',
      time: 'اليوم 4:30 م',
      desc: 'حصة سارة القادمة: الكسور العشرية مع المعلمة منى.',
      icon: '⏰',
      badgeBg: 'bg-sky-100 text-sky-700',
      cardBg: 'bg-sky-50/70 border-sky-100/90',
      actionText: 'تفاصيل الحصة 📅',
      isRead: false,
      type: 'sessionSarah' as const,
    },
  ]);

  const unreadNotificationsCount = navNotifications.filter((n) => !n.isRead).length;

  const markNotificationAsRead = (id: string) => {
    setNavNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNavNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('تم تحديد جميع الإشعارات كمقروءة');
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('#nav-dropdown-area') &&
        !target.closest('.nav-item-trigger') &&
        !target.closest('#mobile-bottom-nav') &&
        !target.closest('#mobile-sheet-area')
      ) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener('click', handleGlobalClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown]);

  const getCardMeta = (item: AttentionCardItem) => {
    if (item.id === 'att-sarah-sub') {
      return {
        category: 'اشتراك',
        urgency: 'danger',
        tag: 'متبقي 4 أيام',
        childColor: 'bg-pink-50 text-[#B04A7C] border-pink-200/70',
        dotColor: 'bg-[#B04A7C]',
      };
    }
    if (item.id === 'att-noura-missed') {
      return {
        category: 'حصص فائتة',
        urgency: 'danger',
        tag: 'جلستان',
        childColor: 'bg-purple-50 text-[#6F55A3] border-purple-200/70',
        dotColor: 'bg-[#6F55A3]',
      };
    }
    if (item.id === 'att-noura-homework') {
      return {
        category: 'واجب متأخر',
        urgency: 'danger',
        tag: 'متأخر',
        childColor: 'bg-purple-50 text-[#6F55A3] border-purple-200/70',
        dotColor: 'bg-[#6F55A3]',
      };
    }
    if (item.id === 'att-sarah-math') {
      return {
        category: 'مستوى دراسي',
        urgency: 'warning',
        tag: '58%',
        childColor: 'bg-pink-50 text-[#B04A7C] border-pink-200/70',
        dotColor: 'bg-[#B04A7C]',
      };
    }
    if (item.id === 'att-sarah-homework') {
      return {
        category: 'واجب',
        urgency: 'info',
        tag: 'غداً 6:00 م',
        childColor: 'bg-pink-50 text-[#B04A7C] border-pink-200/70',
        dotColor: 'bg-[#B04A7C]',
      };
    }
    return {
      category: 'تنبيه',
      urgency: 'info',
      tag: 'متابعة',
      childColor: 'bg-slate-100 text-slate-700 border-slate-200',
      dotColor: 'bg-slate-400',
    };
  };

  const dismissCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAttentionCards((prev) => prev.filter((c) => c.id !== id));
    showToast('تم إخفاء التنبيه بنجاح.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleCardAction = (item: AttentionCardItem, action: string) => {
    if (action === 'quickRenew') {
      setKids((prev) =>
        prev.map((k) =>
          k.id === '1'
            ? {
                ...k,
                subscription: { daysLeft: k.subscription.daysLeft + 30, isAlert: false },
                status: { label: 'ممتاز', type: 'good' },
              }
            : k
        )
      );
      setAttentionCards((prev) => prev.filter((c) => c.id !== item.id));
      showToast('🎉 تم تجديد اشتراك سارة بنجاح بـ 49 ر.س (+30 يومًا).');
    } else if (action === 'moreOptions') {
      setSubscriptionSelectedKidId('1');
      setActiveNav('subscriptions');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'reschedule') {
      setActiveModal({ type: 'reschedule', kidName: item.kidName });
    } else if (action === 'viewMissed') {
      setActiveModal({ type: 'missedSessions', kidName: item.kidName });
    } else if (action === 'markSubmittedNoura') {
      setKids((prev) =>
        prev.map((k) =>
          k.id === '3'
            ? {
                ...k,
                todayTasks: {
                  ...k.todayTasks,
                  done: Math.min(k.todayTasks.total, k.todayTasks.done + 1),
                  percentage: Math.round(((k.todayTasks.done + 1) / k.todayTasks.total) * 100),
                },
              }
            : k
        )
      );
      setAttentionCards((prev) => prev.filter((c) => c.id !== item.id));
      showToast('✅ تم تسجيل تسليم واجب «تمارين الهمزة المتوسطة» لنورة بنجاح!');
    } else if (action === 'viewHomeworkNoura') {
      setActiveModal({
        type: 'homework',
        title: 'واجب «تمارين الهمزة المتوسطة»',
        kidName: 'نورة',
        details: 'كتاب لغتي الجميلة - حل تدريبات كتاب النشاط ص 28-29 حول قواعد رسم الهمزة المتوسطة على الألف والواو والياء.',
        deadline: 'متأخر (كان موعده أمس 07:00 م)',
        cardId: item.id,
      });
    } else if (action === 'addRemedy') {
      setActiveModal({ type: 'remedy', kidName: item.kidName });
    } else if (action === 'viewDiagnostic') {
      setActiveModal({
        type: 'diagnostic',
        title: 'التقرير التشخيصي لمادة الرياضيات',
        kidName: 'سارة',
        details: 'أظهر التقييم الأخير تراجعًا في مفهوم جمع وطرح الكسور الاعتيادية (58%)، بينما أداؤها في الهندسة 92% والحساب الذهني 88%. نوصي بجدولة جلسة علاجية داعمة.',
      });
    } else if (action === 'viewHomeworkSarah') {
      setActiveModal({
        type: 'homework',
        title: 'واجب «حل تمارين الكسور ص 45»',
        kidName: 'سارة',
        details: 'الرياضيات - حل المسائل من 1 إلى 8 في ص 45 مع كتابة خطوات توحيد المقامات بالتفصيل.',
        deadline: 'يُسلَّم غدًا في تمام الساعة 6:00 م',
        cardId: item.id,
      });
    } else if (action === 'markSubmittedSarah') {
      setKids((prev) =>
        prev.map((k) =>
          k.id === '1'
            ? {
                ...k,
                todayTasks: {
                  ...k.todayTasks,
                  done: Math.min(k.todayTasks.total, k.todayTasks.done + 1),
                  percentage: Math.round(((k.todayTasks.done + 1) / k.todayTasks.total) * 100),
                },
              }
            : k
        )
      );
      setAttentionCards((prev) => prev.filter((c) => c.id !== item.id));
      showToast('✅ تم تسجيل تسليم واجب «حل تمارين الكسور ص 45» لسارة بنجاح!');
    }
  };

  const resetAttentionCards = () => {
    setAttentionCards(initialAttentionCards);
    showToast('تمت استعادة كافة التنبيهات التجريبية.');
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
              status: { label: 'ممتاز', type: 'good' },
            }
          : k
      )
    );
    setAttentionCards((prev) => prev.filter((c) => c.kidId !== kidId || !c.id.includes('sub')));
    setActiveModal(null);
    showToast('🎉 تم تجديد الاشتراك وتحديث حساب الطالب بنجاح!');
  };

  const postponeSessionHour = (sessionId: string) => {
    setDailySessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        let newTime = s.time;
        if (s.time.includes('3:30')) newTime = s.time.replace('3:30', '4:30');
        else if (s.time.includes('4:30')) newTime = s.time.replace('4:30', '5:30');
        else if (s.time.includes('5:00')) newTime = s.time.replace('5:00', '6:00');
        else if (s.time.includes('6:00')) newTime = s.time.replace('6:00', '7:00');
        else if (s.time.includes('6:30')) newTime = s.time.replace('6:30', '7:30');
        else if (s.time.includes('7:30')) newTime = s.time.replace('7:30', '8:30');
        else newTime = `${s.time} (+ساعة)`;

        showToast(`⏰ تم تأجيل حصة ${s.kidName} (${s.subject}) ساعة واحدة إلى ${newTime} بنجاح!`);
        return {
          ...s,
          time: newTime,
          statusLabel: 'مؤجلة ساعة',
          isPostponed: true,
        };
      })
    );
  };

  const postponeSessionTomorrow = (sessionId: string) => {
    setDailySessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const cleanTime = s.time.replace(/^غداً\s*/, '');
        const newTime = `غداً ${cleanTime}`;
        showToast(`📅 تم تأجيل حصة ${s.kidName} (${s.subject}) إلى يوم الغد بنجاح!`);
        return {
          ...s,
          time: newTime,
          statusLabel: 'مؤجلة للغد',
          isPostponed: true,
        };
      })
    );
  };

  return (
    <div
      id="parent-desktop-container"
      className={`min-h-screen bg-[#f7f9fb] text-slate-800 font-['Cairo',sans-serif] flex flex-col ${theme.selectionClass}`}
    >
      {/* Top Application Navigation Bar - Identity & Content Matching User Request */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Right Side: Brand & Identity (Open Book Icon + Platform Title + Role Quick Switch) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveNav('home');
                setOpenDropdown(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 sm:gap-2.5 text-right cursor-pointer group focus:outline-hidden"
              title="العودة للصفحة الرئيسية"
            >
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${theme.avatarBg} ${theme.avatarTextCol} flex items-center justify-center shadow-2xs border ${theme.avatarBorder} transition-transform group-hover:scale-105`}>
                <BookOpen className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-tight group-hover:text-sky-800 transition-colors">
                  منصة ولي الأمر
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  متابعة وتوجيه الأبناء
                </span>
              </div>
            </button>

            {/* Desktop Role Quick Switcher Pill */}
            <button
              type="button"
              onClick={() => {
                const nextRole = role === 'mother' ? 'father' : 'mother';
                setRole(nextRole);
                showToast(nextRole === 'mother' ? 'تم التبديل إلى لوحة الأم 👩' : 'تم التبديل إلى لوحة الأب 👨');
              }}
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${theme.pillBadge} cursor-pointer hover:opacity-90 active:scale-95 transition-all shadow-2xs`}
              title="انقر للتبديل السريع بين لوحة الأم ولوحة الأب"
            >
              <span>{role === 'mother' ? '👩 لوحة الأم' : '👨 لوحة الأب'}</span>
              <span className="text-[10px] opacity-70">⇄</span>
            </button>
          </div>

          {/* Mobile Top Header Quick Actions (Role toggle + Add Kid) */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const nextRole = role === 'mother' ? 'father' : 'mother';
                setRole(nextRole);
                showToast(nextRole === 'mother' ? 'تم التبديل إلى لوحة الأم 👩' : 'تم التبديل إلى لوحة الأب 👨');
              }}
              className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${theme.pillBadge} cursor-pointer hover:opacity-90 active:scale-95 transition-all shadow-2xs`}
              title="انقر للتبديل السريع بين لوحة الأم ولوحة الأب"
            >
              <span>{role === 'mother' ? '👩 الأم' : '👨 الأب'}</span>
              <span className="text-[10px] opacity-70">⇄</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModal({ type: 'addKid' })}
              className="h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
              title="إضافة ابن جديد"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة ابن</span>
            </button>
          </div>

          {/* Left Side: 5 Desktop Navigation Items (Hidden on mobile, converted to bottom nav) */}
          <div className="hidden md:flex items-center gap-1.5 relative" id="nav-dropdown-area">
            
            {/* 1. الرئيسية (Home) */}
            <button
              id="nav-tab-home"
              type="button"
              onClick={() => {
                setActiveNav('home');
                setOpenDropdown(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeNav === 'home' && !openDropdown
                  ? `${theme.avatarBg} ${theme.avatarTextCol} border ${theme.avatarBorder} shadow-2xs`
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
              }`}
              title="الصفحة الرئيسية"
            >
              <Home className="w-4 h-4 stroke-[2.2]" />
              <span className="hidden xs:inline">الرئيسية</span>
            </button>

            {/* 2. الجدول (Schedule) */}
            <button
              id="nav-tab-schedule"
              type="button"
              onClick={() => {
                setActiveNav('schedule');
                setOpenDropdown(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeNav === 'schedule' && !openDropdown
                  ? `${theme.avatarBg} ${theme.avatarTextCol} border ${theme.avatarBorder} shadow-2xs`
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
              }`}
              title="الجدول الدراسي الأسبوعي"
            >
              <Calendar className="w-4 h-4 stroke-[2.2]" />
              <span className="hidden xs:inline">الجدول</span>
            </button>

            {/* 2. الأبناء (Kids with Dropdown & Direct Profile Access) */}
            <div className="relative">
              <button
                id="nav-tab-kids"
                type="button"
                onClick={() => {
                  setSelectedKidForProfile('1');
                  setActiveNav('kids');
                  setOpenDropdown(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-item-trigger h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'kids' || openDropdown === 'kids'
                    ? `${theme.avatarBg} ${theme.avatarTextCol} border ${theme.avatarBorder} shadow-2xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
                title="صفحة الأبناء والملف الشامل"
              >
                <Users className="w-4 h-4 stroke-[2.2]" />
                <span className="hidden xs:inline">الأبناء</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'kids' ? 'rotate-180' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(openDropdown === 'kids' ? null : 'kids');
                  }}
                />
              </button>

              {/* Dropdown: Kids Menu */}
              {openDropdown === 'kids' && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-right">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-800">الأبناء المسجلون ({kids.length})</span>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setActiveModal({ type: 'addKid' });
                      }}
                      className="text-xs font-bold text-[#B04A7C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة ابن</span>
                    </button>
                  </div>
                  <div className="space-y-1.5 py-2">
                    {kids.map((kid) => (
                      <div
                        key={kid.id}
                        onClick={() => {
                          setOpenDropdown(null);
                          setSelectedKidForProfile(kid.id);
                          setActiveNav('kids');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-2 sm:p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between gap-2 group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: kid.avatarBg }}
                          >
                            {kid.initial}
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 block group-hover:text-sky-800 transition-colors">{kid.name}</span>
                            <span className="text-xs text-slate-500 block">{kid.grade}</span>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            kid.status.type === 'warn'
                              ? 'bg-amber-50 text-amber-700'
                              : kid.status.type === 'bad'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {kid.status.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        if (activeNav !== 'home') setActiveNav('home');
                        setTimeout(() => {
                          const el = document.getElementById('kids-grid-container') || document.getElementById('hero-banner');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 80);
                      }}
                      className="text-xs sm:text-sm font-bold text-[#1D638D] hover:underline w-full text-center py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      عرض شبكة الأبناء في اللوحة الرئيسية ↓
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. الاشتراكات (Subscriptions) */}
            <div className="relative">
              <button
                id="nav-tab-subscriptions"
                type="button"
                onClick={() => {
                  setActiveNav('subscriptions');
                  setSubscriptionSelectedKidId('all');
                  setOpenDropdown(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-item-trigger h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'subscriptions' || openDropdown === 'subscriptions'
                    ? `${theme.avatarBg} ${theme.avatarTextCol} border ${theme.avatarBorder} shadow-2xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
                title="الاشتراكات والباقات"
              >
                <CreditCard className="w-4 h-4 stroke-[2.2]" />
                <span className="hidden xs:inline">الاشتراكات</span>
                {kids.some((k) => k.subscription.isAlert || k.subscription.daysLeft <= 5) && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="اشتراك ينتهي قريبًا" />
                )}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'subscriptions' ? 'rotate-180' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(openDropdown === 'subscriptions' ? null : 'subscriptions');
                  }}
                />
              </button>

              {/* Dropdown: Subscriptions Menu */}
              {openDropdown === 'subscriptions' && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-right">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-800">حالة اشتراكات الأبناء</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSubscriptionSelectedKidId('all');
                        setActiveNav('subscriptions');
                        setOpenDropdown(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                    >
                      العرض الجماعي
                    </button>
                  </div>
                  <div className="space-y-2 py-2.5">
                    {/* Sarah */}
                    <div
                      onClick={() => {
                        setSubscriptionSelectedKidId('1');
                        setActiveNav('subscriptions');
                        setOpenDropdown(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-2.5 rounded-xl bg-pink-50/50 border border-pink-100 flex items-center justify-between gap-2 hover:bg-pink-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#B04A7C] text-white text-xs font-bold flex items-center justify-center">
                          🐰
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 block">سارة</span>
                          <span className="text-xs text-rose-600 font-semibold block">متبقي 4 أيام (تنبيه تجديد)</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-[#B04A7C] text-white">
                        تجديد ←
                      </span>
                    </div>

                    {/* Omar */}
                    <div
                      onClick={() => {
                        setSubscriptionSelectedKidId('2');
                        setActiveNav('subscriptions');
                        setOpenDropdown(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#2F7FA8] text-white text-xs font-bold flex items-center justify-center">
                          🦁
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 block">عمر</span>
                          <span className="text-xs text-emerald-600 font-semibold block">متبقي 21 يومًا • نشط</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">تفاصيل ←</span>
                    </div>

                    {/* Noura */}
                    <div
                      onClick={() => {
                        setSubscriptionSelectedKidId('3');
                        setActiveNav('subscriptions');
                        setOpenDropdown(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#6F55A3] text-white text-xs font-bold flex items-center justify-center">
                          🦊
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 block">نورة</span>
                          <span className="text-xs text-slate-500 font-medium block">متبقي 12 يومًا • نشط</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">تفاصيل ←</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSubscriptionSelectedKidId('all');
                        setActiveNav('subscriptions');
                        setOpenDropdown(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs sm:text-sm font-bold text-[#1D638D] hover:underline w-full text-center py-1 cursor-pointer"
                    >
                      إدارة الخطط والمدفوعات الجماعية ←
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. الإشعارات (Notifications with Dynamic Badge & Smart Handling) */}
            <div className="relative">
              <button
                id="nav-tab-notifications"
                type="button"
                onClick={() => {
                  setOpenDropdown(openDropdown === 'notifications' ? null : 'notifications');
                }}
                className={`nav-item-trigger h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  openDropdown === 'notifications'
                    ? `${theme.avatarBg} ${theme.avatarTextCol} border ${theme.avatarBorder} shadow-2xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
                title="مركز الإشعارات والتنبيهات"
              >
                <div className="relative flex items-center justify-center">
                  <Bell className="w-4 h-4 stroke-[2.2]" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white text-[10px] font-black rounded-full px-1 min-w-[16px] h-[16px] flex items-center justify-center leading-none shadow-2xs">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </div>
                <span className="hidden xs:inline">الإشعارات</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'notifications' ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown: Notifications List */}
              {openDropdown === 'notifications' && (
                <div className="absolute left-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-right">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      الإشعارات والتنبيهات {unreadNotificationsCount > 0 ? `(${unreadNotificationsCount} جديدة)` : ''}
                    </span>
                    {unreadNotificationsCount > 0 ? (
                      <button
                        type="button"
                        onClick={markAllNotificationsAsRead}
                        className="text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                      >
                        تحديد الكل كمقروء
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-semibold">✓ مقروء بالكامل</span>
                    )}
                  </div>
                  
                  <div className="space-y-2 py-2 max-h-80 overflow-y-auto pr-1">
                    {navNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          if (notif.type === 'renewSarah') {
                            setSubscriptionSelectedKidId('1');
                            setActiveNav('subscriptions');
                            setOpenDropdown(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else if (notif.type === 'homeworkNoura') {
                            setOpenDropdown(null);
                            if (activeNav !== 'home') setActiveNav('home');
                            setActiveModal({
                              type: 'homework',
                              title: 'تمارين الهمزة المتوسطة',
                              kidName: 'نورة',
                              details: 'حل تمارين كتاب لغتي صفحة 34',
                              deadline: 'أمس 7:00 م',
                              cardId: 'att-noura-homework',
                            });
                          } else if (notif.type === 'remedySarah') {
                            setOpenDropdown(null);
                            if (activeNav !== 'home') setActiveNav('home');
                            setActiveModal({ type: 'remedy', kidName: 'سارة' });
                          } else if (notif.type === 'achievementOmar') {
                            setOpenDropdown(null);
                            showToast('🌟 إنجاز مميز: عمر أتم جميع مهام اليوم بنسبة 100% بإتقان تام!');
                          } else if (notif.type === 'sessionSarah') {
                            setOpenDropdown(null);
                            showToast('⏰ موعد حصة الكسور العشرية لسارة في 4:30 م مع المعلمة منى.');
                          }
                        }}
                        className={`p-2.5 sm:p-3 rounded-xl border text-right flex items-start gap-2.5 transition-all cursor-pointer hover:shadow-xs ${
                          notif.isRead
                            ? 'bg-slate-50/70 border-slate-100 opacity-80'
                            : `${notif.cardBg}`
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold mt-0.5 ${notif.badgeBg}`}>
                          {notif.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                              {!notif.isRead && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />}
                              {notif.title}
                            </span>
                            <span className="text-xs text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.desc}</p>
                          <span className="inline-block mt-1 text-xs font-bold text-sky-800 hover:underline">
                            {notif.actionText}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        if (activeNav !== 'home') setActiveNav('home');
                        setTimeout(() => {
                          const el = document.getElementById('attention-center-container') || document.getElementById('hero-banner');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 80);
                      }}
                      className="text-xs sm:text-sm font-bold text-[#1D638D] hover:underline w-full text-center py-1 cursor-pointer"
                    >
                      عرض سجل التنبيهات في اللوحة الرئيسية ↓
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 5. ملفي (Profile with Dropdown & Role Switching) */}
            <div className="relative">
              <button
                id="nav-tab-profile"
                type="button"
                onClick={() => {
                  setOpenDropdown(openDropdown === 'profile' ? null : 'profile');
                }}
                className={`nav-item-trigger h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  openDropdown === 'profile'
                    ? `${theme.avatarBg} ${theme.avatarTextCol} border ${theme.avatarBorder} shadow-2xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
                title="الملف الشخصي والحساب"
              >
                <User className="w-4 h-4 stroke-[2.2]" />
                <span className="hidden xs:inline">ملفي</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'profile' ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown: Profile Menu */}
              {openDropdown === 'profile' && (
                <div className="absolute left-0 mt-2 w-64 sm:w-72 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-right">
                  {/* Parent Identity Header */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100 mb-2">
                    <div className={`w-9 h-9 rounded-xl ${theme.avatarBg} ${theme.avatarTextCol} font-extrabold text-sm flex items-center justify-center shadow-2xs`}>
                      {role === 'mother' ? 'أم' : 'أب'}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                        {role === 'mother' ? 'أمّ عمر' : 'أبو عمر'}
                      </span>
                      <span className="text-xs text-slate-400 block">ولي الأمر الأساسي</span>
                    </div>
                  </div>

                  {/* 1-Click Role Switcher */}
                  <div className="py-2 border-t border-b border-slate-100 my-1">
                    <span className="text-xs font-bold text-slate-500 block mb-1.5 px-1">التبديل بين الحسابات:</span>
                    <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setRole('mother');
                          setOpenDropdown(null);
                          showToast('تم التبديل إلى لوحة الأم 👩');
                        }}
                        className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          role === 'mother'
                            ? 'bg-white text-[#B04A7C] shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>👩</span>
                        <span>الأم</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRole('father');
                          setOpenDropdown(null);
                          showToast('تم التبديل إلى لوحة الأب 👨');
                        }}
                        className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          role === 'father'
                            ? 'bg-white text-[#1D638D] shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>👨</span>
                        <span>الأب</span>
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setActiveModal({ type: 'invite' });
                      }}
                      className="w-full text-right px-2.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>مشاركة الحساب مع الشريك</span>
                      <span className="text-slate-400">🔗</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubscriptionSelectedKidId('all');
                        setActiveNav('subscriptions');
                        setOpenDropdown(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full text-right px-2.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>إدارة خطط واشتراكات الأبناء</span>
                      <CreditCard className="w-4 h-4 text-slate-400" />
                    </button>

                    {onBackToRoleSelect && (
                      <button
                        type="button"
                        onClick={() => {
                          setOpenDropdown(null);
                          onBackToRoleSelect();
                        }}
                        className="w-full text-right px-2.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-rose-700 hover:bg-rose-50 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>تسجيل الخروج / تبديل الحساب</span>
                        <LogOut className="w-4 h-4 text-rose-500" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Main Container - Fully responsive padding with bottom clearance for mobile nav */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-7 pb-24 md:pb-8 flex-1 w-full space-y-4 sm:space-y-6">
        {activeNav === 'kids' ? (
          <KidProfileView
            initialKidId={selectedKidForProfile}
            kids={kids}
            role={role}
            onBack={() => {
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRenewSubscription={(kidId) => {
              setSubscriptionSelectedKidId(kidId);
              setActiveNav('subscriptions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            showToast={showToast}
          />
        ) : activeNav === 'subscriptions' ? (
          <SubscriptionsManager
            role={role}
            kids={kids}
            onBackToHome={() => {
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            showToast={showToast}
            initialSelectedKidId={subscriptionSelectedKidId}
            onRenewSuccess={(kidId, daysAdded) => {
              setKids((prev) =>
                prev.map((k) =>
                  k.id === kidId
                    ? {
                        ...k,
                        subscription: {
                          daysLeft: k.subscription.daysLeft + daysAdded,
                          isAlert: false,
                        },
                      }
                    : k
                )
              );
              if (kidId === '1') {
                setAttentionCards((prev) => prev.filter((c) => c.id !== 'att-sarah-sub'));
              }
            }}
          />
        ) : activeNav === 'schedule' ? (
          <WeeklyScheduleView
            role={role}
            kids={kids}
            onBackToHome={() => {
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            showToast={showToast}
          />
        ) : (
          <>
            {/* Clean, Modern & Unboxed Page Header */}
        <section
          id="hero-banner"
          className="pt-1 sm:pt-2 pb-2 sm:pb-3 border-b border-slate-200/80 mb-2 sm:mb-4"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            
            {/* Greeting, Date & Status */}
            <div className="space-y-1.5 min-w-0">
              {/* Meta tags row */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 text-slate-600 bg-white border border-slate-200/80 px-2.5 py-0.5 rounded-lg shadow-2xs font-bold">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>الإثنين، 22 سبتمبر 2026</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-lg text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>يوم دراسي منتظم</span>
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold border shadow-2xs ${theme.pillBadge}`}>
                  <Sparkles className="w-3 h-3" />
                  <span>{attentionCards.length} أمور تحتاج اهتمامك</span>
                </span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 pt-0.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {role === 'mother' ? 'أهلًا بكِ، أمّ عمر' : 'أهلًا بك، أبو عمر'}
                </h1>
                <span className="text-xl select-none">👋</span>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-2xl">
                {role === 'mother'
                  ? 'أبناؤكِ الثلاثة يواصلون أداء مهامهم المدرسية، وهناك 3 أمور تستحق متابعتكِ لدعمهم.'
                  : 'متابعة شاملة لتقدم الأبناء الدراسي، والواجبات المنجزة، والاطمئنان على جدول اليوم.'}
              </p>
            </div>

            {/* Actions: Add Kid Button */}
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto pt-1 md:pt-0">
              <button
                id="hero-add-kid-btn"
                type="button"
                onClick={() => setActiveModal({ type: 'addKid' })}
                className={`h-8 px-3 rounded-xl ${theme.primaryBtn} text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow active:scale-[0.98] group`}
              >
                <Plus className="w-3.5 h-3.5 text-white stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
                <span>إضافة ابن جديد</span>
              </button>
            </div>

          </div>
        </section>

        {/* Responsive Grid: Stacks on mobile/tablet (<lg), 2-Columns on Desktop (lg+) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Main Column: Kids Section (12 cols on mobile/tablet, 8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#172533]">
                  أبنائي
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {kids.length} أبناء
                </span>
              </div>
              <span className="text-xs text-slate-500">
                {role === 'mother' ? 'انقري على أي بطاقة لعرض التفاصيل الكاملة' : 'انقر على أي بطاقة لعرض التفاصيل الكاملة'}
              </span>
            </div>

            {/* Kids Cards Grid: 1 col on mobile, 2 cols on tablet and large desktop screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {kids.map((kid) => (
                <article
                  key={kid.id}
                  id={`kid-card-${kid.id}`}
                  onClick={() => {
                    setSelectedKidForProfile(kid.id);
                    setActiveNav('kids');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  tabIndex={0}
                  role="button"
                  className="group bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-right outline-none active:scale-[0.99]"
                >
                  {/* Top: Avatar, Name, Grade, Status Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-10 h-10 rounded-xl text-white font-bold text-base flex items-center justify-center shadow-xs shrink-0 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: kid.avatarBg }}
                        >
                          {kid.initial}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#26374a] transition-colors leading-tight">
                            {kid.name}
                          </h3>
                          <span className="text-xs text-slate-500 font-medium">
                            {kid.grade}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
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
                    <p className="text-xs text-slate-600 font-normal leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 mb-3 min-h-[44px]">
                      {kid.id === '1' ? theme.noteForSarah : kid.note}
                    </p>
                  </div>

                  {/* Metrics Box (اليوم + الاشتراك) */}
                  <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100">
                    {/* Cell 1: Today's Tasks & Progress */}
                    <div className="bg-[#f9fafc] p-2 sm:p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-0.5">
                        <span className="font-medium">اليوم</span>
                        <span className="font-bold text-slate-800 text-xs">
                          {kid.todayTasks.done} من {kid.todayTasks.total}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden my-1">
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

                      <span className="text-[11px] text-slate-500 leading-tight line-clamp-1 mt-0.5" title={kid.todayTasks.nextSchedule}>
                        {kid.todayTasks.nextSchedule}
                      </span>
                    </div>

                    {/* Cell 2: Subscription & Action */}
                    <div
                      className={`p-2 sm:p-2.5 rounded-xl border flex flex-col justify-between ${
                        kid.subscription.isAlert
                          ? 'bg-rose-50/50 border-rose-200 text-rose-900'
                          : 'bg-[#f9fafc] border-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className={kid.subscription.isAlert ? 'text-rose-600 font-medium text-xs' : 'text-slate-500 text-xs'}>
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
                            setSubscriptionSelectedKidId(kid.id);
                            setActiveNav('subscriptions');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full mt-1 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                        >
                          تجديد
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 mt-1 block font-medium">
                          متبقية سارية
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Quick Banner for Adding Kid (Directly under the kids cards) */}
            <div
              id="add-kid-secondary-btn"
              onClick={() => setActiveModal({ type: 'addKid' })}
              className="border-2 border-dashed border-slate-200 hover:border-slate-300 hover:bg-white rounded-2xl p-3.5 sm:p-4 text-center cursor-pointer transition-colors flex items-center justify-center gap-2 text-slate-600 font-bold text-xs sm:text-sm active:scale-[0.99] group shadow-2xs"
            >
              <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-colors">
                <Plus className="w-4 h-4 text-slate-600" />
              </div>
              <span>+ إضافة ابن آخر للمنصة</span>
            </div>

            {/* Today's Live Sessions & Schedule */}
            <div id="daily-sessions-schedule" className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Calendar className="w-4 h-4 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      مواعيد حصص اليوم
                    </h3>
                    <p className="text-[11px] text-slate-500 font-normal">
                      يمكنكِ تأجيل أي حصة ساعة واحدة أو ترحيلها إلى الغد بضغطة زر
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                    {dailySessions.length} حصص
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNav('schedule');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#1D638D] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>الجدول الأسبوعي الكامل ←</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-0.5">
                {dailySessions.map((session) => {
                  const isCompleted = session.status === 'completed';
                  const isUpcoming = session.status === 'upcoming';

                  return (
                    <div
                      key={session.id}
                      id={`session-card-${session.id}`}
                      className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-200 ${
                        isCompleted
                          ? 'bg-slate-50/90 border-slate-200/80 hover:bg-slate-50'
                          : isUpcoming
                          ? 'bg-amber-50/30 border-amber-200/80 hover:bg-amber-50/50 hover:shadow-2xs'
                          : 'bg-indigo-50/25 border-indigo-100/90 hover:bg-indigo-50/40 hover:shadow-2xs'
                      }`}
                    >
                      {/* Top Header: Kid Name & Status Badge */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900">
                            {session.kidName}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800'
                                : session.isPostponed
                                ? 'bg-purple-100 text-purple-800 border border-purple-200/60'
                                : isUpcoming
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {session.statusLabel}
                          </span>
                        </div>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                      </div>

                      {/* Content: Subject & Scheduled Time */}
                      <div className="space-y-0.5 mb-2.5">
                        <h4 className="text-xs font-bold text-slate-800 truncate" title={session.subject}>
                          {session.subject}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{session.time}</span>
                        </div>
                      </div>

                      {/* Action Buttons: تأجيل ساعة and تأجيل للغد */}
                      <div className="pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-1 mt-auto">
                        <button
                          type="button"
                          id={`postpone-hour-${session.id}`}
                          onClick={() => postponeSessionHour(session.id)}
                          className="h-7 px-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-700 hover:text-slate-900 text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95 group"
                          title="تأجيل موعد الحصة لمدة ساعة واحدة"
                        >
                          <Clock className="w-3 h-3 text-slate-400 group-hover:text-amber-600 transition-colors shrink-0" />
                          <span className="truncate">تأجيل ساعة</span>
                        </button>

                        <button
                          type="button"
                          id={`postpone-tomorrow-${session.id}`}
                          onClick={() => postponeSessionTomorrow(session.id)}
                          className="h-7 px-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-700 hover:text-slate-900 text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95 group"
                          title="تأجيل موعد الحصة إلى يوم الغد"
                        >
                          <Calendar className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                          <span className="truncate">تأجيل للغد</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Column: Parental Insights & Attentions (12 cols on mobile/tablet, 4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            
            {/* SECTION: يحتاج انتباهكِ (Smart Sidebar Action Widget) */}
            <section
              id="needs-attention-section"
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3 transition-all"
            >
              {/* Header: Title + count badge + reset */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg ${
                      role === 'mother' ? 'bg-pink-50 text-[#B04A7C]' : 'bg-sky-50 text-[#1D638D]'
                    } flex items-center justify-center shrink-0`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                  </div>

                  <h3 className="font-bold text-sm text-[#172533]">
                    {theme.attentionSectionTitle}
                  </h3>

                  {attentionCards.length > 0 && (
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60">
                      {attentionCards.length}
                    </span>
                  )}
                </div>

                {attentionCards.length < initialAttentionCards.length && (
                  <button
                    type="button"
                    onClick={resetAttentionCards}
                    title="استعادة كافة التنبيهات"
                    className="h-7 w-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Minimal Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setAttentionFilter('all')}
                  className={`h-7 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                    attentionFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  الكل ({attentionCards.length})
                </button>

                <button
                  type="button"
                  onClick={() => setAttentionFilter('1')}
                  className={`h-7 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    attentionFilter === '1'
                      ? 'bg-[#B04A7C] text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B04A7C]" />
                  <span>سارة ({attentionCards.filter((c) => c.kidId === '1').length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttentionFilter('3')}
                  className={`h-7 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    attentionFilter === '3'
                      ? 'bg-[#6F55A3] text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6F55A3]" />
                  <span>نورة ({attentionCards.filter((c) => c.kidId === '3').length})</span>
                </button>
              </div>

              {/* Toast Feedback */}
              {toastMessage && (
                <div className="py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium flex items-center justify-between gap-2 animate-in fade-in">
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{toastMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setToastMessage(null)}
                    className="w-5 h-5 flex items-center justify-center text-emerald-600 hover:text-emerald-800 rounded-md transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Stacked Attention Items */}
              <div className="space-y-2.5 pt-0.5">
                {attentionCards
                  .filter((item) => (attentionFilter === 'all' ? true : item.kidId === attentionFilter))
                  .map((item) => {
                    const meta = getCardMeta(item);

                    return (
                      <div
                        key={item.id}
                        id={`attention-item-${item.id}`}
                        className="p-3 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200/80 transition-all space-y-2 group"
                      >
                        {/* Kid Badge & Dismiss */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1.5 shrink-0 ${meta.childColor}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dotColor}`} />
                            <span>{item.kidName}</span>
                          </span>

                          <button
                            type="button"
                            onClick={(e) => dismissCard(item.id, e)}
                            title="إخفاء"
                            className="w-6 h-6 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Alert Text */}
                        <p className="text-xs font-medium text-slate-800 leading-relaxed">
                          {item.text}
                        </p>

                        {/* Standardized Unified Action Button */}
                        <div className="pt-0.5">
                          <button
                            type="button"
                            onClick={() => handleCardAction(item, item.primaryBtn.action)}
                            className={`w-full h-8 rounded-lg text-white text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95 flex items-center justify-center text-center ${theme.attentionPrimaryBtn}`}
                          >
                            {item.primaryBtn.label}
                          </button>
                        </div>
                      </div>
                    );
                  })}

                {/* Empty State */}
                {attentionCards.filter((item) =>
                  attentionFilter === 'all' ? true : item.kidId === attentionFilter
                ).length === 0 && (
                  <div className="py-4 text-center flex flex-col items-center justify-center gap-1.5 text-emerald-700 text-xs font-semibold animate-in fade-in bg-emerald-50/60 rounded-xl border border-emerald-100 p-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      {attentionCards.length === 0
                        ? 'جميع الأمور مستقرة وخطط الأبناء تسير على أكمل وجه.'
                        : `لا توجد تنبيهات معلقة لـ ${attentionFilter === '1' ? 'سارة' : 'نورة'}.`}
                    </span>
                    {attentionCards.length < initialAttentionCards.length && (
                      <button
                        type="button"
                        onClick={resetAttentionCards}
                        className="mt-1 text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                      >
                        استعادة التنبيهات
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Tip of the Day (لمسة اليوم) */}
            <div
              id="tip-of-the-day-card"
              className={`bg-gradient-to-br ${theme.tipGradient} rounded-2xl p-4 sm:p-4.5 shadow-xs relative overflow-hidden transition-all duration-300`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1.5 text-slate-900">
                <div className={`w-7 h-7 rounded-lg ${theme.tipBadgeBg} flex items-center justify-center`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>لمسة اليوم</span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed mb-3">
                {theme.tipText}
              </p>

              <button
                type="button"
                onClick={() => setEncouragementSent(true)}
                disabled={encouragementSent}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  encouragementSent
                    ? 'bg-emerald-100 text-emerald-800'
                    : `${theme.tipBtn} text-white shadow-2xs`
                }`}
              >
                {encouragementSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم إرسال وسام التشجيع لعمر!</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    <span>إرسال كلمة تشجيع لعمر</span>
                  </>
                )}
              </button>
            </div>

            {/* Partner Invitation Card (دعوة الشريك لمشاركة المتابعة) */}
            <div className={`${theme.partnerCardBg} rounded-2xl p-4 sm:p-4.5 border space-y-2.5 text-right transition-all duration-300`}>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <UserPlus className={`w-4 h-4 ${theme.partnerIconColor}`} />
                <span>مشاركة التربية والمتابعة</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {theme.inviteCardDesc}
              </p>
              <button
                type="button"
                onClick={() => setActiveModal({ type: 'invite' })}
                className="w-full py-2 px-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{theme.inviteBtnLabel}</span>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

          </div>
        </div>
          </>
        )}
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
                className={`px-5 py-2 rounded-xl text-xs font-bold ${theme.primaryBtn} text-white shadow-xs cursor-pointer`}
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

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold ${theme.primaryBtn} text-white shadow-xs cursor-pointer`}
              >
                حسناً، فهمت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Reschedule Missed Sessions (نقل الجلسات الفائتة لنورة) */}
      {activeModal?.type === 'reschedule' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 text-right">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>نقل الجلسات الفائتة لـ {activeModal.kidName}</span>
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
              فاتت نورة جلستان تفاعليتان في مادة لغتي. يمكنكِ اختيار موعد بديل مناسب لتعويض ما فاتها مع المعلمة:
            </p>

            <div className="space-y-2.5 mb-5">
              {[
                { day: 'غداً الخميس', time: '04:30 مساءً', teacher: 'أ. منيرة السالم', best: true },
                { day: 'يوم السبت القادم', time: '11:00 صباحاً', teacher: 'أ. منيرة السالم', best: false },
                { day: 'يوم الأحد القادم', time: '05:00 مساءً', teacher: 'أ. هدى الغامدي', best: false },
              ].map((slot, idx) => (
                <label
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    slot.best ? 'border-sky-500 bg-sky-50/40' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input type="radio" name="slot" defaultChecked={slot.best} className="accent-sky-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{slot.day} - {slot.time}</span>
                        {slot.best && (
                          <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded">
                            الموعد المقترح
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500">{slot.teacher}</span>
                    </div>
                  </div>
                </label>
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
                onClick={() => {
                  setAttentionCards((prev) => prev.filter((c) => c.id !== 'att-noura-missed'));
                  setActiveModal(null);
                  showToast('🎉 تم نقل وتأكيد موعد جلستي نورة الفائتتين بنجاح!');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold ${theme.primaryBtn} text-white shadow-xs cursor-pointer`}
              >
                تأكيد النقل إلى الموعد المختار
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: View Missed Sessions Details */}
      {activeModal?.type === 'missedSessions' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 text-right">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-600" />
                <span>الجلسات الفائتة لـ {activeModal.kidName}</span>
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
              قائمة بالحصص التي تغيبت عنها نورة خلال الأسبوع الجاري:
            </p>

            <div className="space-y-3 mb-5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                  <span>لغتي الجميلة: رسم الهمزة المتوسطة</span>
                  <span className="text-rose-600 font-semibold text-[11px]">فائتة (الإثنين الماضي)</span>
                </div>
                <p className="text-[11px] text-slate-500">الهدف التعليمي: التعرف على أقوى الحركات وترتيبها عند كتابة الهمزة المتوسطة.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                  <span>لغتي الجميلة: تدريبات الهمزة على الواو</span>
                  <span className="text-rose-600 font-semibold text-[11px]">فائتة (الثلاثاء الماضي)</span>
                </div>
                <p className="text-[11px] text-slate-500">الهدف التعليمي: تطبيق القواعد الإملائية على نصوص النشاط ص 28.</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                إغلاق
              </button>
              <button
                type="button"
                onClick={() => setActiveModal({ type: 'reschedule', kidName: activeModal.kidName })}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold ${theme.primaryBtn} text-white shadow-xs cursor-pointer`}
              >
                انقل الجلستين الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Remedy Session (إضافة جلسة علاجية لسارة) */}
      {activeModal?.type === 'remedy' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 text-right">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>إضافة جلسة علاجية لـ {activeModal.kidName}</span>
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
              ستركز الجلسة العلاجية مع معلم متخصص على تدريب سارة المكثف في مهارة الكسور الاعتيادية لرفع مستواها فوق 85%.
            </p>

            <div className="space-y-3 mb-5">
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200/80 text-xs text-purple-900">
                <div className="font-bold mb-0.5">الموضوع المستهدف:</div>
                <span>الرياضيات · توحيد المقامات والعمليات على الكسور ص 40-48</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المعلم المقترح للجلسة</label>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">أ. أحمد الصالح (خبير رياضيات ابتدائي)</span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">متاح اليوم</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">موعد الجلسة العلاجية</label>
                <div className="p-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>اليوم 06:15 مساءً (مدة 30 دقيقة)</span>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
              </div>
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
                onClick={() => {
                  setAttentionCards((prev) => prev.filter((c) => c.id !== 'att-sarah-math'));
                  setActiveModal(null);
                  showToast('🎉 تم جدولة الجلسة العلاجية لسارة بنجاح!');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold ${theme.primaryBtn} text-white shadow-xs cursor-pointer`}
              >
                تأكيد حجز الجلسة العلاجية
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Diagnostic Performance Report */}
      {activeModal?.type === 'diagnostic' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 text-right">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
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
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="font-bold text-amber-900">مستوى {activeModal.kidName} في الرياضيات:</span>
                  <span className="text-sm font-black text-amber-900">58% (متراجع)</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {activeModal.details}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">تفصيل المهارات:</span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">الهندسة والأشكال:</span>
                    <span className="font-bold text-emerald-600">92% (ممتاز)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">الحساب الذهني:</span>
                    <span className="font-bold text-emerald-600">88% (جيد جداً)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">الكسور وتوحيد المقامات:</span>
                    <span className="font-bold text-rose-600">58% (يحتاج دعم)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                إغلاق
              </button>
              <button
                type="button"
                onClick={() => setActiveModal({ type: 'remedy', kidName: activeModal.kidName })}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold ${theme.primaryBtn} text-white shadow-xs cursor-pointer`}
              >
                أضف جلسة علاجية الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: View / Submit Homework */}
      {activeModal?.type === 'homework' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 text-right">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
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

            <div className="space-y-3.5 mb-5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>الطالبة: <strong className="text-slate-900">{activeModal.kidName}</strong></span>
                  <span className="font-bold text-rose-600">{activeModal.deadline}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mt-2">
                  {activeModal.details}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900">
                <span>إذا أنهت الطالبة حل التمارين في الكتاب أو الدفتر، يمكنكِ تأكيد التسليم مباشرة بضغطة زر.</span>
              </div>
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
                onClick={() => {
                  setAttentionCards((prev) => prev.filter((c) => c.id !== activeModal.cardId));
                  setActiveModal(null);
                  showToast(`✅ تم تسجيل تسليم ${activeModal.title} بنجاح!`);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
              >
                تم التسليم الآن
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
                className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primaryBtn} text-white shadow-xs cursor-pointer`}
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Add Kid (Redesigned from scratch with exact specified content & interactive controls) */}
      <AddKidModal
        isOpen={activeModal?.type === 'addKid'}
        onClose={() => setActiveModal(null)}
        primaryBtnClass={theme.primaryBtn}
        modalTitle={theme.addKidModalTitle}
        onAddKid={(newKid, extraInfo) => {
          setKids((prev) => [...prev, newKid]);
          showToast(`🎉 تم إضافة الابن «${newKid.name}» بنجاح مع ${extraInfo.subjects.length} مواد دراسية واشتراك تجريبي 7 أيام!`);
        }}
      />

      {/* MODAL 5: Invite Partner */}
      {activeModal?.type === 'invite' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <UserPlus className={`w-4 h-4 ${theme.partnerIconColor}`} />
                <span>{theme.inviteBtnLabel}</span>
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
              {theme.inviteModalDesc}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] text-slate-600 truncate font-mono">
                {`https://parents.platform.edu/invite?code=${theme.inviteCode}`}
              </span>
              <button
                type="button"
                onClick={() => {
                  setInviteCopied(true);
                  setTimeout(() => setInviteCopied(false), 2000);
                }}
                className={`px-3 py-1.5 rounded-lg ${theme.primaryBtn} text-white text-xs font-bold transition-colors cursor-pointer shrink-0`}
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

      {/* MOBILE BOTTOM NAVIGATION BAR (Responsive Mobile Nav) */}
      <nav
        id="mobile-bottom-nav"
        aria-label="شريط التنقل السفلي للجوال"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.07)] px-2 pt-1 pb-[calc(0.4rem+env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 items-center justify-around max-w-lg mx-auto">
          {/* 1. الرئيسية */}
          <button
            type="button"
            id="mobile-nav-home"
            onClick={() => {
              setActiveNav('home');
              setOpenDropdown(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'home' && !openDropdown
                ? `${theme.avatarTextCol} font-extrabold`
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeNav === 'home' && !openDropdown ? `${theme.avatarBg} ${theme.avatarTextCol}` : ''}`}>
              <Home className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[11px] leading-tight mt-0.5">الرئيسية</span>
          </button>

          {/* 2. الجدول */}
          <button
            type="button"
            id="mobile-nav-schedule"
            onClick={() => {
              setActiveNav('schedule');
              setOpenDropdown(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'schedule' && !openDropdown
                ? `${theme.avatarTextCol} font-extrabold`
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeNav === 'schedule' && !openDropdown ? `${theme.avatarBg} ${theme.avatarTextCol}` : ''}`}>
              <Calendar className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[11px] leading-tight mt-0.5">الجدول</span>
          </button>

          {/* 3. الأبناء */}
          <button
            type="button"
            id="mobile-nav-kids"
            onClick={() => {
              if (activeNav === 'kids' && !openDropdown) {
                setOpenDropdown('kids');
              } else if (openDropdown === 'kids') {
                setOpenDropdown(null);
              } else {
                setSelectedKidForProfile('1');
                setActiveNav('kids');
                setOpenDropdown(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              (activeNav === 'kids' && !openDropdown) || openDropdown === 'kids'
                ? `${theme.avatarTextCol} font-extrabold`
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeNav === 'kids' || openDropdown === 'kids' ? `${theme.avatarBg} ${theme.avatarTextCol}` : ''}`}>
              <Users className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[11px] leading-tight mt-0.5">الأبناء</span>
          </button>

          {/* 4. الاشتراكات */}
          <button
            type="button"
            id="mobile-nav-subscriptions"
            onClick={() => {
              if (activeNav === 'subscriptions' && !openDropdown) {
                setOpenDropdown('subscriptions');
              } else if (openDropdown === 'subscriptions') {
                setOpenDropdown(null);
              } else {
                setActiveNav('subscriptions');
                setSubscriptionSelectedKidId('all');
                setOpenDropdown(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              (activeNav === 'subscriptions' && !openDropdown) || openDropdown === 'subscriptions'
                ? `${theme.avatarTextCol} font-extrabold`
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className="relative">
              <div className={`p-1 rounded-xl transition-colors ${activeNav === 'subscriptions' || openDropdown === 'subscriptions' ? `${theme.avatarBg} ${theme.avatarTextCol}` : ''}`}>
                <CreditCard className="w-5 h-5 stroke-[2.2]" />
              </div>
              {kids.some((k) => k.subscription.isAlert || k.subscription.daysLeft <= 5) && (
                <span className="absolute top-0.5 -left-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
              )}
            </div>
            <span className="text-[11px] leading-tight mt-0.5">الاشتراكات</span>
          </button>

          {/* 5. حسابي مع تنبيه الإشعارات */}
          <button
            type="button"
            id="mobile-nav-profile"
            onClick={() => {
              setOpenDropdown(openDropdown === 'profile' ? null : 'profile');
            }}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              openDropdown === 'profile'
                ? `${theme.avatarTextCol} font-extrabold`
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className="relative">
              <div className={`w-7 h-7 rounded-xl ${openDropdown === 'profile' ? `${theme.avatarBg} ${theme.avatarTextCol} ring-2 ring-current` : 'bg-slate-100 text-slate-700'} flex items-center justify-center text-xs font-bold transition-all shadow-2xs`}>
                {role === 'mother' ? '👩' : '👨'}
              </div>
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[9px] font-black rounded-full px-1 min-w-[15px] h-[15px] flex items-center justify-center leading-none ring-2 ring-white shadow-2xs">
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-tight mt-0.5">حسابي</span>
          </button>
        </div>
      </nav>

      {/* MOBILE BOTTOM SHEETS FOR MENUS */}
      {openDropdown && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          {/* Backdrop dismiss */}
          <div className="flex-1" onClick={() => setOpenDropdown(null)} />

          {/* Sheet Container */}
          <div
            id="mobile-sheet-area"
            className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-4 border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-200 text-right pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

            {/* 1. Mobile Sheet: Kids */}
            {openDropdown === 'kids' && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-800">الأبناء المسجلون ({kids.length})</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setActiveModal({ type: 'addKid' });
                      }}
                      className="text-xs font-bold text-[#B04A7C] hover:underline flex items-center gap-1 cursor-pointer bg-pink-50 px-2.5 py-1 rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة ابن</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(null)}
                      className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 py-3">
                  {kids.map((kid) => (
                    <div
                      key={kid.id}
                      onClick={() => {
                        setOpenDropdown(null);
                        setSelectedKidForProfile(kid.id);
                        setActiveNav('kids');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors cursor-pointer flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs"
                          style={{ backgroundColor: kid.avatarBg }}
                        >
                          {kid.initial}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900 block">{kid.name}</span>
                          <span className="text-xs text-slate-500 block">{kid.grade}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            kid.status.type === 'warn'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                              : kid.status.type === 'bad'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200/80'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          }`}
                        >
                          {kid.status.label}
                        </span>
                        <ChevronLeft className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      if (activeNav !== 'home') setActiveNav('home');
                      setTimeout(() => {
                        const el = document.getElementById('kids-grid-container') || document.getElementById('hero-banner');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 80);
                    }}
                    className="text-xs sm:text-sm font-bold text-[#1D638D] hover:underline w-full text-center py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    عرض شبكة الأبناء في اللوحة الرئيسية ↓
                  </button>
                </div>
              </div>
            )}

            {/* 2. Mobile Sheet: Subscriptions */}
            {openDropdown === 'subscriptions' && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-800">حالة اشتراكات الأبناء</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubscriptionSelectedKidId('all');
                        setActiveNav('subscriptions');
                        setOpenDropdown(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                    >
                      العرض الجماعي
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(null)}
                      className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 py-3">
                  {/* Sarah */}
                  <div
                    onClick={() => {
                      setSubscriptionSelectedKidId('1');
                      setActiveNav('subscriptions');
                      setOpenDropdown(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#B04A7C] text-white text-xs font-bold flex items-center justify-center">
                        🐰
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">سارة</span>
                        <span className="text-xs text-rose-600 font-semibold block">متبقي 4 أيام (تنبيه تجديد)</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#B04A7C] text-white shadow-2xs">
                      تجديد ←
                    </span>
                  </div>

                  {/* Omar */}
                  <div
                    onClick={() => {
                      setSubscriptionSelectedKidId('2');
                      setActiveNav('subscriptions');
                      setOpenDropdown(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#2F7FA8] text-white text-xs font-bold flex items-center justify-center">
                        🦁
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">عمر</span>
                        <span className="text-xs text-emerald-600 font-semibold block">متبقي 21 يومًا • نشط</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">تفاصيل ←</span>
                  </div>

                  {/* Noura */}
                  <div
                    onClick={() => {
                      setSubscriptionSelectedKidId('3');
                      setActiveNav('subscriptions');
                      setOpenDropdown(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#6F55A3] text-white text-xs font-bold flex items-center justify-center">
                        🦊
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">نورة</span>
                        <span className="text-xs text-slate-500 font-medium block">متبقي 12 يومًا • نشط</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">تفاصيل ←</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSubscriptionSelectedKidId('all');
                      setActiveNav('subscriptions');
                      setOpenDropdown(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs sm:text-sm font-bold text-[#1D638D] hover:underline w-full text-center py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    إدارة الخطط والمدفوعات الجماعية ←
                  </button>
                </div>
              </div>
            )}

            {/* 3. Mobile Sheet: Notifications */}
            {openDropdown === 'notifications' && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-800">
                    الإشعارات {unreadNotificationsCount > 0 ? `(${unreadNotificationsCount} جديدة)` : ''}
                  </span>
                  <div className="flex items-center gap-2">
                    {unreadNotificationsCount > 0 ? (
                      <button
                        type="button"
                        onClick={markAllNotificationsAsRead}
                        className="text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                      >
                        تحديد الكل كمقروء
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-semibold">✓ مقروء بالكامل</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(null)}
                      className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 py-3 max-h-[55vh] overflow-y-auto">
                  {navNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.type === 'renewSarah') {
                          setSubscriptionSelectedKidId('1');
                          setActiveNav('subscriptions');
                          setOpenDropdown(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else if (notif.type === 'homeworkNoura') {
                          setOpenDropdown(null);
                          if (activeNav !== 'home') setActiveNav('home');
                          setActiveModal({
                            type: 'homework',
                            title: 'تمارين الهمزة المتوسطة',
                            kidName: 'نورة',
                            details: 'حل تمارين كتاب لغتي صفحة 34',
                            deadline: 'أمس 7:00 م',
                            cardId: 'att-noura-homework',
                          });
                        } else if (notif.type === 'remedySarah') {
                          setOpenDropdown(null);
                          if (activeNav !== 'home') setActiveNav('home');
                          setActiveModal({ type: 'remedy', kidName: 'سارة' });
                        } else if (notif.type === 'achievementOmar') {
                          setOpenDropdown(null);
                          showToast('🌟 إنجاز مميز: عمر أتم جميع مهام اليوم بنسبة 100% بإتقان تام!');
                        } else if (notif.type === 'sessionSarah') {
                          setOpenDropdown(null);
                          showToast('⏰ موعد حصة الكسور العشرية لسارة في 4:30 م مع المعلمة منى.');
                        }
                      }}
                      className={`p-3 rounded-2xl border text-right flex items-start gap-3 transition-all cursor-pointer ${
                        notif.isRead
                          ? 'bg-slate-50/70 border-slate-100 opacity-80'
                          : `${notif.cardBg}`
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base font-bold mt-0.5 ${notif.badgeBg}`}>
                        {notif.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            {!notif.isRead && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />}
                            {notif.title}
                          </span>
                          <span className="text-xs text-slate-400">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.desc}</p>
                        <span className="inline-block mt-1 text-xs font-bold text-sky-800 hover:underline">
                          {notif.actionText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      if (activeNav !== 'home') setActiveNav('home');
                      setTimeout(() => {
                        const el = document.getElementById('attention-center-container') || document.getElementById('hero-banner');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 80);
                    }}
                    className="text-xs sm:text-sm font-bold text-[#1D638D] hover:underline w-full text-center py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    عرض سجل التنبيهات في اللوحة الرئيسية ↓
                  </button>
                </div>
              </div>
            )}

            {/* 4. Mobile Sheet: Profile */}
            {openDropdown === 'profile' && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-xl ${theme.avatarBg} ${theme.avatarTextCol} font-extrabold text-base flex items-center justify-center shadow-2xs`}>
                      {role === 'mother' ? 'أم' : 'أب'}
                    </div>
                    <div>
                      <span className="text-sm font-extrabold text-slate-900 block">
                        {role === 'mother' ? 'أمّ عمر' : 'أبو عمر'}
                      </span>
                      <span className="text-xs text-slate-400 block">ولي الأمر الأساسي</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 1-Click Role Switcher */}
                <div className="py-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 block mb-2">التبديل بين الحسابات:</span>
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => {
                        setRole('mother');
                        setOpenDropdown(null);
                        showToast('تم التبديل إلى لوحة الأم 👩');
                      }}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        role === 'mother'
                          ? 'bg-white text-[#B04A7C] shadow-2xs font-extrabold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>👩</span>
                      <span>لوحة الأم</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRole('father');
                        setOpenDropdown(null);
                        showToast('تم التبديل إلى لوحة الأب 👨');
                      }}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        role === 'father'
                          ? 'bg-white text-[#1D638D] shadow-2xs font-extrabold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>👨</span>
                      <span>لوحة الأب</span>
                    </button>
                  </div>
                </div>

                {/* Notifications in Profile Sheet */}
                <div className="py-2.5 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown('notifications')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-right cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-slate-600" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">التنبيهات والإشعارات</span>
                    </div>
                    {unreadNotificationsCount > 0 ? (
                      <span className="text-xs font-black px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-2xs">
                        {unreadNotificationsCount} جديدة
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">لا توجد إشعارات جديدة</span>
                    )}
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="space-y-1.5 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      setActiveModal({ type: 'invite' });
                    }}
                    className="w-full text-right px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer bg-slate-50/50"
                  >
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-slate-500" />
                      <span>مشاركة الحساب مع الشريك</span>
                    </span>
                    <span className="text-slate-400">🔗</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubscriptionSelectedKidId('all');
                      setActiveNav('subscriptions');
                      setOpenDropdown(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-right px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer bg-slate-50/50"
                  >
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-500" />
                      <span>إدارة خطط واشتراكات الأبناء</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>

                  {onBackToRoleSelect && (
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        onBackToRoleSelect();
                      }}
                      className="w-full text-right px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-rose-700 hover:bg-rose-50 flex items-center justify-between transition-colors cursor-pointer bg-rose-50/30"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>تسجيل الخروج / تبديل الحساب</span>
                      </span>
                      <ChevronLeft className="w-4 h-4 text-rose-400" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
