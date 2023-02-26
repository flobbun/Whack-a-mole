import { render, screen, waitFor } from "@testing-library/react";
import Leaderboard from "../client/pages/Leaderboard/Leaderboard";
import Wrapper from "./helpers/Wrapper";
import useLeaderboard from "../client/hooks/useLeaderboard";
import { Mock, vi } from "vitest";

vi.mock("../client/hooks/useLeaderboard");

describe("leaderboard", () => {

    beforeAll(() => {
        (useLeaderboard as Mock).mockReturnValue({
            leaderboard: [
                { name: "John", score: 0, id: 1 },
                { name: "Jane", score: 20, id: 2 },
                { name: "Jack", score: 50, id: 3 },
                { name: "John", score: 100, id: 4 },
                { name: "Jane", score: 12, id: 5 },
                { name: "Jack", score: 32, id: 6 },
                { name: "John", score: 1, id: 7 },
                { name: "Jane", score: 20, id: 8 },
                { name: "Jack", score: 30, id: 9 },
                { name: "John", score: 3, id: 10 },
            ], loading: false
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });


    test("should fetch leaderboard", async () => {
        render(<Leaderboard />, { wrapper: Wrapper });
        expect(useLeaderboard).toHaveBeenCalledTimes(1);
        expect(useLeaderboard).toHaveBeenCalledWith();
        await waitFor(() => expect(screen.getByTestId("leaderboard")).toBeInTheDocument());
    });

    test("should be sorted by highest score", async () => {
        render(<Leaderboard />, { wrapper: Wrapper });
        await waitFor(() => expect(screen.getByTestId("leaderboard")).toBeInTheDocument());
        const leaderboard = screen.getByTestId("leaderboard");

        expect(leaderboard.children[0].textContent).toBe("John - 100 🏆");
        expect(leaderboard.children[1].textContent).toBe("Jack - 50 🏆");
        expect(leaderboard.children[2].textContent).toBe("Jack - 32 🏆");
    });

    test("should show loading indicator", async () => {
        (useLeaderboard as Mock).mockReturnValue({ leaderboard: [], loading: true });
        render(<Leaderboard />, { wrapper: Wrapper });
        expect(useLeaderboard).toHaveBeenCalledTimes(1);
        expect(useLeaderboard).toHaveBeenCalledWith();
        await waitFor(() => expect(screen.getByTestId("loading")).toBeInTheDocument());
    });
});
