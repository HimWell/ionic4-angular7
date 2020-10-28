import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { AddPageModule } from '../add/add.module';
import { EditPageModule } from '../edit/edit.module';
import { HomePageModule } from '../home/home.module';
import { DetailsPageModule } from '../details/details.module';
import { AddUserPageModule } from '../add-user/add-user.module';
import { DetailsUserPageModule } from '../details-user/details-user.module';
import { EditUserPageModule } from '../edit-user/edit-user.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    AddPageModule,
    EditPageModule,
    DetailsPageModule,
    AddUserPageModule,
    DetailsUserPageModule,
    EditUserPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
