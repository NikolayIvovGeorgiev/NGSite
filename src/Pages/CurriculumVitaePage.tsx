import CVBody from "../Components/CV/CVBody";
import CVPersonalInfo from "../Components/CV/CVPersonalInfo";
import CVSectionCard from "../Components/CV/CVSectionCard";
import {
  CVData,
  PersonalDataInfo,
  Section,
  iTextFieldComponentData,
  iProgressBarComponentData,
} from "../entities/cvInterfaces";
import TextField from "../Components/CV/CVSectionCardSubComponents/TextField";
import data from "../mocked-data/cv-data";
import ProgressbarField from "../Components/CV/CVSectionCardSubComponents/ProgressbarField";
const CurriculumVitaePage = () => {
  return (
    <div className="p-2">
      <CVPersonalInfo data={data.personalInfo as PersonalDataInfo} />
      <CVBody data={data as CVData}>
        {data.sections.map((section: Section, index: number) => {
          switch (section.type) {
            case "Progress-bar":
              return (
                <CVSectionCard heading={section.title}>
                  <ProgressbarField data={section.data.content} />
                </CVSectionCard>
              );
            case "Text-field":
              return (
                <CVSectionCard heading={section.title} key={index}>
                  <TextField data={section.data.content} />
                </CVSectionCard>
              );
            // case "Progress-bar":
            //   const progressBarData = section.data as ProgressBar;
            //   return <CVSectionCard heading={section.type}></CVSectionCard>;
            default:
              return null;
          }
        })}
        {/* Map all the sections from the list */}

        {/* Switch choses the right component from the section. Check with type of */}
      </CVBody>
    </div>
  );
};

export default CurriculumVitaePage;
