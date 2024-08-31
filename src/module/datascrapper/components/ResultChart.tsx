import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import {List} from '@matiassambrizzi/app-utils';
import {Query} from '../regex';
import {match} from '../result';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const generateColors = (numColors: number): string[] => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360 / numColors) % 360;
    const saturation = 70;
    const lightness = 50;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};

export const ResultsChart = (
  props: {
    results: List<Query>
  }
) => {

  const labels = props.results.map((value) => value.query)
  const results = props.results.map(
          it => match(it.result)({
            onOk: it => it.length,
            onError: () => 0,
            onPending: () => 0
          })
        )

  const data = {
    labels:  labels,
    datasets: [
      {
        label: 'Occurrences',
        data: results,
        backgroundColor: generateColors(labels.length),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Frequency of Matches',
      },
    },
  };

  return <Pie data={data} options={options} />;
};
