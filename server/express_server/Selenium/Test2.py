from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec


user= 'isolis2'
password = 123

url= 'http://localhost:3000/'

selector_ceudla = '#cedPac'
selector_nombre = '#nombrePac'
selector_apellido =  '#apellidoPac'
selector_email = '#emailPac'
selector_tratamiento = '#tratPac'
selector_opcionTrat = '#tratPac > option:nth-child(4)'
selector_doctor = '#doctorPac'
selector_opcionDoc = '#doctorPac > option:nth-child(3)'
selector_fecha =  '#datepicker'

class_boton = 'form-group btn btn-primary col-md-4'

driver = webdriver.Chrome()
driver.maximize_window()
driver.get(url)

driver.find_element_by_class_name('cita').click()

#llenamos el formulario
driver.find_element_by_css_selector(selector_ceudla).send_keys('1231241236')
driver.find_element_by_css_selector(selector_nombre).send_keys("Pruebas")
driver.find_element_by_css_selector(selector_apellido).send_keys('Selenium')
driver.find_element_by_css_selector(selector_email).send_keys('isavisch97@gmail.com')
driver.find_element_by_css_selector(selector_tratamiento).click()
time.sleep(2)
driver.find_element_by_css_selector(selector_opcionTrat).click()
driver.find_element_by_css_selector(selector_doctor).click()
time.sleep(2)
driver.find_element_by_css_selector(selector_opcionDoc).click()

driver.find_element_by_css_selector(selector_fecha).send_keys('12/08/2021')
time.sleep(2)

driver.find_element_by_id('agendar').click()

time.sleep(5)

driver.quit()





