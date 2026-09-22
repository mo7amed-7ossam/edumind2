import React, { useState } from 'react';
import { BookOpen, ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { ParentRole } from '../types';

interface RoleSelectionScreenProps {
  onLoginRole?: (role: ParentRole) => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onLoginRole }) => {
  const [selectedRole, setSelectedRole] = useState<ParentRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    if (selectedRole) {
      setIsLoggedIn(true);
      if (onLoginRole) {
        onLoginRole(selectedRole);
      }
    }
  };

  const handleReset = () => {
    setIsLoggedIn(false);
    setSelectedRole(null);
  };

  return (
    <div
      id="parent-portal-responsive-container"
      className="min-h-[100dvh] w-full bg-[#f6f8fb] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto select-none text-slate-800 font-['Cairo',sans-serif]"
    >
      {/* Centered Main Box with safe vertical auto margin */}
      <div className="w-full max-w-sm sm:max-w-md my-auto flex flex-col items-center text-center">
        
        {/* Top Dark Squircle Logo */}
        <div
          id="portal-squircle-logo"
          className="w-16 h-16 sm:w-20 sm:h-20 bg-[#26374a] rounded-[20px] sm:rounded-[24px] flex items-center justify-center shadow-xs mb-4 sm:mb-6 transition-transform duration-200 hover:scale-105 active:scale-95 shrink-0"
        >
          <BookOpen className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={2.3} />
        </div>

        {/* Title (Responsive Typography) */}
        <h1
          id="portal-title"
          className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-[#172533] tracking-tight mb-1.5 sm:mb-2 leading-snug"
        >
          منصة ولي الأمر
        </h1>

        {/* Subtitle (Responsive Typography) */}
        <p
          id="portal-description"
          className="text-xs sm:text-sm text-[#66788a] font-normal leading-relaxed mb-5 sm:mb-6 max-w-sm sm:max-w-md"
        >
          دراسة أبنائك من الروضة إلى الصف السادس، ومواعيدهم واشتراكاتهم، في مكان واحد.
        </p>

        {/* "كيف نخاطبك؟" label */}
        <div
          id="role-label-ana"
          className="text-xs sm:text-sm font-bold text-slate-500 mb-2.5 sm:mb-3.5"
        >
          كيف نخاطبك؟
        </div>

        {/* Cards Grid (In RTL: Mother is on the Right, Father is on the Left) */}
        <div
          id="role-cards-container"
          className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[280px] sm:max-w-md mx-auto"
        >
          {/* Card: أم (Right side in RTL) */}
          <button
            id="card-mother"
            type="button"
            onClick={() => {
              if (selectedRole === 'mother') {
                handleLogin();
              } else {
                setSelectedRole('mother');
                setIsLoggedIn(false);
              }
            }}
            className={`w-full aspect-square bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 outline-none select-none active:scale-[0.97] ${
              selectedRole === 'mother'
                ? 'ring-2 ring-[#B04A7C] shadow-md -translate-y-0.5 bg-pink-50/20 border-pink-300'
                : 'border border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            {/* Circular badge */}
            <div
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full font-bold text-base sm:text-lg flex items-center justify-center mb-1.5 sm:mb-2.5 shrink-0 transition-colors ${
                selectedRole === 'mother'
                  ? 'bg-[#f7edf3] text-[#B04A7C]'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              أم
            </div>

            {/* Label */}
            <span className="text-base sm:text-xl font-bold text-[#172533] leading-none">
              أُمّ
            </span>
          </button>

          {/* Card: أب (Left side in RTL) */}
          <button
            id="card-father"
            type="button"
            onClick={() => {
              if (selectedRole === 'father') {
                handleLogin();
              } else {
                setSelectedRole('father');
                setIsLoggedIn(false);
              }
            }}
            className={`w-full aspect-square bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 outline-none select-none active:scale-[0.97] ${
              selectedRole === 'father'
                ? 'ring-2 ring-[#1D638D] shadow-md -translate-y-0.5 bg-sky-50/20 border-sky-300'
                : 'border border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            {/* Circular badge */}
            <div
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full font-bold text-base sm:text-lg flex items-center justify-center mb-1.5 sm:mb-2.5 shrink-0 transition-colors ${
                selectedRole === 'father'
                  ? 'bg-[#eaf3fa] text-[#1D638D]'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              أب
            </div>

            {/* Label */}
            <span className="text-base sm:text-xl font-bold text-[#172533] leading-none">
              أَبْ
            </span>
          </button>
        </div>

        {/* Enter / Login Button Area (Appears after selection) */}
        <div className="w-full max-w-[280px] sm:max-w-md mx-auto mt-4 sm:mt-6 min-h-[44px] sm:min-h-[50px] flex flex-col items-center justify-center">
          {selectedRole && !isLoggedIn && (
            <button
              id="enter-button"
              type="button"
              onClick={handleLogin}
              className={`w-full py-2.5 sm:py-3.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all duration-150 cursor-pointer animate-in fade-in zoom-in-95 duration-200 active:scale-[0.99] ${
                selectedRole === 'mother'
                  ? 'bg-[#B04A7C] hover:bg-[#9c3d6c]'
                  : 'bg-[#1D638D] hover:bg-[#165074]'
              }`}
            >
              <span>الدخول بصفتك {selectedRole === 'mother' ? 'الأُمّ' : 'الأَبْ'}</span>
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>
          )}

          {/* Successful Login Feedback */}
          {isLoggedIn && (
            <div
              id="login-success-box"
              className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-sm font-medium flex items-center justify-between gap-2 shadow-xs animate-in fade-in duration-200"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-right">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span>
                  مرحباً بك! تم تسجيل الدخول بنجاح بصفتك{' '}
                  <strong className="font-bold">
                    {selectedRole === 'mother' ? 'الأُمّ' : 'الأَبْ'}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                title="تغيير الاختيار"
                className="p-1 sm:p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
