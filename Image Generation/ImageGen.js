let inputText;
let img;
let apiKey = "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"

function preload() {
    img = createImg('https://i.imgur.com/nTeRJjK.png', 'example image');
    img.hide();
}

function setup() {
    // Create the canvas
    createCanvas(800, 800);

    // Create the input text field
    inputText = createInput();
    inputText.position(20, 820);
    inputText.size(360, 30);

    // Create the generate button
    let generateButton = createButton('Generate');
    generateButton.position(20, 860);
    generateButton.size(360, 30);
    generateButton.mousePressed(generateArt);
}

function draw() {
    background(255);
    image(img, 0, 0, width, height);
}

async function generateArt() {
    // Get the input text
    let text = inputText.value();

    // Call the DALL-E or DALL-E 2 API to generate the art
    let url = `https://api.openai.com/v1/images/generations`;
    let data = {
        'prompt': text,
        'model': 'image-alpha-001',
        'num_images':1
    };
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    };

    let response = await fetch(url, options);
    let json = await response.json();
    let imageUrl = json.data[0].url;

    // update the image
    img.attribute('src',imageUrl);
}