"use client";
import { useRef } from 'react';
import classes from './image-picker.module.css';

interface ImageProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImageProps) {
  const imageInput = useRef<HTMLInputElement>(null); // Specify the type of useRef

  const handlePickClick = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
        />
        <button className={classes.button} type='button' onClick={handlePickClick}>Pick an Image</button>
      </div>
    </div>
  );
}
