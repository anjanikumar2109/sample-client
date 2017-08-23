import { SalesForecastPage } from './app.po';

describe('saleForecastclient App', () => {
  let page: SalesForecastPage;

  beforeEach(() => {
    page = new SalesForecastPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
