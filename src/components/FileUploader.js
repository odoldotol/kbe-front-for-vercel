import React from "react";
import "./FileUploader.scss";

const FileUploader = () => {
  return (
    <>
      <form id="file-upload-form" className="uploader">
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          accept="image/*"
        />
        <label for="file-upload" id="file-drag">
          <img id="file-image" src="#" alt="Preview" className="hidden" />
          <div id="start">
            <i className="fa fa-download" aria-hidden="true"></i>
            <div>파일을 선택해 주세요</div>
            <div id="notimage" className="hidden">
              Please select an image
            </div>
            <span id="file-upload-btn" className="btn btn-primary">
              가져오기
            </span>
          </div>
          <div id="response" className="hidden">
            <div id="messages"></div>
            <progress className="progress" id="file-progress" value="0">
              <span>0</span>%
            </progress>
          </div>
        </label>
      </form>
    </>
  );
};

export default FileUploader;
