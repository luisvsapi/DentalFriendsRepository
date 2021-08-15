from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.action_chains import ActionChains



url= 'http://localhost:3000/'

user= 'isolis2'
password = 123

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

time.sleep(3)

driver.find_element_by_id("aceptae").click()
time.sleep(2)
driver.execute_script("window.scrollTo(0, 300);")
time.sleep(2)
ActionChains(driver).move_by_offset(200,400).click().perform()
time.sleep(2)
#driver.switch_to.alert().accept()
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(2)
driver.find_element_by_id("confirmar").click()
time.sleep(3)
driver.implicitly_wait(7)
driver.find_element_by_id('atender').click()
time.sleep(3)


driver.quit()












