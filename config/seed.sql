CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for each application
    
    -- Personal Information
    maritalStatus VARCHAR(50),  -- Marital status (Single, Married, etc.)
    gender VARCHAR(10),  -- Gender (Male/Female)
    applicationNo VARCHAR(50) UNIQUE,  -- Unique application number
    fullName VARCHAR(255),  -- Full name of the applicant
    date DATE,  -- Application submission date
    passportNo VARCHAR(50),  -- Passport number
    placeOfIssue VARCHAR(255),  -- Place where passport was issued
    dateOfIssue DATE,  -- Passport issue date
    dateOfBirth DATE,  -- Applicant's date of birth
    religion VARCHAR(100),  -- Religion of the applicant
    qualification VARCHAR(255),  -- Education qualification
    city VARCHAR(100),  -- City of residence
    woreda VARCHAR(100),  -- Woreda (district) of residence
    phoneNo VARCHAR(50),  -- Contact phone number

    -- Visa & Sponsor Information
    visaNo VARCHAR(50),  -- Visa number
    sponsorId VARCHAR(50),  -- Sponsor identification number
    sponsorAddress TEXT,  -- Address of the sponsor
    nationalId VARCHAR(50),  -- National ID number
    email VARCHAR(255),  -- Applicant's email address
    fileNo VARCHAR(50),  -- File number for internal tracking
    wakala VARCHAR(100),  -- Wakala reference
    signedOn DATE,  -- Date of contract signing
    biometricId VARCHAR(50),  -- Biometric ID reference
    sponsorName VARCHAR(255),  -- Name of the sponsor
    sponsorPhone VARCHAR(50),  -- Sponsor's phone number
    houseNo VARCHAR(50),  -- House number
    agent VARCHAR(255),  -- Name of the recruitment agent
    sponsorArabic VARCHAR(255),  -- Sponsor's name in Arabic
    visaType VARCHAR(50),  -- Type of visa (Work, Student, etc.)
    contractNo VARCHAR(50),  -- Contract number
    stickerVisaNo VARCHAR(50),  -- Sticker visa number
    currentNationality VARCHAR(100),  -- Current nationality
    laborId VARCHAR(50),  -- Labor ID reference

    -- Relative Information
    relativeName VARCHAR(255),  -- Name of a relative
    relativePhone VARCHAR(50),  -- Relative's phone number
    relativeCity VARCHAR(100),  -- City where relative lives
    relativeWoreda VARCHAR(100),  -- Relative's woreda
    relativeGender VARCHAR(10),  -- Relative's gender
    addressRegion VARCHAR(100),  -- Region of residence
    relativeKinship VARCHAR(100),  -- Relationship with the applicant (Father, Mother, etc.)
    subcity VARCHAR(100),  -- Subcity where the relative lives
    relativeHouseNo VARCHAR(50),  -- Relative's house number
    relativeBirthDate DATE,  -- Relative's birth date
    contactPerson2 VARCHAR(255),  -- Alternative contact person
    contactPhone2 VARCHAR(50),  -- Phone number of alternative contact person

    -- Certification & Passport Details
    cocCenterName VARCHAR(255),  -- Name of the CoC (Certificate of Competency) center
    certificateNo VARCHAR(50),  -- Certificate number
    passportType VARCHAR(50),  -- Type of passport (Ordinary, Diplomatic, etc.)
    placeOfBirth VARCHAR(255),  -- Birthplace of the applicant
    dateOfExpiry DATE,  -- Passport expiry date
    occupation VARCHAR(255),  -- Occupation of the applicant
    region VARCHAR(100),  -- Region of residence
    certifiedDate DATE,  -- Certification date
    medicalPlace VARCHAR(255),  -- Medical checkup location

    -- Required Documents (Checkboxes)
    twoPhotographs BOOLEAN DEFAULT FALSE,  -- Has submitted two photographs
    idCard BOOLEAN DEFAULT FALSE,  -- Has submitted an ID card
    relativeIdCard BOOLEAN DEFAULT FALSE,  -- Relative's ID card submitted

    -- Additional Information
    english VARCHAR(50),  -- English proficiency level
    experienceAbroad VARCHAR(255),  -- Experience working abroad
    worksIn VARCHAR(255),  -- Industry where the applicant works
    height DECIMAL(5,2),  -- Height in meters (e.g., 1.75)
    referenceNo VARCHAR(50),  -- Reference number

    -- Skills (Checkboxes)
    ironing BOOLEAN DEFAULT FALSE,  -- Can do ironing
    sewing BOOLEAN DEFAULT FALSE,  -- Can do sewing
    babysitting BOOLEAN DEFAULT FALSE,  -- Can do babysitting
    carCare BOOLEAN DEFAULT FALSE,  -- Can take care of a car
    cleaning BOOLEAN DEFAULT FALSE,  -- Can do cleaning
    washing BOOLEAN DEFAULT FALSE,  -- Can do washing
    cooking BOOLEAN DEFAULT FALSE,  -- Can do cooking

    -- Salary & Personal Attributes
    arabic VARCHAR(50),  -- Arabic proficiency level
    salary DECIMAL(10,2),  -- Expected salary amount
    numberOfChildren INT,  -- Number of children
    weight DECIMAL(5,2),  -- Weight in kilograms
    remark TEXT,  -- Additional remarks

    -- New Photo Fields
    regularPhoto VARCHAR(255),  -- Regular photo (Binary Large Object for images)
    passportPhoto VARCHAR(255),  -- Passport photo (Binary Large Object for images)
    fullsizePhoto VARCHAR(255),  -- Fullsize photo (Binary Large Object for images)

    -- Record Keeping
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Auto-filled timestamp when the record is created
);