"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import classes from './image-picker.module.css';

interface ImageProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImageProps) {
  const [pickedImage, setPickedImage] = useState<string | null>('');
  const imageInput = useRef<HTMLInputElement>(null); // Specify the type of useRef

  const handlePickClick = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      setPickedImage(null); // Reset the previewed image if no image was selected
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result as string | null);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage &&
            <Image
              src={pickedImage}
              alt='The image selected by user.'
              fill
            />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={classes.button} type='button' onClick={handlePickClick}>Pick an Image</button>
      </div>
    </div>
  );
}
