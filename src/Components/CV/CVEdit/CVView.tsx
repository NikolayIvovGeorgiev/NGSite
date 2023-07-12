import { useParams } from "react-router-dom";
import { CVInterface, PersonalDataInfo } from "../../../entities/cvInterfaces";
import CVList from "../../../mocked-data/cv-data";
import CVBody from "../CVBody";
import CVPersonalInfo from "../CVPersonalInfo";
import CVPersonalIfnoMOdify from "./CVPersonalIfnoModify";
import { useEffect, useState } from "react";

const CVView = () => {
  const [cvData, setCvData] = useState<CVInterface | undefined>();
  const { id } = useParams();

  useEffect(() => {
    if (!cvData) {
      const currentCv = CVList.find((currentCv) => Number(id) === currentCv.id);
      if (currentCv) setCvData({ ...currentCv });
    }
  });

  const savePersonalInfoData = (data: PersonalDataInfo) => {
    const updatedPersonalInfo = data;

    if (cvData) {
      setCvData({
        ...cvData,
        data: {
          ...cvData.data,
          personalInfo: updatedPersonalInfo,
        },
      });
    } else {
      console.error("Error: could not update data");
    }
  };
  useEffect(() => {
    console.log(cvData);
  }, [cvData]);
  return cvData ? (
    <>
      <CVPersonalIfnoMOdify
        data={cvData.data.personalInfo}
        onSave={savePersonalInfoData}
      />
      <CVPersonalInfo data={cvData.data.personalInfo as PersonalDataInfo} />
      <CVBody data={cvData}></CVBody>
    </>
  ) : (
    <>No CV found</>
  );
};

export default CVView;
