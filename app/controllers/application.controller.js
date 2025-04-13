const path = require("path");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const dbConnection = require("../../config/db");

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1] || "jpg"; // Default to JPG if undefined
    const fileName = `${Date.now()}_${file.fieldname}.${fileExtension}`;
    cb(null, fileName);
  },
});

// Multer Upload Middleware
const upload = multer({ storage }).fields([
  { name: "regularPhoto", maxCount: 1 },
  { name: "fullSizePhoto", maxCount: 1 },
  { name: "passportPhoto", maxCount: 1 },
]);

// Form Submission Handler
// Form Submission Handler
const createApplication = async (req, res) => {

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err });
    }

    try {

      // Extract file paths
      const regularPhoto = req.files["regularPhoto"]?.[0]?.path || null;
      const fullSizePhoto = req.files["fullSizePhoto"]?.[0]?.path || null;
      const passportPhoto = req.files["passportPhoto"]?.[0]?.path || null;

      // Extract form data
      const {
        maritalStatus, gender, applicationNo, fullName, date, passportNo,
        placeOfIssue, dateOfIssue, dateOfBirth, religion, qualification, city, woreda, phoneNo,
        visaNo, sponsorId, sponsorAddress, nationalId, email, fileNo, wakala, signedOn, biometricId,
        sponsorName, sponsorPhone, houseNo, agent, sponsorArabic, visaType, contractNo, stickerVisaNo,
        currentNationality, laborId, relativeName, relativePhone, relativeCity, relativeWoreda,
        relativeGender, addressRegion, relativeKinship, subcity, relativeHouseNo, relativeBirthDate,
        contactPerson2, cocCenterName, certificateNo, contactPhone2, passportType, placeOfBirth,
        dateOfExpiry, occupation, region, certifiedDate, medicalPlace, twoPhotographs, idCard,
        relativeIdCard, english, experienceAbroad, worksIn, height, referenceNo, ironing, sewing,
        babysitting, carCare, cleaning, washing, cooking, arabic, salary, numberOfChildren, weight, remark
      } = req.body;

      // Validate required fields
      if (!passportNo) {
        return res.status(400).json({ message: "Passport number is required!" });
      }

      // SQL query
      const sql = `
        INSERT INTO applications (
          maritalStatus, gender, applicationNo, fullName, date, passportNo, placeOfIssue,
          dateOfIssue, dateOfBirth, religion, qualification, city, woreda, phoneNo, visaNo,
          sponsorId, sponsorAddress, nationalId, email, fileNo, wakala, signedOn, biometricId,
          sponsorName, sponsorPhone, houseNo, agent, sponsorArabic, visaType, contractNo,
          stickerVisaNo, currentNationality, laborId, relativeName, relativePhone, relativeCity,
          relativeWoreda, relativeGender, addressRegion, relativeKinship, subcity, relativeHouseNo,
          relativeBirthDate, contactPerson2, cocCenterName, certificateNo, contactPhone2,
          passportType, placeOfBirth, dateOfExpiry, occupation, region, certifiedDate, medicalPlace,
          twoPhotographs, idCard, relativeIdCard, english, experienceAbroad, worksIn, height,
          referenceNo, ironing, sewing, babysitting, carCare, cleaning, washing, cooking, arabic,
          salary, numberOfChildren, weight, remark, regularPhoto, fullSizePhoto, passportPhoto
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `;

      const values = [
        maritalStatus, gender, applicationNo, fullName, date, passportNo, placeOfIssue,
        dateOfIssue, dateOfBirth, religion, qualification, city, woreda, phoneNo, visaNo,
        sponsorId, sponsorAddress, nationalId, email, fileNo, wakala, signedOn, biometricId,
        sponsorName, sponsorPhone, houseNo, agent, sponsorArabic, visaType, contractNo,
        stickerVisaNo, currentNationality, laborId, relativeName, relativePhone, relativeCity,
        relativeWoreda, relativeGender, addressRegion, relativeKinship, subcity, relativeHouseNo,
        relativeBirthDate, contactPerson2, cocCenterName, certificateNo, contactPhone2,
        passportType, placeOfBirth, dateOfExpiry, occupation, region, certifiedDate, medicalPlace,
        twoPhotographs, idCard, relativeIdCard, english, experienceAbroad, worksIn, height,
        referenceNo, ironing, sewing, babysitting, carCare, cleaning, washing, cooking, arabic,
        salary, numberOfChildren, weight, remark, regularPhoto, fullSizePhoto, passportPhoto
      ];

      
      // Execute database query with promise-based API
      const [result] = await dbConnection.query(sql, values);
      console.log("created successfully");
      res.status(201).json({ message: "Application submitted successfully!", applicationId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
      console.log("error", error);
    }
    finally {
      console.log("db completed");
      
    }

  });
};

