import { ReactNode } from "react";
import { CVInterface } from "../../entities/cvInterfaces";
import React from "react";
import { Container } from "react-bootstrap";

interface Props {
  data: CVInterface;
  children: ReactNode;
}

const CVBody = ({ data, children }: Props) => {
  return <Container>{children}</Container>;
};

export default CVBody;
