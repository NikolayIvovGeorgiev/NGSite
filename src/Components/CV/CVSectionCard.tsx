import { ReactNode } from "react";

interface Props {
  heading: string;
  children?: ReactNode;
}

const CVSectionCard = ({ heading, children }: Props) => {
  return (
    <div>
      <h1 className="border-gradient-title m-0 p-2" id={heading}>
        {heading}
      </h1>
      <div className="border-gradient-body p-2">{children}</div>
    </div>
  );
};

export default CVSectionCard;
