export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Absence {
  id: number;
  startDate: string;       // ISO date
  days: number;
  absenceType: string;
  employee: Employee;
  approved: boolean;
}

export type AbsencesStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AbsencesState {
  entities: Record<number, Absence>;
  ids: number[];
  status: AbsencesStatus;
  error?: string | null;
}
