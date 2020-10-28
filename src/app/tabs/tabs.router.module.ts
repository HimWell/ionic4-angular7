import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AddPage } from '../add/add.page';
import { EditPage } from '../edit/edit.page';
import { DetailsPage } from '../details/details.page';
import { AddUserPage } from '../add-user/add-user.page';
import { DetailsUserPage } from '../details-user/details-user.page';
import { EditUserPage } from '../edit-user/edit-user.page';

const routes: Routes = [
  {
    path: 'tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'details',
        outlet: 'details',
        component: DetailsPage
      },
      {
        path: 'add',
        outlet: 'add',
        component: AddPage
      },
      {
        path: 'add-user',
        outlet: 'add-user',
        component: AddUserPage
      },
      {
        path: 'details-user',
        outlet: 'details-user',
        component: DetailsUserPage
      },
      {
        path: 'edit-user',
        outlet: 'edit-user',
        component: EditUserPage
      },
      {
        path: 'edit',
        outlet: 'edit',
        component: EditPage
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
