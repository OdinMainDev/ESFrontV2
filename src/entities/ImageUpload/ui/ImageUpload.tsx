import React, { CSSProperties, ChangeEvent, useState } from 'react';
import Avatar, { Size, Status } from '@/shared/ui/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { uploadImageFile } from '../api/uploadApi';
import Loader from '@/shared/ui/Loader';

interface AvatarUploadProps {
  size: Size;
  src: string;
  className?: string;
  status?: Status;
  thumbnail?: boolean;
  name?: string;
  onChange?: (value: string) => void;
}

const AvatarUpload = ({
  size,
  src,
  status,
  thumbnail,
  onChange,
  className,
  name,
}: AvatarUploadProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className={classNames('d-inline-flex', className)}>
      <input
        className="d-none"
        id="avatarFile"
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => void handleChange(e)}
      />
      <label className="cursor-pointer hover-actions-trigger relative" htmlFor="avatarFile">
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
        {loading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center z-10">
            <Loader />
          </div>
        )}
      </label>
    </div>
  );
};

export default AvatarUpload;
