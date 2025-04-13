
import React from 'react';
import { useTranslation } from '@/utils/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  amount: number;
}

interface DonationsChartProps {
  data: ChartData[];
}

export const DonationsChart: React.FC<DonationsChartProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>{t('statistics')}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#22c55e" 
              fill="#4ade80" 
              fillOpacity={0.3} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
