import sys
from PIL import Image, ImageDraw

def process_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Paint black over the bottom right corner to hide the Gemini watermark
    # The watermark is usually in the bottom right 100x100 area.
    draw = ImageDraw.Draw(img)
    draw.rectangle([width - 150, height - 150, width, height], fill=(0, 0, 0, 255))
    
    # We want to make the background transparent. 
    # Let's do a flood fill from (0,0) with transparency.
    pixels = img.load()
    
    visited = set()
    queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    for start_node in queue:
        if start_node not in visited:
            q = [start_node]
            visited.add(start_node)
            
            while q:
                x, y = q.pop(0)
                r, g, b, a = pixels[x, y]
                
                # Check if pixel is "close to black"
                if r < 35 and g < 35 and b < 35:
                    pixels[x, y] = (0, 0, 0, 0) # Transparent
                    
                    # Add neighbors
                    for nx, ny in [(x-1, y), (x+1, y), (x, y-1), (x, y+1)]:
                        if 0 <= nx < width and 0 <= ny < height:
                            if (nx, ny) not in visited:
                                visited.add((nx, ny))
                                q.append((nx, ny))
                                
    # Autocrop
    img = img.crop(img.getbbox())
    img.save(output_path, "PNG")
    print("Done")

if __name__ == "__main__":
    process_logo(sys.argv[1], sys.argv[2])
