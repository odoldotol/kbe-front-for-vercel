import React, { memo } from "react";
import FileUploader from "../components/FileUploader";
import "./Create.css";


const CreateCollection = memo(() => {
    return (
        <section id="contact" className="contact">
          <div className="container">
            <header className="section-header">
              <p>Create New Collection</p>
            </header>
            <div className="row php-email-form">
              <form
                action="forms/contact.php"
                method="post"
                className="php-email-form"
              >
                <div className="row gy-4">
                <div className="col-md-12">
                <h4 align="left">Image, Video, Audio, or 3D Model</h4>
                <FileUploader />
                  </div>
                  <div className="col-md-12">
                  <h4 align="left">Name</h4>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Item name"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                  <h4 align="left">Description</h4>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="6"
                      placeholder="Provide a detail description of your item"
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <button type="submit">업로드</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      );
})

export default CreateCollection;