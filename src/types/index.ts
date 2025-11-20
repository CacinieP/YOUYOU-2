export type MBTIType = 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 
                       'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface PersonalityDimensions {
  sleepSensitivity: number;    // 睡眠敏感度 0-100
  noiseLevel: number;          // 噪音制造度 0-100
  cleanliness: number;         // 洁癖度 0-100
  nightOwl: number;            // 熬夜指数 0-100
  temperature: number;         // 空调温度偏好 16-30
  social: number;              // 社交度 0-100
}

export interface Roommate {
  id: string;
  name: string;
  mbti?: MBTIType;
  dimensions: PersonalityDimensions;
  lastChoreDate?: number;
  avatar?: string;
}

export interface ChoreTask {
  id: string;
  name: string;
  icon: string;
}

export interface ChoreHistory {
  taskId: string;
  roommateId: string;
  date: number;
}
