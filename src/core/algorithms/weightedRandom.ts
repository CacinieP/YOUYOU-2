import { Roommate } from '../../types';

/**
 * 加权随机算法：根据上次做家务的时间动态调整权重
 * 距离上次做家务时间越久，被抽中的概率越高
 */
export function selectChoreVictim(roommates: Roommate[]): Roommate {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;
  
  // 计算每个人的权重
  const weights = roommates.map(rm => {
    if (!rm.lastChoreDate) {
      return 100; // 从未做过家务，权重最高
    }
    
    const daysSince = (now - rm.lastChoreDate) / DAY_MS;
    
    // 权重公式：基础权重 + 天数加成
    // 每过一天，权重增加 10
    return Math.max(10, 10 + daysSince * 10);
  });
  
  // 计算累积权重
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const cumulativeWeights = weights.reduce((acc, w) => {
    const last = acc.length > 0 ? acc[acc.length - 1] : 0;
    acc.push(last + w);
    return acc;
  }, [] as number[]);
  
  // 随机选择
  const random = Math.random() * totalWeight;
  const index = cumulativeWeights.findIndex(cw => random <= cw);
  
  return roommates[index];
}

/**
 * 获取每个舍友被抽中的概率（用于展示）
 */
export function getChoreProb(roommates: Roommate[]): Map<string, number> {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;
  
  const weights = roommates.map(rm => {
    if (!rm.lastChoreDate) return 100;
    const daysSince = (now - rm.lastChoreDate) / DAY_MS;
    return Math.max(10, 10 + daysSince * 10);
  });
  
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  
  const probMap = new Map<string, number>();
  roommates.forEach((rm, i) => {
    probMap.set(rm.id, Math.round((weights[i] / totalWeight) * 100));
  });
  
  return probMap;
}
