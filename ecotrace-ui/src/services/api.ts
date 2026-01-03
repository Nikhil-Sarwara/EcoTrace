import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5219/api",
});

export const activityService = {
  getSummary: () => api.get("/activities/summary").then((res) => res.data),
  getActivities: () => api.get("/activities").then((res) => res.data),
  createActivity: (data: any) =>
    api.post("/activities", data).then((res) => res.data),
};
