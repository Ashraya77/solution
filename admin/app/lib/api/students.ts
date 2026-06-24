import { getStudents } from "../services/GetStudents";

export const studentsAPI = {
  getAllStudents: async () => {
    const response = await getStudents();
    return response.data;
  },
};
