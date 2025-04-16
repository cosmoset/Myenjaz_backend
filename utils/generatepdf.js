const puppeteer = require("puppeteer");
const bwipjs = require("bwip-js");
const fs = require("fs");
const path = require("path");
const db = require("../app/models"); 

const OUTPUT_DIR = path.join(__dirname, "../output");

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

/**
 * Generates a barcode image from a given number and saves it.
 * @param {string} number - The number to encode in the barcode.
 * @param {string} label - A label for the barcode (visa, application).
 * @param {boolean} smaller - Whether to use a smaller barcode.
 * @returns {string} - Path to the generated barcode image.
 */
async function generateBarcode(number, label, smaller=false) {
  return new Promise((resolve, reject) => {
    if (!number) {
      console.error(`❌ Error: Missing barcode text for ${label}`);
      return reject(new Error(`bwip-js: Missing barcode text for ${label}`));
    }

    const barcodePath = path.join(OUTPUT_DIR, `barcode_${label}_${number}.png`);

    // Set scale values based on whether we want a smaller barcode
    const scaleX = smaller ? 1 : 2;
    const scaleY = smaller ? 1 : 2;

    bwipjs.toBuffer(
      {
        bcid: "code128",
        text: number.toString(),
        scaleX: scaleX,
        scaleY: scaleY,
        height: smaller ? 6 : 10,
        textxalign: "center",
        textyoffset: smaller ? 3 : 6,
        includetext: false,
        backgroundcolor: "FFFFFF",
        padding: smaller ? 1 : 2,
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
      return "";
    }
  } catch (error) {
    console.error(`❌ Error converting image to Base64: ${error.message}`);
    return "";
  }
}


function formatDate(dateString){

  try{
    const date = new Date(dateString);

    // Extract and format day, month, year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate
  }catch (error) {
    console.error(`Error formatting date: ${error.message}`);
  }

}


/**
 * Generates a PDF certificate from an HTML template.
 * @param {string} passportno - Passport number to fetch the user data.
 * @returns {string} - Path to the generated PDF.
 */
async function generateCertificate(passportno) {
  try {
    // Fetch user from database using Sequelize
    const applicant = await db.Application.findOne({
      where: { passportNo: passportno },
    });

    if (!applicant) {
      console.error("❌ Applicant not found!");
      throw new Error("Applicant not found");
    }

    console.log("✅ Applicant found:", applicant.toJSON());

    // Read the HTML template
    const templatePath = path.join(__dirname, "../public/template/template.html");
    if (!fs.existsSync(templatePath)) {
      console.error("❌ Error: template.html not found!");
      throw new Error("Template not found");
    }
    let template = fs.readFileSync(templatePath, "utf8");

    // Convert images to Base64
    const profileImage = imageToBase64(applicant.regularPhoto || "");
    const logo = imageToBase64(path.join(__dirname, "../public/images/logo.jpg"));

    // Generate barcodes
    const visaBarcodePath = await generateBarcode(applicant.visaNo, "visa");
    const visaBarcodeBase64 = imageToBase64(visaBarcodePath);

    const appBarcodePath = await generateBarcode(applicant.applicationNo, "application");
    const appBarcodeBase64 = imageToBase64(appBarcodePath);

    let dateOfReport = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    dateOfReport = dateOfReport.toLocaleDateString('en-US', options);    


    // Replace placeholders
    template = template
      .replace("{{NAME}}", applicant.fullName)
      .replace("{{VISA_NUMBER}}", applicant.visaNo)
      .replace("{{APPLICATION_NUMBER}}", applicant.applicationNo)
      .replace("{{PROFILE_IMAGE}}", profileImage)
      .replace("{{LOGO}}", logo)
      .replace("{{VISA_BARCODE}}", visaBarcodeBase64)
      .replace("{{APPLICATION_BARCODE}}", appBarcodeBase64)
      .replace("{{DATEOFBIRTH}}",formatDate(applicant.dateOfBirth))
      .replace("{{PLACEOFBIRTH}}", applicant.placeOfBirth)
      .replace("{{CURRENTNATIONALITY}}", applicant.currentNationality)
      .replace("{{SEX}}", applicant.gender)
      .replace("{{MARITALSTATUS}}", applicant.maritalStatus)
      .replace("{{RELIGION}}", applicant.religion)
      .replace("{{CURRENTNATIONALITY}}", "Ethiopian")
      .replace("{{PROFESSION}}", applicant.occupation)
      .replace("{{SPONSORADDRESS}}", applicant.sponsorAddress)
      .replace("{{SPONSORNAME}}", applicant.sponsorName)
      .replace("{{PLACEOFISSUE}}", applicant.placeOfIssue)
      .replace("{{DATEOFISSUE}}", formatDate(applicant.dateOfIssue))
      .replace("{{PASSPORTNO}}", applicant.passportNo)
      .replace("{{EXPIRYDATE}}", formatDate(applicant.dateOfExpiry))
      .replace("{{DATEOFREPORT}}", dateOfReport)
      .replace("{{DATEPAYMENT}}", formatDate(dateOfReport))
      .replace("{{NAME}}", applicant.fullName);
      // .replace("{{DATEPAYMENT}}", applicant.dateofpayment)

    console.log("✅ Template processed successfully");

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });

    const page = await browser.newPage();

    // Set User-Agent
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    );

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

/**
 * Generates a summary PDF for one or multiple applicants
 * @param {string[]} passportNumbers - Array of passport numbers
 * @returns {string} - Path to the generated PDF
 */
async function generateSummary(passportNumbers) {
  try {
    // Fetch applicants from database
    const applicants = await db.Application.findAll({
      where: { passportNo: passportNumbers },
      order: [['date', 'DESC']]
    });

    if (!applicants.length) {
      throw new Error("No applicants found");
    }

    // Read the appropriate template based on number of applicants
    const templatePath = path.join(
      __dirname, 
      "../public/template/", 
      "summary_multiple.html"
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template not found");
    }

    let template = fs.readFileSync(templatePath, "utf8");

    let dateOfReport = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    dateOfReport = dateOfReport.toLocaleDateString('en-US', options);        

    // Generate barcodes for each applicant
    const barcodes = await Promise.all(
      applicants.map(async (applicant) => {
        const barcodePath = await generateBarcode(applicant.applicationNo, "summary", true);
        return {
          applicationNo: applicant.applicationNo,
          barcode: imageToBase64(barcodePath)
        };
      })
    );

      const tableRows = applicants.map((applicant, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${applicant.fullName}</td>
          <td>${applicant.passportNo}</td>
          <td>${applicant.sponsorId}</td>
          <td>${applicant.visaNo}</td>
          <td>${applicant.applicationNo}</td>
          <td><img src="${barcodes[index].barcode}" alt="Barcode" /></td>
        </tr>
      `).join('');

      template = template
        .replace("{{TABLE_ROWS}}", tableRows)
        .replace("{{DATEOFREPORT}}", dateOfReport);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await page.setContent(template, { waitUntil: "load" });

    const outputPath = path.join(
      OUTPUT_DIR, 
      `summary_${applicants.length > 1 ? 'multiple' : 'single'}_${Date.now()}.pdf`
    );

    await page.pdf({ 
      path: outputPath, 
      format: "A4", 
      margin: { top: "20px", right: "20px", bottom: "60px", left: "20px" }
    });

    await browser.close();
    console.log(`✅ Summary PDF generated successfully: ${outputPath}`);

    return outputPath;
  } catch (error) {
    console.error("❌ Error generating summary:", error);
    throw error;
  }
}

// Export the functions
module.exports = {
  generateBarcode,
  imageToBase64,
  generateCertificate,
  generateSummary,
};