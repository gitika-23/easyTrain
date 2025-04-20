document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('User').value;
    const phone = document.getElementById('Phone').value;
    const password = document.getElementById('Password').value;
    const confirmPassword = document.getElementById('Cpass').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, phone, password, confirmPassword }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        window.location.href = 'login.html';
    } else {
        alert(data.error);
    }
});
