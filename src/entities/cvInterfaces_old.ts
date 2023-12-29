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
  startDate?: string;
  endDate?: string;
}

export interface iPieChartComponentData {
  title?: string;
  percent?: string;
  color?: string;
}
export interface Section {
  id: string,
  type: string;
  title: string;
  state: string
  data: {
    config: {[key: string]: string | boolean | number},
    content?: 
    | iProgressBarComponentData[] 
    | iTextFieldComponentData[] 
    | iPieChartComponentData[];
  } 
}
// export interface Color{
//   dark: string,
//   light: string,
//   lightSecondary: string,
//   accent: string,
// }
export interface Settings{
      colorTheme?: ColorTheme
}

export interface ColorTheme {
  heading: string,
  background: string,
  text: string,
  accent: string,
}


export interface CVInterface {
  birthDate: any,
  createdById: any,
  createdOn: any,
  cvName: string,
  id: number,
  image: string,
  name: string,
  personalInfoFields: iPersonalInfoFields[],
  sections: {
    [key: string]: Section[]
  }
  setting: Settings,
  summary: string,
}
export interface iPersonalInfoFields{
  icon?: string;
  type?: string;
  value?: string;
}
export interface PersonalDataInfo {
  image: string | null;
  name: string;
  birthDate: string;
  summary?: string
  id: string
}
export interface TaskList {
  [key: string]: string[];
}