import { PersonalityDimensions } from '../../types';

export interface CompatibilityResult {
  overlapScore: number;        // 重合度 0-100
  conflictPoints: string[];    // 冲突点描述
  harmonicAreas: string[];     // 和谐区域
  radarData: number[];         // 雷达图数据
}

/**
 * 计算两个人的性格兼容度
 * 核心算法：计算六维空间的重合面积和冲突极点
 */
export function calculateCompatibility(
  user: PersonalityDimensions,
  roommate: PersonalityDimensions
): CompatibilityResult {
  const conflicts: string[] = [];
  const harmonics: string[] = [];
  
  // 睡眠敏感度 vs 噪音制造度 (交叉冲突)
  if (user.sleepSensitivity > 70 && roommate.noiseLevel > 70) {
    conflicts.push('⚠️ 高睡眠敏感度遇上高噪音制造者');
  }
  
  // 洁癖度差异
  const cleanDiff = Math.abs(user.cleanliness - roommate.cleanliness);
  if (cleanDiff > 50) {
    conflicts.push('🧹 卫生标准差异较大');
  } else if (cleanDiff < 20) {
    harmonics.push('✨ 卫生习惯相近');
  }
  
  // 作息时间
  const scheduleDiff = Math.abs(user.nightOwl - roommate.nightOwl);
  if (scheduleDiff > 50) {
    conflicts.push('🌙 作息时间冲突');
  } else {
    harmonics.push('⏰ 作息时间同步');
  }
  
  // 温度偏好
  const tempDiff = Math.abs(user.temperature - roommate.temperature);
  if (tempDiff > 5) {
    conflicts.push('🌡️ 空调温度偏好差异');
  }
  
  // 社交度
  if (Math.abs(user.social - roommate.social) < 30) {
    harmonics.push('🤝 社交需求匹配');
  }
  
  // 计算总体重合度 (使用欧氏距离的反向归一化)
  const dimensions = ['sleepSensitivity', 'noiseLevel', 'cleanliness', 'nightOwl', 'social'] as const;
  const distances = dimensions.map(dim => {
    const val1 = user[dim];
    const val2 = roommate[dim];
    return Math.pow(val1 - val2, 2);
  });
  
  const euclideanDist = Math.sqrt(distances.reduce((a, b) => a + b, 0));
  const maxDist = Math.sqrt(5 * Math.pow(100, 2)); // 最大可能距离
  const overlapScore = Math.round((1 - euclideanDist / maxDist) * 100);
  
  // 雷达图数据 (用户和舍友的对比)
  const radarData = [
    user.sleepSensitivity,
    user.noiseLevel,
    user.cleanliness,
    user.nightOwl,
    user.social,
    (user.temperature - 16) * 7.14 // 归一化到 0-100
  ];
  
  return {
    overlapScore,
    conflictPoints: conflicts,
    harmonicAreas: harmonics,
    radarData
  };
}
