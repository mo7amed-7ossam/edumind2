export type ParentRole = 'mother' | 'father';

export interface Kid {
  id: string;
  name: string;
  grade: string;
  initial: string;
  avatarBg: string;
  status: {
    label: string;
    type: 'warn' | 'good' | 'bad';
  };
  note: string;
  todayTasks: {
    done: number;
    total: number;
    percentage: number;
    nextSchedule: string;
  };
  subscription: {
    daysLeft: number;
    isAlert: boolean;
  };
}

export interface AttentionItem {
  id: string;
  title: string;
  actionLabel: string;
  actionType: 'renew' | 'openperf';
  kidId: string;
  isUrgent?: boolean;
}
