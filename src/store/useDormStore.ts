import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Roommate, ChoreHistory } from '../types';

interface DormState {
  roommates: Roommate[];
  choreHistory: ChoreHistory[];
  addRoommate: (roommate: Roommate) => void;
  removeRoommate: (id: string) => void;
  updateRoommate: (id: string, updates: Partial<Roommate>) => void;
  addChoreHistory: (history: ChoreHistory) => void;
  updateLastChoreDate: (roommateId: string, date: number) => void;
}

export const useDormStore = create<DormState>()(
  persist(
    (set) => ({
      roommates: [],
      choreHistory: [],
      
      addRoommate: (roommate) =>
        set((state) => ({
          roommates: [...state.roommates, roommate],
        })),
      
      removeRoommate: (id) =>
        set((state) => ({
          roommates: state.roommates.filter((rm) => rm.id !== id),
        })),
      
      updateRoommate: (id, updates) =>
        set((state) => ({
          roommates: state.roommates.map((rm) =>
            rm.id === id ? { ...rm, ...updates } : rm
          ),
        })),
      
      addChoreHistory: (history) =>
        set((state) => ({
          choreHistory: [...state.choreHistory, history],
        })),
      
      updateLastChoreDate: (roommateId, date) =>
        set((state) => ({
          roommates: state.roommates.map((rm) =>
            rm.id === roommateId ? { ...rm, lastChoreDate: date } : rm
          ),
        })),
    }),
    {
      name: 'youyou-dorm-storage',
    }
  )
);
