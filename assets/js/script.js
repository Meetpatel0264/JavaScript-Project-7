let students = [];
let editIndex = -1;

const grIdInput = document.getElementById("grid");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("contactno");
const courseSelect = document.getElementById("course");
const stuInfo = document.getElementById("stuinfo");
const form = document.getElementById("stu");

function addStudent() {
  const grid = grIdInput.value.trim();
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const phone = phoneInput.value.trim();
  const course = courseSelect.value;

  if (grid === "") {
    Swal.fire("GR ID Required", "Please fill GR ID", "warning");
    grIdInput.focus();
    return;
  }

  if (name === "") {
    Swal.fire("Name Required", "Please fill Student Name", "warning");
    nameInput.focus();
    return;
  }

  if (age === "") {
    Swal.fire("Age Required", "Please fill Age", "warning");
    ageInput.focus();
    return;
  }

  if (age < 1 || age > 100) {
    Swal.fire("Invalid Age", "Age must be between 1 and 100", "error");
    ageInput.focus();
    return;
  }

  if (phone === "") {
    Swal.fire("Phone Required", "Please fill Phone Number", "warning");
    phoneInput.focus();
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    Swal.fire(
      "Invalid Phone Number",
      "Phone number must be exactly 10 digits",
      "error"
    );
    phoneInput.focus();
    return;
  }

  if (course === "-1") {
    Swal.fire("Course Required", "Please select Course", "warning");
    courseSelect.focus();
    return;
  }

  if (editIndex === -1 && students.some(s => s.grid === grid)) {
    Swal.fire("Duplicate GR ID", "This GR ID already exists!", "error");
    return;
  }

  const student = { grid, name, age, phone, course };

  if (editIndex === -1) {
    students.push(student);
    Swal.fire("Success", "Student added successfully", "success");
  } else {
    students[editIndex] = student;
    editIndex = -1;
    Swal.fire("Updated", "Student updated successfully", "success");
  }

  form.reset();
  courseSelect.value = "-1";
  grIdInput.disabled = false;
  form.querySelector("button").innerHTML =
    `<i class="fas fa-plus me-1"></i>Add`;

  renderStudents();
}

function editStudent(index) {
  const s = students[index];

  grIdInput.value = s.grid;
  nameInput.value = s.name;
  ageInput.value = s.age;
  phoneInput.value = s.phone;
  courseSelect.value = s.course;

  editIndex = index;

  grIdInput.disabled = true;

  form.querySelector("button").innerHTML =
    `<i class="fas fa-pen me-1"></i>Update`;
}

function deleteStudent(index) {
  students.splice(index, 1);

  form.reset();
  courseSelect.value = "-1";
  editIndex = -1;
  grIdInput.disabled = false;

  form.querySelector("button").innerHTML =
    `<i class="fas fa-plus me-1"></i>Add`;

  renderStudents();
}

function getCourseClass(course) {
  switch (course) {
    case "FSD":
      return "course-fsd";
    case "UI/UX":
      return "course-uiux";
    case "AI/ML":
      return "course-aiml";
    default:
      return "";
  }
}


function renderStudents() {
  if (students.length === 0) {
    stuInfo.innerHTML = `
      <div class="empty-message">
        <i class="fas fa-users fa-3x mb-2 opacity-50"></i>
        <h5>No students added</h5>
      </div>`;
    return;
  }

  let html = `
    <table class="table table-hover mb-0">
      <thead>
        <tr>
          <th>GR ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Course</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  students.forEach((student, index) => {
    html += `
      <tr>
        <td><strong>#${student.grid}</strong></td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.phone}</td>
        <td>
          <span class="course-badge ${getCourseClass(student.course)}">
            ${student.course}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editStudent(${index})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  stuInfo.innerHTML = html;
}

renderStudents();
