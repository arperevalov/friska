import useLists from "@/hooks/useLists";
import useCards from '@/hooks/useCards';
import { render, screen } from "@testing-library/react";
import Home from ".";
jest.mock("@/hooks/useLists");
jest.mock("@/hooks/useCards");
const mockUseMainStore = jest.fn();

describe('Index Page', ()=> {
    beforeEach(() => {
        useLists.mockClear();
        useCards.mockClear();
        jest.mock('@/store/MainStore', () => ({
          useMainStore: mockUseMainStore,
        }));
        // Reset the mock calls for each test
        mockUseMainStore.mockReset();
    })

    it('renders without data', () => {
        const { getByText } = render(<Home />);
        expect(getByText('New Item')).toBeInTheDocument();
    })

    it('renders with data', () => {

        const mockUseLists = jest.fn();
        const mockUseCards = jest.fn();
        jest.mock('@/hooks/useLists', () => mockUseLists);
        jest.mock('@/hooks/useCards', () => mockUseCards);
        const initialState = {
        cards: [
            {
                id: 0,
                title: "Milk",
                expDate: "Tue Sep 12 2023 23:39:55 GMT+0700 (Krasnoyarsk Standard Time)",
                left: 1,
                units: "kg",
                listId: 0
            },
            {
                id: 1,
                title: "sss",
                expDate: "Tue Sep 12 2023 23:39:55 GMT+0700 (Krasnoyarsk Standard Time)",
                left: 1,
                units: "l",
                listId: 1
            },
        ],
        lists: [
            {
            title: "Fridge",
            id: 0
            },
            {
            title: "Shelf",
            id: 1
            }
        ],
            initCards: jest.fn(),
        };
        mockUseMainStore.mockReturnValue(initialState);

        const { getByText } = render(<Home />);
        // screen.debug()

        // Assert that the component renders correctly
        expect(getByText('Milk')).toBeInTheDocument();
        screen.debug()
    })
})