import { PieChart, Pie, Cell } from "recharts";

type ProjectCardChartProps = {
  color?: string;  // arc color
};

const ProjectCardChart = ({ color = "#22c55e" }: ProjectCardChartProps) => {
  const data = [{ name: "arc", value: 100 }];

  const WIDTH = 260;
  const HEIGHT = 160;
  const INNER = 65;
  const OUTER = 100;

  return (
    <div
      className="relative"
      style={{ width: `${WIDTH}px`, height: `${HEIGHT}px` }}
    >
      <PieChart width={WIDTH} height={HEIGHT}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="70%"
          startAngle={80}
          endAngle={180}
          innerRadius={INNER}
          outerRadius={OUTER}
          cornerRadius={10}
        >
          <Cell fill={color} />
        </Pie>
      </PieChart>
    </div>
  );
};

export default ProjectCardChart;