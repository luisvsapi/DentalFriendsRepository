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

time.sleep(3)

driver.find_element_by_id("rechazar").click()
time.sleep(3)

driver.quit()



