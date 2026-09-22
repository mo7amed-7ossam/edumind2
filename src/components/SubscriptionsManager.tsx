import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  Clock,
  Calendar,
  CreditCard,
  ShieldCheck,
  Download,
  AlertCircle,
  Zap,
  Award,
  Users,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { Kid } from '../types';

export type PlanType = 'm' | 'q' | 'y';

export interface PlanConfig {
  id: PlanType;
  name: string;
  price: number;
  period: string;
  monthlyEquivalent: number;
  savings?: string;
  isPopular?: boolean;
  features: string[];
}

export const SUBSCRIPTION_PLANS: PlanConfig[] = [
  {
    id: 'm',
    name: 'شهري',
    price: 49,
    period: 'كل شهر',
    monthlyEquivalent: 49,
    features: [
      'وصول كامل للمناهج والدروس التفاعلية',
      'بنك أسئلة واختبارات قياس المستوى',
      'تقارير متابعة أسبوعية لولي الأمر',
      'تصحيح فوري للواجبات',
    ],
  },
  {
    id: 'q',
    name: '3 أشهر (فصلي)',
    price: 129,
    period: 'كل 3 أشهر',
    monthlyEquivalent: 43,
    savings: 'وفّر 12%',
    isPopular: true,
    features: [
      'جميع مميزات الخطة الشهرية',
      'حصص تقوية علاجية للمواد الضعيفة',
      'تقارير تفصيلية لتشخيص نقاط الضعف',
      'أولوية الإجابة على الأسئلة من المعلمين',
    ],
  },
  {
    id: 'y',
    name: 'سنوي (عام دراسي)',
    price: 449,
    period: 'كل سنة',
    monthlyEquivalent: 37,
    savings: 'وفّر 24%',
    features: [
      'جميع مميزات الخطط السابقة',
      'شهر إضافي مجاني للمراجعات النهائية',
      'جلسات استشارية شهرية مع أخصائي تعليمي',
      'شهادات تميز ومكافآت تحفيزية للابن',
      'دعم على مدار الساعة لولي الأمر والابن',
    ],
  },
];

interface KidSubscriptionState {
  id: string;
  name: string;
  grade: string;
  emoji: string;
  color: string;
  daysLeft: number;
  selectedPlan: PlanType;
  currentPlan: PlanType;
  endDateStr: string;
  afterRenewDateStr: Record<PlanType, string>;
  paymentHistory: {
    id: string;
    date: string;
    amount: number;
    planName: string;
    status: 'مدفوعة';
  }[];
}

interface SubscriptionsManagerProps {
  role: 'mother' | 'father';
  kids: Kid[];
  onBackToHome: () => void;
  showToast: (msg: string) => void;
  onRenewSuccess?: (kidId: string, daysAdded: number) => void;
  initialSelectedKidId?: string | null;
}

