import jsPDF from "jspdf";

// Function to generate and download the PDF
export const generatePDF = (clinicDetails, logo) => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Add the logo at the top
    if (logo) {
      doc.addImage(logo, "PNG", 10, 10, 30, 30);  // Adjust dimensions and position
    }

    // Title: Privacy Policy
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Rimberio Medical Clinic", 105, 40, null, null, "center");
    doc.setFontSize(14);
    doc.text("Privacy Policy", 105, 50, null, null, "center");

    // Effective Date
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Effective Date: ${currentDate}`, 105, 60, null, null, "center");

    // Add Clinic Contact Information
    doc.setFontSize(10);
    doc.text(`Address: ${clinicDetails.address}`, 10, 80);
    doc.text(`Phone: ${clinicDetails.phone}`, 10, 90);
    doc.text(`Email: ${clinicDetails.email}`, 10, 100);

    // Add line separator
    doc.line(10, 105, 200, 105);

    // Section: Introduction
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("1. Introduction", 10, 115);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Rimberio Medical Clinic ('we', 'our', or 'us') is committed to protecting the privacy of all patients and visitors. "
      + "This Privacy Policy outlines how we collect, use, and protect your personal information.",
      10, 125
    );

    // Section: Information We Collect
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("2. Information We Collect", 10, 140);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "We collect the following types of information:",
      10, 150
    );
    doc.text("- Personal Information: Name, contact details, etc.", 10, 160);
    doc.text("- Medical Information: Medical history, treatment details.", 10, 170);
    doc.text("- Payment Information: Payment details for billing purposes.", 10, 180);

    // Section: How We Use Your Information
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("3. How We Use Your Information", 10, 195);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "We use your personal information to provide medical services, manage appointments, process payments, and comply with legal requirements.",
      10, 205
    );

    // Section: Data Security
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("4. Data Security", 10, 220);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "We take reasonable steps to protect your information, including encryption and secure data storage.",
      10, 230
    );

    // Section: Your Rights
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("5. Your Rights", 10, 245);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "You have the right to access, correct, or request deletion of your personal information, subject to legal requirements.",
      10, 255
    );

    // Footer: Clinic Name & Website
    doc.setFontSize(10);
    doc.text("Rimberio Medical Clinic - www.rimberio.com", 105, 280, null, null, "center");

    // Generate and download the PDF
    doc.save("Rimberio_Privacy_Policy.pdf");
};
