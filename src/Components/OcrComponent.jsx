import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../Components/Css/OcrComponent.css'; // Ensure the correct path

const OcrComponent = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('eng');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

   

  const handleConvert = () => {
    if (image) {
      setLoading(true);
      setResult('');
      Tesseract.recognize(
        image,
        language,
        {
          logger: (info) => console.log(info),
          // Additional settings to improve recognition for medical certificates
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:!()[]{}-_/+\'\"',
          // Add more configurations if needed
        }
      )
        .then(({ data: { text } }) => {
          if (text.trim() === '') {
            setResult('No text detected. Please try a different image.');
          } else {
            setResult(text);
          }
        })
        .catch((err) => {
          console.error('Error:', err);
          setResult('Error processing image. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleClear = () => {
    setImage(null);
    setImageURL(null);
    setResult('');
  };

  return (
    
    <div className="ocr-container">
    <h1>OCR Scanner</h1>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      aria-label="Upload an image for OCR"
    />
    <button
      onClick={handleConvert}
      disabled={!image || loading}
      className="convert-button"
      aria-label="Convert image to text"
    >
      {loading ? 'Processing...' : 'Convert'}
    </button>
    <button
      onClick={handleClear}
      disabled={!image && !result}
      className="clear-button"
      aria-label="Clear the image and result"
    >
      Clear
    </button>
  
    {imageURL && <img src={imageURL} alt="Selected for OCR" className="ocr-image" />}
  
    {loading && <div className="loading-spinner" role="status" aria-live="polite"></div>}
  
    {result && (
      <textarea
        value={result}
        readOnly
        className="ocr-result"
        aria-label="OCR result"
      />
    )}
  </div>
  
  );
};

export default OcrComponent;
