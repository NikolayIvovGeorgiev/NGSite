import { useParams } from "react-router-dom";
import {
  PersonalDataInfo,
  CVInterface,
  Section,
} from "../../../entities/cvInterfaces";
import CVBody from "../CVBody";
import CVPersonalInfo from "../CVPersonalInfo";
import CVSectionCard from "../CVSectionCard";
import PieChartField from "./PieChartField";
import ProgressbarField from "./ProgressbarField";
import TextField from "./TextField";
import CVList from "../../../mocked-data/cv-data";

interface Props {
  cv?: CVInterface;
}
// Ako imame CV display
// Ako nqmame zimame ID-to ot route-a i filtrirame lista po ID i togava display-vame

const CVView = ({ cv }: Props) => {
  const { id } = useParams();
  if (!cv) {
    cv = CVList.find((currentCv) => Number(id) === currentCv.id);

    if (!cv) return <>No CV found</>;
    // Ako nqmame zimame ID-to ot route-a i filtrirame lista po ID i togava display-vame
  }
  //     // Ako nqmame zimame ID-to ot route-a i filtrirame lista po ID i togava display-vame
  //     CVList tochka >>>>>>
  //     <>NO cv</>
  //   )
  // } else {
  return (
    <>
      <CVPersonalInfo data={cv.data.personalInfo as PersonalDataInfo} />
      <CVBody data={cv as CVInterface}>
        {cv.data.sections.map((section: Section, index: number) => {
          // if(section.isEditing) {
          //   return <CVSectionModify></CVSectionModify>
          // }
          switch (section.type) {
            case "Progress-bar":
              return (
                <CVSectionCard heading={section.title} key={index}>
                  <ProgressbarField data={section.data.content} />
                </CVSectionCard>
              );
            case "Text-field":
              return (
                <CVSectionCard heading={section.title} key={index}>
                  <TextField data={section.data.content} />
                </CVSectionCard>
              );
            case "Pie-Chart":
              return (
                <CVSectionCard heading={section.title} key={index}>
                  <PieChartField data={section.data.content} />
                </CVSectionCard>
              );
          }
        })}
      </CVBody>
    </>
  );
};

export default CVView;
