import React from "react";
import { Footer } from "./Footer";
export const Homepage = () => {
  return (
    <div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="./image/email.svg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="1500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">群发邮件解决方案</h1>
            <p className="lead">
              在当今快节奏的商业环境中，精准而高效的邮件营销是成功的关键。我们的群发邮件解决方案，帮助您轻松管理和发送大量邮件，让您的信息快速传达到每一个潜在客户手中。
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
              >
                进一步了解
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        {" "}
        <hr />
      </div>
      {<Footer />}
    </div>
  );
};