export const SubscriptionsManager: React.FC<SubscriptionsManagerProps> = ({
  role,
  kids,
  onBackToHome,
  showToast,
  onRenewSuccess,
  initialSelectedKidId = null,
}) => {
  // Selected view: 'all' for collective, or kid.id for individual view
  const [selectedKidTab, setSelectedKidTab] = useState<string>(
    initialSelectedKidId || 'all'
  );

  // Kid subscriptions state initialized from original data
  const [kidSubs, setKidSubs] = useState<Record<string, KidSubscriptionState>>({
    '1': {
      id: '1',
      name: 'سارة',
      grade: 'الصف الخامس',
      emoji: '🐰',
      color: '#B04A7C',
      daysLeft: 4,
      selectedPlan: 'm',
      currentPlan: 'm',
      endDateStr: '26 سبتمبر 2026',
      afterRenewDateStr: {
        m: '26 أكتوبر 2026',
        q: '26 ديسمبر 2026',
        y: '26 سبتمبر 2027',
      },
      paymentHistory: [
        {
          id: 'INV-2026-081',
          date: '26 أغسطس 2026',
          amount: 49,
          planName: 'الاشتراك الشهري',
          status: 'مدفوعة',
        },
        {
          id: 'INV-2026-072',
          date: '26 يوليو 2026',
          amount: 49,
          planName: 'الاشتراك الشهري',
          status: 'مدفوعة',
        },
      ],
    },
    '2': {
      id: '2',
      name: 'عمر',
      grade: 'الصف السادس',
      emoji: '🦁',
      color: '#2A749B',
      daysLeft: 21,
      selectedPlan: 'm',
      currentPlan: 'm',
      endDateStr: '13 أكتوبر 2026',
      afterRenewDateStr: {
        m: '12 نوفمبر 2026',
        q: '12 يناير 2027',
        y: '13 أكتوبر 2027',
      },
      paymentHistory: [
        {
          id: 'INV-2026-083',
          date: '13 سبتمبر 2026',
          amount: 49,
          planName: 'الاشتراك الشهري',
          status: 'مدفوعة',
        },
        {
          id: 'INV-2026-064',
          date: '13 أغسطس 2026',
          amount: 49,
          planName: 'الاشتراك الشهري',
          status: 'مدفوعة',
        },
      ],
    },
    '3': {
      id: '3',
      name: 'نورة',
      grade: 'الصف الثالث',
      emoji: '🦊',
      color: '#6F55A3',
      daysLeft: 12,
      selectedPlan: 'q',
      currentPlan: 'q',
      endDateStr: '4 أكتوبر 2026',
      afterRenewDateStr: {
        m: '4 نوفمبر 2026',
        q: '2 يناير 2027',
        y: '4 أكتوبر 2027',
      },
      paymentHistory: [
        {
          id: 'INV-2026-045',
          date: '4 يوليو 2026',
          amount: 129,
          planName: 'اشتراك 3 أشهر (فصلي)',
          status: 'مدفوعة',
        },
      ],
    },
  });

  const [paymentSuccessModal, setPaymentSuccessModal] = useState<{
    kidName: string;
    planName: string;
    amount: number;
    newEndDate: string;
  } | null>(null);

  // Handle plan selection change for a kid
  const handleSelectPlan = (kidId: string, plan: PlanType) => {
    setKidSubs((prev) => ({
      ...prev,
      [kidId]: {
        ...prev[kidId],
        selectedPlan: plan,
      },
    }));
  };

  // Renew a single kid's subscription
  const handleRenewKid = (kidId: string) => {
    const kid = kidSubs[kidId];
    if (!kid) return;

    const planConfig = SUBSCRIPTION_PLANS.find((p) => p.id === kid.selectedPlan) || SUBSCRIPTION_PLANS[0];
    const daysToAdd = kid.selectedPlan === 'y' ? 365 : kid.selectedPlan === 'q' ? 90 : 30;
    const newDays = kid.daysLeft + daysToAdd;
    const newEnd = kid.afterRenewDateStr[kid.selectedPlan];

    setKidSubs((prev) => ({
      ...prev,
      [kidId]: {
        ...prev[kidId],
        daysLeft: newDays,
        currentPlan: kid.selectedPlan,
        endDateStr: newEnd,
        paymentHistory: [
          {
            id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
            date: 'اليوم (22 سبتمبر 2026)',
            amount: planConfig.price,
            planName: `الاشتراك ${planConfig.name}`,
            status: 'مدفوعة',
          },
          ...prev[kidId].paymentHistory,
        ],
      },
    }));

    if (onRenewSuccess) {
      onRenewSuccess(kidId, daysToAdd);
    }

    setPaymentSuccessModal({
      kidName: kid.name,
      planName: planConfig.name,
      amount: planConfig.price,
      newEndDate: newEnd,
    });

    showToast(`🎉 تم تجديد اشتراك ${kid.name} بنجاح حتى ${newEnd}!`);
  };

  // Renew all kids at once
  const handleRenewAll = () => {
    const totalAmount = Object.values(kidSubs).reduce((acc, k) => {
      const plan = SUBSCRIPTION_PLANS.find((p) => p.id === k.selectedPlan);
      return acc + (plan?.price || 49);
    }, 0);

    setKidSubs((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((id) => {
        const k = updated[id];
        const days = k.selectedPlan === 'y' ? 365 : k.selectedPlan === 'q' ? 90 : 30;
        updated[id] = {
          ...k,
          daysLeft: k.daysLeft + days,
          currentPlan: k.selectedPlan,
          endDateStr: k.afterRenewDateStr[k.selectedPlan],
        };
      });
      return updated;
    });

    showToast(`🎉 تم تجديد اشتراكات جميع الأبناء بنجاح بمجموع ${totalAmount} ر.س!`);
  };

  // Calculate monthly total for all kids based on selected plans
  const totalMonthlyAmount = Object.values(kidSubs).reduce((acc, k) => {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === k.selectedPlan);
    return acc + (plan?.monthlyEquivalent || 49);
  }, 0);

  const activeKidData = selectedKidTab !== 'all' ? kidSubs[selectedKidTab] : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="subscriptions-view">
      
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100 shadow-2xs">
              <CreditCard className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              إدارة الاشتراكات والخطط
            </h1>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            اختر الخطة المناسبة لكل ابن، وجدّد بضغطة واحدة مع تفعيل فوري لكافة المناهج والحصص.
          </p>
        </div>

        {/* View Switcher Tabs: Collective vs Individual Kids */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 ml-1">طريقة العرض:</span>
          
          {/* Collective tab */}
          <button
            type="button"
            onClick={() => setSelectedKidTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedKidTab === 'all'
                ? 'bg-[#26374a] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>جميع الأبناء (العرض الجماعي)</span>
          </button>

          {/* Individual kid tabs */}
          {Object.values(kidSubs).map((kid) => {
            const isExpiring = kid.daysLeft <= 5;
            return (
              <button
                key={kid.id}
                type="button"
                onClick={() => setSelectedKidTab(kid.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedKidTab === kid.id
                    ? 'bg-white text-slate-900 border-2 shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
                style={{
                  borderColor: selectedKidTab === kid.id ? kid.color : 'transparent',
                }}
              >
                <span>{kid.emoji}</span>
                <span>اشتراك {kid.name}</span>
                {isExpiring && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="ينتهي قريباً" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: Collective View (جميع الأبناء) */}
      {selectedKidTab === 'all' && (
        <div className="space-y-6">
          
          {/* Quick Notice Banner if any kid has low days */}
          {kidSubs['1']?.daysLeft <= 5 && (
            <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-rose-900">
                    تنبيه: اشتراك سارة ينتهي خلال 4 أيام!
                  </h4>
                  <p className="text-xs text-rose-700">
                    جدّد الاشتراك الآن لتجنب انقطاع المتابعة أو تأخر تسليم الواجبات المدرسية.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedKidTab('1')}
                className="self-start sm:self-auto text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-2xs"
              >
                تجديد اشتراك سارة
              </button>
            </div>
          )}

          {/* Cards for each kid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {Object.values(kidSubs).map((kid) => {
              const selectedPlanObj =
                SUBSCRIPTION_PLANS.find((p) => p.id === kid.selectedPlan) || SUBSCRIPTION_PLANS[0];
              const isUrgent = kid.daysLeft <= 5;

              return (
                <section
                  key={kid.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
                  style={{ borderTop: `3px solid ${kid.color}` }}
                >
                  {/* Card Header */}
                  <div className="p-3.5 sm:p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-10 h-10 rounded-xl text-xl flex items-center justify-center shadow-2xs"
                          style={{
                            backgroundColor: `${kid.color}15`,
                            color: kid.color,
                            border: `1px solid ${kid.color}30`,
                          }}
                        >
                          {kid.emoji}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                            {kid.name}
                          </h3>
                          <span className="text-xs text-slate-500 font-medium">{kid.grade}</span>
                        </div>
                      </div>

                      {/* Remaining Days Badge */}
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-2xs ${
                          isUrgent
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/70 animate-pulse'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{kid.daysLeft} أيام متبقية</span>
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="text-slate-500">الخطة الحالية:</span>
                      <span className="font-bold text-slate-800">
                        {kid.currentPlan === 'm' ? 'شهري (49 ر.س)' : kid.currentPlan === 'q' ? '3 أشهر (129 ر.س)' : 'سنوي (449 ر.س)'}
                      </span>
                    </div>
                  </div>

                  {/* Plan Selection Tiles (Tiles with radio buttons) */}
                  <div className="p-3.5 sm:p-4 space-y-2 flex-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      اختر مدة التجديد:
                    </label>

                    <div className="grid grid-cols-1 gap-2" role="radiogroup" aria-label={`خطة اشتراك ${kid.name}`}>
                      {SUBSCRIPTION_PLANS.map((plan) => {
                        const isSelected = kid.selectedPlan === plan.id;
                        const isCurrent = kid.currentPlan === plan.id;

                        return (
                          <div
                            key={plan.id}
                            onClick={() => handleSelectPlan(kid.id, plan.id)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isSelected
                                ? 'bg-slate-50/90 shadow-2xs'
                                : 'bg-white hover:bg-slate-50/50 border-slate-200/80'
                            }`}
                            style={{
                              borderColor: isSelected ? kid.color : undefined,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {/* Custom Radio Circle */}
                              <div
                                className="w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors shrink-0"
                                style={{
                                  borderColor: isSelected ? kid.color : '#cbd5e1',
                                  backgroundColor: isSelected ? kid.color : 'white',
                                }}
                              >
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>

                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-bold text-slate-900">
                                    {plan.name}
                                  </span>
                                  {isCurrent && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                                      الحالية
                                    </span>
                                  )}
                                  {plan.savings && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                      {plan.savings}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-500 block">
                                  {plan.id === 'm' ? 'كل شهر' : `نحو ${plan.monthlyEquivalent} ر.س/شهر`}
                                </span>
                              </div>
                            </div>

                            <div className="text-left shrink-0">
                              <span className="text-xs sm:text-sm font-bold text-slate-900 block" style={{ color: isSelected ? kid.color : undefined }}>
                                {plan.price} ر.س
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Expiry calculation text */}
                    <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100 leading-relaxed">
                      <span>ينتهي في: </span>
                      <strong className="text-slate-800 font-bold">{kid.endDateStr}</strong>
                      <br />
                      <span>وبعد التجديد: </span>
                      <strong className="text-emerald-700 font-bold">{kid.afterRenewDateStr[kid.selectedPlan]}</strong>
                    </div>
                  </div>

                  {/* Card Footer with Renew Button & Individual Link */}
                  <div className="p-3.5 sm:p-4 bg-slate-50/70 border-t border-slate-100 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => handleRenewKid(kid.id)}
                      className="w-full h-9.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow active:scale-[0.98]"
                      style={{ backgroundColor: kid.color }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>جدّد بـ {selectedPlanObj.price} ر.س</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedKidTab(kid.id)}
                      className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-0.5 cursor-pointer"
                    >
                      عرض الصفحة الفردية لـ {kid.name} ←
                    </button>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Total Summary Bar - Styled matching the user request with our aesthetic */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4.5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3.5">
            <div className="flex items-center gap-2.5 text-right">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  المجموع الشهري لكل الأبناء (3 أبناء)
                </h4>
                <p className="text-xs text-slate-500">
                  محسوب على الخطط المحددة أعلاه، ويشمل الوصول الكامل للمنصة
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-left">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {totalMonthlyAmount} <span className="text-xs sm:text-sm font-bold text-slate-500">ر.س/شهر</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleRenewAll}
                className="h-11 px-6 rounded-xl bg-[#26374a] hover:bg-[#1d2b3a] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>تجديد الكل بضغطة واحدة</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: Individual Kid Deep Dive Page (الصفحة الفردية) */}
      {selectedKidTab !== 'all' && activeKidData && (
        <div className="space-y-6">
          
          {/* Kid Profile Header Card */}
          <div
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            style={{ borderRight: `6px solid ${activeKidData.color}` }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-3xl flex items-center justify-center shadow-xs"
                style={{
                  backgroundColor: `${activeKidData.color}15`,
                  color: activeKidData.color,
                  border: `1.5px solid ${activeKidData.color}30`,
                }}
              >
                {activeKidData.emoji}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    اشتراك {activeKidData.name}
                  </h2>
                  <span className="text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                    {activeKidData.grade}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  المسار التعليمي المنتظم • تاريخ الانتهاء الحالي:{' '}
                  <strong className="text-slate-800">{activeKidData.endDateStr}</strong>
                </p>
              </div>
            </div>

            {/* Countdown / Days left pill */}
            <div className="flex items-center gap-3">
              <div
                className={`p-3.5 rounded-xl border text-right ${
                  activeKidData.daysLeft <= 5
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{activeKidData.daysLeft <= 5 ? 'تنبيه انتهاء قريب' : 'الاشتراك نشط'}</span>
                </div>
                <div className="text-xl font-black mt-0.5">
                  {activeKidData.daysLeft} يومًا متبقية
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedKidTab('all')}
                className="h-11 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>عرض الكل</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Plan Comparison for This Child */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              اختر خطة التجديد المناسبة لـ {activeKidData.name}:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isSelected = activeKidData.selectedPlan === plan.id;
                const isCurrent = activeKidData.currentPlan === plan.id;

                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlan(activeKidData.id, plan.id)}
                    className={`bg-white rounded-2xl border-2 transition-all p-5 sm:p-6 flex flex-col justify-between cursor-pointer relative shadow-2xs hover:shadow-md ${
                      isSelected
                        ? 'border-slate-900 shadow-md ring-2 ring-slate-900/5'
                        : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                    style={{
                      borderColor: isSelected ? activeKidData.color : undefined,
                    }}
                  >
                    {/* Badge for Popular or Savings */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-black text-slate-900">
                        {plan.name}
                      </span>
                      {plan.savings && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          {plan.savings}
                        </span>
                      )}
                      {isCurrent && !plan.savings && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          الخطة الحالية
                        </span>
                      )}
                    </div>

                    {/* Price block */}
                    <div className="py-2.5 border-b border-slate-100 mb-3.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900" style={{ color: isSelected ? activeKidData.color : undefined }}>
                          {plan.price}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-500">ر.س / {plan.period}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-slate-500 font-medium block mt-1">
                        {plan.id === 'm' ? 'تجديد شهري مرن' : `يعادل ${plan.monthlyEquivalent} ر.س شهرياً`}
                      </span>
                    </div>

                    {/* Features Checklist */}
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-5 flex-1 leading-relaxed">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Select indicator */}
                    <div
                      className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-center transition-colors ${
                        isSelected
                          ? 'text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                      }`}
                      style={{
                        backgroundColor: isSelected ? activeKidData.color : undefined,
                      }}
                    >
                      {isSelected ? '✓ الخطة المختارة' : 'تحديد هذه الخطة'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Renewal Box & Payment Breakdown for This Kid */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              
              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                  ملخص تجديد اشتراك {activeKidData.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  الخطة المختارة:{' '}
                  <strong className="text-slate-800">
                    {SUBSCRIPTION_PLANS.find((p) => p.id === activeKidData.selectedPlan)?.name}
                  </strong>{' '}
                  • الصلاحية الجديدة حتى:{' '}
                  <strong className="text-emerald-700">
                    {activeKidData.afterRenewDateStr[activeKidData.selectedPlan]}
                  </strong>
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                  <span>طرق الدفع المدعومة: مدى • فيزا • ماستركارد • Apple Pay</span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="text-left pl-3 border-l border-slate-200">
                  <span className="text-xs text-slate-500 block font-semibold">المبلغ الإجمالي:</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    {SUBSCRIPTION_PLANS.find((p) => p.id === activeKidData.selectedPlan)?.price} ر.س
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRenewKid(activeKidData.id)}
                  className="h-11 px-6 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow active:scale-[0.98]"
                  style={{ backgroundColor: activeKidData.color }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تأكيد التجديد الفوري</span>
                </button>
              </div>

            </div>
          </div>

          {/* Invoices History Table for This Kid */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                سجل الفواتير السابقة لـ {activeKidData.name}
              </h4>
              <span className="text-xs text-slate-500">
                جميع المدفوعات مؤكدة إلكترونيًا
              </span>
            </div>

            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-semibold">
                    <th className="py-3 px-3">رقم الفاتورة</th>
                    <th className="py-3 px-3">التاريخ</th>
                    <th className="py-3 px-3">الخطة</th>
                    <th className="py-3 px-3">المبلغ</th>
                    <th className="py-3 px-3">الحالة</th>
                    <th className="py-3 px-3 text-left">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {activeKidData.paymentHistory.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{inv.id}</td>
                      <td className="py-3.5 px-3 text-slate-500">{inv.date}</td>
                      <td className="py-3.5 px-3 font-medium">{inv.planName}</td>
                      <td className="py-3.5 px-3 font-bold text-slate-900">{inv.amount} ر.س</td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{inv.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-left">
                        <button
                          type="button"
                          onClick={() => showToast(`تم تحميل الفاتورة ${inv.id} بصيغة PDF`)}
                          className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 hover:underline ml-auto"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>تحميل PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick switcher to other kids */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-slate-500">
            <span>الانتقال لاشتراك ابن آخر:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {Object.values(kidSubs)
                .filter((k) => k.id !== activeKidData.id)
                .map((otherKid) => (
                  <button
                    key={otherKid.id}
                    type="button"
                    onClick={() => setSelectedKidTab(otherKid.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {otherKid.emoji} اشتراك {otherKid.name} ←
                  </button>
                ))}
            </div>
          </div>

        </div>
      )}

      {/* Payment Success Modal */}
      {paymentSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl shadow-xs">
              🎉
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                تم التجديد بنجاح!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                تم تجديد اشتراك <strong>{paymentSuccessModal.kidName}</strong> في{' '}
                <strong>الخطة {paymentSuccessModal.planName}</strong> بمبلغ{' '}
                <strong>{paymentSuccessModal.amount} ر.س</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-100">
              صالح حتى: <span className="font-bold text-emerald-700">{paymentSuccessModal.newEndDate}</span>
            </div>

            <button
              type="button"
              onClick={() => setPaymentSuccessModal(null)}
              className="w-full h-11 rounded-xl bg-[#26374a] text-white text-xs sm:text-sm font-bold hover:bg-[#1d2b3a] transition-colors cursor-pointer"
            >
              تم، رائع!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
