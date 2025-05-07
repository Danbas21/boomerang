/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * Import Functions from Firebase
 */
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({origin: true});
const nodemailer = require("nodemailer");

/**
 * Configuración del transportador de correo
 * Nota: Tendrás que instalar nodemailer con: npm install nodemailer --save
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adesezio@gmail.com", // Reemplaza con tu correo
    pass: "pmgfjqycavbyqytw", // Reemplaza con tu contraseña de aplicación
  },
});

/**
 * Cloud Function para enviar correo desde el formulario de contacto
 */
exports.sendEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    // Verificar si es un método POST
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Método no permitido",
      });
    }

    try {
      // Obtener datos del formulario
      const {name, email, message} = req.body;

      // Validar datos
      if (!name || !email || !message) {
        return res.status(400).json({
          message: "Por favor, completa todos los campos requeridos",
        });
      }

      // Configurar el correo
      const mailOptions = {
        from: `${name} <${email}>`,
        to: "hello@boomerang-mkt.com",
        subject: "Informacion del servicio",
        text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
        html: `
          <h3>Nuevo mensaje de contacto</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      };

      // Enviar el correo
      await transporter.sendMail(mailOptions);
      logger.info("Correo enviado con éxito", {structuredData: true});

      return res.status(200).json({
        message: "Mensaje enviado con éxito",
      });
    } catch (error) {
      logger.error("Error al enviar el correo:", error);
      return res.status(500).json({
        message: "Error al enviar el mensaje",
      });
    }
  });
});
