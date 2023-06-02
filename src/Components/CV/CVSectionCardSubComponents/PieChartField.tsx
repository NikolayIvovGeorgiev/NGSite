import { iPieChartComponentData } from "../../../entities/cvInterfaces";
import { Chart } from "react-google-charts";

interface Props {
  data?: iPieChartComponentData[];
}
const options = {
  title: "",
};

const PeiChartField = ({ data }: Props) => {
  if (!data) {
    return null;
  }

  const pieData = data.map((item) => [item.title, item.percent]);
  return (
    <>
      <Chart
        chartType="PieChart"
        data={[["", ""], ...pieData]}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </>
  );
};

export default PeiChartField;
