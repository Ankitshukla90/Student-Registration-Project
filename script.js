// Task 6: JavaScript Functionality

// Initialize State
// Load data from LocalStorage or start with empty array
let students = JSON.parse(localStorage.getItem('students')) || [];
const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const submitBtn = document.getElementById('submitBtn');
const editIndexInput = document.getElementById('editIndex');

// Initial Render
document.addEventListener('DOMContentLoaded', renderTable);

/**
 * Main Function to handle Form Submission (Add or Update)
 */
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Get Values
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('emailID').value.trim();
    const contact = document.getElementById('contactNo').value.trim();

    // 2. Validate Inputs
    if (!validateInputs(name, id, email, contact)) {
        return; // Stop if validation fails
    }

    // 3. Create Student Object
    const studentData = { name, id, email, contact };

    // 4. Check if we are Editing or Adding
    const editIndex = editIndexInput.value;

    if (editIndex === "") {
        // Add Mode
        students.push(studentData);
    } else {
        // Edit Mode
        students[editIndex] = studentData;
        submitBtn.textContent = "Add Student"; // Reset button text
        submitBtn.style.backgroundColor = "#2ecc71";
        editIndexInput.value = ""; // Clear edit index
    }

    // 5. Save and Render
    saveToLocalStorage();
    renderTable();
    studentForm.reset();
});

/**
 * Validation Logic
 */
function validateInputs(name, id, email, contact) {
    let isValid = true;

    // Reset errors
    document.querySelectorAll('.error').forEach(el => el.textContent = "");

    // Name: Only characters (letters and spaces)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
        document.getElementById('nameError').textContent = "Name must contain only characters.";
        isValid = false;
    }

    // ID: Only numbers, not empty
    if (!id || isNaN(id)) {
        document.getElementById('idError').textContent = "ID must be a number.";
        isValid = false;
    }

    // Email: Valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = "Enter a valid email address.";
        isValid = false;
    }

    // Contact: Numbers only, at least 10 digits
    if (!contact || isNaN(contact) || contact.length < 10) {
        document.getElementById('contactError').textContent = "Contact must be at least 10 digits.";
        isValid = false;
    }

    return isValid;
}

/**
 * Render Table Function
 */
function renderTable() {
    studentList.innerHTML = ""; // Clear current list

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });

    // Task 6: Add vertical scrollbar dynamically via JS
    manageScrollbar();
}

/**
 * Edit Student Function
 */
function editStudent(index) {
    const student = students[index];

    // Populate form fields
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    // Set Hidden Index
    editIndexInput.value = index;

    // Change Button Visuals
    submitBtn.textContent = "Update Student";
    submitBtn.style.backgroundColor = "#f39c12";
}

/**
 * Delete Student Function
 */
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1); // Remove 1 item at index
        saveToLocalStorage();
        renderTable();
    }
}

/**
 * Local Storage Helper
 */
function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

/**
 * Dynamic Scrollbar Logic (Task 6)
 * Checks if the number of rows exceeds 5, applies scrollable class.
 */
function manageScrollbar() {
    const tableContainer = document.getElementById('tableContainer');
    const rowCount = students.length;

    // If we have more than 5 students, enable scroll (you can adjust the logic)
    if (rowCount > 5) {
        tableContainer.classList.add('scrollable-table');
    } else {
        tableContainer.classList.remove('scrollable-table');
    }
}