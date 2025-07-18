import { Box, Stack, Text } from "@chakra-ui/layout"
import { DiGithubBadge } from "react-icons/di"
import { IoLogoLinkedin, IoLogoTwitter } from "react-icons/io"
import { MdEmail } from "react-icons/md"
import siteConfig from "site.config"
import { FooterLink, type FooterLinkProps } from "./footer-link"

const links: FooterLinkProps[] = [
  {
    icon: DiGithubBadge,
    label: "Go to Segun's GitHub",
    href: siteConfig.author.github,
    fontSize: "2xl",
  },
  {
    icon: IoLogoTwitter,
    label: "Go to Segun's Twitter",
    href: siteConfig.author.twitter,
  },
  {
    icon: IoLogoLinkedin,
    label: "Go to Segun's LinkedIn",
    href: siteConfig.author.linkedin,
  },
  {
    icon: MdEmail,
    label: "Send email to Segun",
    href: `mailto:${siteConfig.author.email}`,
  },
]

export const Footer = () => (
  <Box as="footer">
    <Stack
      layerStyle="contain"
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      spacing="4"
      my="20"
    >
      <Text dangerouslySetInnerHTML={{ __html: siteConfig.copyright }} />
      <Text>
        A project by{" "}
        <a
          href="https://chakra-ui.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chakra Systems
        </a>
      </Text>
      <Stack mt={4} direction="row" spacing="12px" justify="center">
        {links.map((link) => (
          <FooterLink key={link.href} {...link} />
        ))}
      </Stack>
    </Stack>
  </Box>
)
