import { urlBase64ToUint8Array } from "@/utils/helpers";
import axios from "axios";

export default function useNotifications() {
    const register = async () => {
        try {
            if (typeof navigator === "undefined") throw "Navigator is not available";
            if (!("serviceWorker" in navigator)) throw "serviceWorkers are not available";

            const registration = await navigator.serviceWorker.ready;

            await registration.pushManager.getSubscription();

            const key = process.env.NEXT_PUBLIC_NOTIFICATIONS_KEY ?? "";
            const applicationServerKey = urlBase64ToUint8Array(key);

            return await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey,
            });
        } catch (error) {
            throw error;
        }
    };

    const unregister = async () => {
        try {
            if (typeof navigator === "undefined") throw "Navigator is not available";
            if (!("serviceWorker" in navigator)) throw "serviceWorkers are not available";

            const registration = await navigator.serviceWorker.ready;

            const subscription = await registration.pushManager.getSubscription();

            if (!subscription) return;
            return await subscription.unsubscribe();
        } catch (error) {
            throw error;
        }
    };

    const subscribe = () => {
        register().then((result: PushSubscription) => {
            axios.post("/notifications/subscribe", result.toJSON());
        });
    };

    const unsubscribe = () => {
        unregister().then(() => {});
    };

    return {
        subscribe,
        unsubscribe,
    };
}
