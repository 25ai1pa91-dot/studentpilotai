export type ComponentSize = 'sm' | 'md' | 'lg';

export type VariantColor = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'brand' | 'success' | 'warning' | 'info';

export type TaskStatus = 'upcoming' | 'active' | 'completed' | 'review_needed';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LearnerTask {
  task_id: string;
  title: string;
  phase_title: string;
  estimated_minutes: number;
  why_this_task: string;
  roadmap_position: string;
  weak_skill_addressed?: string;
  status: TaskStatus;
}

export interface PlacementReadinessMetric {
  current_score: number;
  target_goal: number;
  delta_this_week: string;
}
