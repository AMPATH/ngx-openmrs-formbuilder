import { FormEditorPage } from './app.po';

describe('form-editor App', () => {
  let page: FormEditorPage;

  beforeEach(() => {
    page = new FormEditorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
