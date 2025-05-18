import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
interface IncidentNotificationProps {
  userName?: string;
  acknowledgeLink?: string;
  viewIncidentLink?: string;
  unavailableLink?: string;
  heartbeatName?: string;
  incidentCause?: string;
  startedAt?: string;
  companyName?: string;
  logoUrl?: string; // e.g., "https://example.com/logo.png"
  supportUrl?: string;
  signInUrl?: string;
}

const defaultProps: IncidentNotificationProps = {
  userName: "milankatira",
  acknowledgeLink: "#",
  viewIncidentLink: "#",
  unavailableLink: "#",
  heartbeatName: "njnj",
  incidentCause: "Missed heartbeat",
  startedAt: "May 14, 2025 at 7:49pm IST",
  companyName: "Better Stack",
  logoUrl: "https://your-logo-url.com/better-stack-logo.png", // Replace with actual logo URL
  supportUrl: "#",
  signInUrl: "#",
};

export const IncidentNotification = ({
  userName = defaultProps.userName,
  acknowledgeLink = defaultProps.acknowledgeLink,
  viewIncidentLink = defaultProps.viewIncidentLink,
  unavailableLink = defaultProps.unavailableLink,
  heartbeatName = defaultProps.heartbeatName,
  incidentCause = defaultProps.incidentCause,
  startedAt = defaultProps.startedAt,
  companyName = defaultProps.companyName,
  logoUrl = defaultProps.logoUrl,
  supportUrl = defaultProps.supportUrl,
  signInUrl = defaultProps.signInUrl,
}: IncidentNotificationProps) => (
  <Html>
    <Head />
    <Preview>New Incident Started - {heartbeatName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerBar}></Section>
        <Section style={content}>
          <Row style={{ marginBottom: "16px" }}>
            <Column style={{ width: "16px", verticalAlign: "top" }}>
              <div style={statusDot}></div>
            </Column>
            <Column>
              <Heading style={h1}>New incident started</Heading>
            </Column>
          </Row>

          <Text style={text}>Hello {userName},</Text>
          <Text style={text}>Please acknowledge the incident.</Text>
          <Text style={text}>
            You can reply to this email to add a comment.
          </Text>
          <Text style={textSmall}>
            P.S. We can also call you next time, just upgrade your account.
          </Text>

          <Section style={buttonContainer}>
            <Button style={buttonPrimary} href={acknowledgeLink}>
              Acknowledge incident
            </Button>
            <Button style={buttonSecondary} href={viewIncidentLink}>
              View incident
            </Button>
            <Button style={buttonSecondary} href={unavailableLink}>
              I'm unavailable
            </Button>
          </Section>
        </Section>

        <Section style={detailsSection}>
          <Row style={detailRow}>
            <Column style={detailHeader}>Heartbeat:</Column>
            <Column style={detailValue}>{heartbeatName}</Column>
          </Row>
          <Row style={detailRow}>
            <Column style={detailHeader}>Cause:</Column>
            <Column style={detailValue}>{incidentCause}</Column>
          </Row>
          <Row style={detailRow}>
            <Column style={detailHeader}>Started at:</Column>
            <Column style={detailValue}>{startedAt}</Column>
          </Row>
        </Section>

        <Section style={footer}>
          <Img src={logoUrl} width="120" alt={companyName} style={footerLogo} />
          <Text style={footerLinks}>
            <Link href={supportUrl} style={link}>
              Help & Support
            </Link>
            {" • "}
            <Link href={signInUrl} style={link}>
              Sign in
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default IncidentNotification;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  border: "1px solid #eaeaea",
  borderRadius: "4px",
};

const headerBar = {
  backgroundColor: "#e00", // Red bar at the top
  height: "4px",
  width: "100%",
};

const content = {
  padding: "32px",
  paddingBottom: "24px",
};

const statusDot = {
  width: "10px",
  height: "10px",
  backgroundColor: "#e00", // Red dot
  borderRadius: "50%",
  display: "inline-block",
  marginRight: "8px",
  marginTop: "7px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "bold",
  lineHeight: "28px",
  margin: "0",
};

const text = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "22px",
  marginBottom: "12px",
};

const textSmall = {
  color: "#555",
  fontSize: "12px",
  lineHeight: "18px",
  marginBottom: "24px",
};

const buttonContainer = {
  textAlign: "left" as const,
  marginTop: "24px",
  marginBottom: "24px",
  display: "flex",
  gap: "10px",
};

const buttonShared = {
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600",
  padding: "10px 20px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  marginRight: "10px",
  border: "1px solid transparent",
};

const buttonPrimary = {
  ...buttonShared,
  backgroundColor: "#4A4AFF", // Blue button
  color: "#ffffff",
};

const buttonSecondary = {
  ...buttonShared,
  backgroundColor: "#ffffff",
  color: "#555",
  border: "1px solid #ccc",
};

const detailsSection = {
  backgroundColor: "#f7f7f7",
  padding: "24px 32px",
  borderTop: "1px solid #eaeaea",
};

const detailRow = {
  marginBottom: "8px",
};

const detailHeader = {
  color: "#333",
  fontSize: "14px",
  fontWeight: "bold",
  width: "100px",
};

const detailValue = {
  color: "#555",
  fontSize: "14px",
};

const footer = {
  padding: "24px 32px",
  borderTop: "1px solid #eaeaea",
  textAlign: "left" as const,
};

const footerLogo = {
  marginBottom: "16px",
};

const footerLinks = {
  color: "#007bff",
  fontSize: "12px",
  lineHeight: "18px",
};

const link = {
  color: "#007bff",
  textDecoration: "none",
};
