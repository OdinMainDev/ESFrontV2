import React, { CSSProperties, ChangeEvent, useState } from 'react';
import Avatar, { Size, Status } from '@/shared/ui/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { uploadImageFile } from '../api/uploadApi';

interface AvatarUploadProps {
  size: Size;
  src: string;
  className?: string;
  status?: Status;
  thumbnail?: boolean;
  onChange?: (value: string) => void;
}

const AvatarUpload = ({ size, src, status, thumbnail, onChange, className }: AvatarUploadProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        setImage(e.target.files[0]);
        const link = await uploadImageFile(formData);
        if (onChange) {
          onChange(link ?? '');
        }
      } catch (e) {
        if (onChange) {
          onChange('');
        }
      }
    }
  };
  return (
    <div className={classNames('d-inline-flex', className)}>
      <input
        className="d-none"
        id="avatarFile"
        type="file"
        accept="image/*"
        onChange={(e) => void handleChange(e)}
      />
      <label className="cursor-pointer hover-actions-trigger" htmlFor="avatarFile">
        <Avatar
          rounded="square"
          size={size}
          status={status}
          src={image ? URL.createObjectURL(image) : src}
          thumbnail={thumbnail}
        />
        <div
          className="h-100 w-100 bg-black light position-absolute top-0 justify-content-center align-items-center hover-actions"
          style={{ '--esfront-bg-opacity': 0.56 } as CSSProperties}
        >
          <FontAwesomeIcon icon={faCamera} className="text-300 w-30 h-30" />
        </div>
      </label>
    </div>
  );
};

export default AvatarUpload;
