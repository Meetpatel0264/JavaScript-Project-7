let students = [];

const grIdInput = document.getElementById("grid");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("contactno");
const courseSelect = document.getElementById("course");
const stuInfo = document.getElementById("stuinfo");

function addStudent() {
  const grid = grIdInput.value.trim();
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const phone = phoneInput.value.trim();
  const course = courseSelect.value;

  if (grid === "" || name === "" || phone === "" || course === "-1") {
    Swal.fire("Missing Information", "Please fill all required fields!", "warning");
    return;
  }

  if (students.some(s => s.grid === grid)) {
    Swal.fire("Duplicate ID", "This GR ID already exists!", "error");
    return;
  }

  const student = { grid, name, age, phone, course };
  students.push(student);

  grIdInput.value = nameInput.value = ageInput.value = phoneInput.value = "";
  courseSelect.value = "-1";

  Swal.fire({
    icon: "success",
    title: "Student Added Successfully!",
    timer: 1500,
    showConfirmButton: false
  });

  renderStudents();
}

function deleteStudent(grid) {
  const student = students.find(s => s.grid === grid);

  Swal.fire({
    title: `Delete ${student.name}?`,
    text: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Delete"
  }).then(result => {
    if (result.isConfirmed) {
      students = students.filter(s => s.grid !== grid);
      renderStudents();
      Swal.fire("Deleted!", "Student removed.", "success");
    }
  });
}

function getCourseClass(course) {
  return {
    "FSD": "course-fsd",
    "UI/UX": "course-uiux",
    "AI/ML": "course-aiml"
  }[course];
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

  students.forEach(student => {
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
          <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.grid}')">
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
