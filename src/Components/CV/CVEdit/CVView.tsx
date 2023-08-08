import { useParams } from "react-router-dom";
import {
  CVInterface,
  ColorTheme,
  PersonalDataInfo,
} from "../../../entities/cvInterfaces";
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

  const changeCvTheme = (selectedTheme: ColorTheme) => {
    if (cvData) {
      setCvData(
        produce(cvData, (draftCvData) => {
          draftCvData.settings.colorTheme = selectedTheme;
        })
      );
    }
  };

  const [isEditingMode, setIsEditingMode] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditingMode(!isEditingMode);
  };

  useEffect(() => {
    if (!cvData) {
      const currentCv = CVList.find((currentCv) => Number(id) === currentCv.id);
      if (currentCv) {
        setCvData({ ...currentCv });
        if (currentCv.data.personalInfo.name === "") {
          setIsEditingMode(true);
          setpersonalInfoEditMode(true);
        }
        if (
          !currentCv.data.sections.leftCol.length &&
          !currentCv.data.sections.rightCol.length
        ) {
          setIsEditingMode(true);
        }
      }

      // http.get(`localhost:4000/cv/${id}`)
      //   .then((response) => {
      //     if (response) setCvData({ ...response });
      //   })
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
    <div
      className="p-5"
      style={{ backgroundColor: cvData.settings.colorTheme?.background }}
    >
      <PaletteModal
        showPaletteModal={showPaletteModal}
        onConfirm={(theme) => {
          changeCvTheme(theme);
          setShowPaletteModal(false);
        }}
        onDecline={() => {
          setShowPaletteModal(false);
        }}
      />
      <SideCVControlBar
        onColorPaletteClick={handlePaletteButton}
        onEditButtonClick={handleEditButtonClick}
      />
      {personalInfoEditMode && (
        <CVPersonalInfoModify
          settings={cvData.settings}
          data={cvData.data.personalInfo}
          onSave={handleSave}
        />
      )}
      {!personalInfoEditMode && (
        <CVPersonalInfo
          settings={cvData.settings}
          onEditButton={handlepersonalInfoEditButton}
          isEditing={isEditingMode}
          data={cvData}
        />
      )}

      <CVBody
        isEditingMode={isEditingMode}
        data={cvData}
        settings={cvData.settings}
      ></CVBody>
    </div>
  ) : (
    <>No CV found</>
  );
};

export default CVView;
