export interface PersonalDataInfo {
  linkedin: string;
  city: string;
  email: string;
  phone: string;
}
export interface iProgressBarComponentData {
  title?: string;
  level?: number;
}
export interface iTextFieldComponentData {
  title?: string;
  subtitle?: string;
  description?: string;
  list?: string[];
  startDate?: string;
  endDate?: string;
}
// TODO: When concrete pie chart component is picked, the data should be shaped around it
export interface iPieChartComponentData {
  title?: string;
  percent?: number;
}
export interface Section {
  type: string;
  title: string;
  data: {
    config: {[key: string]: string | boolean | number},
    content?: 
    | iProgressBarComponentData[] 
    | iTextFieldComponentData[] 
    | iPieChartComponentData[];
  } 
}

export interface CVInterface {
  id: number,
  note: string;
  settings: {[key: string]: string | boolean | number},
  data: {
    personalInfo: PersonalDataInfo,
    sections: Section[];}
  
}
