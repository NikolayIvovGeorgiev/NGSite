import { Button, Card, Container, Placeholder, Row } from "react-bootstrap";
import { ImPlus } from "react-icons/im";
import CVPreviewCard from "../Components/CV/CVSectionCardSubComponents/CVPreviewCard";
import CVList from "../mocked-data/cv-data";
import NewCvModal from "../Components/shared/modals/NewCVModal";
import { useEffect, useState } from "react";
import { CVInterface } from "../entities/cvInterfaces";
import { produce } from "immer";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";
import { CvColorThemes } from "../Components/shared/constants/color-themes";

const CVPage = () => {
  const [cvList, setCvList] = useState(CVList);
  const [showModal, setShowModal] = useState(false);
  const newCvObjest: CVInterface = {
    id: CVList.length + 1,
    note: "",
    lastEdited: new Date(),
    settings: {
      colorTheme: CvColorThemes[0],
    },
    data: {
      personalInfo: {
        photo: null,
        name: "",
        birthDate: "",
        fields: [],
        summary: null,
      },
      sections: {
        leftCol: [],
        rightCol: [],
      },
    },
  };

  const createNewCV = (note: string) => {
    let copy = cloneDeep(newCvObjest);
    copy.note = note;
    setCvList(
      produce(cvList, (draftCvlist) => {
        draftCvlist.push(copy);
        CVList.push(copy);
      })
    );
    setShowModal(false);
  };

  useEffect(() => {
    console.log(cvList.length);
  }, [cvList]);
  return (
    <>
      <NewCvModal
        onExit={() => {
          setShowModal(false);
        }}
        showModal={showModal}
        onConfirm={createNewCV}
        onDecline={() => {
          setShowModal(false);
        }}
      />
      <Row className="p-4">
        {cvList.map((cv, index) => {
          return <CVPreviewCard cv={cv} key={index} />;
        })}
        <div className="d-flex justify-content-around"></div>
        <Button
          className="mt-4"
          variant="primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <ImPlus className="me-2" />
          New CV
        </Button>
      </Row>
    </>
  );
};

export default CVPage;
