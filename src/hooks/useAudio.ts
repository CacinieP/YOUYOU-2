import { useState, useEffect, useRef } from 'react';
import { DecibelMeter } from '../core/audio/decibelMeter';

export function useAudio() {
  const [decibel, setDecibel] = useState(0);
  const [spectrum, setSpectrum] = useState<Uint8Array>(new Uint8Array(0));
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const meterRef = useRef<DecibelMeter | null>(null);

  const startMonitoring = async () => {
    try {
      const meter = new DecibelMeter();
      await meter.initialize();
      meterRef.current = meter;

      meter.startMonitoring((db, spec) => {
        setDecibel(db);
        setSpectrum(spec);
      });

      setIsMonitoring(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    }
  };

  const stopMonitoring = () => {
    if (meterRef.current) {
      meterRef.current.stopMonitoring();
      meterRef.current.dispose();
      meterRef.current = null;
    }
    setIsMonitoring(false);
  };

  useEffect(() => {
    return () => {
      if (meterRef.current) {
        meterRef.current.dispose();
      }
    };
  }, []);

  return {
    decibel,
    spectrum,
    isMonitoring,
    error,
    startMonitoring,
    stopMonitoring,
  };
}
