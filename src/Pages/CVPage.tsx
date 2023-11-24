import { Button, Row } from "react-bootstrap";
import { ImPlus } from "react-icons/im";
import CVPreviewCard from "../Components/CV/CVSectionCardSubComponents/CVPreviewCard";
import CVList from "../mocked-data/cv-data";
import NewCvModal from "../Components/shared/modals/NewCVModal";
import { useEffect, useState } from "react";
import { CVInterface } from "../entities/cvInterfaces";
import { produce } from "immer";
import { cloneDeep } from "lodash";
import { CvColorThemes } from "../Components/shared/constants/color-themes";
import { createCV, getCVs } from "../services/fetch.service";
import { useAuth } from "../AuthContext";

const CVPage = () => {
  const { authToken } = useAuth();
  useEffect(() => {
    console.log(authToken);

    getCVs().then((response) => {
      setCvList(response.data);
    });
  }, [authToken]);
  const [cvList, setCvList] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  // const newCvObjest: CVInterface = {
  //   id: CVList.length + 1,
  //   note: "",
  //   lastEdited: new Date(),
  //   settings: {
  //     colorTheme: CvColorThemes[0],
  //   },
  //   data: {
  //     personalInfo: {
  //       photo: null,
  //       name: "",
  //       birthDate: "",
  //       fields: [],
  //       summary: null,
  //     },
  //     sections: {
  //       leftCol: [],
  //       rightCol: [],
  //     },
  //   },
  // };

  const createNewCV = (name: string) => {
    // let copy = cloneDeep(newCvObjest);
    // copy.note = note;
    // setCvList(
    //   produce(cvList, (draftCvlist) => {
    //     draftCvlist.push(copy);
    //     CVList.push(copy);
    //   })
    // );
    createCV(name).then(() => {});
    setShowModal(false);
  };

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
        {cvList.map((cv: any, index: number) => {
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
