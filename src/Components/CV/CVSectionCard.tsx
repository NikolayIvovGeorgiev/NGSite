import { ReactNode } from "react";

import { Section } from "../../entities/cvInterfaces";
import { Button } from "react-bootstrap";

interface Props {
  data: Section;
  index: number;
  heading: string;
  children?: ReactNode;
  isEditing: boolean;
  onClick: (index: number) => void;
}

const CVSectionCard = ({
  data,
  index,
  heading,
  children,
  isEditing,
  onClick,
}: Props) => {
  return (
    <>
      <h2 className="border-gradient-title m-0 p-2" id={heading}>
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
      <div className="border-gradient-body p-2">{children}</div>
    </>
  );
};

export default CVSectionCard;
