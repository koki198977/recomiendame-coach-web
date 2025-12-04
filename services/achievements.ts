export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'streak' | 'weight' | 'adherence' | 'social' | 'milestone'
  requirement: number
  isUnlocked: boolean
  progress: number
  maxProgress: number
  isShared?: boolean
}

export type AchievementInput = {
  streakDays: number
  totalCheckins: number
  weightLoss: number
  maxAdherence: number
  avgAdherence: number
  postsCount: number
  likesReceived: number
  commentsGiven: number
  hasProfile: boolean
  hasPlans: boolean
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_checkin',
    title: 'Primer Paso',
    description: 'Completa tu primer check-in diario',
    icon: '🎯',
    category: 'streak',
    requirement: 1,
    isUnlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'streak_3',
    title: 'Constancia',
    description: 'Mantén una racha de 3 días consecutivos',
    icon: '🔥',
    category: 'streak',
    requirement: 3,
    isUnlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'streak_7',
    title: 'Primera Semana',
    description: 'Completa 7 días consecutivos de check-ins',
    icon: '🏆',
    category: 'streak',
    requirement: 7,
    isUnlocked: false,
    progress: 0,
    maxProgress: 7
  },
  {
    id: 'weight_loss_1kg',
    title: 'Primer Kilo',
    description: 'Pierde tu primer kilogramo',
    icon: '⚖️',
    category: 'weight',
    requirement: 1,
    isUnlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'adherence_perfect',
    title: 'Día Perfecto',
    description: 'Logra 100% de adherencia en un día',
    icon: '⭐',
    category: 'adherence',
    requirement: 100,
    isUnlocked: false,
    progress: 0,
    maxProgress: 100
  },
  {
    id: 'first_plan',
    title: 'Plan Personalizado',
    description: 'Genera tu primer plan nutricional con IA',
    icon: '🤖',
    category: 'milestone',
    requirement: 1,
    isUnlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'profile_complete',
    title: 'Perfil Completo',
    description: 'Completa toda la información de tu perfil',
    icon: '✅',
    category: 'milestone',
    requirement: 1,
    isUnlocked: false,
    progress: 0,
    maxProgress: 1
  }
]

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

export const achievementsService = {
  getAll(): Achievement[] {
    return ACHIEVEMENTS.map(achievement => ({ ...achievement }))
  },

  calculate(input: AchievementInput): Achievement[] {
    return this.getAll().map(achievement => {
      let progress = 0
      let isUnlocked = false

      switch (achievement.id) {
        case 'first_checkin':
          progress = clamp(input.totalCheckins, 0, 1)
          isUnlocked = input.totalCheckins >= 1
          break
        case 'streak_3':
          progress = clamp(input.streakDays, 0, achievement.maxProgress)
          isUnlocked = input.streakDays >= achievement.requirement
          break
        case 'streak_7':
          progress = clamp(input.streakDays, 0, achievement.maxProgress)
          isUnlocked = input.streakDays >= achievement.requirement
          break
        case 'weight_loss_1kg':
          progress = clamp(Math.abs(input.weightLoss), 0, achievement.maxProgress)
          isUnlocked = Math.abs(input.weightLoss) >= achievement.requirement
          break
        case 'adherence_perfect':
          progress = clamp(input.maxAdherence, 0, achievement.maxProgress)
          isUnlocked = input.maxAdherence >= achievement.requirement
          break
        case 'first_plan':
          progress = input.hasPlans ? 1 : 0
          isUnlocked = input.hasPlans
          break
        case 'profile_complete':
          progress = input.hasProfile ? 1 : 0
          isUnlocked = input.hasProfile
          break
        default:
          progress = 0
          isUnlocked = false
      }

      return {
        ...achievement,
        progress,
        isUnlocked
      }
    })
  }
}
