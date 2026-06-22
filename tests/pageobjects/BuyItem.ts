import { expect, Locator, Page } from "@playwright/test";

export class BuyItem{

    private readonly itemContainerTable: Locator
    private readonly expectedDescriptionVar: Locator
    private readonly expectedNameVar: Locator
    private readonly expectedPriceVar: Locator
    private readonly shoppingCartIcon: Locator
    private readonly checkoutButton: Locator
    private readonly actualDescription: Locator
    private readonly actualName: Locator
    private readonly actualPrice: Locator
    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly postalCode: Locator
    private readonly continueButton: Locator
    private readonly finishButton: Locator
    private readonly successMessage: Locator
    

    constructor(page:Page){
        this.itemContainerTable = page.locator('#inventory_container .inventory_item')
        this.expectedDescriptionVar = page.locator('.inventory_item_desc')
        this.expectedNameVar = page.locator('.inventory_item_name')
        this.expectedPriceVar = page.locator('.inventory_item_price')
        this.shoppingCartIcon = page.locator('a.shopping_cart_link')
        this.checkoutButton = page.getByRole('button', {name: 'Checkout'})
        this.actualDescription = page.locator('div.inventory_item_desc')
        this.actualName = page.locator('div.inventory_item_name')
        this.actualPrice = page.locator('div.inventory_item_price')
        this.firstName = page.getByRole('textbox', {name: 'First Name'})
        this.lastName = page.getByRole('textbox', {name: 'Last Name'})
        this.postalCode = page.getByRole('textbox', {name: 'Zip/Postal Code'})
        this.continueButton = page.getByRole('button', {name: 'Continue'})
        this.finishButton = page.getByRole('button', {name: 'Finish'})
        this.successMessage = page.getByRole('heading', {name: 'Thank you for your order!'})

    }

    async getAllItems(): Promise<Locator[]> {
        const itemContainer = await this.itemContainerTable.all();
        return itemContainer;
    }

    async buyRandomItem(): Promise<{expectedDescription: string, expectedName: string, expectedPrice: string}> {
        const itemContainer = await this.getAllItems();
        const randomIndex = Math.floor(Math.random() * itemContainer.length)
        const randomItem = itemContainer[randomIndex];

        await randomItem.getByRole('button', {name:'Add to cart'}).click()

        return{
        expectedDescription: await randomItem.locator('.inventory_item_desc').innerText(),
        expectedName: await randomItem.locator('.inventory_item_name').innerText(),
        expectedPrice: await randomItem.locator('.inventory_item_price').innerText(),
        }
        //console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`)
   
    }

    async clickShoppingCartIcon(){
        await this.shoppingCartIcon.click()
    }

    async checkCheckoutButton(){
        await expect(this.checkoutButton).toBeVisible()
    }

    async getItemInfo(): Promise<{name: string, description: string, price: string}> {
        return{
        description: await this.actualDescription.innerText(),
        name: await this.actualName.innerText(),
        price: await this.actualPrice.innerText(),
        }
    }

    async assertResults(expectedDescription: string, expectedName: string, expectedPrice:string, name: string, description: string, price: string){
        await expect(name).toEqual(expectedDescription)
        await expect(description).toEqual(expectedName)
        await expect(price).toEqual(expectedPrice)
        
    }

    async clickCheckoutButton(){
        await this.checkoutButton.click()
    }

    async fillForm(fName:string, lName:string, pCode:string){
        await this.firstName.fill(fName)
        await this.lastName.fill(lName)
        await this.postalCode.fill(pCode)
    }

    async clickContinueButton() {
        await this.continueButton.click()
    }

    async clickFinishButton(){
        await this.finishButton.click()
    }

    async checkSuccessMessage(){
        await expect(this.successMessage).toBeVisible()
    }
 
}