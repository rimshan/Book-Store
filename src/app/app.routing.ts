import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";
import { LandingLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { ProfileComponent } from "./views/profile/profile.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full",
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page",
    },
  },
  {
    path: "landing",
    component: LandingLayoutComponent,
    data: {
      title: "Books",
    },
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./views/landing/landing.module").then((m) => m.LandingModule),
      },
    ],
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./views/profile/profile.module").then((m) => m.ProfileModule),
      },
    ],
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
