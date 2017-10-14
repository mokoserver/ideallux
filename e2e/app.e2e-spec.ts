import { LusrtyPage } from './app.po';

describe('lusrty App', () => {
  let page: LusrtyPage;

  beforeEach(() => {
    page = new LusrtyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
