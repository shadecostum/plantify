from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], )

MODEL = tf.keras.models.load_model("../models/1")

CLASS_NAMES = ['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy', 'Potato___Early_bligh', 'Potato___Late_blight', 'Potato___healthy', 'Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato_healthy']


@app.get("/ping")
async def ping():
    return "Hello, I am alive"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(
        file: UploadFile = File(...)
):

    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    if predicted_class == 'Pepper__bell___Bacterial_spot':
        caption = """ Reason : Pepper bell bacterial spot is caused by the bacteria Xanthomonas campestris pv. vesicatoria.The bacteria can be introduced into the plant through wounds or natural openings, such as stomata and hydathodes.
                      Climate : Warm and humid weather conditions(25c to 35c)
                      Prevention and Precaution : it is important to take preventative measures such as planting resistant varieties, providing adequate ventilation, and avoiding overhead irrigation,If bacterial spot does occur, the use of copper-based bactericides 
                      Pestisides uses : Copper-based bactericides: Copper-based bactericides, such as copper sulfate and copper hydroxide,
                      Streptomycin and oxytetracycline: These antibiotics can be effective against bacterial spot, """

    elif predicted_class == 'Pepper__bell___healthy':
        caption = "bbb"
    elif predicted_class == 'Potato___Early_blight':
        caption = """ Reason : Alternaria Solani, the Fungus that causes Potato Early blight.carried through warm,crowed planted humid,
                      Climate : Warm,tempreature extreme
                      Prevention and Precaution : use disease resistent healthy seed,don't Overcrowding of plants , managing water levels,avoid planting in the same area repeatedly can increase the risk of infection
                      Pestisides uses : Copper-based fungicides: Copper-based fungicides, such as copper sulfate and Bordeaux mixture,azoxystrobin,ziram"""
    elif predicted_class == 'Potato___Late_blight':
        caption = """ Reason : Phytophthora infestans, the pathogen that causes Potato Late blight, is a microorganism.carried through wind,water,
                      Climate : cool,frequent rain
                      Prevention and Precaution : use disease resistent healthy seed,monitor weather condition,crop rotation usese frequently
                      Pestisides uses : Chlorothslonil,cymoxsnil """
    elif predicted_class == 'Potato___healthy':
        caption = """ aaa"""
    elif predicted_class == 'Tomato_Early_blight':
        caption = """ Reason : Alternaria Solani, the Fungus that causes Tomato Early blight.carried through warm,crowed planted humid,
                      Climate : Warm,tempreature extreme
                      Prevention and Precaution : use disease resistent healthy seed,don't Overcrowding of plants , managing water levels,avoid planting in the same area repeatedly can increase the risk of infection
                      Pestisides uses : Copper-based fungicides: Copper-based fungicides, such as copper sulfate and Bordeaux mixture,Mancozeb: This fungicide is effective against a wide range of fungal diseases,"""
    elif predicted_class == 'Tomato_Late_blight':
        caption = """Reason : Phytophthora infestans, the pathogen that causes Tomato Late blight, is a microorganism.carried through wind,water,
                     Climate : cool,frequent rain
                     Prevention and Precaution : use disease resistent healthy seed,monitor weather condition,crop rotation usese frequently
                     Pestisides uses : Dithane,Tatoo c  """
        # vvkey = "2_hkbkRtccw"
    elif predicted_class == 'Tomato_healthy':
        caption = "hhhl"
    return {
        'class': predicted_class,
        'confidence': float(confidence),
        'caption': caption
        # 'vkey': vvkey
    }


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
