import {test, expect} from "@playwright/test";
import { LoginPage } from "./pageobjects/LoginPage";
import { BuyItem } from "./pageobjects/BuyItem";

test('Test Sauce Demo', async ({ page }, testInfo) => {
    await page.goto('https://www.saucedemo.com')
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user','secret_sauce')
    await login.checkSuccessfulLogin()
    
    await testInfo.attach('login',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })
    //await page.screenshot({path: 'screenshots/login.png', fullPage:true})
    const buy = new BuyItem(page)
    await buy.buyRandomItem()
    await buy.clickShoppingCartIcon()
    await buy.checkCheckoutButton()
    await buy.getItemInfo()
    await buy.assertResults()
    await buy.clickCheckoutButton()
    await buy.fillForm('John','Doe','111031')
    await buy.clickContinueButton()
    await buy.clickFinishButton()
    await buy.checkSuccessMessage()
    await page.pause()
     
    /*console.log("Item Info:", itemInfo);
    expect(buy.name).toBeTruthy();
    expect(itemInfo.price).toBeTruthy();
    expect(itemInfo.description).toBeTruthy();
    /*const itenContainer = await page.locator('#inventory_container .inventory_item').all()

    const randomIndex = Math.floor(Math.random() * itenContainer.length)

    const randomItem = itenContainer[randomIndex]

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()
 
    console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`)

    await randomItem.getByRole('button', {name:'Add to cart'}).click()
    await page.locator('a.shopping_cart_link').click()

    expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible()

    const actualDescription = await page.locator('div.inventory_item_desc').innerText()
    const actualName = await page.locator('div.inventory_item_name').innerText()
    const actualPrice = await page.locator('div.inventory_item_price').innerText()
    
    expect(actualName).toEqual(expectedName)
    expect(actualDescription).toEqual(expectedDescription)
    expect(actualPrice).toEqual(expectedPrice)
    //await page.pause()
    await page.getByRole('button', {name: 'Checkout'}).click()

    await page.getByRole('textbox', {name: 'First Name'}).fill('John')
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Doe')
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('111031')
    await page.getByRole('button', {name: 'Continue'}).click()
    await page.getByRole('button', {name: 'Finish'}).click()

    expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible()*/


})

test('navigate', async ({page}) => {
    await page.goto(process.env.URL)
    await page.pause()
})