export interface ConflictsState {
  byId: Record<string, boolean>; // id => hasConflict
  statusById: Record<string, 'idle' | 'loading' | 'succeeded' | 'failed'>;
}
