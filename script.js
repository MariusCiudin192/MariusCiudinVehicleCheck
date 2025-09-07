document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pass-button, .fail-button').forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('button').forEach(btn => btn.classList.remove('selected-pass', 'selected-fail'));
            if (this.classList.contains('pass-button')) {
                this.classList.add('selected-pass');
            } else {
                this.classList.add('selected-fail');
            }
        });
    });

    const generateButton = document.getElementById('generateAndEmailBtn');
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            const driver = document.getElementById('driver').value;
            const vehicle = document.getElementById('vehicle').value;
            const notes = document.getElementById('notes').value;
            let checklistStatus = '';
            document.querySelectorAll('.check-item').forEach(item => {
                const itemName = item.querySelector('span').textContent;
                const selectedPass = item.querySelector('.selected-pass');
                const selectedFail = item.querySelector('.selected-fail');
                let status = 'Not checked';
                if (selectedPass) status = 'Pass';
                if (selectedFail) status = 'Fail';
                checklistStatus += `- ${itemName}: ${status}\n`;
            });

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text("Daily Vehicle Check Report", 20, 20);
            doc.text(`Driver: ${driver}`, 20, 30);
            doc.text(`Vehicle: ${vehicle}`, 20, 40);
            doc.text(checklistStatus, 20, 50);
            
            const finalYPos = 50 + (document.querySelectorAll('.check-item').length * 10);
            doc.text(`Notes: ${notes}`, 20, finalYPos);
            
            doc.save('Report.pdf');

            const recipientEmail = '24156112@ardenuniversity.ac.uk';
            const subject = 'Vehicle Check Report';
            let body = 'Report Details:\n\n';
            body += `Driver: ${driver}\n`;
            body += `Vehicle: ${vehicle}\n\n`;
            body += `${checklistStatus}\n`;
            body += `Notes: ${notes}`;
            
            window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            alert("PDF-ul a fost descărcat și aplicația de email s-a deschis.");
        });
    }
});
