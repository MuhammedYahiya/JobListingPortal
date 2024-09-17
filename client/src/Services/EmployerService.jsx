import axios from "axios";

class EmployeeService {
  getEmployee() {
    return axios.post("http://localhost:8000/api/employer/register");
  }
}

export default new EmployeeService();
