import { useParams } from "react-router-dom";
import { CVInterface, PersonalDataInfo } from "../../../entities/cvInterfaces";
import CVList from "../../../mocked-data/cv-data";
import CVBody from "../CVBody";
import CVPersonalInfo from "../CVPersonalInfo";

interface Props {
  cv?: CVInterface;
}

const CVView = ({ cv }: Props) => {
  const { id } = useParams();
  if (!cv) {
    cv = CVList.find((currentCv) => Number(id) === currentCv.id);

    if (!cv) return <>No CV found</>;
  }
  return (
    <>
      <CVPersonalInfo data={cv.data.personalInfo as PersonalDataInfo} />
      <CVBody data={cv as CVInterface}></CVBody>
    </>
  );
};

export default CVView;
