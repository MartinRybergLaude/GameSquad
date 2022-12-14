import {
  Button,
  Card,
  Container,
  createStyles,
  Overlay,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandAppleArcade, IconFriends, IconLicense } from "@tabler/icons";

const useStyles = createStyles(theme => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backdropFilter: "hue-rotate(260deg)",
    height: "100vh",
  },

  container: {
    height: 600,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  headTitle: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 1000,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  subTitle: {
    color: theme.white,
    fontSize: 50,
    fontWeight: 700,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 30,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 24,
      lineHeight: 1.3,
    },
  },

  featuresTitle: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 2.5,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: "''",
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

const mockdata = [
  {
    title: "Create and invite people to your squads",
    description:
      "GameSquad allows you to create however many squads you want and invite your friends so that, together, you can decide upon what to play",
    icon: IconFriends,
  },
  {
    title: "Vote and come to an agreement",
    description:
      "You and your squad mates can throw your vote on the games you want to play and they will be clearly displayed, making it easier to come to an agreement everybody will like",
    icon: IconLicense,
  },
  {
    title: "Over 200 000+ games",
    description:
      "With over 200 000 games available in GameSquad, you don't have to worry about not finding the particular games you're interested in",
    icon: IconBrandAppleArcade,
  },
];

interface HomepageViewProps {
  onSubmit: () => void;
  onLoginClick: () => void;
}

export default function HomepageView({ onSubmit, onLoginClick }: HomepageViewProps) {
  const { classes, theme } = useStyles();

  const features = mockdata.map(feature => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  const form = useForm({});

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 20%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.headTitle}>GameSquad</Title>
        <Title className={classes.subTitle}>A place for making choices that stick</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Pick games that you want to play with your mates ??? GameSquad allows all this and more!
        </Text>
        <form
          onSubmit={form.onSubmit(() => {
            onSubmit();
          })}
        >
          <Button type="submit" variant="filled" size="xl" className={classes.control}>
            Get started
          </Button>
          <Button
            variant="outline"
            color="red"
            size="xl"
            ml={20}
            className={classes.control}
            onClick={() => onLoginClick()}
          >
            Log in
          </Button>
        </form>
      </Container>
      <Container size="lg" py="xs" mt={-70}>
        <SimpleGrid cols={3} spacing="xl" mt={0} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
    </div>
  );
}
