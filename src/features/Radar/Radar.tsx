import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useUserStore } from '../../store/useUserStore';
import { useDormStore } from '../../store/useDormStore';
import { calculateCompatibility } from '../../core/algorithms/compatibility';
import { PersonalityDimensions } from '../../types';

export function Radar() {
  const user = useUserStore();
  const { roommates } = useDormStore();
  const [searchParams] = useSearchParams();
  const [selectedRoommate, setSelectedRoommate] = useState<string | null>(null);

  useEffect(() => {
    const roommateId = searchParams.get('roommate');
    if (roommateId && roommates.find(rm => rm.id === roommateId)) {
      setSelectedRoommate(roommateId);
    }
  }, [searchParams, roommates]);

  const getRadarOption = (userDim: PersonalityDimensions, roommateDim?: PersonalityDimensions) => {
    return {
      title: {
        text: '性格维度雷达图',
        textStyle: { color: '#fff' }
      },
      backgroundColor: 'transparent',
      radar: {
        indicator: [
          { name: '睡眠敏感度', max: 100 },
          { name: '噪音制造度', max: 100 },
          { name: '洁癖度', max: 100 },
          { name: '熬夜指数', max: 100 },
          { name: '社交度', max: 100 },
          { name: '温度偏好', max: 100 }
        ],
        splitArea: {
          areaStyle: {
            color: ['rgba(157, 78, 221, 0.1)', 'rgba(157, 78, 221, 0.2)']
          }
        },
        axisLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.2)' }
        },
        splitLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.2)' }
        }
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [
                userDim.sleepSensitivity,
                userDim.noiseLevel,
                userDim.cleanliness,
                userDim.nightOwl,
                userDim.social,
                (userDim.temperature - 16) * 7.14
              ],
              name: '你',
              areaStyle: { color: 'rgba(157, 78, 221, 0.3)' },
              lineStyle: { color: '#9D4EDD' }
            },
            ...(roommateDim ? [{
              value: [
                roommateDim.sleepSensitivity,
                roommateDim.noiseLevel,
                roommateDim.cleanliness,
                roommateDim.nightOwl,
                roommateDim.social,
                (roommateDim.temperature - 16) * 7.14
              ],
              name: '舍友',
              areaStyle: { color: 'rgba(6, 255, 165, 0.3)' },
              lineStyle: { color: '#06FFA5' }
            }] : [])
          ]
        }
      ]
    };
  };

  const selectedRoommateData = roommates.find(rm => rm.id === selectedRoommate);
  const compatibility = selectedRoommateData 
    ? calculateCompatibility(user.dimensions, selectedRoommateData.dimensions)
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">📡 舍友雷达系统</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="选择舍友">
            {roommates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">暂无舍友数据</p>
                <Link to="/roommates/add">
                  <Button>➕ 添加舍友</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {roommates.map(rm => (
                  <Button
                    key={rm.id}
                    variant={selectedRoommate === rm.id ? 'primary' : 'secondary'}
                    onClick={() => setSelectedRoommate(rm.id)}
                    className="w-full"
                  >
                    {rm.name} {rm.mbti && `(${rm.mbti})`}
                  </Button>
                ))}
              </div>
            )}
          </Card>

          <Card title="兼容度分析">
            {compatibility ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-cyber-green mb-2">
                    {compatibility.overlapScore}%
                  </div>
                  <p className="text-gray-400">总体兼容度</p>
                </div>

                {compatibility.conflictPoints.length > 0 && (
                  <div>
                    <h4 className="font-bold text-red-400 mb-2">冲突点：</h4>
                    <ul className="space-y-1">
                      {compatibility.conflictPoints.map((point, i) => (
                        <li key={i} className="text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {compatibility.harmonicAreas.length > 0 && (
                  <div>
                    <h4 className="font-bold text-green-400 mb-2">和谐区域：</h4>
                    <ul className="space-y-1">
                      {compatibility.harmonicAreas.map((area, i) => (
                        <li key={i} className="text-sm">{area}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-400">请选择一个舍友查看兼容度</p>
            )}
          </Card>
        </div>

        <Card className="mt-6">
          <ReactECharts 
            option={getRadarOption(user.dimensions, selectedRoommateData?.dimensions)} 
            style={{ height: '400px' }}
          />
        </Card>
      </div>
    </div>
  );
}
