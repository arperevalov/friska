import { renderHook } from "@testing-library/react";
import useCards from "@/hooks/useCards";

// global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve(MOCK_PRICES)
// }));

describe("useCards hook", () => {
    it("requests data, calls store", () => {
        const { result } = renderHook(() => useCards);

        console.log(result);
    });
});
