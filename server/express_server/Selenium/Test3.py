from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.action_chains import ActionChains



user= 'isolis2'
password = 123

url= 'http://localhost:3000/'

selector_boton = '#header > div > div > a.login'
selector_user = '#username'
selector_pass = '#password'

selector_buscador= '#filterMedicalResume'
selector_boton_buscador= '#buttonSearchMedicalResume'

boton_login = '#sendLogin'

driver = webdriver.Chrome()
driver.maximize_window()
driver.get(url)

driver.find_element_by_class_name('login').click()


driver.find_element_by_css_selector(selector_user).send_keys(user)
driver.find_element_by_css_selector(selector_pass).send_keys(password)
driver.find_element_by_css_selector(boton_login).click()

driver.implicitly_wait(7)
driver.find_element_by_id('resumen').click()
driver.find_element_by_css_selector(selector_buscador).send_keys("Isaac")
time.sleep(2)
ActionChains(driver).move_by_offset(612.544677734375,220.2857208251953).click().perform()
time.sleep(2)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(4)


driver.quit()









