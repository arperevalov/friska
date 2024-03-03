import axios from "axios";
import { deleteCookie } from "cookies-next";

export default function UnauthorizedErrorHandler() {
    axios
        .get("/api/refresh")
        .then(() => {
            window.location.href = "/";
        })
        .catch(() => {
            deleteCookie("auth-token");
            window.location.href = "/sign-in";
        });
}
