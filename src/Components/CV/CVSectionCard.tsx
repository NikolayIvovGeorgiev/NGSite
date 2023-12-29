import { ReactNode } from "react";

import { Settings } from "../../entities/cvInterfaces_old";
import { Button } from "react-bootstrap";

interface Props {
  // data: Section;
  index: number;
  heading: string;
  children?: ReactNode;
  isEditing: boolean;
  onClick: (index: number) => void;
  settings: Settings;
}

const CVSectionCard = ({
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
        className={`border-gradient-title m-0 p-3 px-4`}
        style={{
          color: `${settings.colorTheme?.heading}`,
          borderImageSource: `linear-gradient(165deg, ${settings.colorTheme?.accent}, rgba(255,255,255,0) 20%)`,
          backgroundColor: `${settings.colorTheme?.background}`,
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
        className="border-gradient-body p-4"
        style={{
          color: `${settings.colorTheme?.heading}`,
          borderImageSource: `linear-gradient(165deg, ${settings.colorTheme?.accent}, rgba(255,255,255,0) 65%)`,
          backgroundColor: `${settings.colorTheme?.background}`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default CVSectionCard;
