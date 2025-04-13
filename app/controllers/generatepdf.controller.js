const { generateCertificate } = require("../../utils/generatepdf");

const generateCertificateHandler = async (req, res) => {
    try {
        const passportno = req.params.id;

        // Generate the certificate and get the output file path
        const filePath = await generateCertificate(passportno);

        if (!filePath) {
            throw new Error("File path is undefined.");
        }

        // ✅ Send the generated file for download
        res.download(filePath, `certificate_jiren.pdf`, (err) => {
            if (err) {
                console.error("❌ Error sending file:", err);
                res.status(500).json({ error: "Failed to download certificate." });
            }
        });

    } catch (error) {
        console.error("❌ Error in generating certificate:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { generateCertificateHandler };
