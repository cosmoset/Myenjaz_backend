const { generateCertificate, generateSummary } = require("../../utils/generatepdf");

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

const generateSummaryHandler = async (req, res) => {
    try {
        const { applicants } = req.query;
        
        if (!applicants) {
            throw new Error("No applicants selected");
        }

        const applicantList = applicants.split(',');
        
        // Generate the summary and get the output file path
        const filePath = await generateSummary(applicantList);

        if (!filePath) {
            throw new Error("File path is undefined.");
        }

        // Send the generated file for download
        res.download(filePath, `summary_${applicantList.length > 1 ? 'multiple' : 'single'}.pdf`, (err) => {
            if (err) {
                console.error("❌ Error sending file:", err);
                res.status(500).json({ error: "Failed to download summary." });
            }
        });

    } catch (error) {
        console.error("❌ Error in generating summary:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { generateCertificateHandler, generateSummaryHandler };
