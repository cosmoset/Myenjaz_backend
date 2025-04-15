module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    maritalStatus: DataTypes.STRING,
    gender: DataTypes.STRING,
    applicationNo: {
      type: DataTypes.STRING,
      unique: true,
    },
    fullName: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    passportNo: DataTypes.STRING,
    placeOfIssue: DataTypes.STRING,
    dateOfIssue: DataTypes.DATEONLY,
    dateOfBirth: DataTypes.DATEONLY,
    religion: DataTypes.STRING,
    qualification: DataTypes.STRING,
    city: DataTypes.STRING,
    woreda: DataTypes.STRING,
    phoneNo: DataTypes.STRING,

    // Visa & Sponsor
    visaNo: DataTypes.STRING,
    sponsorId: DataTypes.STRING,
    sponsorAddress: DataTypes.TEXT,
    nationalId: DataTypes.STRING,
    email: DataTypes.STRING,
    fileNo: DataTypes.STRING,
    wakala: DataTypes.STRING,
    signedOn: DataTypes.DATEONLY,
    biometricId: DataTypes.STRING,
    sponsorName: DataTypes.STRING,
    sponsorPhone: DataTypes.STRING,
    houseNo: DataTypes.STRING,
    agent: DataTypes.STRING,
    sponsorArabic: DataTypes.STRING,
    visaType: DataTypes.STRING,
    contractNo: DataTypes.STRING,
    stickerVisaNo: DataTypes.STRING,
    currentNationality: DataTypes.STRING,
    laborId: DataTypes.STRING,

    // Relative
    relativeName: DataTypes.STRING,
    relativePhone: DataTypes.STRING,
    relativeCity: DataTypes.STRING,
    relativeWoreda: DataTypes.STRING,
    relativeGender: DataTypes.STRING,
    addressRegion: DataTypes.STRING,
    relativeKinship: DataTypes.STRING,
    subcity: DataTypes.STRING,
    relativeHouseNo: DataTypes.STRING,
    relativeBirthDate: DataTypes.DATEONLY,
    contactPerson2: DataTypes.STRING,
    contactPhone2: DataTypes.STRING,

    // Certification
    cocCenterName: DataTypes.STRING,
    certificateNo: DataTypes.STRING,
    passportType: DataTypes.STRING,
    placeOfBirth: DataTypes.STRING,
    dateOfExpiry: DataTypes.DATEONLY,
    occupation: DataTypes.STRING,
    region: DataTypes.STRING,
    certifiedDate: DataTypes.DATEONLY,
    medicalPlace: DataTypes.STRING,

    // Required Docs
    twoPhotographs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    idCard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    relativeIdCard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    // Additional Info
    english: DataTypes.STRING,
    experienceAbroad: DataTypes.STRING,
    worksIn: DataTypes.STRING,
    height: DataTypes.DECIMAL(5, 2),
    referenceNo: DataTypes.STRING,

    // Skills
    ironing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sewing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    babysitting: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    carCare: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cleaning: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    washing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cooking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    // Salary & Personal Attributes
    arabic: DataTypes.STRING,
    salary: DataTypes.DECIMAL(10, 2),
    numberOfChildren: DataTypes.INTEGER,
    weight: DataTypes.DECIMAL(5, 2),
    remark: DataTypes.TEXT,

    // Photo Fields
    regularPhoto: DataTypes.STRING,
    passportPhoto: DataTypes.STRING,
    fullSizePhoto: DataTypes.STRING,

    // Record Keeping
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'applications',
    timestamps: false,
  });

  return Application;
};
