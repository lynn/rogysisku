var dictionary = {};
fetch(chrome.runtime.getURL('dictionary.json'))
    .then(response => response.json())
    .then(json => {dictionary = json;});

function getWordAtPoint(x, y) {
    var range = document.caretRangeFromPoint(x, y);
    if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
        range.expand('word');
        return range.toString().trim();
    }
    return null;
}

enabled = false;
popup = document.createElement('div');
popup.setAttribute('class', 'popup');
document.body.appendChild(popup);
current = null;

window.addEventListener('mousemove', function(ev) {
    var selected = getWordAtPoint(ev.clientX, ev.clientY);
    var movePopup = function() {
        popup.style.top = ev.clientY - 30 + 'px';
        popup.style.left = ev.clientX + 10 + 'px';
    }

    if (current === selected && current) {
        movePopup();
    } else if (current != selected) {
        current = selected;
        var meaning;
        if (current && (meaning = dictionary[current.toLowerCase()])) {
            popup.style.display = 'block';
            popup.innerHTML = meaning;
            movePopup();
        } else {
            popup.style.display = 'none';
        }
    }
}, false);
