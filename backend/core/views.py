from flask import render_template, Flask, request
from core import app

import requests
import json

@app.route('/')
def index():
  return render_template('take-input.html')

@app.route('/removebg', methods=['POST'])
def remove_background_post():
  #text = request.form['text']
  text = request.form.get('image')
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
