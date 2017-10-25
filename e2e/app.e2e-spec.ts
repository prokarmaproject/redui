import { RedAPIWrapperPage } from './app.po';

describe('red-apiwrapper App', function() {
  let page: RedAPIWrapperPage;

  beforeEach(() => {
    page = new RedAPIWrapperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
