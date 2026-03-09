# TCM-Health Privacy & Data Consent Strategy

## 1. Informed Consent Framework
To comply with GDPR (General Data Protection Regulation) and PDPA (Personal Data Protection Act, Singapore), consent must be explicit, granular, and easily withdrawable.

*   **Granular Opt-Ins:** During onboarding, users are presented with separate checkboxes (no pre-ticked boxes):
    *   *Required:* "I consent to the processing of my CCMQ answers and tongue images to provide me with my TCM constitution and daily plan."
    *   *Optional:* "I consent to my anonymized tongue images and assessment data being used to train and improve the TCM-Health AI models."
*   **Just-in-Time Consent:** Before the camera opens for the tongue image, a brief modal explains exactly what the image is used for, how long it is stored (e.g., "Processed in memory and deleted immediately unless you opted into AI training"), and a link to the privacy policy.
*   **Plain Language:** Avoid legal jargon. Clearly state *what* is collected, *why* it is collected, and *who* it is shared with.

## 2. Anonymization & Pseudonymization for AI Training
If a user opts into AI training, their data must be decoupled from their identity.

*   **Pseudonymization:** User profiles are assigned a random UUID. The AI training database only receives this UUID, never the user's name, email, or exact date of birth (only age range or birth year is retained).
*   **Image Sanitization:** 
    *   **EXIF Stripping:** All metadata (GPS location, device info, timestamp) is stripped from the image file upon upload.
    *   **Cropping/Masking:** An edge-detection algorithm crops the image strictly to the bounding box of the tongue, removing the user's face, lips, and background to prevent facial recognition.
*   **Data Aggregation:** CCMQ responses used for Latent Class Analysis (LCA) are aggregated into datasets where individual records cannot be singled out.

## 3. User Rights Management (GDPR & PDPA)
The app will include a dedicated "Privacy & Data" dashboard in the user settings.

*   **Right to Access:** A "Download My Data" button generates a machine-readable JSON/CSV file containing all their CCMQ histories, tongue diagnoses, and profile data within 14 days.
*   **Right to Rectification:** Users can freely edit their demographic data and retake assessments to overwrite outdated health profiles.
*   **Right to Erasure (Right to be Forgotten):** A "Delete Account & Data" button permanently deletes the user's record from the PostgreSQL database. Any images stored in Cloud Storage linked to their UUID are purged via a background worker within 72 hours.
*   **Withdrawal of Consent:** Users can toggle off the "Use my data for AI training" option at any time. Future data will not be used, and their historical data will be flagged for removal from the next training dataset build.
