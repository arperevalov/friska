self.addEventListener("install", function () {});

self.addEventListener("activate", function () {});

self.addEventListener("push", function (event) {
    const data = event.data.text();

    const options = {
        body: data,
        icon: "/favicons/android-chrome-72x72.png",
    };

    event.waitUntil(self.registration.showNotification("Friska", options));
});
