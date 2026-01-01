import { PieChart, Pie, Cell } from "recharts";

type ChartItem = {
  name: string;
  value: number;
  color: string;
};

type ProjectCardChartProps = {
  data: ChartItem[];
};

const ProjectCardChart = ({ data }: ProjectCardChartProps) => {
  const WIDTH = 260;
  const HEIGHT = 160;
  const INNER = 65;
  const OUTER = 100;

  const filteredData = data.filter(item => item.value > 0);

  if (filteredData.length === 0) return null;

  return (
    <PieChart width={WIDTH} height={HEIGHT}>
      <Pie
        data={filteredData}
        dataKey="value"
        cx="50%"
        cy="70%"
        startAngle={180}
        endAngle={0}
        innerRadius={INNER}
        outerRadius={OUTER}
        cornerRadius={8}
      >
        {filteredData.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default ProjectCardChart;
