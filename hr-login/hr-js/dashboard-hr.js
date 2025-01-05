const weeklyData = [
    { id: 1, date: '2023-05-01', studentId: 'S12345', feedback: 'Great app, very useful!', rating: 5 },
    { id: 2, date: '2023-05-02', studentId: 'S67890', feedback: 'Could use some improvements in the UI', rating: 3 },
    { id: 3, date: '2023-05-03', studentId: 'S24680', feedback: 'Helpful for keeping track of assignments', rating: 4 },
];

const quarterlyData = [
    { id: 1, date: '2023-03-15', studentId: 'S13579', feedback: 'Excellent tool for students', rating: 5 },
    { id: 2, date: '2023-04-02', studentId: 'S86420', feedback: 'Needs more features', rating: 3 },
    { id: 3, date: '2023-04-20', studentId: 'S97531', feedback: 'Very intuitive interface', rating: 4 },
    { id: 4, date: '2023-05-01', studentId: 'S12345', feedback: 'Great app, very useful!', rating: 5 },
    { id: 5, date: '2023-05-02', studentId: 'S67890', feedback: 'Could use some improvements in the UI', rating: 3 },
];

// Function to sort by date and reassign IDs
function sortAndReassignIDs(data) {
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
    return sortedData.map((item, index) => ({ ...item, id: index + 1 })); // Reassign sequential IDs starting from 1
}

// Function to update dashboard and display feedback
function updateDashboard(data, label) {
    const totalFeedback = data.length;
    const positiveFeedback = data.filter(item => item.rating >= 4).length;
    const negativeFeedback = data.filter(item => item.rating < 3).length;
    const averageRating = (data.reduce((sum, item) => sum + item.rating, 0) / totalFeedback).toFixed(1);

    document.getElementById('totalFeedback').textContent = totalFeedback;
    document.getElementById('positiveFeedback').textContent = `${Math.round((positiveFeedback / totalFeedback) * 100)}%`;
    document.getElementById('negativeFeedback').textContent = `${Math.round((negativeFeedback / totalFeedback) * 100)}%`;
    document.getElementById('averageRating').textContent = averageRating;

    const tableBody = document.getElementById('feedbackTableBody');
    tableBody.innerHTML = ''; // Clear existing rows
    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.date}</td>
                <td>${item.studentId}</td>
                <td>${item.feedback}</td>
                <td>${item.rating}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById('tableLabel').textContent = label; // Update the table label
}

const allBtn = document.getElementById('allBtn');
const weeklyBtn = document.getElementById('weeklyBtn');
const quarterlyBtn = document.getElementById('quarterlyBtn');

// Function to handle button activation
function activateButton(button) {
    // Remove 'active' class from all buttons
    document.querySelectorAll('.btn-group .btn').forEach(btn => btn.classList.remove('active'));
    // Add 'active' class to the clicked button
    button.classList.add('active');
}

// Event listeners for each button
allBtn.addEventListener('click', () => {
    activateButton(allBtn);
    updateDashboard(sortAndReassignIDs([...weeklyData, ...quarterlyData]), 'Showing: Overall Feedback');
});

weeklyBtn.addEventListener('click', () => {
    activateButton(weeklyBtn);
    updateDashboard(sortAndReassignIDs(weeklyData), 'Showing: Weekly Feedback');
});

quarterlyBtn.addEventListener('click', () => {
    activateButton(quarterlyBtn);
    updateDashboard(sortAndReassignIDs(quarterlyData), 'Showing: Quarterly Feedback');
});


// Generate PDF functionality
document.getElementById('generatePdfBtn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.autoTable({ html: '#feedbackTable' });
    doc.save('feedback.pdf');
});

// Initialize with overall feedback (combined data)
updateDashboard(sortAndReassignIDs([...weeklyData, ...quarterlyData]), 'Showing: Overall Feedback');
