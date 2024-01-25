import { useParams, useSearchParams } from "react-router-dom";
import CVList from "../../../mocked-data/cv-data";
import CVBody from "../CVBody";
import CVPersonalInfo from "../CVPersonalInfo";
import CVPersonalInfoModify from "./CVPersonalInfoModify";
import { useEffect, useRef, useState } from "react";
import { CVControlBar } from "../CVControlBar";
import PaletteModal from "../../shared/modals/PaletteModal";
import { produce } from "immer";
import { Row } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { getCVService } from "../../../services/fetch.service";
import { iCv } from "../../../entities/cvInterfaces";

const CVView = () => {
  const [cvData, setCvData] = useState<iCv>();
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const [queryParams] = useSearchParams();
  const { id } = useParams();
  const componentRef = useRef(null);

  const handlePaletteButton = () => {
    setShowPaletteModal(!showPaletteModal);
  };

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,

  //   // pageStyle: `
  //   // html {
  //   //   background-color: ${cvData?.settings.colorTheme?.background ?? "red"};
  //   // }

  //   // @page {  margin: 25px 0 25px 0;}`,
  // });

  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${cvData?.cvName}.pdf`,
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

  // const changeCvTheme = (selectedTheme: ColorTheme) => {
  //   // if (cvData) {
  //   //   setCvData(
  //   //     produce(cvData, (draftCvData) => {
  //   //       draftCvData.settings.colorTheme = selectedTheme;
  //   //     })
  //   //   );
  //   // }
  // };

  const handleEditButtonClick = () => {
    setIsEditingMode(!isEditingMode);
  };

  useEffect(() => {
    getCVService(id)
      .then((response) => {        
        setCvData(response.data);
        setIsEditingMode(!!queryParams.get("edit"));
      })
      .catch((error) => {
        console.log(error);
      });
    // if (cvData) {
    //   if (cvData.name === "") {
    //     setIsEditingMode(true);
    //   }
    //   if (!cvData.sections.leftCol.length && !cvData.sections.rightCol.length) {
    //     setIsEditingMode(true);
    //   }
    // }
    // if (!cvData?.cvName) {
    //   setpersonalInfoEditMode(true);
    // }
  }, []);


  // const savePersonalInfoData = (data: iCv) => {
  //   const updatedPersonalInfo = data.personalInfo;

  //   if (cvData) {
  //     setCvData({
  //       ...cvData,
  //       personalInfo: updatedPersonalInfo,
  //     });
  //   } else {
  //     console.error("Error: could not update data");
  //   }
  // };

  // const handleSave = (data?: iCv) => {
  //   if (data) savePersonalInfoData(data);
  // };

  return !!cvData ? (
    <Row
    // style={{ backgroundColor: cvData.settings.colorTheme?.background }}
    >
      {/* <PaletteModal
        showPaletteModal={showPaletteModal}
        onConfirm={(theme) => {
          changeCvTheme(theme);
          setShowPaletteModal(false);
        }}
        onDecline={() => {
          setShowPaletteModal(false);
        }}
      /> */}
      <CVControlBar
        // onPrintButtonClick={handlePrint}
        onColorPaletteClick={handlePaletteButton}
        onEditButtonClick={handleEditButtonClick}
        onSaveButtonClick={handleDownload}
      />
      {isEditingMode && (
        <CVPersonalInfoModify
          data={cvData}
        />
      )}
      <div
        ref={componentRef}
        className="p-5 margin-bottom-bars print-area theme-header"
        // style={{ backgroundColor: cvData.settings.colorTheme?.background }}
      >
        {!isEditingMode && (
          <CVPersonalInfo data={cvData} />
        )}
        <CVBody
          isEditingMode={isEditingMode}
          data={cvData}
        ></CVBody>
      </div>
    </Row>
  ) : (
    <>No CV found</>
  );
};

export default CVView;
