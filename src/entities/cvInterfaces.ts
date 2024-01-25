

export interface iCvBase {
  id: string,
  cvName: string, // This is the name of the person
  createdOn: Date,
  createdById: string,
  lastEditedOn: Date,
  colorTheme: string,
  image: string,
  name: string, // This is the name of the file
  birthDate: Date
  summary: string
  personalInfoFields: iPersonalInfoFields[]
}

export type colList = 'leftCol' | 'rightCol';

export interface iCv extends iCvBase {
  sections: {
    [key in colList]: iSection[]
  }
}
export interface iCvApi extends iCvBase {
  sections: iSectionApi[]
}

export interface iPersonalDataInfo {
  image: string,
  name: string, 
  birthDate: Date,
  summary: string,
  personalInfoFields: iPersonalInfoFields[],
  colorTheme: string
}

export interface iPersonalInfoFields {
  icon?: string;
  type?: string;
  value?: string;
}

export interface iSectionBase {
  id: string;
  columnPosition: colList;
  order: string;
}

export interface iSection extends iSectionBase {
  payload: iSectionPayload;
}
export interface iSectionApi extends iSectionBase {
  payload: string;
}

export interface iSectionPayload {
  type: string;
  title: string;
  state: string;
  content?: iProgressBarComponentData[] | 
    iTextFieldComponentData[] | 
    iPieChartComponentData[];
}

// Sections types
export interface iProgressBarComponentData {
  id?: number;
  title?: string;
  level: number;
}
export interface iTextFieldComponentData {
  title?: string;
  subtitle?: string;
  description?: string;
  list?: string[];
  startDate?: Date;
  endDate?: Date;
}
export interface iPieChartComponentData {
  title?: string;
  percent?: string;
  color?: string;
}