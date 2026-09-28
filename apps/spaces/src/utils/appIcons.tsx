import { GmailIcon, FacebookIcon, SMSIcon, WhatsAppIcon, OutlookIcon, DatingAppIcon, InstagramIcon, EmailIcon, MessagingIcon } from "@horizontal-org/shira-ui";

export const appIcons: Record<string, JSX.Element> = {
  'gmail': <GmailIcon />,
  'messenger': <FacebookIcon />,
  'sms': <SMSIcon />,
  'whatsapp': <WhatsAppIcon />,
  'outlook': <OutlookIcon />,
  'dating app': <DatingAppIcon />,
  'instagram': <InstagramIcon />,
};

export const appTypesIcons: Record<string, JSX.Element> = {
  'email': <EmailIcon />,
  'messaging': <MessagingIcon />,
};
