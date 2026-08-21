import { Box, Button, Grid, Link, Modal, Typography } from "@mui/material";
import closeIcon from "../image/close-icon.svg";
import "./terms-and-conditions.css";

const styleTerms = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "654px",
  height: "714px",
  overflowY: "scroll",
  bgcolor: "#FAFAFA",
  border: "0px",
  boxShadow: 24,
  padding: "40px",
  borderRadius: "8px",
};

const bodySx = { margin: "16px 20px" };
const headingSx = { margin: "28px 20px 8px 20px", fontWeight: 700 };
const subheadingSx = { margin: "20px 20px 8px 20px", fontWeight: 600 };
const listSx = { margin: "0 20px 16px 40px", padding: 0 };
const listItemSx = { marginBottom: "8px" };

export const TermsConditionsModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="TermsModal"
      sx={{
        background:
          "linear-gradient(90deg, rgba(15, 127, 144, 0.8) -8.75%, rgba(0, 176, 138, 0.8) 113.12%);",
      }}
    >
      <Box sx={styleTerms}>
        <Grid container sx={{ flexWrap: "nowrap", justifyContent: "center" }}>
          <Grid item xs={2}></Grid>
          <Grid item>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "34px",
                lineHeight: "42px",
                letterSpacing: "0.25px",
                position: "relative",
                margin: "40px auto 6px auto",
                textAlign: "center",
              }}
            >
              Terms & Conditions
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item>
            <Button onClick={onClose} sx={{ margin: "40px auto 16px auto" }}>
              <img src={closeIcon} alt="close icon" />
            </Button>
          </Grid>
        </Grid>

        <Typography variant="body4" sx={{ ...headingSx, textAlign: "center" }}>
          Terms and Conditions for Data Submission
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Last Updated: 8/20/2026
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          These Terms and Conditions for Data Submission (“Terms”) govern the
          submission of data, files, metadata, documentation, software,
          images, results, and other materials (collectively, “Submitted
          Data”) to the IHDH (“Portal”), which is operated by the Ma’ayan Lab
          at the Icahn School of Medicine at Mount Sinai (“Portal Operator”)
          in connection with research supported by the Steven & Alexandra
          Cohen Foundation (“Foundation”).
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          By submitting data to the Portal, the individual submitting the
          data (“Submitter”) and, where applicable, the institution or
          organization on whose behalf the Submitter is acting (“Submitting
          Institution”) acknowledge and agree to these Terms.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          1. Authority to Submit Data
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Submitter represents and warrants that:
        </Typography>
        <Box component="ol" sx={listSx}>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitter is authorized to submit the Submitted Data to the
            Portal;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitter and/or the Submitting Institution has all rights,
            permissions, approvals, licenses, consents, and authorizations
            necessary to submit, store, process, share, and ultimately make
            the Submitted Data publicly available as described in these
            Terms;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            submission and subsequent public release of the Submitted Data
            will not violate any applicable law, regulation, contractual
            obligation, institutional policy, informed consent, intellectual
            property right, privacy right, confidentiality obligation, or
            other restriction; and
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            where institutional, regulatory, ethics, or other oversight
            approval is required, including approval from an Institutional
            Review Board (“IRB”) or equivalent body, all such approvals have
            been obtained and permit the contemplated submission and sharing
            of the data.
          </Typography>
        </Box>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator is entitled to rely on these representations
          and is not responsible for independently determining whether the
          Submitter has obtained the rights or approvals necessary to submit
          or publicly share the Submitted Data.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          2. Accuracy and Responsibility for Submitted Data
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Submitter and Submitting Institution are solely responsible for
          the content, quality, completeness, accuracy, validity, integrity,
          legality, and appropriateness of all Submitted Data.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator and the Foundation do not independently verify
          the scientific accuracy, completeness, legal status, regulatory
          compliance, provenance, or suitability of Submitted Data.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Submitter is responsible for correcting any errors or omissions
          identified in the Submitted Data and for promptly notifying the
          Portal Operator if the Submitter becomes aware of any legal,
          ethical, privacy, confidentiality, consent, intellectual property,
          or other issue affecting data that has been submitted.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          3. Prohibition on Protected Health Information and Identifiable
          Information
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Submitted Data must not contain Protected Health Information
          (“PHI”) or other information that identifies, or could reasonably
          be used to identify, an individual, unless the Portal Operator has
          expressly authorized the submission in advance under a separate
          written agreement.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Without prior written authorization, Submitters must not upload
          PHI, direct identifiers, or other information whose disclosure
          through the Portal would violate applicable privacy laws, informed
          consent requirements, institutional policies, confidentiality
          obligations, or other restrictions.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Submitter is solely responsible for ensuring that data have
          been appropriately de-identified before submission and that the
          method of de-identification is appropriate for the data,
          applicable law, research consent, and institutional requirements.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator does not undertake or assume responsibility for
          reviewing Submitted Data for PHI or other identifying information
          before or after submission.
        </Typography>
        <Typography variant="body4" sx={subheadingSx}>
          Data Containing PHI or Requiring Controlled Access
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          If a dataset contains PHI, identifiable human-subject information,
          sensitive information requiring controlled access, or information
          that cannot legally or ethically be made publicly available, do not
          upload the dataset to the Portal through the standard submission
          process.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Instead, contact the IHDH team before submission so that the
          parties can determine whether an appropriate Data Use Agreement
          (“DUA”), Data Transfer Agreement, Business Associate Agreement,
          controlled-access arrangement, or other agreement and technical
          safeguards can be established.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Submission of PHI without prior written authorization does not
          create a DUA, Business Associate Agreement, confidential
          relationship, or other obligation on the part of the Portal
          Operator or Foundation to receive or maintain PHI.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          If the Portal Operator becomes aware that Submitted Data may
          contain PHI, identifiable information, or other improperly
          submitted restricted information, the Portal Operator may, at its
          discretion and without prior notice, restrict access to,
          quarantine, remove, or delete the affected data and may notify the
          Submitter, Submitting Institution, Foundation, or other appropriate
          parties.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          4. Embargo Period and Public Release
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Submitted Data may initially be subject to an embargo period
          established or approved by the Foundation.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The length, start date, end date, and other conditions of the
          embargo may be established by the Foundation based on the
          applicable award, program, project, dataset, or other Foundation
          policy.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Upon expiration of the applicable embargo period, the Submitted
          Data may be made publicly accessible through the Portal without
          further approval, notice, or action by the Submitter.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          By submitting data to the Portal, the Submitter and Submitting
          Institution expressly authorize the Portal Operator and Foundation
          to make the Submitted Data publicly available upon expiration of
          the applicable embargo period.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Submitter is responsible for ensuring, before submission, that
          public release following the embargo period is permitted under all
          applicable laws, agreements, informed consents, IRB or ethics
          approvals, institutional policies, intellectual property rights,
          publication arrangements, and other restrictions.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator and Foundation are not responsible for delaying
          public release because of publication plans, patent applications,
          intellectual property considerations, consent restrictions,
          confidentiality obligations, or other circumstances unless an
          authorized representative of the Portal Operator or Foundation has
          agreed to such a delay in writing.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Foundation may modify the applicable embargo period or release
          requirements in accordance with its policies or the terms of the
          relevant grant or award.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          5. Rights Granted for Hosting and Distribution
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Except as otherwise provided in a separate written agreement,
          ownership of Submitted Data remains with the Submitter, Submitting
          Institution, or other applicable rights holder.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          By submitting data, the Submitter and Submitting Institution grant
          the Portal Operator and Foundation a non-exclusive, worldwide,
          royalty-free right and license to host, store, copy, reproduce,
          process, validate, index, organize, format, convert, transmit,
          display, distribute, archive, preserve, and make the Submitted Data
          available through the Portal for research, scientific,
          educational, administrative, archival, and related purposes.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          This license includes the right to create or modify metadata, file
          formats, indexes, summaries, previews, database records, or other
          technical representations reasonably necessary to operate,
          maintain, preserve, search, and provide access to the Submitted
          Data.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Public use of Submitted Data after release may also be subject to
          any license or data-use terms displayed with the applicable
          dataset.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          6. Confidential or Proprietary Information
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Submitter must not submit confidential, proprietary,
          trade-secret, export-controlled, classified, third-party
          restricted, or otherwise legally restricted information unless the
          Portal Operator has expressly agreed in writing to receive such
          information.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Submission of information to the Portal does not create an
          obligation of confidentiality unless such an obligation is
          expressly established in a separate written agreement executed by
          an authorized representative of the Portal Operator.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          7. Compliance With Laws, Regulations, and Research Requirements
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Submitter and Submitting Institution are solely responsible for
          compliance with all laws, regulations, policies, contractual
          obligations, ethical requirements, research-participant consent
          requirements, and institutional requirements applicable to the
          Submitted Data.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          This responsibility includes, as applicable, requirements
          concerning privacy, confidentiality, human-subject research, data
          protection, intellectual property, export controls, security, and
          data sharing.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Acceptance of Submitted Data by the Portal does not constitute a
          determination or representation by the Portal Operator or
          Foundation that the submission or subsequent sharing of the data
          complies with any particular legal, regulatory, ethical,
          contractual, or institutional requirement.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          8. No Duty to Review or Monitor
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator and Foundation have no obligation to inspect,
          review, screen, validate, monitor, or approve Submitted Data for
          accuracy, scientific validity, legality, privacy compliance, PHI,
          intellectual property rights, informed consent restrictions, or any
          other purpose.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Any review, automated validation, quality-control process, or other
          examination performed by the Portal Operator does not transfer
          responsibility for the Submitted Data from the Submitter or
          Submitting Institution to the Portal Operator or Foundation.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          9. Right to Reject, Remove, Modify Access to, or Preserve Data
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator and Foundation reserve the right, but do not
          assume the obligation, to reject a submission or to suspend,
          restrict, remove, quarantine, archive, or otherwise modify access
          to Submitted Data at any time when they reasonably determine that
          doing so is appropriate for legal, security, privacy, ethical,
          scientific, technical, operational, or Foundation-policy reasons.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator may also make reasonable technical changes to
          Submitted Data or associated metadata as necessary to facilitate
          storage, compatibility, indexing, preservation, display,
          distribution, or operation of the Portal, provided such changes are
          not intended to alter the scientific meaning of the Submitted Data.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          10. Data and Portal Provided “As Is”
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal, its services, and all Submitted Data hosted or
          distributed through the Portal are provided “AS IS” and “AS
          AVAILABLE.”
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          To the fullest extent permitted by applicable law, the Portal
          Operator, Foundation, and their respective trustees, directors,
          officers, employees, investigators, contractors, agents,
          affiliates, and representatives disclaim all warranties, express or
          implied, including warranties of accuracy, completeness,
          reliability, availability, merchantability, fitness for a
          particular purpose, title, non-infringement, and suitability for
          any research, clinical, commercial, regulatory, or other use.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator and Foundation do not warrant that the Portal
          will operate uninterrupted or error-free, that Submitted Data will
          be preserved indefinitely, or that data made available through the
          Portal are scientifically accurate or suitable for any particular
          purpose.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          11. Limitation of Liability
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          To the fullest extent permitted by applicable law, the Portal
          Operator, Foundation, and their respective trustees, directors,
          officers, employees, investigators, contractors, agents,
          affiliates, and representatives shall not be liable for any
          direct, indirect, incidental, special, consequential, exemplary,
          punitive, or other damages arising out of or relating to:
        </Typography>
        <Box component="ul" sx={listSx}>
          <Typography component="li" variant="body4" sx={listItemSx}>
            submission of data to the Portal;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            errors, omissions, inaccuracies, or defects in Submitted Data;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            unauthorized or improper submission of data;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            public release of Submitted Data following an applicable embargo
            period;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            use, misuse, interpretation, or reliance upon Submitted Data by
            any person;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            loss, corruption, alteration, disclosure, or unavailability of
            Submitted Data;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            a Submitter’s failure to comply with applicable law, consent,
            policy, contract, or these Terms; or
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            operation, interruption, modification, suspension, or
            discontinuation of the Portal.
          </Typography>
        </Box>
        <Typography variant="body4" sx={bodySx}>
          This limitation applies regardless of the legal theory asserted
          and, to the extent permitted by law, even if a party has been
          advised of the possibility of such damages.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          12. Indemnification
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          To the extent permitted by applicable law and the policies
          applicable to the Submitting Institution, the Submitter and/or
          Submitting Institution agree to defend, indemnify, and hold
          harmless the Portal Operator, Foundation, and their respective
          trustees, directors, officers, employees, investigators,
          contractors, agents, affiliates, and representatives from and
          against claims, liabilities, damages, losses, penalties,
          judgments, costs, and expenses, including reasonable attorneys’
          fees, arising from or relating to:
        </Typography>
        <Box component="ol" sx={listSx}>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitted Data;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitter’s submission or authorization of public release of
            the Submitted Data;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            an allegation that the Submitted Data violate privacy,
            confidentiality, intellectual property, contractual, consent, or
            other rights;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            inclusion of PHI or other restricted information in Submitted
            Data contrary to these Terms;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            breach of these Terms or any representation or warranty made by
            the Submitter; or
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            violation of applicable law, regulation, institutional policy,
            informed consent, or contractual obligation by the Submitter or
            Submitting Institution.
          </Typography>
        </Box>

        <Typography variant="body4" sx={headingSx}>
          13. Security and Data Preservation
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator may use reasonable administrative, technical,
          and organizational measures in operating the Portal but does not
          guarantee that Submitted Data will be immune from loss, corruption,
          unauthorized access, security incidents, or other events.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Submitters are responsible for maintaining independent copies and
          appropriate backups of all Submitted Data. The Portal must not be
          relied upon as the sole archival or backup copy of research data.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          14. Withdrawal or Correction Requests
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          A Submitter may request correction, replacement, or withdrawal of
          Submitted Data by contacting the IHDH team.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          A request does not guarantee that data will be withdrawn from
          public access or completely deleted. Among other things, the
          Portal Operator or Foundation may retain copies when necessary for
          archival integrity, recordkeeping, legal compliance,
          reproducibility, security, or other legitimate purposes.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Once Submitted Data has been made publicly available, the Portal
          Operator and Foundation cannot control or require deletion of
          copies that have already been downloaded, copied, redistributed,
          cited, analyzed, or otherwise used by third parties.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          15. No Endorsement
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Hosting, accepting, displaying, distributing, or making Submitted
          Data available through the Portal does not constitute endorsement,
          certification, validation, or approval of the Submitted Data, the
          research from which they originated, the Submitter, the Submitting
          Institution, or any conclusions derived from the Submitted Data by
          the Portal Operator or Foundation.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          16. Changes to These Terms
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The Portal Operator may update these Terms from time to time to
          address changes in the Portal, Foundation policies, legal
          requirements, security practices, or data-sharing practices.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          The version of these Terms accepted at the time of submission will
          apply to that submission unless otherwise required by law, the
          applicable Foundation award, or a subsequent written agreement.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          17. Conflicts With Other Agreements
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          If a separate written agreement executed by authorized
          representatives of the applicable parties, including a DUA or
          other data-transfer agreement, expressly conflicts with these
          Terms regarding a particular dataset, the terms of that separate
          written agreement will control with respect to the conflict.
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          Requirements imposed by the applicable Foundation grant or award
          also remain applicable.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          18. Severability
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          If any provision of these Terms is determined to be invalid or
          unenforceable, the remaining provisions will remain in effect to
          the fullest extent permitted by law.
        </Typography>

        <Typography variant="body4" sx={headingSx}>
          19. Acknowledgment and Acceptance
        </Typography>
        <Typography variant="body4" sx={bodySx}>
          By selecting “I Agree,” “Submit Data,” or a similar acknowledgment
          and submitting data to the Portal, the Submitter confirms that:
        </Typography>
        <Box component="ul" sx={listSx}>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitter has read and agrees to these Terms;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitter is authorized to submit the Submitted Data;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitted Data do not contain PHI or other prohibited
            identifiable information unless expressly authorized under a
            separate written agreement;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            all necessary permissions, consents, approvals, and rights for
            submission and eventual public release have been obtained;
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitter understands that the Submitted Data may become
            publicly available after the Foundation-established embargo
            period; and
          </Typography>
          <Typography component="li" variant="body4" sx={listItemSx}>
            the Submitter accepts responsibility for the legality, accuracy,
            appropriateness, and compliance of the Submitted Data.
          </Typography>
        </Box>
        <Typography variant="body4" sx={bodySx}>
          If you are uncertain whether your dataset contains PHI,
          identifiable human-subject information, sensitive data, or
          information that may require controlled access, do not submit the
          dataset through the standard Portal submission process. Contact
          the IHDH before uploading the data.
        </Typography>
      </Box>
    </Modal>
  );
};
