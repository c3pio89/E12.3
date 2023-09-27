function encryptText() {
    const inputText = document.getElementById("inputEncrypt").value;
    const shiftValue = parseInt(document.getElementById("shiftValue").value);
    const encryptedText = caesarCipher(inputText, shiftValue);
    document.getElementById("outputEncrypt").value = encryptedText;
}

function decryptText() {
    const inputText = document.getElementById("inputDecrypt").value;
    const shiftValue = parseInt(document.getElementById("shiftValueDecrypt").value);
    const decryptedText = caesarCipher(inputText, -shiftValue);
    document.getElementById("outputDecrypt").value = decryptedText;
}

function caesarCipher(text, shift) {
    const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (alphabet.includes(char.toLowerCase())) {
            const isUpperCase = char === char.toUpperCase();
            const index = alphabet.indexOf(char.toLowerCase());
            const newIndex = (index + shift + alphabet.length) % alphabet.length;
            const newChar = isUpperCase ? alphabet[newIndex].toUpperCase() : alphabet[newIndex];
            result += newChar;
        } else {
            result += char;
        }
    }

    return result;
}
