from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec


user= 'isolis2'
password = 123

url= 'http://localhost:3000/'

selector_boton = '#header > div > div > a.login'
selector_user = '#username'
selector_pass = '#password'
selector_2 = '#hero > div > as'

boton_login = '#sendLogin'

driver = webdriver.Chrome()
driver.maximize_window()
driver.get(url)

driver.find_element_by_class_name('login').click()


driver.find_element_by_css_selector(selector_user).send_keys(user)
driver.find_element_by_css_selector(selector_pass).send_keys(password)
driver.find_element_by_css_selector(boton_login).click()

time.sleep(2)

driver.implicitly_wait(7)
driver.find_element_by_id('atender').click()
time.sleep(2)
driver.execute_script("window.scrollTo(0, 300);")
time.sleep(2)

selector_fin = '#attentionTable > tr:nth-child(2) > button:nth-child(6)'
selector_ficha = '#attentionTable > tr:nth-child(2) > button:nth-child(4)' 
driver.find_element_by_css_selector(selector_ficha).click()
driver.execute_script("window.scrollTo(0, 300);")
time.sleep(2)

driver.find_element_by_id('id_card').send_keys('1231231231')
driver.find_element_by_id('reason').send_keys('Le dolia la encia')
driver.find_element_by_id('enfermedad').send_keys('Ninguna')
time.sleep(2)
driver.execute_script("window.scrollTo(0,0);")
time.sleep(3)
driver.find_element_by_id('parte2').click()
time.sleep(1)
driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
driver.find_element_by_id('otraenfermdad').send_keys('Ninguna')
time.sleep(2)
driver.execute_script("window.scrollTo(0,0);")
time.sleep(2)
driver.find_element_by_id('parte3').click()
driver.find_element_by_id('presion').send_keys(120)
driver.find_element_by_id('frecuenciac').send_keys(80)
driver.find_element_by_id('frecuenciar').send_keys(20)
driver.find_element_by_id('temperatura').send_keys(37)
time.sleep(2)
driver.execute_script("window.scrollTo(0,0);")
driver.find_element_by_id('parte4').click()
time.sleep(2)
driver.find_element_by_id('diagnostico').send_keys('Encias con infeccion por caries')
driver.find_element_by_id('tratamiento').send_keys('Antibioticos')
time.sleep(2)
driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
time.sleep(2)
driver.find_element_by_id('guardar').click()
time.sleep(2)
driver.find_element_by_id('volver').click()
time.sleep(2)



driver.find_element_by_css_selector(selector_fin).click()
time.sleep(4)

driver.quit()



