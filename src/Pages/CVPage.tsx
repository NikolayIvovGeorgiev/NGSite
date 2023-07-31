import { Button, Card, Container, Placeholder, Row } from "react-bootstrap";
import { ImPlus } from "react-icons/im";
import CVPreviewCard from "../Components/CV/CVSectionCardSubComponents/CVPreviewCard";
import CVList from "../mocked-data/cv-data";
import NewCvModal from "../Components/shared/modals/NewCVModal";
import { useEffect, useState } from "react";
import { CVInterface } from "../entities/cvInterfaces";
import { produce } from "immer";
import { cloneDeep } from "lodash";

const CVPage = () => {
  const [cvList, setCvList] = useState(CVList);
  const [showModal, setShowModal] = useState(false);
  const newCvObjest: CVInterface = {
    id: CVList.length + 1,
    note: "",
    lastEdited: new Date(),
    settings: {
      colorTheme: {
        dark: "#333652",
        light: "#E9EAEC",
        lightSecondary: "#90ADC6",
        accent: "#FAD02C",
      },
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
    console.log(CVList);
  };

  useEffect(() => {
    console.log(cvList.length);
  }, [cvList]);
  return (
    <>
      <NewCvModal
        showModal={showModal}
        onConfirm={createNewCV}
        onDecline={() => {
          setShowModal(false);
        }}
      />
      <Container>
        <Row xs={3}>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <ImPlus className="me-2" />
            New CV
          </Button>
        </Row>
        <Row>
          {cvList.map((cv, index) => {
            return <CVPreviewCard cv={cv} key={index} />;
          })}
          <div className="d-flex justify-content-around"></div>
        </Row>
      </Container>
    </>
  );
};

export default CVPage;
