import { deleteCookie } from "cookies-next";

export default function UnauthorizedErrorHandler() {
    deleteCookie("auth-token");
    window.location.href = "/sign-in";
}
