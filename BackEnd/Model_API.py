from fastapi import FastAPI
from pydantic import BaseModel
from diffusers import StableDiffusionLDM3DPipeline
from PIL import Image
import io
import torch
import base64
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
pipe = StableDiffusionLDM3DPipeline.from_pretrained("Intel/ldm3d")

device = "cuda" if torch.cuda.is_available() else "cpu"
pipe.to(device)

class PromptRequest(BaseModel):
    prompt: str
    name: str

def pil_image_to_base64_str(image: Image.Image, format: str) -> str:
    buffered = io.BytesIO()
    image.save(buffered, format=format)
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

@app.post("/generate")
async def generate_images(request: PromptRequest):
    prompt = request.prompt
    name = request.name

    output = pipe(prompt)
    rgb_image, depth_image = output.rgb, output.depth

    rgb_base64 = pil_image_to_base64_str(rgb_image[0], "JPEG")
    depth_base64 = pil_image_to_base64_str(depth_image[0], "PNG")

    rgb_image_path = f"{name}_ldm3d_rgb.jpg"
    depth_image_path = f"{name}_ldm3d_depth.png"
    rgb_image[0].save(rgb_image_path)
    depth_image[0].save(depth_image_path)

    return {
        "rgb_image": rgb_base64,
        "depth_image": depth_base64,
        "rgb_image_path": rgb_image_path,
        "depth_image_path": depth_image_path
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
