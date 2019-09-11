/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import React from "react";

// if (process.env.NODE_ENV !== "production") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");

//   whyDidYouRender(React, {
//     collapseGroups: true,
//     include: [/.*/]
//     // exclude: [/^Link/, /^Route/, /^BrowserRouter/],
//   });
// }

AppRegistry.registerComponent(appName, () => App);
