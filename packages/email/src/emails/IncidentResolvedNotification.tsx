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

interface IncidentResolvedNotificationProps {
  userName?: string;
  viewIncidentLink?: string;
  heartbeatName?: string;
  incidentCause?: string;
  startedAt?: string;
  resolvedAt?: string;
  companyName?: string;
  logoUrl?: string; // e.g., "https://example.com/logo.png"
  supportUrl?: string;
  signInUrl?: string;
}

const defaultProps: IncidentResolvedNotificationProps = {
  userName: "User",
  viewIncidentLink: "#",
  heartbeatName: "Your Service",
  incidentCause: "Service Outage",
  startedAt: "N/A",
  resolvedAt: "N/A",
  companyName: "Your Company",
  logoUrl: "https://your-logo-url.com/default-logo.png", // Replace with actual logo URL
  supportUrl: "#",
  signInUrl: "#",
};

export const IncidentResolvedNotification = ({
  userName = defaultProps.userName,
  viewIncidentLink = defaultProps.viewIncidentLink,
  heartbeatName = defaultProps.heartbeatName,
  incidentCause = defaultProps.incidentCause,
  startedAt = defaultProps.startedAt,
  resolvedAt = defaultProps.resolvedAt,
  companyName = defaultProps.companyName,
  logoUrl = defaultProps.logoUrl,
  supportUrl = defaultProps.supportUrl,
  signInUrl = defaultProps.signInUrl,
}: IncidentResolvedNotificationProps) => (
  <Html>
    <Head />
    <Preview>Incident Resolved - {heartbeatName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerBarResolved}></Section> {/* Green bar */}
        <Section style={content}>
          <Row style={{ marginBottom: "16px" }}>
            <Column style={{ width: "16px", verticalAlign: "top" }}>
              <div style={statusDotResolved}></div> {/* Green dot */}
            </Column>
            <Column>
              <Heading style={h1}>Incident Resolved</Heading>
            </Column>
          </Row>

          <Text style={text}>Hello {userName},</Text>
          <Text style={text}>
            The incident affecting {heartbeatName} has been resolved.
          </Text>

          <Section style={buttonContainer}>
            <Button style={buttonPrimary} href={viewIncidentLink}>
              View Incident Details
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
          <Row style={detailRow}>
            <Column style={detailHeader}>Resolved at:</Column>
            <Column style={detailValue}>{resolvedAt}</Column>
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

export default IncidentResolvedNotification;

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

const headerBarResolved = {
  backgroundColor: "#28a745", // Green bar at the top
  height: "4px",
  width: "100%",
};

const content = {
  padding: "32px",
  paddingBottom: "24px",
};

const statusDotResolved = {
  width: "10px",
  height: "10px",
  backgroundColor: "#28a745", // Green dot
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

const buttonContainer = {
  textAlign: "left" as const,
  marginTop: "24px",
  marginBottom: "24px",
};

const buttonPrimary = {
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600",
  padding: "10px 20px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  marginRight: "10px",
  border: "1px solid transparent",
  backgroundColor: "#4A4AFF", // Blue button
  color: "#ffffff",
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
