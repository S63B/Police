import { PoliceAngularPage } from './app.po';

describe('police-angular App', () => {
  let page: PoliceAngularPage;

  beforeEach(() => {
    page = new PoliceAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
