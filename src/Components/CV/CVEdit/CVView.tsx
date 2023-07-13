import { useParams } from "react-router-dom";
import { CVInterface, PersonalDataInfo } from "../../../entities/cvInterfaces";
import CVList from "../../../mocked-data/cv-data";
import CVBody from "../CVBody";
import CVPersonalInfo from "../CVPersonalInfo";
import CVPersonalIfnoMOdify from "./CVPersonalIfnoModify";
import { useEffect, useState } from "react";
import CVSideBar from "../CVSideBar";
import { SideCVControlBar } from "../SideCVControlBar";

const CVView = () => {
  const [cvData, setCvData] = useState<CVInterface | undefined>();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

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

  return cvData ? (
    <>
      <SideCVControlBar onEditButtonClick={handleEditButtonClick} />
      {isEditing && (
        <CVPersonalIfnoMOdify
          data={cvData.data.personalInfo}
          onSave={savePersonalInfoData}
        />
      )}
      {!isEditing && (
        <CVPersonalInfo data={cvData.data.personalInfo as PersonalDataInfo} />
      )}

      <CVBody isEditing={isEditing} data={cvData}></CVBody>
      <CVSideBar />
    </>
  ) : (
    <>No CV found</>
  );
};

export default CVView;
