const selectedTraits = new Set();

function toggleTrait(element) {
    const trait = element.innerText;
    if (selectedTraits.has(trait)) {
        selectedTraits.delete(trait);
        element.classList.remove('active');
    } else {
        selectedTraits.add(trait);
        element.classList.add('active');
    }
}

async function generateComment() {
    const name = document.getElementById('studentName').value;
    const traits = Array.from(selectedTraits);
    const output = document.getElementById('commentOutput');
    const loading = document.getElementById('loading');
    const generateBtn = document.getElementById('generateBtn');

    if (traits.length === 0) {
        alert('請至少選擇一項學生特質');
        return;
    }

    generateBtn.disabled = true;
    generateBtn.innerText = "生成中...";

    output.innerText = '';
    output.classList.add('text-muted');
    loading.classList.remove('d-none');

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, traits }),
        });

        const data = await response.json();

        if (response.ok) {
            output.innerText = data.comment;
            output.classList.remove('text-muted');
        } else {
            //alert('錯誤: ' + data.error);
            //output.innerText = '生成失敗，請重試。';
            output.innerHTML = `<span class="text-danger">錯誤: ${data.error}</span>`;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('發生連線錯誤');
        output.innerText = '發生連線錯誤，請檢查網路。';
    } finally {
        loading.classList.add('d-none');generateBtn.disabled = false;
        generateBtn.innerText = "生成評語";
    }
}

function copyToClipboard() {
    const output = document.getElementById('commentOutput');
    const text = output.innerText;

    if (!text || output.classList.contains('text-muted')) {
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        alert('評語已複製到剪貼簿');
    }).catch(err => {
        console.error('無法複製文字: ', err);
    });
}

// Resizable Logic
document.addEventListener('DOMContentLoaded', function() {
    const resizer = document.getElementById('resizer');
    const leftPanel = document.getElementById('leftPanel');
    const mainContainer = document.getElementById('mainContainer');

    if (!resizer || !leftPanel || !mainContainer) return;

    let isResizing = false;

    resizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        resizer.classList.add('active');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none'; // Disable text selection
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;

        // Calculate percentage width
        const containerRect = mainContainer.getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left;
        
        // Convert to percentage to keep it responsive-ish
        let percentage = (newWidth / containerRect.width) * 100;

        // Set limits (min 20%, max 80%)
        if (percentage < 20) percentage = 20;
        if (percentage > 80) percentage = 80;

        leftPanel.style.width = `${percentage}%`;
    });

    document.addEventListener('mouseup', function(e) {
        if (isResizing) {
            isResizing = false;
            resizer.classList.remove('active');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
});