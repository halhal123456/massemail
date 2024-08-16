// 引入必要的库
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const cors = require("cors");

// 配置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 定义邮件发送的路由
app.post("/api/send", async (req, res) => {
  console.log("进入 /api/send 路由");

  // 从请求中获取邮件发送配置和内容
  let {
    host,
    port,
    secure,
    sendEmail,
    password,
    emailArray,
    title,
    sendNumber,
    sendRate,
    emailBody,
  } = req.body;
  if (!Array.isArray(emailArray) || emailArray.length === 0) {
    console.log("收件人为空");
  }
  // 设置邮件发送器
  let transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: sendEmail,
      pass: password,
    },
  });
  console.log(emailBody);
  // 初始化邮件选项
  let mailOptions = {
    from: sendEmail,
    to: "", // 这个将在发送时动态设置
    subject: title,
    html: emailBody,
  };

  let recipients = emailArray; // 获取收件人列表
  let index = 0; // 用于跟踪已发送的邮件数量

  // 创建定时任务，根据发送速率每隔sendRate时间发送一封邮件
  const job = schedule.scheduleJob(`*/${sendRate}  * * * *`, function () {
    console.log("每1分钟执行一次这个任务");

    if (index < sendNumber) {
      mailOptions.to = recipients[index]; // 设置当前邮件的收件人

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("发生错误: " + error.message);
          job.cancel(); // 如果发送邮件时发生错误，取消任务
        } else {
          console.log("邮件发送成功!");
          console.log("发送邮件的唯一标识符: %s", info.messageId);
        }
        index++;

        // 如果已达到发送数量限制，取消任务
        if (index > sendNumber) {
          console.log("所有邮件已发送完毕");
          job.cancel();
        }
      });
    }
  });

  console.log("邮件任务已启动，正在发送邮件...");
  res.json({ message: "邮件任务已启动，正在发送邮件..." }); // 向客户端返回任务启动的消息
});

// 启动服务器
app.listen(5000, () => console.log("服务器已启动"));
