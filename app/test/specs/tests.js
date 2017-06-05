it("Test", () => {
browser
  .get("http://www.google.com")
  .elementById('q')
  .sendKeys('webdriver')
  .elementById('btnG')
  .click()
});
