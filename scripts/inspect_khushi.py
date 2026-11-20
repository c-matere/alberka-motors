from PIL import Image

im = Image.open(r'D:\alberka-motors\public\vehicles\khushi-preview.jpg')
w, h = im.size
print('Width, Height:', w, h)
# Let's crop the top section (the showroom wall with the 3D logo) and print coordinates
# Top 40% is the wall, middle 40% is the car, bottom 20% is the floor
wall_crop = im.crop((0, 0, w, int(h * 0.45)))
wall_crop.save(r'D:\alberka-motors\public\vehicles\khushi-wall.jpg')
print('Saved wall crop')
