import { GmailIcon, FacebookIcon, SMSIcon, WhatsappIcon, OutlookIcon, DatingAppIcon, EmailIcon, MessagingIcon } from "@shira/ui";

export const appIcons: Record<string, JSX.Element> = {
  'gmail': <GmailIcon />,
  'messenger': <FacebookIcon />,
  'sms': <SMSIcon />,
  'whatsapp': <WhatsappIcon />,
  'outlook': <OutlookIcon />,
  'dating app': <DatingAppIcon />,
};

export const appTypesIcons: Record<string, JSX.Element> = {
  'email': <EmailIcon />,
  'messaging': <MessagingIcon />,
};