// Get All Applicants
const getAllApplicants = async (req, res) => {
  try {

    // Fetch all users from the database
    const [users] = await dbConnection.query(
      `SELECT maritalStatus, gender, applicationNo, fullName, date, passportNo,
      placeOfIssue, dateOfIssue, dateOfBirth, religion, qualification, city, woreda, phoneNo,
      visaNo, sponsorId, sponsorAddress, nationalId, email, fileNo,
      wakala, signedOn, biometricId, sponsorName, sponsorPhone, houseNo, agent,
      sponsorArabic, visaType, contractNo, stickerVisaNo, currentNationality, laborId,
      relativeName, relativePhone, relativeCity, relativeWoreda, relativeGender, addressRegion,
      relativeKinship, subcity, relativeHouseNo, relativeBirthDate, contactPerson2,
      cocCenterName, certificateNo, contactPhone2, passportType, placeOfBirth, dateOfExpiry,
      occupation, region, certifiedDate, medicalPlace, twoPhotographs, idCard,
      relativeIdCard, english, experienceAbroad, worksIn, height, referenceNo,
      ironing, sewing, babysitting, carCare, cleaning, washing, cooking, arabic,
      salary, numberOfChildren, weight, remark, regularPhoto, fullSizePhoto, passportPhoto FROM applications`
    );

    if (users.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No users found" });
    }

    return res.status(StatusCodes.OK).json({ users });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong, please try again later" });
  }
};

const getApplicant = async (req, res) => {
  try {
    const { passportNo } = req.params;

    // Fetch user by passport number
    const [user] = await dbConnection.query(
      `SELECT * from applications WHERE passportNo = ?`,
      [passportNo]
    );
    
    if (user.length === 0) {
      console.log("User not found");
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    // Send user data in response
    res.status(StatusCodes.OK).json(user[0]); // Assuming user is an array, so send the first element
  } catch (error) {
    console.log("Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong, please try again later" });
  }
};


