import {
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Grid,
  Card,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "@tanstack/react-router";
import { AuthError } from "firebase/auth";
import { LoginFormValues } from "./loginPresenter";

const useStyles = createStyles((theme) => ({
  form: {
    minHeight: "100vh",
    width: "100%",
  },

  formWrapper: {
    marginTop: -120,
    maxWidth: 500,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: 16,
      marginTop: 80,
    },
  },

  formCenter: {
    height: "100vh",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: "auto",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  coverImgWrapper: {
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
  coverImg: {
    height: "100vh",
    backgroundImage: "url(src/assets/login.jpg)",
    backgroundSize: "cover",
  },
}));

interface LoginViewProps {
  onSubmit: (values: LoginFormValues) => void;
  loading: boolean | undefined;
  error: AuthError | undefined;
}

export default function LoginView({
  onSubmit,
  loading,
  error,
}: LoginViewProps) {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Grid grow>
      <Grid.Col span={1}>
        <div className={classes.form}>
          <Center className={classes.formCenter}>
            <Card shadow="sm" withBorder className={classes.formWrapper} p={32}>
              <form
                onSubmit={form.onSubmit((values) => {
                  onSubmit(values);
                })}
              >
                <Title
                  order={2}
                  className={classes.title}
                  align="center"
                  mt="md"
                  mb={50}
                >
                  Welcome back to GameSquad!
                </Title>

                <TextInput
                  label="Email address"
                  placeholder="hello@gmail.com"
                  size="md"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  mt="md"
                  size="md"
                  {...form.getInputProps("password")}
                />
                <Checkbox label="Keep me logged in" mt="xl" size="md" />
                <Button
                  type="submit"
                  fullWidth
                  mt="xl"
                  size="md"
                  loading={loading}
                >
                  Login
                </Button>

                <Text align="center" mt="md">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">
                    <Anchor weight={700}>Register</Anchor>
                  </Link>
                </Text>
              </form>
            </Card>
          </Center>
        </div>
      </Grid.Col>
      <Grid.Col span={1} className={classes.coverImgWrapper}>
        <div className={classes.coverImg} />
      </Grid.Col>
    </Grid>
  );
}
