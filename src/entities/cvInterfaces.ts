

export interface iCvBase {
  id: string,
  fileName: string,
  createdOn: Date,
  lastEditedOn: Date,
  colorTheme: string,
  personalInfo: iPersonalDataInfo
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
  photo: string,
  name: string, 
  birthDate: Date
  summary: string
  fields: iPersonalInfoFields[]
}
export interface iPersonalInfoFields{
  icon?: string;
  type?: string;
  value?: string;
}

export interface iSectionBase {
  id: string;
  columnPosition: string;
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
    iTextFieldComponentData | 
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