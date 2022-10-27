from flask import render_template, Flask, request
from regex import F
from core import app

import requests
import json

import fitz
from PIL import Image
import os

def run_backend(pdf_file, adjust=False):
  print(f'pdf_file: {pdf_file}')
  doc = fitz.open(pdf_file)

  images = []
  new_pdf_file = f"{pdf_file[:-4]}_fixed.pdf"

  # for each page in the pdf
  for i in range(len(doc)):
      print(f"working on page {i+1} of {len(doc)}...")
      
      # store page as temporary png files
      page = doc[i]
      pix = page.get_pixmap(dpi=288)
      png_file = f"{pdf_file[:-4]}_page{i+1}.png"
      pix.save(png_file)

      # do mandatory upscale
      url = "https://api.picsart.io/tools/demo/upscale/enhance"
      payload={"unit": "px", "format": "PNG", "upscale_factor": "2"}
      files=[('image',(png_file, open(png_file, 'rb'),'image/png'))]
      headers = {"accept": "application/json", "apikey": "sifH0Y0MoRLcboeYh899RiWFw29vt0Pz"}
      response = requests.request("POST", url, headers=headers, data=payload, files=files)
      data = json.loads(response.text)
      url = data['data']['url']
      img_data = requests.get(url).content
      with open(png_file, 'wb') as handler:
          handler.write(img_data)

      # do optional adjusts
      if adjust:
          url = "https://api.picsart.io/tools/demo/adjust"
          payload={"contrast": "100", "brightness": "0", "saturation": "0", "sharpen": "100", "shadows": "0", "clarity": "100", "temperature": "0", "format": "PNG", "hue": "0", "vignette": "0", "noise": "0", "highlights": "0"}
          files=[('image',(png_file, open(png_file, 'rb'),'image/png'))]
          headers = {"accept": "application/json", "apikey": "sifH0Y0MoRLcboeYh899RiWFw29vt0Pz"}
          response = requests.request("POST", url, headers=headers, data=payload, files=files)
          data = json.loads(response.text)
          url = data['data']['url']
          img_data = requests.get(url).content
          with open(png_file, 'wb') as handler:
              handler.write(img_data)
      
      # store final result
      png = Image.open(png_file).convert("RGB")
      images.append(png)

  # merge resultant pngs into result pdf
  images[0].convert("RGB").save(new_pdf_file, resolution=100.0, save_all=True, append_images=images[1:])

  # remove temporary png files
  files_to_remove = f"{pdf_file[:-4]}_page*"
  os.system(f"rm {files_to_remove}")

@app.route('/upscale', methods=['POST'])
def upscale_post():
  # print(f'request.form: {request.form}')
  # print(f'request.json: {request.json}')

  print('made it to upscale_post')

  if 'file' not in request.files:
    print('no file part')
    print(f'request.files: {request.files}')

  # file = request.json['filename']
  #file.save(file.filename)
  #pdf_file = file.filename
  file = request.files['file']
  pdf_file = file.filename
  file.save(pdf_file)
  #pdf_file = request.json['pdf_file']

  print('starting run_backend')
  print(f'pdf_file: {pdf_file}')

  run_backend(pdf_file)
  return render_template('show-result.html', text='success!')


@app.route('/')
def index():
  return render_template('take-input.html')

@app.route('/removebg', methods=['POST'])
def remove_background_post():
  #text = request.form['text']
  text = request.args.get('image')
  url = "https://api.picsart.io/tools/demo/removebg"

  #payload={"bg_blur": "0", "scale": "fit", "image_url": text, "format": "PNG", "output_type": "cutout"}
  payload={"bg_blur": "0", "scale": "fit", "image_url": "http://images6.fanpop.com/image/photos/36100000/Pok-mon-image-pokemon-36101114-1024-1024.jpg", "format": "PNG", "output_type": "cutout"}
  files=[]
  headers = {
    "accept": "application/json", "apikey": "sifH0Y0MoRLcboeYh899RiWFw29vt0Pz"
  }

  response = requests.request("POST", url, headers=headers, data=payload, files=files)
  data = json.loads(response.text)
  print('data: ', data)
  url = data['data']['url']

  return render_template('show-result.html', text=url)

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body
