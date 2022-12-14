import { createStyles, Navbar, UnstyledButton } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconLogout, IconQuestionMark, IconSettings } from "@tabler/icons";

import HelpModalPresenter from "../helpModal/helpModalPresenter";
import LogoutModalPresenter from "../logoutModal/logoutModalPresenter";
import SettingsModalPresenter from "../settingsModal/settingsModalPresenter";
import SquadSelectPresenter from "../squadSelect/squadSelectPresenter";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    formCenter: {
      height: "100vh",
      [`@media (max-width: ${theme.breakpoints.md}px)`]: {
        height: "auto",
      },
    },

    alignLeft: {
      textAlign: "left",
    },

    control: {
      fontWeight: 500,
      display: "block",
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      fontSize: theme.fontSizes.sm,

      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },

    chevron: {
      transition: "transform 200ms ease",
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      width: "100%",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        },
      },
    },
    scrollY: {
      overflowY: "auto",
    },
  };
});

interface SidebarViewProps {
  sidebarOpen: boolean;
}

export default function SidebarView({ sidebarOpen }: SidebarViewProps) {
  const { classes } = useStyles();

  return (
    <Navbar width={{ sm: 200 }} p="xl" hidden={!sidebarOpen} hiddenBreakpoint="sm">
      <Navbar.Section grow className={classes.scrollY}>
        <SquadSelectPresenter />
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UnstyledButton
          className={classes.link}
          onClick={() => {
            openModal({
              title: "Settings",
              children: <SettingsModalPresenter />,
            });
          }}
        >
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </UnstyledButton>
        <UnstyledButton
          className={classes.link}
          onClick={() => {
            openModal({
              size: "lg",
              children: <HelpModalPresenter />,
            });
          }}
        >
          <IconQuestionMark className={classes.linkIcon} stroke={1.5} />
          <span>Help</span>
        </UnstyledButton>
        <UnstyledButton
          className={classes.link}
          onClick={() => {
            openModal({
              title: "Logout",
              children: <LogoutModalPresenter />,
            });
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Log out</span>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}
