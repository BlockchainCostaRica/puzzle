import styled from "@emotion/styled";
import React, { useState } from "react";
import { compressImage, toFile } from "@src/utils/files";
import { useStores } from "@stores";
import plus from "@src/assets/icons/plus.svg";

interface IProps {
  image: string | null;
  onChange: (image: File) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const Root = styled.div<{ image?: string }>`
  position: relative;

  .upload-btn-wrapper {
    position: relative;
  }

  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
  }

  .upload-btn-wrapper input[type="file"] {
    cursor: pointer;
    width: 56px;
    height: 56px;
    position: absolute;
    opacity: 0;
    bottom: 0;
  }
`;

const Container = styled.div<{ image: string | null }>`
  border: 1px solid #f1f2fe;
  ${({ image }) =>
    image != null
      ? `background-image: url(${image});`
      : `background: #C6C9F4;`};
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: none;
  color: transparent;
  width: 56px;
  height: 56px;
  position: relative;
`;

const ImageUpload: React.FC<IProps> = ({ onChange, image, ...rest }) => {
  const { notificationStore } = useStores();
  // eslint-disable-next-line
  const [base64Photo, setBase64Photo] = useState<string | null>(null);
  const handleChange = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files || !files[0]) return;
    const file: File = files[0];
    if (!/(gif|jpe?g|tiff?|png|bmp)$/i.test(file.type)) {
      notificationStore.notify(
        "Пожалуйста, выберите, файлы другого расширения"
      );
    }
    rest.setLoading(true);
    try {
      // @ts-ignore
      const b64 = await toBase64(file);
      const compressed = await compressImage(b64);
      setBase64Photo(compressed);
      onChange && (await onChange(toFile(compressed)));
      rest.setLoading(false);
    } catch (e: any) {
      rest.setLoading(false);
    }
  };
  return (
    <Root>
      <Container className="upload-btn-wrapper" image={image}>
        {image == null && (
          <img
            src={plus}
            style={{ top: 16, right: 16, position: "absolute" }}
            alt="plus"
          />
        )}
        {rest.loading && <div>loading</div>}
        <div className="btn">
          <input
            accept="image/*"
            disabled={rest.loading}
            type="file"
            name="file"
            onChange={handleChange}
          />
        </div>
      </Container>
    </Root>
  );
};
export default ImageUpload;
