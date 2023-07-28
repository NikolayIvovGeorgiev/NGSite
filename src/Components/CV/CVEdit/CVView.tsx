import { useParams } from "react-router-dom";
import { CVInterface, PersonalDataInfo } from "../../../entities/cvInterfaces";
import CVList from "../../../mocked-data/cv-data";
import CVBody from "../CVBody";
import CVPersonalInfo from "../CVPersonalInfo";
import CVPersonalInfoModify from "./CVPersonalInfoModify";
import { useEffect, useState } from "react";
import { SideCVControlBar } from "../SideCVControlBar";
import PaletteModal from "../../shared/modals/PaletteModal";
import { produce } from "immer";

const CVView = () => {
  const [cvData, setCvData] = useState<CVInterface | undefined>();
  const { id } = useParams();

  const [personalInfoEditMode, setpersonalInfoEditMode] = useState(false);
  const handlepersonalInfoEditButton = () => {
    setpersonalInfoEditMode(!personalInfoEditMode);
  };
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const handlePaletteButton = () => {
    setShowPaletteModal(!showPaletteModal);
  };
  const changeCvColors = (selectedColor: string) => {
    const colorThemes = {
      blue: {
        dark: "#146C94",
        light: "#F6F1F1",
        lightSecondary: "#AFD3E2",
        accent: "#19A7CE",
      },
      yellow: {
        dark: "#333652",
        light: "#E9EAEC",
        lightSecondary: "#90ADC6",
        accent: "#FAD02C",
      },
    };
    if (selectedColor === "blue" || selectedColor === "yellow") {
      if (cvData) {
        const newColorTheme = colorThemes[selectedColor];
        setCvData(
          produce(cvData, (draftCvData) => {
            draftCvData.settings.colorTheme = newColorTheme;
          })
        );
      }
    }
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
      <PaletteModal
        showPaletteModal={showPaletteModal}
        onConfirm={changeCvColors}
        // onDecline={}
      />
      <SideCVControlBar
        onColorPaletteClick={handlePaletteButton}
        onEditButtonClick={handleEditButtonClick}
      />
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
          data={cvData}
        />
      )}

      <CVBody isEditingMode={isEditingMode} data={cvData}></CVBody>
    </>
  ) : (
    <>No CV found</>
  );
};

export default CVView;
