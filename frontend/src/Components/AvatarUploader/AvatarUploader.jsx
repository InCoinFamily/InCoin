import { useState, useEffect, useRef } from 'react';
import './AvatarUploader.scss';
import Button from '../../ui/Button/Button';
import camera from '../../Images/icons/camera.svg';

export default function AvatarUploader({ onChange, defaultImage }) {
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const fileInput = useRef(null);

  useEffect(() => {
    if (defaultImage !== currentImage) {
      setCurrentImage(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setCurrentImage(reader.result);
        onChange(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };

  const handleChooseFile = () => {
    fileInput.current.click();
  };

  return (
    <div className="uploader">
      <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
      <Button
        variant="secondary"
        content="icon"
        image={camera}
        size="medium"
        onClick={handleChooseFile}
      />
      {currentImage && <img className="uploaded-avatar" src={currentImage} alt="Аватар" />}
    </div>
  );
}
