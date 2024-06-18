import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/admin/login/login.component';
import { LayoutComponent } from '../pages/admin/layout/layout.component';
import { ProductsComponent } from '../pages/admin/products/products.component';
import { CategoryProductsComponent } from '../pages/website/category-products/category-products.component';
import { CustomerCartComponent } from '../pages/website/customer-cart/customer-cart.component';
import { CustomerOrdersComponent } from '../pages/website/customer-orders/customer-orders.component';
import { AnalyisComponent } from '../pages/admin/analyis/analyis.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch:'full'
    },
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'products',
                component:ProductsComponent
            }
        ]
    },
    {
        path: 'categoryProducts',
        component: CategoryProductsComponent,
    },
    {
        path: 'customerCart', 
        component:CustomerCartComponent
    },
    {
        path: 'customerOrders',
        component:CustomerOrdersComponent
    },
    {
        path: 'analysis',
        component:AnalyisComponent
    }
];
