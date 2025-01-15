import { EmployeesType } from "./types";

export const filterFormValue = (data: EmployeesType | null) => {
  if (data) {
    const filterData = {
      admission_days_de: data.de.admission_days,
      admission_days_en: data.en.admission_days,
      admission_days_uz: data.uz.admission_days,
      description_de: data.de.description,
      description_en: data.en.description,
      description_uz: data.uz.description,
      education_de: data.de.education,
      education_en: data.en.education,
      education_uz: data.uz.education,
      education_level_de: data.de.education_level,
      education_level_en: data.en.education_level,
      education_level_uz: data.uz.education_level,
      email: data.uz.email,
      full_name_de: data.de.full_name,
      full_name_en: data.en.full_name,
      full_name_uz: data.uz.full_name,
      phone: data.uz.phone,
      position_de: data.de.position,
      position_en: data.en.position,
      position_uz: data.uz.position,
      role: data.uz.role,
      scientific_degree_de: data.de.scientific_degree,
      scientific_degree_en: data.en.scientific_degree,
      scientific_degree_uz: data.uz.scientific_degree,
    };
    return filterData;
  } else {
    return {};
  }
};


