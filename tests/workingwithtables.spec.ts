import {test, expect } from '@playwright/test'

test('test web table', async ({ page }) =>{
    await page.goto('https://demoqa.com/webtables')
    
    const tableContainer = await page.locator("xpath=//table[contains(@class, 'table')]")
    const rows = await tableContainer.locator("xpath=.//tbody/tr").all()

    const employees: Employee[] = []

    console.log(rows.length)

    for(let row of rows){
        let employee: Employee = {
            firstname: await row.locator('xpath=.//td[1]').innerText(),
            lastname: await row.locator('xpath=.//td[2]').innerText(),
            age: await row.locator("xpath=.//td[3]").innerText(),
            email: await row.locator("xpath=.//td[4]").innerText(),
            salary: await row.locator("xpath=.//td[5]").innerText(),
            department: await row.locator("xpath=.//td[6]").innerText(),
                        
        }
        employees.push(employee)
    }

    /*for(let pepito of employees){
        console.log(pepito)
    }*/

    const employeeInLegalDept = employees.filter(employee => employee.department === 'Legal')
    console.log('Employees in Legal Department', employeeInLegalDept)

})

interface Employee{
    firstname: string
    lastname: string
    age: string
    email: string
    salary: string
    department: string
}