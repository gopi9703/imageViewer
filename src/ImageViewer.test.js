import { render, waitFor } from "@testing-library/react";
import * as api from "./components/services/api";
import RenderApiData from "./components/pages/displayApiTab";


jest.mock();

describe("ImageViewer Component", () => {
  beforeEach(() => jest.clearAllMocks());
  it("should render Image Viewer names when api responds", async () => {
    api.RenderApiData.mockResolvedValue({
      data: [{ user: { first_name: "Wasa Crispbread" } }],
    });
    render(<RenderApiData />);
    await waitFor(() => {
      screen.getByText("Wasa Crispbread");
    });
  });

  it("should render error message when api fails", async () => {
    api.RenderApiData.mockResolvedValue({});
    render(<RenderApiData />);
    await waitFor(() => {
      // eslint-disable-next-line no-restricted-globals
      screen.getByText("Unable to fetch data");
    });
  });
});
