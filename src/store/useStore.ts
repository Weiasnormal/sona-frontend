import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  theme: 'light' | 'dark'
  setUser: (user: User | null) => void
  setIsAuthenticated: (value: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  theme: 'light',
  setUser: (user) => set({ user }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setTheme: (theme) => set({ theme }),
})) 