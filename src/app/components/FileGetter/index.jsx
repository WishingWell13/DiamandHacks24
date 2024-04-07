'use client'

import styles from "./style.module.css";
import { useEffect, useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


const FileGetter = () => {
  const [file, setFile] = useState('');
  const [output, setOutput] = useState('');
  const inputRef = useRef();
  
  useEffect(() => {
    console.log("Use effect triggered");
    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI('AIzaSyDwEpAoo194P0WfEjdz01B5O9MvhOka6kE');

    // Converts a File object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePart(file) {
      const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });
      return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
      };
    }

    async function run() {
      // For text-and-images input (multimodal), use the gemini-pro-vision model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt = "Translate the text in this image to pirate speak.";

      const fileInputEl = document.querySelector("input[type=file]");
      const imageParts = await Promise.all(
        [...fileInputEl.files].map(fileToGenerativePart)
      );

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      setOutput(text);
    }

    run();
  }, [file]);


  return (
    <div className={styles.card}>
      <h1 className={styles.header}>Scallywag Scanner</h1>
      
      <label className={styles.button} htmlFor="file-upload">
        select file
        <input type="file" id="file-upload" name="myfile" accept=".png, .jpg, .jpeg, .webp, .heic, .heif" 
            onInput={() => setFile(URL.createObjectURL(inputRef.current.files[0]))}
            ref={inputRef}>
        </input>
      </label>
      

      {file ? 
        <div><p>{output}</p>
        <img src={file} />
        </div>
       : null}

      <br></br>
      <button className={styles.button} onClick="">get pirate's opinion!</button>
    </div>
  );

};

export default FileGetter;
