import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../Components/Css/OcrComponent.css'; // Ensure the correct path

const OcrComponent = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('eng'); // Default language is English
  const [error, setError] = useState('');

  const whitelist = {
    eng: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:!()[]{}-_/+\'"',
    hin: 'अआइईउऊऋऌएऐओऔअंअःकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह',
    mar: 'अआइईउऊऋऌएऐओऔअंअःकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह'
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Please select a valid image file.');
    }
  };

  const preprocessImage = async (img) => {
    // Add preprocessing steps here if needed
    return img;
  };

  const handleConvert = () => {
    if (image) {
      setLoading(true);
      setResult('');
      setError('');

      preprocessImage(image).then((processedImage) => {
        Tesseract.recognize(
          processedImage,
          language,
          {
            logger: (info) => console.log(info),
            tessedit_char_whitelist: whitelist[language],
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
            setError('Error processing image. Please try again.');
          })
          .finally(() => {
            setLoading(false);
          });
      });
    } else {
      setError('Please upload an image first.');
    }
  };

  const handleClear = () => {
    setImage(null);
    setImageURL(null);
    setResult('');
    setError('');
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
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
        aria-label="Select language for OCR"
      >
        <option value="eng">English</option>
        <option value="hin">Hindi</option>
        <option value="mar">Marathi</option>
      </select>
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
      
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default OcrComponent;
