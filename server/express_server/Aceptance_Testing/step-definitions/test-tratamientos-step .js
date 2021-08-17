module.exports = function () {

    this.When(/^Entro en la pagina de tratamiento$/, async function () {
      await helpers.loadPage('http://dentalfriends.ec/treatment/')
      const menu = await helpers.getAttributeValue('section', 'id');
      expect(menu).to.be.eq('services');
    });
    this.Then(/^Debo ver 6 tratamientos$/, async function () { 
      const elementos = await driver.findElements(By.css('#services > div > div.row > div'));
      expect(elementos.length).to.be.eq(6);
    });
  };