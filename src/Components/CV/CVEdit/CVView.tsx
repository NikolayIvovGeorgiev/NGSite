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
import { useEffect, useRef, useState } from "react";
import { SideCVControlBar } from "../SideCVControlBar";
import PaletteModal from "../../shared/modals/PaletteModal";
import { produce } from "immer";
import { Row } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

const CVView = () => {
  const [cvData, setCvData] = useState<CVInterface | undefined>();
  const { id } = useParams();
  // const [setBackgroundColor, setBackgroundColor] = useState<String>();

  const [personalInfoEditMode, setpersonalInfoEditMode] = useState(false);
  const handlepersonalInfoEditButton = () => {
    setpersonalInfoEditMode(!personalInfoEditMode);
  };
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const handlePaletteButton = () => {
    setShowPaletteModal(!showPaletteModal);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // bodyClass: "kur",
    // pageStyle: `.print-container { background-color: ${
    //   cvData?.settings.colorTheme?.background ?? "red"
    // };
    // }`,

    // html {
    //   background-color: ${cvData?.settings.colorTheme?.background ?? "red"};
    // }

    pageStyle: `
    html { 
      background-color: ${cvData?.settings.colorTheme?.background ?? "red"};
    }
    
    @page {  margin: 25px 0 25px 0;}`,
  });

  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${cvData?.note}.pdf`,
    copyStyles: true,
    print: async (printIframe: HTMLIFrameElement) => {
      const document = printIframe.contentDocument;
      if (document) {
        const html = document.getElementsByTagName("html")[0];
        const pdfOptions = {
          margin: [15, 15],
          html2canvas: { scale: 2, letterRendering: true },
          jsPDF: { unit: "pt", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };

        console.log(html);
        await html2pdf().from(html).set(pdfOptions).save();
      }
    },
  });

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
    <Row style={{ backgroundColor: cvData.settings.colorTheme?.background }}>
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
        onPrintButtonClick={handlePrint}
        onColorPaletteClick={handlePaletteButton}
        onEditButtonClick={handleEditButtonClick}
        onSaveButtonClick={handleDownload}
      />
      {personalInfoEditMode && (
        <CVPersonalInfoModify
          settings={cvData.settings}
          data={cvData.data.personalInfo}
          onSave={handleSave}
        />
      )}
      <div
        ref={componentRef}
        className="p-5 margin-bottom-bars print-area"
        style={{ backgroundColor: cvData.settings.colorTheme?.background }}
      >
        {!personalInfoEditMode && (
          <CVPersonalInfo
            settings={cvData.settings}
            onEditButton={handlepersonalInfoEditButton}
            isEditing={isEditingMode}
            data={cvData}
          />
        )}

        <CVBody isEditingMode={isEditingMode} data={cvData}></CVBody>
      </div>
    </Row>
  ) : (
    <>No CV found</>
  );
};

export default CVView;
