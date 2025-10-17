
interface ThreatTypeCardProps {
  type: string;
  count: number;
  total: number;
}

export default function ThreatTypeCard({ type, count, total }: ThreatTypeCardProps) {
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : '0';

  const typeInfo: Record<string, { label: string; color: string; bgColor: string }> = {
    malware: { label: 'Malware', color: 'text-red-700', bgColor: 'bg-red-500' },
    phishing: { label: 'Phishing', color: 'text-orange-700', bgColor: 'bg-orange-500' },
    ransomware: { label: 'Ransomware', color: 'text-purple-700', bgColor: 'bg-purple-500' },
    ddos: { label: 'DDoS', color: 'text-blue-700', bgColor: 'bg-blue-500' },
    data_breach: { label: 'Filtración de Datos', color: 'text-pink-700', bgColor: 'bg-pink-500' },
    zero_day: { label: 'Zero Day', color: 'text-yellow-700', bgColor: 'bg-yellow-500' },
    apt: { label: 'APT', color: 'text-indigo-700', bgColor: 'bg-indigo-500' },
    other: { label: 'Otro', color: 'text-gray-700', bgColor: 'bg-gray-500' },
  };

  const info = typeInfo[type] || typeInfo.other;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-semibold ${info.color}`}>{info.label}</h3>
        <div className="text-3xl font-bold text-gray-900">{count}</div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className={`${info.bgColor} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>{percentage}% del total </span>
        <span className="font-medium">{total} total</span>
      </div>
    </div>
  );
}
