const path = require("path");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const db = require("../models"); 


// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../Uploads");

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1] || "jpg";
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
const createApplication = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "File upload error", error: err.message });
    }

    try {
      // Extract file paths
      const regularPhoto = req.files["regularPhoto"]?.[0]?.path || null;
      const fullSizePhoto = req.files["fullSizePhoto"]?.[0]?.path || null;
      const passportPhoto = req.files["passportPhoto"]?.[0]?.path || null;

      // Extract form data
      const {
        maritalStatus,
        gender,
        applicationNo,
        fullName,
        date,
        passportNo,
        placeOfIssue,
        dateOfIssue,
        dateOfBirth,
        religion,
        qualification,
        city,
        woreda,
        phoneNo,
        visaNo,
        sponsorId,
        sponsorAddress,
        nationalId,
        email,
        fileNo,
        wakala,
        signedOn,
        biometricId,
        sponsorName,
        sponsorPhone,
        houseNo,
        agent,
        sponsorArabic,
        visaType,
        contractNo,
        stickerVisaNo,
        currentNationality,
        laborId,
        relativeName,
        relativePhone,
        relativeCity,
        relativeWoreda,
        relativeGender,
        addressRegion,
        relativeKinship,
        subcity,
        relativeHouseNo,
        relativeBirthDate,
        contactPerson2,
        cocCenterName,
        certificateNo,
        contactPhone2,
        passportType,
        placeOfBirth,
        dateOfExpiry,
        occupation,
        region,
        certifiedDate,
        medicalPlace,
        twoPhotographs,
        idCard,
        relativeIdCard,
        english,
        experienceAbroad,
        worksIn,
        height,
        referenceNo,
        ironing,
        sewing,
        babysitting,
        carCare,
        cleaning,
        washing,
        cooking,
        arabic,
        salary,
        numberOfChildren,
        weight,
        remark,
      } = req.body;

      // Validate required fields
      if (!passportNo) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Passport number is required!" });
      }

      // Create application with Sequelize
      const application = await db.Application.create({
        maritalStatus,
        gender,
        applicationNo,
        fullName,
        date,
        passportNo,
        placeOfIssue,
        dateOfIssue,
        dateOfBirth,
        religion,
        qualification,
        city,
        woreda,
        phoneNo,
        visaNo,
        sponsorId,
        sponsorAddress,
        nationalId,
        email,
        fileNo,
        wakala,
        signedOn,
        biometricId,
        sponsorName,
        sponsorPhone,
        houseNo,
        agent,
        sponsorArabic,
        visaType,
        contractNo,
        stickerVisaNo,
        currentNationality,
        laborId,
        relativeName,
        relativePhone,
        relativeCity,
        relativeWoreda,
        relativeGender,
        addressRegion,
        relativeKinship,
        subcity,
        relativeHouseNo,
        relativeBirthDate,
        contactPerson2,
        cocCenterName,
        certificateNo,
        contactPhone2,
        passportType,
        placeOfBirth,
        dateOfExpiry,
        occupation,
        region,
        certifiedDate,
        medicalPlace,
        twoPhotographs,
        idCard,
        relativeIdCard,
        english,
        experienceAbroad,
        worksIn,
        height,
        referenceNo,
        ironing,
        sewing,
        babysitting,
        carCare,
        cleaning,
        washing,
        cooking,
        arabic,
        salary,
        numberOfChildren,
        weight,
        remark,
        regularPhoto,
        fullSizePhoto,
        passportPhoto,
      });

      console.log("Application created successfully");
      res.status(StatusCodes.CREATED).json({
        message: "Application submitted successfully!",
        applicationId: application.id,
      });
    } catch (error) {
      console.error("Error creating application:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Server error", error: error.message });
    }
  });
};

