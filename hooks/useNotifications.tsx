import { urlBase64ToUint8Array } from "@/utils/helpers";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useNotifications() {
    const [hasSubscrtiption, setHasSubscription] = useState(false);

    const register = async () => {
        try {
            if (typeof navigator === "undefined") throw "Navigator is not available";
            if (!("serviceWorker" in navigator)) throw "serviceWorkers are not available";

            const registration = await navigator.serviceWorker.ready;

            const current = await getSubscription();

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

            await navigator.serviceWorker.ready;

            const subscription = await getSubscription();

            if (!subscription) return;
            await subscription.unsubscribe();

            return subscription;
        } catch (error) {
            throw error;
        }
    };

    const getSubscription = async () => {
        try {
            if (typeof navigator === "undefined") throw "Navigator is not available";
            if (!("serviceWorker" in navigator)) throw "serviceWorkers are not available";

            const registration = await navigator.serviceWorker.ready;

            return await registration.pushManager.getSubscription();
        } catch (error) {
            throw error;
        }
    };

    const subscribe = () => {
        register().then((result: PushSubscription) => {
            setHasSubscription(true);
            axios.post("/api/notifications/", result.toJSON());
        });
    };

    const unsubscribe = () => {
        unregister().then((result: PushSubscription | undefined) => {
            setHasSubscription(false);
            if (result) {
                axios.post("/api/notifications/delete", result.toJSON());
            }
        });
    };

    useEffect(() => {
        getSubscription()
            .then((result) => {
                if (result !== null) {
                    setHasSubscription(true);
                } else {
                    setHasSubscription(false);
                }
            })
            .catch(() => {
                setHasSubscription(false);
            });
    }, []);

    return {
        subscribe,
        unsubscribe,
        hasSubscrtiption,
    };
}
