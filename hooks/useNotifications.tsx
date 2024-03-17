import { urlBase64ToUint8Array } from "@/utils/helpers";
import axios from "axios";

export default function useNotifications() {
    const register = async () => {
        try {
            if (typeof navigator === "undefined") throw "Navigator is not available";
            if (!("serviceWorker" in navigator)) throw "serviceWorkers are not available";

            const registration = await navigator.serviceWorker.ready;

            const current = await registration.pushManager.getSubscription();

            if (current) throw "Subscription already exists!";

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
            await subscription.unsubscribe();

            return subscription;
        } catch (error) {
            throw error;
        }
    };

    const subscribe = () => {
        register().then((result: PushSubscription) => {
            axios.post("/api/notifications/", result.toJSON());
        });
    };

    const unsubscribe = () => {
        unregister().then((result: PushSubscription | undefined) => {
            if (result) {
                axios.post("/api/notifications/delete", result.toJSON());
            }
        });
    };

    return {
        subscribe,
        unsubscribe,
    };
}
