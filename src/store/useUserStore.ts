import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PersonalityDimensions, MBTIType } from '../types';

interface UserState {
  name: string;
  mbti?: MBTIType;
  dimensions: PersonalityDimensions;
  setName: (name: string) => void;
  setMBTI: (mbti: MBTIType) => void;
  setDimensions: (dimensions: Partial<PersonalityDimensions>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      mbti: undefined,
      dimensions: {
        sleepSensitivity: 50,
        noiseLevel: 50,
        cleanliness: 50,
        nightOwl: 50,
        temperature: 24,
        social: 50,
      },
      setName: (name) => set({ name }),
      setMBTI: (mbti) => set({ mbti }),
      setDimensions: (newDimensions) =>
        set((state) => ({
          dimensions: { ...state.dimensions, ...newDimensions },
        })),
    }),
    {
      name: 'youyou-user-storage',
    }
  )
);
