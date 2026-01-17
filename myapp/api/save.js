import cloudinary from "cloudinary";
import { createClient } from "@supabase/supabase-js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async (req,res)=>{
  const {lat,lng,img,device} = req.body;

  const up = await cloudinary.v2.uploader.upload(img);
  await supabase.from("logs").insert({
    foto: up.secure_url,
    lat, lng,
    alamat: "diisi via reverse geocode (opsional)",
    device
  });

  res.json({ok:true});
};
