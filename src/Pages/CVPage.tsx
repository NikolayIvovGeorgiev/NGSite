import { Button, Row } from "react-bootstrap";
import { ImPlus } from "react-icons/im";
import CVPreviewCard from "../Components/CV/CVSectionCardSubComponents/CVPreviewCard";
import CVList from "../mocked-data/cv-data";
import NewCvModal from "../Components/shared/modals/NewCVModal";
import { useEffect, useState } from "react";
import { CVInterface } from "../entities/cvInterfaces_old";
import { produce } from "immer";
import { cloneDeep } from "lodash";
import { CvColorThemes } from "../Components/shared/constants/color-themes";
import {
  createCV,
  deleteCVService,
  getCVsService,
} from "../services/fetch.service";
import { useAuth } from "../AuthContext";
import { createSearchParams, redirect, useNavigate } from "react-router-dom";

const CVPage = () => {
  const { userChangedObservable } = useAuth();

  const [CVListObservable, setCVListObservable] = useState(0);

  useEffect(() => {
    getCVsService().then((response) => {
      setCvList(response.data);
    });
  }, [CVListObservable]);

  // Gets the list and refreshes if user is logged in or out
  useEffect(() => {
    getCVsService().then((response) => {
      setCvList(response.data);
    });
  }, [userChangedObservable]);

  const [cvList, setCvList] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
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
    createCV(name).then((res) => {
      setCVListObservable(CVListObservable + 1);
      navigate({
        pathname: `${res.data.id}`,
        search: createSearchParams({ edit: "true" }).toString(),
      });
    });
    setShowModal(false);
  };

  const deleteCV = (CVid: number) => {
    deleteCVService(CVid).then(() => {
      setCVListObservable(CVListObservable + 1);
    });
    //refresh CVList
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
          return (
            <CVPreviewCard
              cv={cv}
              key={index}
              name={cv.name}
              onDelete={() => {
                deleteCV(cv.id);
              }}
            />
          );
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
