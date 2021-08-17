module.exports = function () {

    this.When(/^Entro en la home$/, async function () {
      await helpers.loadPage('http://dentalfriends.ec/')
      const menu = await helpers.getAttributeValue('header', 'id');
      expect(menu).to.be.eq('header');
    });
    this.Then(/^Debo ver 6 opciones en el menu$/, async function () { 
      const elementos = await driver.findElements(By.css('#header > div > nav > ul > li'));
      expect(elementos.length).to.be.eq(6);
    });
  };