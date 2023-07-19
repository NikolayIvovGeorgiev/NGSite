import { useParams } from "react-router-dom";
import { CVInterface, PersonalDataInfo } from "../../../entities/cvInterfaces";
import CVList from "../../../mocked-data/cv-data";
import CVBody from "../CVBody";
import CVPersonalInfo from "../CVPersonalInfo";
import CVPersonalInfoModify from "./CVPersonalInfoModify";
import { useEffect, useState } from "react";
import CVSideBar from "../CVSideBar";
import { SideCVControlBar } from "../SideCVControlBar";

const CVView = () => {
  const [cvData, setCvData] = useState<CVInterface | undefined>();
  const { id } = useParams();

  const [personalInfoEditMode, setpersonalInfoEditMode] = useState(false);
  const handlepersonalInfoEditButton = () => {
    setpersonalInfoEditMode(!personalInfoEditMode);
  };

  const [isEditingMode, setIsEditingMode] = useState(false);
  const handleEditButtonClick = () => {
    setIsEditingMode(!isEditingMode);
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

  const handleSave = (data?: PersonalDataInfo) => {
    if (data) savePersonalInfoData(data);
    handlepersonalInfoEditButton();
  };

  return cvData ? (
    <>
      <SideCVControlBar onEditButtonClick={handleEditButtonClick} />
      {personalInfoEditMode && (
        <CVPersonalInfoModify
          data={cvData.data.personalInfo}
          onSave={handleSave}
        />
      )}
      {!personalInfoEditMode && (
        <CVPersonalInfo
          onEditButton={handlepersonalInfoEditButton}
          isEditing={isEditingMode}
          data={cvData.data.personalInfo}
        />
      )}

      <CVBody isEditingMode={isEditingMode} data={cvData}></CVBody>
    </>
  ) : (
    <>No CV found</>
  );
};

export default CVView;
