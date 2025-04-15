module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("applications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      passportNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      visaNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      applicationNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      regularPhoto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fullSizePhoto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportPhoto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      maritalStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      placeOfIssue: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateOfIssue: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      religion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qualification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      woreda: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nationalId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      wakala: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      signedOn: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      biometricId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      houseNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      agent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorArabic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      visaType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contractNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stickerVisaNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      currentNationality: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      laborId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativePhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativeCity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativeWoreda: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativeGender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      addressRegion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativeKinship: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subcity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativeHouseNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativeBirthDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      contactPerson2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cocCenterName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      certificateNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactPhone2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      placeOfBirth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateOfExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      region: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      certifiedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      medicalPlace: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      twoPhotographs: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idCard: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relativeIdCard: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      english: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      experienceAbroad: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      worksIn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      height: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referenceNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ironing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sewing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      babysitting: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      carCare: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cleaning: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      washing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cooking: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      arabic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salary: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numberOfChildren: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      weight: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      remark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("applications");
  },
};