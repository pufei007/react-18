import requests
import os
from bs4 import BeautifulSoup
import time

# 创建一个保存图片的文件夹
save_folder = 'travel_photos'
if not os.path.exists(save_folder):
    os.makedirs(save_folder)

# 发送请求并获取网页内容
url = 'https://unsplash.com/t/travel'
response = requests.get(url)
html = response.text
# 等待页面加载
time.sleep(5)
# 使用 Beautiful Soup 解析网页内容
soup = BeautifulSoup(html, 'html.parser')
print(soup)
images = soup.find_all('img', {'class': 'tB6UZ'})
print(images)

# 遍历所有图片并下载
for i, image in enumerate(images):
    image_url = image['src']
    response = requests.get(image_url)
    filename = f"{i+1}.jpg"
    with open(os.path.join(save_folder, filename), 'wb') as f:
        f.write(response.content)
    print(f"已下载图片 {filename}")

print("图片下载完成！")
