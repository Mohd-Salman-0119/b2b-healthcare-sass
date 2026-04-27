import { create } from 'zustand';

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'Critical' | 'Stable' | 'Recovering';
  lastVisit: string;
  avatarUrl: string;
}

interface AppState {
  patients: Patient[];
  viewMode: 'grid' | 'list';
  theme: 'light' | 'dark';
  setViewMode: (mode: 'grid' | 'list') => void;
  toggleTheme: () => void;
  setPatients: (patients: Patient[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  patients: [
    { id: '1', name: 'John Doe', age: 45, condition: 'Hypertension', status: 'Stable', lastVisit: '2023-10-01', avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff' },
    { id: '2', name: 'Jane Smith', age: 32, condition: 'Asthma', status: 'Stable', lastVisit: '2023-10-15', avatarUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10B981&color=fff' },
    { id: '3', name: 'Robert Johnson', age: 58, condition: 'Diabetes Type 2', status: 'Critical', lastVisit: '2023-10-20', avatarUrl: 'https://ui-avatars.com/api/?name=Robert+Johnson&background=EF4444&color=fff' },
    { id: '4', name: 'Emily Davis', age: 24, condition: 'Post-surgery recovery', status: 'Recovering', lastVisit: '2023-10-25', avatarUrl: 'https://ui-avatars.com/api/?name=Emily+Davis&background=F59E0B&color=fff' },
    { id: '5', name: 'Michael Wilson', age: 61, condition: 'Heart Disease', status: 'Critical', lastVisit: '2023-10-26', avatarUrl: 'https://ui-avatars.com/api/?name=Michael+Wilson&background=EF4444&color=fff' },
    { id: '6', name: 'Sarah Brown', age: 29, condition: 'Migraine', status: 'Stable', lastVisit: '2023-10-27', avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Brown&background=0D8ABC&color=fff' }
  ],
  viewMode: 'grid',
  theme: 'light',
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setPatients: (patients) => set({ patients }),
}));
