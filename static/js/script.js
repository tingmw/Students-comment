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

    if (traits.length === 0) {
        alert('請至少選擇一項學生特質');
        return;
    }

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
            alert('錯誤: ' + data.error);
            output.innerText = '生成失敗，請重試。';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('發生連線錯誤');
        output.innerText = '發生連線錯誤，請檢查網路。';
    } finally {
        loading.classList.add('d-none');
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
