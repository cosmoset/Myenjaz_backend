const puppeteer = require("puppeteer");
const bwipjs = require("bwip-js");
const fs = require("fs");
const path = require("path");
const dbConnection = require("../config/db");

const OUTPUT_DIR = path.join(__dirname, "../output");

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

/**
 * Generates a barcode image from a given number and saves it.
 * @param {string} number - The number to encode in the barcode.
 * @param {string} label - A label for the barcode (visa, application).
 * @returns {string} - Path to the generated barcode image.
 */
async function generateBarcode(number, label) {
  return new Promise((resolve, reject) => {
    if (!number) {
      console.error(`❌ Error: Missing barcode text for ${label}`);
      return reject(new Error(`bwip-js: Missing barcode text for ${label}`));
    }

    const barcodePath = path.join(OUTPUT_DIR, `barcode_${label}_${number}.png`);

    bwipjs.toBuffer(
      {
        bcid: "code128", // Barcode type (Code 128 is widely used)
        text: number.toString(), // Ensure it's a string
        scale: 3,
        height: 10,
        textxalign: "center",
        textyoffset: 6,
        includetext: false,
      },
      (err, png) => {
        if (err) {
          console.error(`❌ Error generating ${label} barcode:`, err);
          return reject(err);
        }
        fs.writeFileSync(barcodePath, png);
        resolve(barcodePath);
      }
    );
  });
}

/**
 * Converts an image file to a Base64 string.
 * @param {string} imagePath - Local image path.
 * @returns {string} - Base64 encoded image or empty string if file not found.
 */
function imageToBase64(imagePath) {
  try {
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      const mimeType =
        path.extname(imagePath) === ".png" ? "image/png" : "image/jpeg";
      return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
    } else {
      console.warn(`⚠️ Warning: Image not found at ${imagePath}`);
      return ""; // Return empty string if file doesn't exist
    }
  } catch (error) {
    console.error(`❌ Error converting image to Base64: ${error.message}`);
    return "";
  }
}

/**
 * Generates a PDF certificate from an HTML template.
 * @param {object} passportno - Passport number to fetch the user data.
 */
async function generateCertificate(passportno) {
  // Fetch user from database
  const [userdata] = await dbConnection.query(
    "SELECT * FROM applications WHERE passportNo = ?",
    [passportno]
  );
  const applicant = userdata[0];
  if (applicant && applicant.regularPhoto) {
    console.log("✅ Applicant found:", applicant);
  }
  // Check if applicant exists
  if (!applicant) {
    console.error("❌ Applicant not found!");
    return;
  }

  try {
    // Read the HTML template
    const templatePath = path.join(__dirname, "../public/template/template.html");
    if (!fs.existsSync(templatePath)) {
      console.error("❌ Error: template.html not found!");
      return;
    }
    let template = fs.readFileSync(templatePath, "utf8");

    // Convert images to Base64
    const profileImage = imageToBase64(applicant.regularPhoto);
    const logo = imageToBase64(path.join(__dirname, "../public/images/logo.jpg"));
``
    // Generate barcodes
    const visaBarcodePath = await generateBarcode(applicant.visaNo, "visa");
    const visaBarcodeBase64 = imageToBase64(visaBarcodePath);

    const appBarcodePath = await generateBarcode(applicant.applicationNo, "application");
    const appBarcodeBase64 = imageToBase64(appBarcodePath);

    // Replace placeholders
    template = template
      .replace("{{NAME}}", applicant.fullName)
      .replace("{{VISA_NUMBER}}", applicant.visaNo)
      .replace("{{APPLICATION_NUMBER}}", applicant.applicationNo)
      .replace("{{PROFILE_IMAGE}}", profileImage)
      .replace("{{LOGO}}", logo)
      .replace("{{VISA_BARCODE}}", visaBarcodeBase64)
      .replace("{{APPLICATION_BARCODE}}", appBarcodeBase64);

    console.log("✅ Template processed successfully");

    // **🔴 Fix: Add Launch Flags to Puppeteer**
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
    ],
    
      executablePath: process.env.NODE_ENV === "production" ?  process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    
    // Set User-Agent for the page
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36");

    await page.setContent(template, { waitUntil: "load" });

    const outputPath = path.join(OUTPUT_DIR, `report_${applicant.fullName}.pdf`);

    await page.pdf({ path: outputPath, format: "A4", scale: 0.81 });

    await browser.close();
    console.log(`✅ PDF generated successfully: ${outputPath}`);

    return outputPath;
  } catch (error) {
    console.error("❌ Error generating certificate:", error);
    throw error;
  }
}

// Export the functions
module.exports = {
  generateBarcode,
  imageToBase64,
  generateCertificate,
};
