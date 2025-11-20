/**
 * 分贝监测器 - 使用 Web Audio API 实时监测环境噪音
 * 这是一个纯 TypeScript 类，不依赖 React，体现解耦思维
 */
export class DecibelMeter {
  private context: AudioContext | null = null;
  private analyzer: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array<ArrayBuffer> | null = null;
  private animationId: number | null = null;
  
  /**
   * 初始化音频上下文并请求麦克风权限
   */
  async initialize(): Promise<void> {
    try {
      this.context = new AudioContext();
      this.analyzer = this.context.createAnalyser();
      this.analyzer.fftSize = 256;
      
      const bufferLength = this.analyzer.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength) as Uint8Array<ArrayBuffer>;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.microphone = this.context.createMediaStreamSource(stream);
      this.microphone.connect(this.analyzer);
    } catch (error) {
      throw new Error('无法访问麦克风: ' + error);
    }
  }
  
  /**
   * 计算当前分贝值
   * 使用 RMS (Root Mean Square) 方法
   */
  getDecibel(): number {
    if (!this.analyzer || !this.dataArray) return 0;
    
    this.analyzer.getByteTimeDomainData(this.dataArray as Uint8Array<ArrayBuffer>);
    
    // 计算 RMS
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      const normalized = (this.dataArray[i] - 128) / 128;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / this.dataArray.length);
    
    // 转换为分贝 (参考值: 20 * log10(rms))
    const db = 20 * Math.log10(rms);
    
    // 归一化到 0-100 范围 (实际分贝可能是负数)
    return Math.max(0, Math.min(100, db + 100));
  }
  
  /**
   * 获取频谱数据（用于可视化）
   */
  getFrequencyData(): Uint8Array {
    if (!this.analyzer || !this.dataArray) return new Uint8Array(0);
    
    this.analyzer.getByteFrequencyData(this.dataArray as Uint8Array<ArrayBuffer>);
    return this.dataArray;
  }
  
  /**
   * 开始监听并执行回调
   */
  startMonitoring(callback: (db: number, spectrum: Uint8Array) => void): void {
    const monitor = () => {
      const db = this.getDecibel();
      const spectrum = this.getFrequencyData();
      callback(db, spectrum);
      this.animationId = requestAnimationFrame(monitor);
    };
    monitor();
  }
  
  /**
   * 停止监听
   */
  stopMonitoring(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  /**
   * 清理资源
   */
  dispose(): void {
    this.stopMonitoring();
    if (this.microphone) {
      this.microphone.disconnect();
    }
    if (this.context) {
      this.context.close();
    }
  }
}
