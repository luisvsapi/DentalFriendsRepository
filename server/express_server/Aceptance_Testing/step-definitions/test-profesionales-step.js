module.exports = function () {

    this.When(/^Entro en profesionales$/, async function () {
      await helpers.loadPage('http://dentalfriends.ec/professional/')
      const menu = await helpers.getAttributeValue('section', 'id');
      expect(menu).to.be.eq('about');
    });
    this.Then(/^Debo ver 3 perfiles de doctores y 1 descripcion$/, async function () { 
      const elementos = await driver.findElements(By.css('#about > div > div'));
      expect(elementos.length).to.be.eq(4);
    });
  };