// Get All Applicants
const getAllApplicants = async (req, res) => {
  try {
    // Fetch all applications with Sequelize
    const applications = await db.Application.findAll({
      attributes: [
        "maritalStatus",
        "gender",
        "applicationNo",
        "fullName",
        "date",
        "passportNo",
        "placeOfIssue",
        "dateOfIssue",
        "dateOfBirth",
        "religion",
        "qualification",
        "city",
        "woreda",
        "phoneNo",
        "visaNo",
        "sponsorId",
        "sponsorAddress",
        "nationalId",
        "email",
        "fileNo",
        "wakala",
        "signedOn",
        "biometricId",
        "sponsorName",
        "sponsorPhone",
        "houseNo",
        "agent",
        "sponsorArabic",
        "visaType",
        "contractNo",
        "stickerVisaNo",
        "currentNationality",
        "laborId",
        "relativeName",
        "relativePhone",
        "relativeCity",
        "relativeWoreda",
        "relativeGender",
        "addressRegion",
        "relativeKinship",
        "subcity",
        "relativeHouseNo",
        "relativeBirthDate",
        "contactPerson2",
        "cocCenterName",
        "certificateNo",
        "contactPhone2",
        "passportType",
        "placeOfBirth",
        "dateOfExpiry",
        "occupation",
        "region",
        "certifiedDate",
        "medicalPlace",
        "twoPhotographs",
        "idCard",
        "relativeIdCard",
        "english",
        "experienceAbroad",
        "worksIn",
        "height",
        "referenceNo",
        "ironing",
        "sewing",
        "babysitting",
        "carCare",
        "cleaning",
        "washing",
        "cooking",
        "arabic",
        "salary",
        "numberOfChildren",
        "weight",
        "remark",
        "regularPhoto",
        "fullSizePhoto",
        "passportPhoto",
      ],
    });

    if (applications.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No applications found" });
    }

    return res.status(StatusCodes.OK).json({ users: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
};

// Get Single Applicant
const getApplicant = async (req, res) => {
  try {
    const { passportNo } = req.params;

    // Fetch application by passport number with Sequelize
    const application = await db.Application.findOne({
      where: { passportNo },
    });

    if (!application) {
      console.log("Application not found");
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Application not found" });
    }

    res.status(StatusCodes.OK).json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
};

// Edit Application
const editApplication = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "File upload error", error: err.message });
    }

    try {
      const { passportNo } = req.params;

      // Fetch existing application
      const application = await db.Application.findOne({
        where: { passportNo },
      });

      if (!application) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Application not found" });
      }

      // Extract file paths (use existing if not provided)
      const regularPhoto = req.files["regularPhoto"]?.[0]?.path || application.regularPhoto;
      const fullSizePhoto =
        req.files["fullSizePhoto"]?.[0]?.path || application.fullSizePhoto;
      const passportPhoto =
        req.files["passportPhoto"]?.[0]?.path || application.passportPhoto;

      // Extract form data
      const {
        maritalStatus,
        gender,
        applicationNo,
        fullName,
        date,
        placeOfIssue,
        dateOfIssue,
        dateOfBirth,
        religion,
        qualification,
        city,
        woreda,
        phoneNo,
        visaNo,
        sponsorId,
        sponsorAddress,
        nationalId,
        email,
        fileNo,
        wakala,
        signedOn,
        biometricId,
        sponsorName,
        sponsorPhone,
        houseNo,
        agent,
        sponsorArabic,
        visaType,
        contractNo,
        stickerVisaNo,
        currentNationality,
        laborId,
        relativeName,
        relativePhone,
        relativeCity,
        relativeWoreda,
        relativeGender,
        addressRegion,
        relativeKinship,
        subcity,
        relativeHouseNo,
        relativeBirthDate,
        contactPerson2,
        cocCenterName,
        certificateNo,
        contactPhone2,
        passportType,
        placeOfBirth,
        dateOfExpiry,
        occupation,
        region,
        certifiedDate,
        medicalPlace,
        twoPhotographs,
        idCard,
        relativeIdCard,
        english,
        experienceAbroad,
        worksIn,
        height,
        referenceNo,
        ironing,
        sewing,
        babysitting,
        carCare,
        cleaning,
        washing,
        cooking,
        arabic,
        salary,
        numberOfChildren,
        weight,
        remark,
      } = req.body;

      // Update application with Sequelize
      const updated = await application.update({
        maritalStatus,
        gender,
        applicationNo,
        fullName,
        date,
        placeOfIssue,
        dateOfIssue,
        dateOfBirth,
        religion,
        qualification,
        city,
        woreda,
        phoneNo,
        visaNo,
        sponsorId,
        sponsorAddress,
        nationalId,
        email,
        fileNo,
        wakala,
        signedOn,
        biometricId,
        sponsorName,
        sponsorPhone,
        houseNo,
        agent,
        sponsorArabic,
        visaType,
        contractNo,
        stickerVisaNo,
        currentNationality,
        laborId,
        relativeName,
        relativePhone,
        relativeCity,
        relativeWoreda,
        relativeGender,
        addressRegion,
        relativeKinship,
        subcity,
        relativeHouseNo,
        relativeBirthDate,
        contactPerson2,
        cocCenterName,
        certificateNo,
        contactPhone2,
        passportType,
        placeOfBirth,
        dateOfExpiry,
        occupation,
        region,
        certifiedDate,
        medicalPlace,
        twoPhotographs,
        idCard,
        relativeIdCard,
        english,
        experienceAbroad,
        worksIn,
        height,
        referenceNo,
        ironing,
        sewing,
        babysitting,
        carCare,
        cleaning,
        washing,
        cooking,
        arabic,
        salary,
        numberOfChildren,
        weight,
        remark,
        regularPhoto,
        fullSizePhoto,
        passportPhoto,
      });

      if (!updated) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Failed to update the application" });
      }

      console.log("Application updated successfully");
      res
        .status(StatusCodes.OK)
        .json({ message: "Application updated successfully!" });
    } catch (error) {
      console.error("Error updating application:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Server error", error: error.message });
    }
  });
};

module.exports = { createApplication, getAllApplicants, getApplicant, editApplication };