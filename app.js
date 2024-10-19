let students = [];

// Load data from JSON file
document.addEventListener('DOMContentLoaded', function () {
  fetch('students.json')
    .then(response => response.json())
    .then(data => {
      students = data.students;
      displayStudents();
    })
    .catch(error => console.error('Error loading students:', error));
});

// Display student data in a table
function displayStudents() {
  const tableContainer = document.getElementById('studentsTable');
  let tableContent = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Grade</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>`;

  students.forEach((student, index) => {
    tableContent += `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.class}</td>
        <td>
          <button class="btn btn-info btn-sm" onclick="editStudent(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>`;
  });

  tableContent += `</tbody></table>`;
  tableContainer.innerHTML = tableContent;
}

// Add or edit student
document.getElementById('saveStudentBtn').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const grade = document.getElementById('grade').value;
  const classVal = document.getElementById('class').value;
  const studentId = document.getElementById('studentId').value;

  if (studentId) {
    // Edit student
    const studentIndex = students.findIndex(s => s.id == studentId);
    students[studentIndex] = {
      id: parseInt(studentId),
      name,
      age: parseInt(age),
      grade: parseInt(grade),
      class: classVal
    };
  } else {
    // Add new student
    const newId = students.length ? students[students.length - 1].id + 1 : 1;
    students.push({
      id: newId,
      name,
      age: parseInt(age),
      grade: parseInt(grade),
      class: classVal
    });
  }

  displayStudents();
  document.getElementById('studentForm').reset();
  document.getElementById('studentId').value = '';
  const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
  modal.hide();
});

// Edit student data
function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('age').value = student.age;
  document.getElementById('grade').value = student.grade;
  document.getElementById('class').value = student.class;
  document.getElementById('studentId').value = student.id;
  const modal = new bootstrap.Modal(document.getElementById('addStudentModal'));
  modal.show();
}

// Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    displayStudents();
  }
}