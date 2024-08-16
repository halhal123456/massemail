import React, { useState } from "react";
import { Footer } from "./Footer";
import "react-quill/dist/quill.snow.css"; // 引入Quill的样式
import ReactQuill from "react-quill"; // 引入 react-Quill
import "./styles/customQuill.css"; // 自定义样式
import * as XLSX from "xlsx";
import axios from "axios";

export const MassEmail = () => {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [secure, setSecure] = useState("");
  const [sendEmail, setSendEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [sendNumber, setSendNumber] = useState("");
  const [sendRate, setSendRate] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [result, setResult] = useState(""); // 将结果存储到状态中
  const [emailArray, setEmailArray] = useState(""); //

  // 富文本编辑器的改变状态函数
  const handleChange = (value) => {
    setEditorHtml(value);
  };

  // 文件上传处理函数
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const emailList = json.map((row) => row[0]).filter((email) => email);
        setEmailArray(emailList);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // 发送数据处理函数
  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverUrl = "http://localhost:5000/api/send";
    let sendObject = {
      host,
      port,
      secure,
      sendEmail,
      password,
      emailArray,
      title,
      emailBody: editorHtml,
      sendNumber,
      sendRate,
    };

    try {
      const response = await axios.post(serverUrl, sendObject);
      setResult(response.data.message); // 更新状态
    } catch (error) {
      console.error("Error sending data:", error);
      setResult("发送失败，请检查控制台获取更多信息。");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* 发件人信息 */}
        <div className="container">
          <h2 style={{ textAlign: "center" }}>发件人信息</h2>
          {/* 服务器地址 */}
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "120px" }}>
              服务器(host)
            </span>
            <input
              placeholder="例如：smtp.example.com"
              type="text"
              className="form-control"
              onChange={(e) => setHost(e.target.value)}
            />
          </div>
          {/* 端口 */}
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "120px" }}>
              端口(port)
            </span>
            <input
              placeholder="例如：587或465，其中，587 是 TLS 加密，465 是 SSL 加密"
              type="number"
              className="form-control"
              style={{ width: "120px" }}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
          {/* 安全 */}
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "120px" }}>
              安全(secure)
            </span>
            <select
              className="form-select"
              value={secure}
              onChange={(e) => setSecure(e.target.value)}
            >
              <option value="">请选择</option>
              <option value="true">SSL 加密</option>
              <option value="false">非SSL 加密</option>
            </select>
          </div>

          {/* 用户名 */}
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "120px" }}>
              邮箱
            </span>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setSendEmail(e.target.value)}
            />
          </div>

          {/* 密码 */}
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "120px" }}>
              邮箱密码
            </span>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* 收件人信息 */}
        <div className="container">
          <h2 style={{ textAlign: "center" }}>收件人信息</h2>
          {/* 收件人表格 */}
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* 邮件内容及发送方式 */}
        <div className="container">
          <h2 style={{ textAlign: "center" }}>邮件内容</h2>
          {/* 标题 */}
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "120px" }}>
              标题
            </span>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* 正文 */}
          <div>
            <ReactQuill
              value={editorHtml}
              onChange={handleChange}
              style={{ height: "300px" }}
            />
          </div>
          {/* 发送数量 */}
          <div className="input-group mb-3" style={{ marginTop: "1rem" }}>
            <span className="input-group-text" style={{ width: "120px" }}>
              发送数量
            </span>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setSendNumber(e.target.value)}
            />
          </div>
          {/* 发送频率 */}
          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "120px" }}>
              发送频率
            </span>
            <select
              className="form-select"
              value={sendRate}
              onChange={(e) => setSendRate(e.target.value)}
            >
              <option value="">请选择</option>
              <option value="1">每1分钟发1封</option>
              <option value="2">每2分钟发1封</option>
              <option value="3">每3分钟发1封</option>
              <option value="5">每5分钟发1封</option>
              <option value="7">每7分钟发1封</option>
              <option value="10">每10分钟发1封</option>
              <option value="15">每15分钟发1封</option>
              <option value="30">每30分钟发1封</option>
              <option value="45">每45分钟发1封</option>
              <option value="60">每60分钟发1封</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            提交
          </button>
          <a>{result}</a> {/* 使用状态中的 result */}
        </div>
      </form>
      <div className="container ">
        {" "}
        <hr />
      </div>
      {<Footer />}
    </div>
  );
};
