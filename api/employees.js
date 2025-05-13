import express from "express";
const router = express.Router();
export default router;
import employeesArray from "#db/employees";

//import { getEmployees, addEmployees, getEmployeesById } from "#db/employees";

router
  .route("/")
  .get((req, res) => {
    res.send(employeesArray);
  })
  .post((req, res) => {
    console.debug(req.body);
    if (!req.body || !req.body.name) return res.status(400).send("error");
    const id = employeesArray[employeesArray.length - 1].id + 1;
    const name = req.body.name;
    const newEmployee = { id, name };
    employeesArray.push(newEmployee);
    res.status(201).send(newEmployee);
  });

router.route("/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  res.send(employeesArray[randomIndex]);
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;

  const employee = employeesArray.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});
