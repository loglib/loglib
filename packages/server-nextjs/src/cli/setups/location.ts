import prompts from "prompts";
import tar, { Parse } from "tar";
import https from "https";
import fs from "fs";
import path from "path";
import zlib from "zlib";
import ora from "ora";

export const locationSetup = async () => {
  const locationResolver = await prompts({
    type: "select",
    name: "location",
    message: "Are you deploying your project on vercel?",
    choices: [
      {
        value: "yes",
        title: "Yes",
        selected: true,
      },
      {
        value: "no",
        title: "No",
      },
    ],
  });
  if (locationResolver.location === "no") {
    const locationResolver = await prompts({
      type: "select",
      name: "value",
      message: "Choose location resolver?",
      choices: [
        {
          value: "maxmind",
          title: "Download Maxmind GeoLite2 database",
          selected: true,
          description:
            "If you use GeoLite2 database, you can't deploy your project on vercel or similar serverless platforms",
        },
        {
          value: "disable",
          title: "Disable Location Resolver",
          description:
            "If disabled you won't be able to see your visitor's location",
        },
        {
          value: "custom",
          title: "Custom Location Resolver",
          description: "If you want to use your own location resolver",
        },
      ],
    }).then((res) => res.value as "maxmind" | "disable" | "custom");
    if (locationResolver === "maxmind") {
      await download();
    }
    return locationResolver;
  }
  return "vercel";
};

export const download = (dest = "./geo"): Promise<Parse> => {
  if (process.env.VERCEL) {
    console.log("Vercel environment detected. Skipping geo setup.");
    process.exit(0);
  }

  const db = "GeoLite2-City";
  const url = `https://raw.githubusercontent.com/GitSquared/node-geolite2-redist/master/redist/${db}.tar.gz`;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  return new Promise((resolve) => {
    https.get(url, (res) => {
      const totalSize = parseInt(res.headers["content-length"] as string, 10);
      let downloadedSize = 0;
      let lastProgress = -1;
      const installerSpinner = ora(
        "Installing Maxmind GeoLite2 Database.."
      ).start();
      res.pipe(zlib.createGunzip({})).pipe(
        tar.t().on("entry", (entry) => {
          if (entry.path.endsWith(".mmdb")) {
            const filename = path.join(dest, path.basename(entry.path));
            const writeStream = fs.createWriteStream(filename);
            entry.pipe(writeStream);
            entry.on("data", (chunk) => {
              downloadedSize += chunk.length;
              const progress = Math.min(
                Math.floor((downloadedSize / totalSize) * 100),
                100
              );
              if (progress !== lastProgress) {
                lastProgress = progress;
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                installerSpinner.text = `Installing Maxmind GeoLite2 Database.. ${progress}%`;
                // process.stdout.write(`LogLib Downloading ${db}: ${progress}%`);
              }
            });

            writeStream.on("finish", () => {
              process.stdout.write("\n");
              installerSpinner.succeed(
                "Maxmind GeoLite2 Database installed successfully"
              );
            });
          }
        })
      );
      resolve(res.pipe(zlib.createGunzip({})).pipe(tar.t()));
    });
  });
};
