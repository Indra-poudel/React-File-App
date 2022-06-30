import fs from "fs";
import os from "os";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "../client/components/Home";

export default () => {
  const props = {
    files: [],
    homeDirectory: "",
  };

  const homeDirectory = os.homedir() + "/Desktop";

  fs.readdirSync(homeDirectory, { withFileTypes: true }).forEach((file) => {
    const absolutePath = path.join(homeDirectory, file.name);
    const stats = fs.statSync(absolutePath);

    if (fs.statSync(absolutePath).isFile()) {
      // Filter out the files that modified in last 24hrs
      if (new Date(stats.mtime).getTime() > Date.now() - 24 * 60 * 60 * 1000) {
        const modified = {
          name: file.name,
          dir: homeDirectory,
          created: stats.birthtime.toLocaleString(),
          modified: stats.mtime.toLocaleString(),
        };
        props.files.push(modified);
      }
    }
  });

  props.homeDirectory = homeDirectory;

  const content = renderToString(<Home {...props} />);

  return `
  <html>
    <head>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    </head>
    <body>
        <div id="root">${content}</div>
        <script>
            window.PROPS=${JSON.stringify(props)}
        </script>
        <script  src="bundle.js"></script>
    </body>
  </html>
  `;
};
