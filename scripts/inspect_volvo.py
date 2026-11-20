from PIL import Image

im = Image.open(r'D:\alberka-motors\public\vehicles\volvo-xc40-r-design-2019\front-angle-stance.jpg')
print('front-angle-stance:', im.size)
im2 = Image.open(r'D:\alberka-motors\public\vehicles\volvo-xc40-r-design-2019\hero-front-34.jpg')
print('hero-front-34:', im2.size)
# Sample average colors of hero-front-34
w, h = im2.size
print('hero-front-34 background color (top):', im2.getpixel((w//2, h//10)))
