    function calculateAge() {
      const dobInput = document.getElementById('dob').value;
      const result = document.getElementById('result');
      result.classList.remove('error');

      if (!dobInput) {
        result.innerHTML = 'Please select your date of birth.';
        result.classList.add('error');
        return;
      }

      const dob = new Date(dobInput);
      const today = new Date();

      if (dob > today) {
        result.innerHTML = 'Date of birth cannot be in the future.';
        result.classList.add('error');
        return;
      }

      // Age in Y-M-D
      let years = today.getFullYear() - dob.getFullYear();
      let months = today.getMonth() - dob.getMonth();
      let days = today.getDate() - dob.getDate();

      if (days < 0) {
        months -= 1;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      // Total difference in milliseconds
      const diffMs = today - dob;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30.44); // approx
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      result.innerHTML = `
        You are <strong>${years} year(s), ${months} month(s), and ${days} day(s)</strong> old.<br/><br/>
        🔹 Age Difference:<br/>
        • Total Days: <strong>${diffDays}</strong><br/>
        • Total Months (approx): <strong>${diffMonths}</strong><br/>
        • Total Hours: <strong>${diffHours}</strong>
      `;
    }
