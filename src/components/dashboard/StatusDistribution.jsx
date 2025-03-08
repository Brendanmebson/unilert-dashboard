import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function StatusDistribution() {
  const { incidents } = useSelector((state) => state.incidents);
  
  // Calculate status counts
  const statusCounts = incidents.reduce(
    (acc, incident) => {
      const status = incident.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  // Prepare data for chart
  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' '),
    value,
  }));

  // Colors for each status
  const COLORS = {
    Pending: '#ff9800',
    'In progress': '#2196f3',
    Resolved: '#4caf50',
  };

  return (
    <Box sx={{ width: '100%', height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || '#8884d8'}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default StatusDistribution;