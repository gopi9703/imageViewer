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
      // eslint-disable-next-line no-restricted-globals
      screen.getByText("Wasa Crispbread");
    });
  });

  describe('The image component', () => {
    test('alt contains correct value', () => {
      render(<RenderApiData />);
      const testImage = document.querySelector("img");
      expect(testImage.alt).toContain("The image alt tag for the large image");

      test('src contains correct value', () => {
        render(<ImageComponent size="large"/>)
        const testImage = document.querySelector("img");
        expect(testImage.alt).toContain("https://images.unsplash.com/photo-1657299143333-4a56a5519651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODYyODV8MXwxfGFsbHwxfHx8fHx8Mnx8MTY3MDE2MTQ2NA&ixlib=rb-4.0.3&q=80&w=1080");
      })
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
