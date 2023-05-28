import { Command } from 'commander';
import fs from 'fs'
import path from 'path'
import zlib from 'zlib';
import tar, { Parse } from 'tar'
import https from 'https'


if (process.env.VERCEL) {
    console.log('Vercel environment detected. Skipping geo setup.');
    process.exit(0);
}

const db = 'GeoLite2-City';
const url = `https://raw.githubusercontent.com/GitSquared/node-geolite2-redist/master/redist/${db}.tar.gz`;

const dest = path.resolve(process.cwd(), 'geo');
if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
}

const download = (url: string): Promise<Parse> =>
    new Promise((resolve) => {
        https.get(url, (res) => {
            const totalSize = parseInt(res.headers['content-length'] as string, 10);
            let downloadedSize = 0;
            let lastProgress = -1;

            res.pipe(zlib.createGunzip({})).pipe(
                tar.t().on('entry', (entry) => {
                    if (entry.path.endsWith('.mmdb')) {
                        const filename = path.join(dest, path.basename(entry.path));
                        const writeStream = fs.createWriteStream(filename);
                        entry.pipe(writeStream);

                        entry.on('data', (chunk) => {
                            downloadedSize += chunk.length;
                            const progress = Math.min(Math.floor((downloadedSize / totalSize) * 100), 100);
                            if (progress !== lastProgress) {
                                lastProgress = progress;
                                process.stdout.clearLine(0);
                                process.stdout.cursorTo(0);
                                process.stdout.write(`LogLib Downloading ${db}: ${progress}%`);
                            }
                        });

                        writeStream.on('finish', () => {
                            process.stdout.write('\n');
                        });
                    }
                })
            );

            resolve(res.pipe(zlib.createGunzip({})).pipe(tar.t()));
        });
    });

const program = new Command();
program
    .command('setup:maxmind')
    .description('Download and setup GeoLite2 database')
    .action(() => {
        download(url)
            .catch((error) => {
                console.error('Error setting up GeoLite2 database:', error);
            });
    });

program.parse(process.argv);
