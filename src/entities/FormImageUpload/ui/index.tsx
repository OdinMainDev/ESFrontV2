import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface IFormImageUploadProps {
  name: string;
  auth_token: string;
  error: string | null;
  setError: (error: string | null) => void;
  cdn_url: string | null;
  setCdnUrl: (url: string | null) => void;
}

const FormImageUpload = ({
  name,
  auth_token,
  error,
  setError,
  cdn_url,
  setCdnUrl,
}: IFormImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async (file: File) => {
    if (!file) {
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(api_url + 'api/file/upload', {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer: ${auth_token}` },
      });

      const result = await response.json();

      if (!result.success) {
        setError('uploading');
        console.log(result);
      } else {
        setCdnUrl(result.url);
      }
    } catch (error) {
      setError('uploading');
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setCdnUrl(null);
    setFile(null);
  };

  return (
    <div className={`position-relative ${error ? 'is-invalid' : ''}`}>
      {isUploading && (
        <div className="position-absolute d-flex align-items-center gap-2 h-100 ms-2">
          <div className="spinner-border" role="status"></div>
          <span>Loading, please wait</span>
        </div>
      )}
      {!isUploading && cdn_url && (
        <div className="position-absolute d-flex align-items-center gap-2 w-100 h-100 ms-2">
          <img className="h-100" src={cdn_url} alt="" />
          <span>File loaded</span>
          <button className="btn btn-close ms-auto" onClick={clearFile}></button>
        </div>
      )}
      {cdn_url ? (
        <input type="hidden" name={name} value={cdn_url} />
      ) : (
        <input type="hidden" name={name} value="" />
      )}
      <input
        data-name="image"
        type="file"
        className="form-control form-control-lg"
        style={{ display: isUploading || cdn_url ? 'none' : 'block' }}
        accept="image/gif,image/jpeg,image/pjpeg,image/png,image/svg+xml,image/jpg"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className="invalid-feedback error errorRepeater">{error && `errors.${error}`}</div>
    </div>
  );
};

export default FormImageUpload;
