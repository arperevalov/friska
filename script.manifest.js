const { favicons } = require("favicons");
const fs = require("fs/promises");
const path = require("path");

const source = "./favicons-source.png"; // Source image(s). `string`, `buffer` or array of `string`
const destinations = {
    manifest: "./app/manifest.json",
    favicons: "./public/favicons",
};

const configuration = {
    path: "/favicons",
    appName: "Friska",
    appShortName: "Friska",
    appDescription: "Storage management app",
    developerName: "Artem Perevalov",
    developerURL: "https://github.com/arperevalov/",
    cacheBustingQueryParam: null,
    dir: "auto",
    lang: "en-US",
    background: "#fffaff",
    theme_color: "#fffaff",
    appleStatusBarStyle: "black-translucent",
    display: "standalone",
    orientation: "any",
    scope: "/",
    start_url: "/",
    preferRelatedApplications: true,
    relatedApplications: undefined,
    version: "1.0",
    pixel_art: false,
    loadManifestWithCredentials: false,
    manifestMaskable: true,
    icons: {
        // Platform Options:
        // - offset - offset in percentage
        // - background:
        //   * false - use default
        //   * true - force use default, e.g. set background for Android icons
        //   * color - set background for the specified icons
        //
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        windows: true,
        yandex: false,
    },
    shortcuts: [],
};

favicons(source, configuration)
    .then(async (response) => {
        const manifest = response.files[0].contents;
        const { images } = response;

        await fs.writeFile(destinations.manifest, manifest);

        await Promise.all(
            images.map(async (image) => {
                await fs.writeFile(path.join(destinations.favicons, image.name), image.contents);
            }),
        );
    })
    .catch((error) => {
        console.log(error.message);
    });
