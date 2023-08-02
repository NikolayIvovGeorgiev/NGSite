import { ReactNode } from "react";

import { Section, Settings } from "../../entities/cvInterfaces";
import { Button } from "react-bootstrap";

interface Props {
  data: Section;
  index: number;
  heading: string;
  children?: ReactNode;
  isEditing: boolean;
  onClick: (index: number) => void;
  settings: Settings;
}

const CVSectionCard = ({
  data,
  settings,
  index,
  heading,
  children,
  isEditing,
  onClick,
}: Props) => {
  return (
    <>
      <h2
        className={`border-gradient-title m-0 p-2`}
        style={{
          color: `${settings.colorTheme?.dark}`,
          borderImageSource: `linear-gradient(165deg, ${settings.colorTheme?.accent}, rgba(0,0,0,0) 65%)`,
        }}
        id={heading}
      >
        {heading}
        {isEditing && (
          <Button
            className="btn btn-secondary float-end"
            onClick={() => {
              onClick(index);
            }}
          >
            Edit
          </Button>
        )}
      </h2>
      <div
        className="border-gradient-body p-2"
        style={{
          borderImageSource: `linear-gradient(165deg, ${settings.colorTheme?.accent}, rgba(0,0,0,0) 65%)`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default CVSectionCard;