const editApplication = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err });
    }

    try {
      const { passportNo } = req.params; // Get the passportNo from the URL params

      // Fetch existing user data
      const [existingUser] = await dbConnection.query(
        `SELECT * FROM applications WHERE passportNo = ?`,
        [passportNo]
      );

      if (existingUser.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Extract file paths (if files are provided)
      const regularPhoto = req.files["regularPhoto"]?.[0]?.path || existingUser[0].regularPhoto;
      const fullSizePhoto = req.files["fullSizePhoto"]?.[0]?.path || existingUser[0].fullSizePhoto;
      const passportPhoto = req.files["passportPhoto"]?.[0]?.path || existingUser[0].passportPhoto;

      // Extract form data
      const {
        maritalStatus, gender, applicationNo, fullName, date, placeOfIssue,
        dateOfIssue, dateOfBirth, religion, qualification, city, woreda, phoneNo,
        visaNo, sponsorId, sponsorAddress, nationalId, email, fileNo, wakala, signedOn, biometricId,
        sponsorName, sponsorPhone, houseNo, agent, sponsorArabic, visaType, contractNo, stickerVisaNo,
        currentNationality, laborId, relativeName, relativePhone, relativeCity, relativeWoreda,
        relativeGender, addressRegion, relativeKinship, subcity, relativeHouseNo, relativeBirthDate,
        contactPerson2, cocCenterName, certificateNo, contactPhone2, passportType, placeOfBirth,
        dateOfExpiry, occupation, region, certifiedDate, medicalPlace, twoPhotographs, idCard,
        relativeIdCard, english, experienceAbroad, worksIn, height, referenceNo, ironing, sewing,
        babysitting, carCare, cleaning, washing, cooking, arabic, salary, numberOfChildren, weight, remark
      } = req.body;

      // SQL query to update the data
      const sql = `
        UPDATE applications
        SET maritalStatus = ?, gender = ?, applicationNo = ?, fullName = ?, date = ?, placeOfIssue = ?, dateOfIssue = ?, 
            dateOfBirth = ?, religion = ?, qualification = ?, city = ?, woreda = ?, phoneNo = ?, visaNo = ?, sponsorId = ?, 
            sponsorAddress = ?, nationalId = ?, email = ?, fileNo = ?, wakala = ?, signedOn = ?, biometricId = ?, 
            sponsorName = ?, sponsorPhone = ?, houseNo = ?, agent = ?, sponsorArabic = ?, visaType = ?, contractNo = ?, 
            stickerVisaNo = ?, currentNationality = ?, laborId = ?, relativeName = ?, relativePhone = ?, relativeCity = ?, 
            relativeWoreda = ?, relativeGender = ?, addressRegion = ?, relativeKinship = ?, subcity = ?, relativeHouseNo = ?, 
            relativeBirthDate = ?, contactPerson2 = ?, cocCenterName = ?, certificateNo = ?, contactPhone2 = ?, passportType = ?, 
            placeOfBirth = ?, dateOfExpiry = ?, occupation = ?, region = ?, certifiedDate = ?, medicalPlace = ?, twoPhotographs = ?, 
            idCard = ?, relativeIdCard = ?, english = ?, experienceAbroad = ?, worksIn = ?, height = ?, referenceNo = ?, ironing = ?, 
            sewing = ?, babysitting = ?, carCare = ?, cleaning = ?, washing = ?, cooking = ?, arabic = ?, salary = ?, 
            numberOfChildren = ?, weight = ?, remark = ?, regularPhoto = ?, fullSizePhoto = ?, passportPhoto = ?
        WHERE passportNo = ?
      `;

      const values = [
        maritalStatus, gender, applicationNo, fullName, date, placeOfIssue, dateOfIssue, dateOfBirth, religion, qualification,
        city, woreda, phoneNo, visaNo, sponsorId, sponsorAddress, nationalId, email, fileNo, wakala, signedOn, biometricId,
        sponsorName, sponsorPhone, houseNo, agent, sponsorArabic, visaType, contractNo, stickerVisaNo, currentNationality,
        laborId, relativeName, relativePhone, relativeCity, relativeWoreda, relativeGender, addressRegion, relativeKinship,
        subcity, relativeHouseNo, relativeBirthDate, contactPerson2, cocCenterName, certificateNo, contactPhone2, passportType,
        placeOfBirth, dateOfExpiry, occupation, region, certifiedDate, medicalPlace, twoPhotographs, idCard, relativeIdCard, 
        english, experienceAbroad, worksIn, height, referenceNo, ironing, sewing, babysitting, carCare, cleaning, washing,
        cooking, arabic, salary, numberOfChildren, weight, remark, regularPhoto, fullSizePhoto, passportPhoto, passportNo
      ];

      // Execute database query to update the record
      const [result] = await dbConnection.query(sql, values);

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Failed to update the application" });
      }

      console.log("Updated successfully");
      res.status(200).json({ message: "Application updated successfully!" });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


    

module.exports = { createApplication, getAllApplicants, getApplicant, editApplication };