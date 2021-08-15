from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.action_chains import ActionChains



url= 'http://localhost:3000/'

selector_boton = '#header > div > div > a.login'



driver = webdriver.Chrome()
driver.maximize_window()
driver.get(url)

driver.find_element_by_class_name('profesionales').click()
time.sleep(2)
driver.execute_script("window.scrollTo(0,300);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,600);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,900);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
time.sleep(2)
driver.back()
time.sleep(2)

driver.find_element_by_class_name('contactar').click()
time.sleep(2)
driver.execute_script("window.scrollTo(0,300);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,500);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
time.sleep(2)
driver.back()
time.sleep(2)


driver.find_element_by_class_name('tratamientos').click()
time.sleep(2)
driver.execute_script("window.scrollTo(0,300);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,500);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
time.sleep(2)
driver.back()
time.sleep(2)

driver.find_element_by_class_name('consejos').click()
time.sleep(2)
driver.execute_script("window.scrollTo(0,300);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,500);")
time.sleep(2)
driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
time.sleep(2)
driver.back()
time.sleep(2)

driver.quit()










