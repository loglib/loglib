import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { getUrl } from "./lib/utils";
import axios from "axios";

const loginUser = async (data: { username: string; password: string }) => {
  try {
    return await axios
      .post(getUrl(), { ...data, path: "/auth" })
      .then((res) => res.data as { data: { token: string }; code: number });
  } catch {
    throw new Error("Error logging in");
  }
};

export function Login({
  setAuth,
  setToken,
}: { setAuth: (state: boolean) => void; setToken: (token: string) => void }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div className=" tw-flex tw-flex-col tw-items-center tw-justify-center">
      <p className=" tw-font-medium tw-mt-24 tw-mb-4 tw-italic">
        "Here is a login page!"
        <span className=" tw-text-xs tw-font-light"> __steve jobs</span>
      </p>
      <Card className=" md:tw-w-1/3 tw-w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription className="">with your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form className=" tw-space-y-2">
            <div className="tw-grid tw-w-full tw-items-center tw-gap-4">
              <div className="tw-flex tw-flex-col tw-space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  placeholder="Your username"
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  value={username}
                />
              </div>
            </div>
            <div className="tw-grid tw-w-full tw-items-center tw-gap-4">
              <div className="tw-flex tw-flex-col tw-space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="name"
                  placeholder="Your password"
                  type="password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  value={password}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="tw-flex tw-justify-between">
          <Button
            onClick={() => {
              loginUser({ username, password })
                .then((data) => {
                  console.log(data.code);
                  if (data.code !== 200) return;
                  if (data.data.token) {
                    console.log(data.data.token);
                    localStorage.setItem("ll-token", data.data.token);
                    setAuth(true);
                    setToken(data.data.token);
                  }
                })
                .catch((e) => console.log(e));
            }}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
