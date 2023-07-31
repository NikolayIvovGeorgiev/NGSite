export interface PersonalDataInfo {
  photo: string | null;
  name: string;
  birthDate: string;
  fields: iPersonalInfoData[]
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
      colorTheme?: {
      dark: string,
      light: string,
      lightSecondary: string,
      accent: string,
    }
}

export interface CVInterface {
  id: number,
  note: string,
  lastEdited: Date;
  settings: Settings ,
  data: {
    personalInfo: PersonalDataInfo,
    sections: {
      [key: string]: Section[]
    }
    }
}