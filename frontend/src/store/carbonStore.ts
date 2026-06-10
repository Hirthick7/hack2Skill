import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CarbonInput, CarbonResult, ChatMessage } from '../types';

interface CarbonState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Carbon Calculator
  carbonInput: CarbonInput;
  setCarbonInput: (input: Partial<CarbonInput>) => void;
  updateCategoryInput: <K extends keyof CarbonInput>(category: K, data: Partial<CarbonInput[K]>) => void;
  
  // Results
  carbonResult: CarbonResult | null;
  setCarbonResult: (result: CarbonResult) => void;

  // AI Chat
  chatHistory: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
}

const defaultInput: CarbonInput = {
  transportation: { carDistanceKm: 0, publicTransportKm: 0, flightHours: 0 },
  energy: { electricityKwh: 0, acUsageHours: 0 },
  food: { dietType: 'mixed' },
  waste: { recyclingHabit: 'sometimes', wasteGenerationKg: 0 }
};

export const useCarbonStore = create<CarbonState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      carbonInput: defaultInput,
      setCarbonInput: (input) => set((state) => ({ carbonInput: { ...state.carbonInput, ...input } })),
      updateCategoryInput: (category, data) => 
        set((state) => ({
          carbonInput: {
            ...state.carbonInput,
            [category]: { ...state.carbonInput[category], ...data }
          }
        })),

      carbonResult: null,
      setCarbonResult: (result) => set({ carbonResult: result }),

      chatHistory: [],
      addChatMessage: (msg) => set((state) => ({ chatHistory: [...state.chatHistory, msg] })),
      clearChat: () => set({ chatHistory: [] }),
    }),
    {
      name: 'ecotrack-storage',
      partialize: (state) => ({ 
        isDarkMode: state.isDarkMode, 
        carbonInput: state.carbonInput,
        carbonResult: state.carbonResult,
        chatHistory: state.chatHistory 
      }),
    }
  )
);
