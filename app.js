document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const tbody = document.getElementById('tbody');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate form inputs
        const studentName = form.studentName.value.trim();
        const studentID = form.studentID.value.trim();
        const email = form.email.value.trim();
        const contact = form.contact.value.trim();

        if (!isValidInput(studentName, studentID, email, contact)) {
            alert('Please enter valid input.');
            return;
        }

        // Add data to localStorage
        let studentData = {
            studentName: studentName,
            studentID: studentID,
            email: email,
            contact: contact
        };

        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(studentData);
        localStorage.setItem('students', JSON.stringify(students));

        // Update table
        updateTable();
        form.reset();
    });

    // Function to update table with localStorage data
    function updateTable() {
        tbody.innerHTML = '';

        let students = JSON.parse(localStorage.getItem('students')) || [];

        students.forEach(function(student, index) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.studentName}</td>
                <td>${student.studentID}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Edit student record
    window.editStudent = function(index) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        let student = students[index];
        if (student) {
            form.studentName.value = student.studentName;
            form.studentID.value = student.studentID;
            form.email.value = student.email;
            form.contact.value = student.contact;

            // Remove the edited student from localStorage
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));

            // Update the table
            updateTable();
        }
    };

    // Delete student record
    window.deleteStudent = function(index) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        updateTable();
    };

    // Validation function
    function isValidInput(name, id, email, contact) {
        const nameRegex = /^[A-Za-z ]+$/;
        const idRegex = /^\d+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^\d+$/;

        return nameRegex.test(name) &&
               idRegex.test(id) &&
               emailRegex.test(email) &&
               contactRegex.test(contact);
    }

    // Initial load of table data
    updateTable();
});


