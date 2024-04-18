(async function () {
  let employees;
  fetch("./src/data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let res = data;
      employees = res;
      var selectedEmployeeId = employees[0].id;
      var selectedEmployee = employees[0];
      const employeeList = document.querySelector(".employee-name-list");
      const employeeListInfo = document.querySelector(".employee-detail");

      //Add employee logic later
      const createEmployee = document.querySelector(".create-employee");
      const addEmployeeModal = document.querySelector(".add-employee");
      const addEmployeeForm = document.querySelector(".addEmployee_create");

      createEmployee.addEventListener("click", () => {
        addEmployeeModal.style.display = "flex";
      });

      addEmployeeModal.addEventListener("click", (e) => {
        if (e.target.className === "addEmployee") {
          addEmployeeModal.style.display = "none";
        }
      });

      const dobInput = document.querySelector(".addEmployee_create--dob");
      dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
        .toISOString()
        .slice(5, 10)}`;

      addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries(0)];
        let empData = {};
        values.forEach((val) => {
          empData[val[0]] = val[1];
        });
        empData.age =
          new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
        empData.id = employees[employees.length - 1].id + 1;
        employees.push(empData);
        renderEmployee();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";
      });

      //select emoployee logic
      employeeList.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
          selectedEmployeeId = e.target.id;
          renderEmployee();
          renderSingleEmployee();
        }
        if (e.target.tagName === "I") {
          employees = employees.filter(
            (emp) => String(emp.id) !== e.target.parentNode.id
          );
          if (String(selectedEmployeeId) === e.target.parentNode.id) {
            selectedEmployeeId = employees[0].id || -1;
            selectedEmployee = employees[0] || {};
            renderSingleEmployee();
          }
          renderEmployee();
        }
      });
      const renderEmployee = () => {
        employeeList.innerHTML = "";
        employees.forEach((emp) => {
          const employee = document.createElement("span");
          employee.classList.add("employee-name-item");
          if (parseInt(selectedEmployeeId, 10) === emp.id) {
            selectedEmployee = emp;
            employee.classList.add("selected");
          }
          employee.setAttribute("id", emp.id);
          employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
          employeeList.append(employee);
        });
      };
      const renderSingleEmployee = () => {
        employeeListInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}"/>
        <span class="employee-name-heading">${selectedEmployee.firstName} ${selectedEmployee.lastName}</span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
        `;
      };
      if (selectedEmployee) renderSingleEmployee();
      renderEmployee();
    });

  //Render single employee
})();
