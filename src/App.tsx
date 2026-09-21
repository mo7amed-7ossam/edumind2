import React, { useState } from 'react';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { MotherDesktopDashboard } from './components/MotherDesktopDashboard';
import { ParentRole } from './types';

export default function App() {
  // Always start the application from the role selection screen (null role)
  const [currentRole, setCurrentRole] = useState<ParentRole | null>(null);

  if (!currentRole) {
    return (
      <RoleSelectionScreen
        onLoginRole={(role) => setCurrentRole(role)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] font-['Cairo',sans-serif]">
      <MotherDesktopDashboard
        initialRole={currentRole}
        onBackToRoleSelect={() => setCurrentRole(null)}
      />
    </div>
  );
}

