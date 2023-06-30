import { isEmpty } from "lodash";
import { iPieChartComponentData } from "../../../entities/cvInterfaces";
import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";
import { fetchData } from "../../../mocked-data/cv-data";

interface Props {
  data?: iPieChartComponentData[];
}

const PieChartField = ({ data }: Props) => {
  const [loading, setLoading] = useState(true);
  const [chartOptions] = useState({
    plugins: {
      legend: {
        align: "start",
      },
    },
  });

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFB74D",
          "#5eeb34",
          "#34bdeb",
        ] as string[],
        hoverBackgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFB74D",
          "#5eeb34",
          "#34bdeb",
        ] as string[],
      },
    ],
  });

  const updatePieChartData = () => {
    const updatedLabels: string[] = [];
    const updatedData: number[] = [];
    if (data && !isEmpty(data)) {
      data.forEach((item) => {
        if (item.title && item.percent) {
          console.log(item);
          updatedLabels.push(item.title);
          updatedData.push(+item.percent);
        }
      });
    }
    setChartData({
      ...chartData,
      labels: [...chartData.labels, ...updatedLabels],
      datasets: [
        {
          ...chartData.datasets[0],
          data: [...chartData.datasets[0].data, ...updatedData],
        },
      ],
    });
  };
  useEffect(() => {
    setLoading(true);
    updatePieChartData();
    setLoading(false);
  }, [data]);

  return (
    <div className="card flex justify-content-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Chart type="pie" data={chartData} options={chartOptions} />
      )}
    </div>
  );
  // }

  return null;
};

export default PieChartField;
