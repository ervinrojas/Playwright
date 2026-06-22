import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com/');
  await page.getByRole('link', { name: 'Colombia' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).fill('Iphone');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).press('Enter');
  //await page.getByRole('option', { name: 'iphone', exact: true }).getByRole('strong').click();
  //await page.getByTestId('btn-china-wall-login').click();
  await page.getByRole('link', { name: 'Ya tengo cuenta' }).click();
  await page.getByTestId('user_id').click();
  await expect(page.getByRole('heading', { name: 'Ingresa tu e-mail o teléfono' })).toBeVisible();
});