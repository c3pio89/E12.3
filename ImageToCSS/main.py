from PIL import Image
from collections import Counter
import openai


def extract_dominant_colors(image_path, num_colors=3):
    image = Image.open(image_path)
    image = image.convert("RGB")

    pixels = list(image.getdata())
    most_common = Counter(pixels).most_common(num_colors)

    dominant_colors = [f"rgb{color[0]}" for color in most_common]
    return dominant_colors


def generate_css_with_gpt(dominant_colors):
    openai.api_key = "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"

    prompt = f"Создайте CSS код, который отражает доминирующие цвета: {', '.join(dominant_colors)}"

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=255
    )

    css_code = response.choices[0].text.strip()
    return css_code


if __name__ == "__main__":
    image_path = "/Users/angrymedic/Desktop/login.png"
    dominant_colors = extract_dominant_colors(image_path)

    css_code = generate_css_with_gpt(dominant_colors)
    print(f"Сгенерированный CSS код:\n{css_code}")
