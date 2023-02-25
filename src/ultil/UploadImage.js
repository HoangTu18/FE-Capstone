import React, { useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const UploadImage = ({ getImageURL }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleUpload = async ({ file }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("key", "042d8db8e458e838b53454557ef9d9ab");
    formData.append("image", file);
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        setImageUrl(response.data.data.display_url);
        getImageURL(response.data.data.display_url);
      }
    } catch (error) {
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Upload
        showUploadList={false}
        name="photo"
        maxCount={1}
        multiple={false}
        onChange={() => console.log("on Change Upload")}
        beforeUpload={(file) => {
          const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
          if (!isJpgOrPng) {
            message.error("Vui lòng chọn tệp tin JPG/PNG!");
            return false;
          }
          return true;
        }}
        customRequest={handleUpload}
      >
        {loading ? (
          <LoadingOutlined />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={"hình ảnh được tải lên"}
            style={{ maxWidth: 200, maxHeight: 150 }}
          />
        ) : (
          <Button icon={<UploadOutlined />}>Tải ảnh</Button>
        )}
      </Upload>
    </div>
  );
};
export default UploadImage;
