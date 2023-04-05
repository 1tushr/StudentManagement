var maxId = 1;
var students = [];
function addData() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var age = document.getElementById("age").value;
  var gpa = document.getElementById("gpa").value;
  var degree = document.getElementById("degree").value;

  const newStudent = {
    ID: students.length + 1,
    name: name,
    email: email,
    age: age,
    gpa: gpa,
    degree: degree 
  };

  students.push(newStudent);

  const table = document.getElementById('tbody');

  const row = document.createElement('tr');

  const id = document.createElement('td');
  const nameTd = document.createElement('td');
  const emailTd = document.createElement('td');
  const ageTd = document.createElement('td');
  const gpaTd = document.createElement('td');
  const degreeTd = document.createElement('td');

  id.innerHTML = newStudent.ID;
  nameTd.innerHTML = newStudent.name;
  emailTd.innerHTML = newStudent.email;
  ageTd.innerHTML = newStudent.age;
  gpaTd.innerHTML = newStudent.gpa;
  degreeTd.innerHTML = `<div class='degree'><div>${newStudent.degree}</div> <div class="icons"><a onClick="edit(${newStudent.ID})" class='fa'>&#xf044;</a> <a onClick="del(${newStudent.ID})" class='fa'>&#xf1f8;</a> </div></div>`;

  row.appendChild(id);
  row.appendChild(nameTd);
  row.appendChild(emailTd);
  row.appendChild(ageTd);
  row.appendChild(gpaTd);
  row.appendChild(degreeTd);

  table.appendChild(row);
}


function searchMe() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    // search through all table columns except for the ID column
    for (j = 1; j < tr[i].cells.length; j++) {
      td = tr[i].getElementsByTagName("td")[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  
}


function edit(id) {
  console.log('Edit function called with ID:', id);
  
  const student = students.find((student) => student.ID == id);
  
  if (student) {

    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('age').value = student.age;
    document.getElementById('gpa').value = student.gpa;
    document.getElementById('degree').value = student.degree;
    
    // Change the text of the submit button to "Edit Student"
    document.getElementById('submit').innerText = 'Edit Student';
    
    
    document.getElementById("submit").onclick = function() {
      // Update the student's information
      student.name = document.getElementById('name').value;
      student.email = document.getElementById('email').value;
      student.age = document.getElementById('age').value;
      student.gpa = document.getElementById('gpa').value;
      student.degree = document.getElementById('degree').value;
      
      // Clear the input fields
      document.getElementById('name').value = "";
      document.getElementById('email').value = "";
      document.getElementById('age').value = "";
      document.getElementById('gpa').value = "";
      document.getElementById('degree').value = "";
      
    
      document.getElementById('submit').innerText = 'Add Student';
      
      const table = document.getElementById('tbody');
      for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        if (row.cells[0].innerHTML == id) {
          row.cells[1].innerHTML = student.name;
          row.cells[2].innerHTML = student.email;
          row.cells[3].innerHTML = student.age;
          row.cells[4].innerHTML = student.gpa;
          row.cells[5].innerHTML = `<div class='degree'><div>${student.degree}</div> <div class="icons">style="cursor: pointer;"<a onClick="edit(${student.ID})" class='fa'>&#xf044;</a> <a onClick="del(${student.ID})" class='fa'>&#xf1f8;</a> </div></div>`;
          break;
        }
      }
    }
  } else {
    console.log(`No student found with ID ${id}`);
  }
}



function del(id) {
  console.log('Delete function called with ID:', id);
  let index = -1;
  for (let i = 0; i < students.length; i++) {
    if (students[i]['ID'] == id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    students.splice(index, 1);
    const table = document.getElementById('tbody');
    for (let i = 0; i < table.rows.length; i++) {
      let row = table.rows[i];
      if (row.cells[0].innerHTML == id) {
        table.deleteRow(i);
        break;
      }
    }
    console.log('Student deleted with ID:', id);
  }
}
