export interface PersonalDataInfo {
  image: string | null;
  cvName: string;
  birthDate: string;
  personalInfoFields: iPersonalInfoData[]
  summary: string | null
}
export interface iPersonalInfoData{
  icon?: string;
  type?: string;
  value?: string;
}
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
  id: number,
  note: string,
  createdOn: Date;
  settings: Settings ,
  data: {
    personalInfo: PersonalDataInfo,
    sections: {
      [key: string]: Section[]
    }
    }
}
export interface TaskList {
  [key: string]: string[];
}