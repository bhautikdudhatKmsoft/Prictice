const nodemailer = require('nodemailer')

const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com', 
        pass: 'your-email@example.com' 
      }
    })

    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'your-email@example.com',
      subject: subject,
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to send email' })
    }
  }
}

module.exports = { sendContactEmail }
