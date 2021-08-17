module.exports = function () {

    this.When(/^Entro en la pagina de consejos$/, async function () {
      await helpers.loadPage('http://dentalfriends.ec/dentalcare/')
      const menu = await helpers.getAttributeValue('section','id');
      expect(menu).to.be.eq('resume');
    });
    this.Then(/^Debo ver 3 consejos de salud$/, async function () { 
      const elementos = await driver.findElements(By.css('#resume > div > div.row > div > div'));
      expect(elementos.length).to.be.eq(3);
    });
  };